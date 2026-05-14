"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const panels = ["intro", "aksa", "siemola", "fashion", "closing"] as const;
type PanelName = (typeof panels)[number];

const transitionAt = {
  aksa: 1,
  siemola: 5.45,
  fashion: 7.15,
  closing: 8.85,
} as const;

const aksaSequenceAt = 2.72;

const bottomUpPanelMotion = {
  incomingFrom: {
    yPercent: 100,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
  },
  incomingTo: {
    yPercent: 0,
    scale: 1,
    duration: 1.5,
    ease: "none",
    immediateRender: false,
  },
  outgoingTo: {
    scale: 0.985,
    yPercent: -2,
    duration: 1.5,
    ease: "none",
  },
} as const;

const panelTransitions = [
  {
    incoming: "aksa",
    at: transitionAt.aksa,
    ...bottomUpPanelMotion,
  },
  {
    incoming: "siemola",
    at: transitionAt.siemola,
    ...bottomUpPanelMotion,
  },
  {
    incoming: "fashion",
    at: transitionAt.fashion,
    ...bottomUpPanelMotion,
  },
  {
    incoming: "closing",
    at: transitionAt.closing,
    ...bottomUpPanelMotion,
  },
] as const;

function useCinematicScroll(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    let introScrollUnlocked = false;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    lenis.stop();

    const unlockIntroScroll = (shouldRefresh = true) => {
      if (introScrollUnlocked) return;

      introScrollUnlocked = true;
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      lenis.start();

      if (shouldRefresh) {
        ScrollTrigger.refresh();
      }
    };

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const panelElements = gsap.utils.toArray<HTMLElement>(".cinematic-panel");
      const panelByName = new Map<PanelName, HTMLElement>(
        panels.map((panel, index) => [panel, panelElements[index]]),
      );

      // 1. SETUP AWAL
      panelElements.forEach((panel, index) => {
        gsap.set(panel, {
          yPercent: index === 0 ? 0 : 100,
          zIndex: index + 1,
          autoAlpha: 1,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          transformOrigin: "center center",
          willChange: "transform",
          force3D: true,
          backfaceVisibility: "hidden",
        });
      });

      // ==========================================
      // TAMBAHAN: INTRO ANIMATION
      // ==========================================
      const introTl = gsap.timeline({
        onComplete: () => unlockIntroScroll(),
      });
      introTl.set(".intro-content-group", {
        autoAlpha: 0,
        y: 36,
        scale: 0.98,
      });
      introTl.set(".intro-words-container", { autoAlpha: 1 });

      introTl.to(root, { autoAlpha: 1, duration: 0.3, ease: "power1.in" });

      // ==========================================
      // CINEMATIC INTRO WORD SEQUENCE
      // ==========================================

      const words = gsap.utils.toArray(".intro-word");

      words.forEach((word) => {
        const el = word as HTMLElement;

        introTl
          .fromTo(
            el,
            {
              yPercent: 100,
              autoAlpha: 0,
            },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "power4.out",
            },
          )
          .to(
            el,
            {
              yPercent: -100,
              autoAlpha: 0,
              duration: 0.6,
              ease: "power4.in",
            },
            "+=0.45",
          );
      });

      introTl.to(
        ".intro-words-container",
        {
          autoAlpha: 0,
          y: -20,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.18",
      );

      // Reveal main hero
      introTl.to(
        ".intro-content-group",
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.12",
      );

      const film = gsap.timeline({
        scrollTrigger: {
          trigger: ".panel-scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.8,
        },
      });

      const addCameraDepth = (
        panel: HTMLElement,
        at: number,
        direction: "enter" | "exit",
      ) => {
        const scene = panel.querySelector<HTMLElement>(".camera-scene");
        const visual = panel.querySelector<HTMLElement>(".camera-visual");
        const copy = gsap.utils.toArray<HTMLElement>(
          panel.querySelectorAll<HTMLElement>(".camera-copy"),
        );
        const duration = 1.75;

        const targets = [scene, visual, ...copy].filter(
          Boolean,
        ) as HTMLElement[];
        if (targets.length) {
          gsap.set(targets, {
            willChange: "transform, opacity",
            force3D: true,
            backfaceVisibility: "hidden",
          });
        }

        if (direction === "enter") {
          if (scene) {
            film.fromTo(
              scene,
              { scale: 1.08 },
              { scale: 1, duration, ease: "none" },
              at,
            );
          }

          if (visual) {
            film.fromTo(
              visual,
              { scale: 1.045 },
              { scale: 1, duration, ease: "none" },
              at,
            );
          }

          if (copy.length) {
            film.fromTo(
              copy,
              { y: 10 },
              { y: 0, duration: 1.25, ease: "none" },
              at + 0.16,
            );
          }

          return;
        }

        if (scene) {
          film.to(scene, { scale: 1.07, duration, ease: "none" }, at);
        }

        if (visual) {
          film.to(visual, { scale: 1.055, duration, ease: "none" }, at);
        }

        if (copy.length) {
          film.to(copy, { y: -8, duration: 1.25, ease: "none" }, at);
        }
      };

      const aksaPanel = panelByName.get("aksa");
      if (aksaPanel) {
        const galleryShell =
          aksaPanel.querySelector<HTMLElement>(".aksa-gallery-shell");
        const galleryFrame =
          aksaPanel.querySelector<HTMLElement>(".aksa-gallery-frame");
        const qrisShot = aksaPanel.querySelector<HTMLElement>(".aksa-shot-qris");
        const cryptoShot =
          aksaPanel.querySelector<HTMLElement>(".aksa-shot-crypto");
        const checkoutShot =
          aksaPanel.querySelector<HTMLElement>(".aksa-shot-checkout");
        const ordersShot =
          aksaPanel.querySelector<HTMLElement>(".aksa-shot-orders");

        if (
          galleryShell &&
          galleryFrame &&
          qrisShot &&
          cryptoShot &&
          checkoutShot &&
          ordersShot
        ) {
          const sequenceShots = [
            qrisShot,
            cryptoShot,
            checkoutShot,
            ordersShot,
          ];

          gsap.set(galleryShell, {
            perspective: 1400,
            transformStyle: "preserve-3d",
          });
          gsap.set(galleryFrame, {
            x: "2vw",
            y: "0vh",
            z: 0,
            xPercent: -50,
            yPercent: -50,
            scale: 0.94,
            rotateX: 0,
            rotateY: 0,
            transformPerspective: 1400,
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            willChange: "transform",
            force3D: true,
            backfaceVisibility: "hidden",
          });
          gsap.set(sequenceShots, {
            willChange: "transform, opacity",
            force3D: true,
            backfaceVisibility: "hidden",
          });
          gsap.set(checkoutShot, {
            autoAlpha: 1,
            scale: 1,
            x: "0vw",
            y: "0vh",
            z: 140,
            xPercent: -50,
            yPercent: -50,
            rotateX: 0,
            rotateY: 0,
            filter: "blur(0px)",
          });
          gsap.set(qrisShot, {
            autoAlpha: 0.3,
            scale: 0.86,
            x: "8vw",
            y: "0vh",
            z: -90,
            xPercent: -50,
            yPercent: -50,
            rotateX: 0,
            rotateY: 7,
            filter: "blur(0px)",
          });
          gsap.set(cryptoShot, {
            autoAlpha: 0.14,
            scale: 0.76,
            x: "13vw",
            y: "0vh",
            z: -220,
            xPercent: -50,
            yPercent: -50,
            rotateX: 0,
            rotateY: 10,
            filter: "blur(0px)",
          });
          gsap.set(ordersShot, {
            autoAlpha: 0,
            scale: 0.72,
            x: "15vw",
            y: "0vh",
            z: -300,
            xPercent: -50,
            yPercent: -50,
            rotateX: 0,
            rotateY: 11,
            filter: "blur(0px)",
          });

          const aksaSequence = gsap.timeline();

          // Active screenshots stay sharp; only the leaving/background layers blur.
          aksaSequence
            .to(galleryFrame, {
              x: "1vw",
              y: "0vh",
              z: 50,
              scale: 0.98,
              duration: 0.36,
              ease: "none",
            })
            .to(
              checkoutShot,
              {
                x: "-9vw",
                y: "0vh",
                z: -120,
                scale: 0.82,
                rotateY: -8,
                autoAlpha: 0.26,
                filter: "blur(6px)",
                duration: 0.5,
                ease: "none",
              },
              "<",
            )
            .to(
              qrisShot,
              {
                x: "0vw",
                y: "0vh",
                z: 150,
                scale: 1,
                rotateY: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.5,
                ease: "none",
              },
              "<",
            )
            .to(
              cryptoShot,
              {
                x: "8vw",
                y: "0vh",
                z: -90,
                scale: 0.86,
                rotateY: 7,
                autoAlpha: 0.3,
                filter: "blur(0px)",
                duration: 0.5,
                ease: "none",
              },
              "<",
            )
            .to(
              ordersShot,
              {
                x: "13vw",
                y: "0vh",
                z: -220,
                scale: 0.76,
                rotateY: 10,
                autoAlpha: 0.14,
                filter: "blur(0px)",
                duration: 0.5,
                ease: "none",
              },
              "<",
            )
            .to(
              galleryFrame,
              {
                x: "0vw",
                y: "0vh",
                z: 68,
                scale: 1,
                duration: 0.5,
                ease: "none",
              },
            )
            .to(
              checkoutShot,
              {
                x: "-15vw",
                y: "0vh",
                z: -270,
                scale: 0.66,
                autoAlpha: 0,
                filter: "blur(10px)",
                duration: 0.52,
                ease: "none",
              },
              "<",
            )
            .to(
              qrisShot,
              {
                x: "-9vw",
                y: "0vh",
                z: -120,
                scale: 0.82,
                rotateY: -8,
                autoAlpha: 0.26,
                filter: "blur(6px)",
                duration: 0.52,
                ease: "none",
              },
              "<",
            )
            .to(
              cryptoShot,
              {
                x: "0vw",
                y: "0vh",
                z: 150,
                scale: 1,
                rotateY: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.52,
                ease: "none",
              },
              "<",
            )
            .to(
              ordersShot,
              {
                x: "8vw",
                y: "0vh",
                z: -90,
                scale: 0.86,
                rotateY: 7,
                autoAlpha: 0.3,
                filter: "blur(0px)",
                duration: 0.52,
                ease: "none",
              },
              "<",
            )
            .to(
              galleryFrame,
              {
                x: "-1vw",
                y: "0vh",
                z: 82,
                scale: 1.02,
                duration: 0.52,
                ease: "none",
              },
            )
            .to(
              qrisShot,
              {
                x: "-15vw",
                y: "0vh",
                z: -280,
                scale: 0.64,
                autoAlpha: 0,
                filter: "blur(10px)",
                duration: 0.54,
                ease: "none",
              },
              "<",
            )
            .to(
              cryptoShot,
              {
                x: "-9vw",
                y: "0vh",
                z: -120,
                scale: 0.82,
                rotateY: -8,
                autoAlpha: 0.26,
                filter: "blur(6px)",
                duration: 0.54,
                ease: "none",
              },
              "<",
            )
            .to(
              ordersShot,
              {
                x: "0vw",
                y: "0vh",
                z: 150,
                scale: 1,
                rotateY: 0,
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.54,
                ease: "none",
              },
              "<",
            )
            .to(galleryFrame, {
              x: "-2vw",
              y: "0vh",
              z: 90,
              scale: 1.03,
              duration: 0.36,
              ease: "none",
            });

          film.add(aksaSequence, aksaSequenceAt);
        }
      }

      panelTransitions.forEach((transition) => {
        const incomingPanel = panelByName.get(transition.incoming as PanelName);
        const incomingIndex = panels.indexOf(transition.incoming as PanelName);
        const outgoingPanel = panelElements[incomingIndex - 1];

        if (!incomingPanel || !outgoingPanel) return;

        film
          .fromTo(
            incomingPanel,
            { ...transition.incomingFrom },
            { ...transition.incomingTo },
            transition.at,
          )
          .to(outgoingPanel, { ...transition.outgoingTo }, transition.at);

        addCameraDepth(incomingPanel, transition.at, "enter");
        addCameraDepth(outgoingPanel, transition.at, "exit");
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      unlockIntroScroll(false);
      ctx.revert();
      lenis.destroy();
    };
  }, [rootRef]);
}

function PanelShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <article
      className={`cinematic-panel absolute inset-0 overflow-hidden bg-[#050505] ${className}`}
    >
      {children}
    </article>
  );
}

function AksaFeatureShot({
  src,
  alt,
  className,
  objectPosition = "center top",
}: {
  src: string;
  alt: string;
  className: string;
  objectPosition?: string;
}) {
  return (
    <figure
      className={`aksa-depth-shot absolute left-1/2 top-1/2 h-[min(56vh,38rem)] w-[min(72vw,31rem)] overflow-hidden rounded-md bg-[#0a0610] shadow-[0_34px_100px_rgba(0,0,0,0.5)] sm:w-[min(29vw,31rem)] ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 74vw, 42vw"
        quality={78}
        className="object-cover"
        style={{ objectPosition }}
      />
    </figure>
  );
}

// ===============================
// INTRO PANEL
// ===============================

function IntroPanel() {
  return (
    <PanelShell className="bg-[#050409]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(116,65,151,0.25),transparent_34%),linear-gradient(135deg,rgba(5,4,9,1),rgba(13,10,17,0.98)_52%,rgba(4,6,8,1))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:100%_18vh] opacity-40" />

      <div className="intro-words-container absolute inset-0 z-20 grid place-items-center overflow-hidden px-5 text-center">
        <h1 className="relative h-[clamp(4rem,10vw,7.5rem)] w-full max-w-[min(88vw,66rem)] overflow-hidden font-display text-[clamp(3.7rem,10vw,7.5rem)] font-semibold leading-[0.9] tracking-normal text-white">
          <span className="intro-word absolute inset-0 flex items-center justify-center text-center opacity-0">
            Quiet
          </span>
          <span className="intro-word absolute inset-0 flex items-center justify-center text-center opacity-0">
            Systems
          </span>
          <span className="intro-word absolute inset-0 flex items-center justify-center text-center opacity-0">
            In Motion
          </span>
        </h1>
      </div>

      <div className="intro-content-group relative z-10 grid h-full place-items-center px-5 text-center">
        <div className="w-full max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-white/40">
            Computer Science Student • Ready For Internship
          </p>

          <h1 className="mt-7 font-display text-[clamp(6.5rem,22vw,18rem)] font-semibold leading-[0.82] tracking-normal text-white">
            Aksaa
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-slate-300 sm:mt-8 sm:text-2xl sm:leading-9">
            Building cinematic digital systems with quiet precision.
          </p>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/48 sm:text-base sm:leading-7">
            Exploring backend systems, motion interfaces, and modern web
            experiences through practical products.
          </p>
        </div>
      </div>
    </PanelShell>
  );
}

// ===============================
// AKSA XITERZ
// ===============================

function AksaPanel() {
  return (
    <PanelShell className="bg-[#12081a]">
      <div className="camera-scene absolute inset-0 origin-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(133,77,160,0.26),transparent_34%),linear-gradient(135deg,rgba(22,8,37,1),rgba(7,5,11,1)_54%,rgba(42,22,48,0.9))]" />

        <div
          className="camera-visual aksa-gallery-shell absolute inset-y-[13vh] left-[36vw] right-[2vw] z-10 overflow-visible sm:left-[40vw] sm:right-[4vw] lg:left-[43vw] lg:right-[6vw]"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-x-[8%] bottom-[10%] top-[10%] rounded-full bg-violet-500/12 blur-3xl" />

          <div
            className="aksa-gallery-frame absolute left-1/2 top-1/2 h-[68vh] w-[min(54vw,54rem)] overflow-visible"
            style={{ transformStyle: "preserve-3d" }}
          >
            <AksaFeatureShot
              src="/projects/aksa-xiterz/qris-mobile.png"
              alt="Close crop of the Aksa Xiterz QRIS payment screen"
              objectPosition="center 43%"
              className="aksa-shot-qris"
            />

            <AksaFeatureShot
              src="/projects/aksa-xiterz/crypto-address-mobile.png"
              alt="Close crop of the Aksa Xiterz USDT payment details screen"
              objectPosition="center 38%"
              className="aksa-shot-crypto"
            />

            <AksaFeatureShot
              src="/projects/aksa-xiterz/checkout-network-mobile.png"
              alt="Close crop of the Aksa Xiterz checkout network selection screen"
              objectPosition="center 35%"
              className="aksa-shot-checkout"
            />

            <AksaFeatureShot
              src="/projects/aksa-xiterz/orders-mobile.png"
              alt="Close crop of the Aksa Xiterz transaction order screen"
              objectPosition="center 32%"
              className="aksa-shot-orders"
            />
          </div>
        </div>
      </div>

      <p className="camera-copy absolute right-5 top-[9vh] z-30 hidden font-mono text-xs uppercase tracking-[0.34em] text-violet-100/34 sm:block sm:right-10 lg:right-16">
        Chapter 01 / Commercial System
      </p>

      <div className="camera-copy absolute left-5 top-[10vh] z-30 max-w-[calc(100vw-2.5rem)] sm:left-10 sm:max-w-[25rem] lg:left-16">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-violet-100/42">
          Aksa Xiterz • Payment Automation
        </p>

        <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Exact payments, QRIS invoices, crypto checks, and license delivery in
          one operational flow.
        </p>
      </div>

      <div className="camera-copy absolute bottom-[25vh] left-5 z-30 hidden flex-wrap gap-x-5 gap-y-3 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-white/46 sm:flex sm:left-10 lg:left-16">
        <span>QRIS</span>
        <span>Crypto Flow</span>
        <span>Digital Delivery</span>
        <span>Ops Logic</span>
      </div>

      <h2 className="camera-copy absolute bottom-[6vh] left-5 z-30 max-w-[min(54rem,calc(100vw-2.5rem))] font-display text-[clamp(4.8rem,13vw,12rem)] font-semibold leading-[0.84] tracking-normal text-white drop-shadow-[0_24px_60px_rgba(0,0,0,0.72)] sm:left-10 lg:left-16">
        Aksa Xiterz
      </h2>
    </PanelShell>
  );
}

// ===============================
// SIEMOLA
// ===============================

function SiemolaPanel() {
  return (
    <PanelShell className="bg-[#061019]">
      <div className="camera-scene absolute inset-0 origin-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(64,104,134,0.25),transparent_34%),linear-gradient(135deg,rgba(7,17,26,1),rgba(4,8,13,1)_58%,rgba(17,30,42,0.92))]" />

        <div className="camera-visual absolute left-[6vw] top-[20vh] z-10 h-[58vh] w-[94vw] sm:left-[11vw] sm:top-[15vh] sm:h-[68vh] sm:w-[78vw]">
        <div className="absolute inset-y-[8%] left-[12%] right-[4%] border-y border-white/12 bg-[linear-gradient(120deg,rgba(13,30,45,0.78),rgba(5,10,16,0.38)_54%,rgba(26,43,56,0.5))]" />
        <div className="absolute inset-x-[20%] top-[12%] h-px bg-white/14" />
        <div className="absolute inset-x-[4%] top-[44%] h-px bg-white/10" />
        <div className="absolute inset-x-[15%] bottom-[18%] h-px bg-white/14" />
        <div className="absolute bottom-[12%] left-[24%] top-[7%] w-px bg-white/12" />
        <div className="absolute bottom-[6%] right-[18%] top-[14%] w-px bg-white/12" />

        <pre className="absolute left-[8%] top-[16%] max-w-[78vw] whitespace-pre-wrap border-l border-blue-100/22 pl-5 font-mono text-[0.64rem] uppercase leading-6 tracking-[0.18em] text-blue-100/58 sm:left-[10%] sm:max-w-none sm:text-[0.74rem] sm:leading-7">
{`RFID_TAP      AUTH_WINDOW
SWITCH_OPEN   BORROW_ACTIVE
SWITCH_CLOSE  RETURN_SYNC`}
        </pre>

        <div className="absolute right-[8%] top-[20%] hidden w-[28vw] min-w-[17rem] border border-white/12 bg-black/18 p-5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/48 sm:block">
          <div className="mb-4 text-blue-100/68">locker_accesses</div>
          <div className="flex justify-between border-t border-white/10 py-3">
            <span>student_id</span>
            <span>indexed</span>
          </div>
          <div className="flex justify-between border-t border-white/10 py-3">
            <span>locker_id</span>
            <span>mapped</span>
          </div>
          <div className="flex justify-between border-t border-white/10 py-3">
            <span>status</span>
            <span>synced</span>
          </div>
        </div>

        <div className="absolute bottom-[16%] left-[18%] flex w-[62vw] max-w-xl flex-col gap-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/48 sm:left-[16%]">
          <div className="flex items-center justify-between border border-white/12 bg-black/16 px-4 py-3">
            <span>api/tab</span>
            <span className="text-blue-100/68">RFID event</span>
          </div>
          <div className="flex items-center justify-between border border-white/12 bg-black/16 px-4 py-3">
            <span>borrowLocker()</span>
            <span className="text-blue-100/68">state guard</span>
          </div>
        </div>

        <div className="absolute right-[8%] bottom-[8%] hidden font-mono text-[0.62rem] uppercase tracking-[0.32em] text-white/34 sm:block">
          infrastructure logic
        </div>
        </div>
      </div>

      <p className="camera-copy absolute right-5 top-[9vh] z-30 hidden font-mono text-xs uppercase tracking-[0.34em] text-blue-100/34 sm:block sm:right-10 lg:right-16">
        Chapter 02 / Structured Systems
      </p>

      <h2 className="camera-copy absolute left-5 top-[10vh] z-30 font-display text-[clamp(4.8rem,14vw,12.5rem)] font-semibold leading-[0.86] tracking-normal text-white drop-shadow-[0_24px_60px_rgba(0,0,0,0.72)] sm:left-10 lg:left-16">
        Siemola
      </h2>

      <div className="camera-copy absolute bottom-[9vh] right-5 z-30 max-w-[calc(100vw-2.5rem)] text-right sm:right-10 sm:max-w-md lg:right-16">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-blue-100/38">
          Backend Workflows • Process Logic
        </p>

        <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Hardware signals become database truth through guarded states and
          accountable records.
        </p>

        <div className="mt-7 flex flex-wrap justify-end gap-x-5 gap-y-3 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-white/40">
          <span>State Logic</span>
          <span>Database Flow</span>
          <span>Access Rules</span>
        </div>
      </div>
    </PanelShell>
  );
}

// ===============================
// BRL FASHION
// ===============================

function FashionPanel() {
  return (
    <PanelShell className="bg-[#1b1114]">
      <div className="camera-scene absolute inset-0 origin-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_66%,rgba(170,116,96,0.22),transparent_36%),linear-gradient(135deg,rgba(40,25,29,1),rgba(10,8,10,1)_52%,rgba(54,43,34,0.9))]" />

        <div className="camera-visual absolute left-[-28vw] top-[25vh] z-10 h-[48vh] w-[118vw] overflow-hidden border border-white/10 bg-[#130d10] sm:left-[-8vw] sm:top-[14vh] sm:h-[72vh] sm:w-[72vw] lg:left-[-4vw]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(119,74,70,0.42),rgba(19,13,16,0.9)_42%,rgba(156,124,93,0.25))]" />
          <div className="absolute inset-y-0 left-[24%] w-px bg-white/12" />
          <div className="absolute inset-y-0 left-[56%] w-px bg-white/10" />
          <div className="absolute inset-x-[10%] top-[26%] h-px bg-white/14" />
          <div className="absolute inset-x-[22%] bottom-[21%] h-px bg-white/12" />
          <div className="absolute left-[11%] top-[15%] h-[42%] w-[28%] border border-white/10 bg-black/16" />
          <div className="absolute bottom-[14%] left-[38%] h-[34%] w-[22%] border border-white/10 bg-white/[0.035]" />
          <div className="absolute right-[9%] top-[11%] h-[68%] w-[18%] border border-white/10 bg-black/14" />
          <div className="absolute bottom-7 left-[11%] right-[10%] flex justify-between font-mono text-[0.56rem] uppercase tracking-[0.28em] text-white/36 sm:text-[0.62rem]">
            <span>Product Rhythm</span>
            <span>Visual System</span>
          </div>
        </div>
      </div>

      <p className="camera-copy absolute left-5 top-[9vh] z-30 font-mono text-xs uppercase tracking-[0.34em] text-rose-100/34 sm:left-10 lg:left-16">
        Chapter 03 / Editorial Interface
      </p>

      <div className="camera-copy absolute right-5 top-[16vh] z-30 max-w-[min(50rem,calc(100vw-2.5rem))] text-right sm:right-12 sm:top-[13vh] lg:right-20">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-rose-100/40">
          Visual Systems • Product Mood
        </p>
        <h2 className="mt-7 flex flex-col items-end font-display text-[clamp(4.3rem,12vw,12rem)] font-semibold leading-[0.8] tracking-normal text-white drop-shadow-[0_24px_60px_rgba(0,0,0,0.72)]">
          <span className="block whitespace-nowrap">BRL</span>
          <span className="block whitespace-nowrap">Fashion</span>
        </h2>
      </div>

      <div className="camera-copy absolute bottom-[10vh] right-5 z-30 max-w-[calc(100vw-2.5rem)] text-right sm:right-12 sm:max-w-md lg:right-20">
        <p className="text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Editorial storefront composition shaped around rhythm, hierarchy, and
          product mood.
        </p>

        <div className="mt-7 flex flex-wrap justify-end gap-x-5 gap-y-3 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-white/40">
          <span>Interface Direction</span>
          <span>Cinematic UI</span>
        </div>
      </div>
    </PanelShell>
  );
}

// ===============================
// CLOSING
// ===============================

function ClosingPanel() {
  return (
    <PanelShell className="bg-[#050409]">
      <div className="camera-scene absolute inset-0 origin-center">
        <div className="camera-visual absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(100,82,141,0.18),transparent_34%),linear-gradient(135deg,rgba(5,4,9,1),rgba(9,8,17,1)_54%,rgba(7,9,12,1))]" />
      </div>

      <div className="camera-copy relative z-10 mx-auto grid h-full w-full max-w-7xl items-center gap-10 px-5 sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:px-16">
        <h2 className="font-display text-[clamp(4.6rem,12vw,11rem)] font-semibold leading-[0.86] tracking-normal text-white">
          Build quietly.
          <br />
          Ship clearly.
        </h2>

        <div className="border-l border-white/12 pl-6">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-white/38">
            Available For Internship
          </p>

          <p className="max-w-md text-lg leading-7 text-slate-300 sm:text-xl sm:leading-8">
            I am looking for work where backend logic, product sense, and
            interface craft meet in real shipped systems.
          </p>

          <div className="mt-9 flex gap-7 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/70">
            <a
              href="https://github.com/sxaksaa"
              target="_blank"
              rel="noreferrer"
              className="border-b border-white/40 pb-2"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@aksaa.dev"
              className="border-b border-white/40 pb-2"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

export function CinematicScrollExperience() {
  const rootRef = useRef<HTMLElement>(null);
  useCinematicScroll(rootRef);

  return (
    <main
      ref={rootRef}
      className="experience invisible opacity-0 relative min-h-screen overflow-x-clip bg-[#050505] text-white"
    >
      <div className="world-gradient fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,#1b1027,transparent_40%),radial-gradient(circle_at_bottom,#0b1520,transparent_40%),#050505]" />
      <section className="panel-scroll relative z-10 h-[820vh]">
        <div className="panel-stage sticky top-0 h-screen overflow-clip bg-[#050505]">
          <IntroPanel />
          <AksaPanel />
          <SiemolaPanel />
          <FashionPanel />
          <ClosingPanel />
        </div>
      </section>
    </main>
  );
}
