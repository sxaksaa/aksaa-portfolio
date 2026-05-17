"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const panels = ["intro", "aksa", "siemola", "fashion", "closing"] as const;
type PanelName = (typeof panels)[number];

const transitionAt = {
  aksa: 0.12,
  siemola: 10.46,
  fashion: 12.22,
  closing: 13.94,
} as const;

const aksaSequenceAt = 1.52;

const aksaShowcaseFrames = [
  {
    src: "/projects/aksa-xiterz/Dashboard.png",
    label: "01 / Platform",
    title: "Premium tools and instant licenses.",
    body: "The homepage sets the promise first: trusted digital tools, license access, setup support, and a clear product path.",
    meta: "Hero, trust numbers, product search",
  },
  {
    src: "/projects/aksa-xiterz/list%20product.png",
    label: "02 / Storefront",
    title: "Products stay easy to scan.",
    body: "Cards keep platform, stock status, pricing, and auto-delivery availability visible before a buyer enters checkout.",
    meta: "Catalog, pricing, stock signal",
  },
  {
    src: "/projects/aksa-xiterz/Contoh%20Qris%20Payment.png",
    label: "03 / QRIS",
    title: "QRIS stays inside the flow.",
    body: "The invoice opens as a native payment state with order ID, fee, total, expiry, and a direct check-payment action.",
    meta: "QR invoice, exact total, expiry",
  },
  {
    src: "/projects/aksa-xiterz/Contoh%20Crypto%20Payment.png",
    label: "04 / Crypto",
    title: "USDT checkout is explicit.",
    body: "Network, amount, address, token contract, and warning copy are shown together so customers know what must match.",
    meta: "BSC RPC, exact amount, copy actions",
  },
  {
    src: "/projects/aksa-xiterz/license%20section.png",
    label: "05 / Licenses",
    title: "Delivery lands in one place.",
    body: "Paid keys are grouped with purchase details, active state, copy action, and support shortcuts for setup help.",
    meta: "License key, support, delivery",
  },
  {
    src: "/projects/aksa-xiterz/order%20history.png",
    label: "06 / Orders",
    title: "Order history keeps state visible.",
    body: "Customers can track totals, paid orders, waiting payments, cancelled invoices, methods, prices, and timestamps.",
    meta: "History, status, payment method",
  },
  {
    src: "/projects/aksa-xiterz/Guides%20Blog.png",
    label: "07 / Guides",
    title: "Guides reduce setup friction.",
    body: "A public knowledge base gives step-by-step Windows fixes before support has to answer the same setup questions.",
    meta: "Knowledge base, setup fixes",
  },
  {
    src: "/projects/aksa-xiterz/Download%20Section.png",
    label: "08 / Downloads",
    title: "Files are collected neatly.",
    body: "The downloads page keeps public tools and required files organized by product so buyers can continue after purchase.",
    meta: "Tools, folders, companion files",
  },
] as const;

const connectedPanelMotion = {
  incomingFrom: {
    yPercent: 7,
    scale: 1.012,
    clipPath: "inset(0% 0% 0% 0%)",
  },
  incomingTo: {
    yPercent: 0,
    scale: 1,
    duration: 1.62,
    ease: "none",
    immediateRender: false,
  },
  incomingFadeTo: {
    autoAlpha: 1,
    duration: 0.82,
    ease: "none",
  },
  outgoingTo: {
    scale: 0.988,
    yPercent: -0.8,
    duration: 1.62,
    ease: "none",
  },
  outgoingFadeTo: {
    autoAlpha: 0,
    duration: 0.96,
    ease: "none",
  },
} as const;

const panelTransitions = [
  {
    incoming: "aksa",
    at: transitionAt.aksa,
    ...connectedPanelMotion,
  },
  {
    incoming: "siemola",
    at: transitionAt.siemola,
    ...connectedPanelMotion,
  },
  {
    incoming: "fashion",
    at: transitionAt.fashion,
    ...connectedPanelMotion,
  },
  {
    incoming: "closing",
    at: transitionAt.closing,
    ...connectedPanelMotion,
  },
] as const;

function useCinematicScroll(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
    });

    window.scrollTo(0, 0);

    const unlockIntroScroll = (shouldRefresh = true) => {
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
          yPercent: index === 0 ? 0 : connectedPanelMotion.incomingFrom.yPercent,
          zIndex: index + 1,
          autoAlpha: index === 0 ? 1 : 0,
          scale: index === 0 ? 1 : connectedPanelMotion.incomingFrom.scale,
          clipPath: "inset(0% 0% 0% 0%)",
          transformOrigin: "center center",
          willChange: "transform",
          force3D: true,
          backfaceVisibility: "hidden",
        });
      });

      // ==========================================
      // INTRO ANIMATION (Peningkatan: Lebih Cepat)
      // ==========================================
      const introTl = gsap.timeline({
        onComplete: () => unlockIntroScroll(),
      });
      introTl.set(".intro-content-group", {
        autoAlpha: 0,
        y: 20,
        scale: 0.99,
      });
      introTl.set(".intro-words-container", { autoAlpha: 1 });

      introTl.to(root, { autoAlpha: 1, duration: 0.2, ease: "power1.in" });

      const words = gsap.utils.toArray(".intro-word");

      words.forEach((word) => {
        const el = word as HTMLElement;

        introTl
          .fromTo(
            el,
            { yPercent: 38, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
          )
          .to(
            el,
            {
              yPercent: -38,
              autoAlpha: 0,
              duration: 0.55,
              ease: "power3.in",
            },
            "+=0.25",
          );
      });

      introTl.to(
        ".intro-words-container",
        {
          autoAlpha: 0,
          y: -8,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.1",
      );

      // Reveal main hero
      introTl.to(
        ".intro-content-group",
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
        },
        "-=0.08",
      );

      const film = gsap.timeline({
        scrollTrigger: {
          trigger: ".panel-scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
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
        const duration = 2.15;

        const targets = [scene, visual, ...copy].filter(
          Boolean,
        ) as HTMLElement[];
        if (targets.length) {
          gsap.set(targets, {
            willChange: "transform",
            force3D: true,
            backfaceVisibility: "hidden",
          });
        }

        if (direction === "enter") {
          if (scene) {
            film.fromTo(
              scene,
              { scale: 1.03 },
              { scale: 1, duration, ease: "none" },
              at,
            );
          }

          if (visual) {
            film.fromTo(
              visual,
              { scale: 1.018 },
              { scale: 1, duration, ease: "none" },
              at,
            );
          }

          if (copy.length) {
            film.fromTo(
              copy,
              { y: 4 },
              { y: 0, duration: 1.65, ease: "none" },
              at + 0.16,
            );
          }

          return;
        }

        if (scene) {
          film.to(scene, { scale: 1.026, duration, ease: "none" }, at);
        }

        if (visual) {
          film.to(visual, { scale: 1.018, duration, ease: "none" }, at);
        }

        if (copy.length) {
          film.to(copy, { y: -4, duration: 1.65, ease: "none" }, at);
        }
      };

      const aksaPanel = panelByName.get("aksa");
      if (aksaPanel) {
        const verticalTrack =
          aksaPanel.querySelector<HTMLElement>(".aksa-vertical-track");
        const aurora = aksaPanel.querySelector<HTMLElement>(".aksa-aurora");
        const steps = gsap.utils.toArray<HTMLElement>(
          aksaPanel.querySelectorAll<HTMLElement>(".aksa-showcase-step"),
        );

        if (verticalTrack && steps.length > 1) {
          const aksaSequence = gsap.timeline();
          const stepDuration = 1.24;
          const sequenceDuration = stepDuration * (steps.length - 1);
          const aksaDepthTargets = [verticalTrack, aurora].filter(
            Boolean,
          ) as HTMLElement[];

          gsap.set(aksaDepthTargets, {
            willChange: "transform",
            force3D: true,
            backfaceVisibility: "hidden",
          });
          gsap.set(steps, { autoAlpha: 0, willChange: "opacity" });
          gsap.set(steps[0], { autoAlpha: 1 });

          aksaSequence.to(
            verticalTrack,
            {
              y: `-${(steps.length - 1) * 100}vh`,
              duration: sequenceDuration,
              ease: "none",
            },
            0,
          );

          if (aurora) {
            aksaSequence.to(
              aurora,
              {
                yPercent: 2,
                scale: 1.012,
                duration: sequenceDuration,
                ease: "none",
              },
              0,
            );
          }

          steps.slice(0, -1).forEach((step, index) => {
            const nextStep = steps[index + 1];
            const nextStepCenterAt = (index + 1) * stepDuration;
            const fadeDuration = 0.48;
            const crossfadeAt = nextStepCenterAt - fadeDuration;

            aksaSequence
              .to(
                step,
                {
                  autoAlpha: 0,
                  duration: fadeDuration,
                  ease: "none",
                },
                crossfadeAt,
              )
              .fromTo(
                nextStep,
                { autoAlpha: 0 },
                {
                  autoAlpha: 1,
                  duration: fadeDuration,
                  ease: "none",
                  immediateRender: false,
                },
                crossfadeAt,
              );
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
          .to(incomingPanel, { ...transition.incomingFadeTo }, transition.at)
          .to(
            outgoingPanel,
            { ...transition.outgoingTo },
            transition.at + 0.16,
          )
          .to(
            outgoingPanel,
            { ...transition.outgoingFadeTo },
            transition.at + 0.24,
          );

        addCameraDepth(incomingPanel, transition.at, "enter");
        addCameraDepth(outgoingPanel, transition.at + 0.16, "exit");
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

function AksaShowcaseStep({
  frame,
  index,
}: {
  frame: (typeof aksaShowcaseFrames)[number];
  index: number;
}) {
  return (
    <section className="aksa-showcase-step relative h-screen min-h-[44rem] overflow-hidden px-5 sm:px-8 lg:px-[5vw]">
      
      {/* SISI KIRI: VISUAL STAGE (Layout Arsitektural & Garis Tipis ala Editorial) */}
      <div className="aksa-visual-composition relative z-10 w-full h-[60vh] lg:h-[70vh] border border-white/10 bg-black/10 overflow-hidden hidden sm:block">
        {/* Garis Pembagi Internal */}
        <div className="absolute inset-y-0 left-[30%] w-px bg-white/10" />
        <div className="absolute inset-y-0 left-[70%] w-px bg-white/5" />
        <div className="absolute inset-x-0 top-[25%] h-px bg-white/10" />
        <div className="absolute inset-x-0 bottom-[20%] h-px bg-white/10" />
        
        {/* Konten Metadata Tekstual Pojok */}
        <div className="absolute bottom-4 left-6 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-white/30">
          SYSTEM ENVIRONMENT // INTERACTION
        </div>
        <div className="absolute top-4 right-6 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-violet-100/30">
          {frame.meta}
        </div>

        {/* Latar Belakang Mini Wall-Tiles */}
        <div className="absolute left-[6%] top-[35%] opacity-25 scale-90 pointer-events-none hidden lg:block">
          <AksaScreenWall activeIndex={index} />
        </div>

        {/* Stage Utama: iPhone Frame Centered Asymmetrically */}
        <div className="aksa-phone-stage absolute left-[45%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 h-[85%] aspect-[1290/2796]">
          <span className="pointer-events-none absolute -inset-[15%] bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent_60%)] blur-2xl" />
          
          <figure className="relative w-full h-full overflow-hidden rounded-[1rem] border border-white/15 bg-[#0a0712] shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
            <Image
              src={frame.src}
              alt={`Aksa Xiterz ${frame.title}`}
              fill
              unoptimized
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-contain p-1"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </figure>
        </div>
      </div>

      {/* SISI KANAN: EDITORIAL COPY (Konsisten Rata Kanan Mengikuti Pola BRL Fashion) */}
      <div className="aksa-step-copy relative z-20 text-left lg:text-right">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-violet-100/40">
          {frame.label}
        </p>

        <h2 className="aksa-editorial-title mt-6 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.9] tracking-normal text-white">
          Aksa Xiterz
        </h2>

        <h3 className="aksa-editorial-subtitle mt-4 font-display text-lg font-medium leading-[1.3] text-violet-200/90">
          {frame.title}
        </h3>

        <p className="mt-5 text-sm leading-6 text-slate-400 font-light">
          {frame.body}
        </p>

        <div className="mt-8 flex flex-wrap justify-start gap-x-4 gap-y-2 border-t border-white/10 pt-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40 lg:justify-end">
          <span>{frame.meta.split(', ')[0]}</span>
          <span>•</span>
          <span>{frame.meta.split(', ')[1] || 'Secure Delivery'}</span>
        </div>
      </div>

    </section>
  );
}

function AksaScreenWall({ activeIndex }: { activeIndex: number }) {
  return (
    <div
      aria-hidden="true"
      className="aksa-screen-wall pointer-events-none grid grid-cols-2 gap-3"
    >
      {aksaShowcaseFrames.slice(0, 4).map((screen, screenIndex) => (
        <div
          key={screen.src}
          className={`aksa-screen-tile relative w-16 aspect-[1290/2796] overflow-hidden rounded-[0.3rem] border transition-all duration-500 ${
            screenIndex === activeIndex % 4
              ? "border-violet-500/40 bg-violet-950/20 opacity-100 scale-105"
              : "border-white/5 bg-black/40 opacity-40"
          }`}
        >
          <Image
            src={screen.src}
            alt=""
            fill
            unoptimized
            sizes="4vw"
            className="object-contain opacity-60"
            loading="lazy"
          />
        </div>
      ))}
    </div>
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
            Computer Science Student • Full-Stack Web • Open For Internship
          </p>

          <h1 className="mt-7 font-display text-[clamp(6.5rem,22vw,18rem)] font-semibold leading-[0.82] tracking-normal text-white">
            Aksaa
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-slate-300 sm:mt-8 sm:text-2xl sm:leading-9">
            I build web systems where backend rules, payment flows, and
            polished interfaces work as one product.
          </p>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/48 sm:text-base sm:leading-7">
            This portfolio follows the projects that shaped my full-stack
            direction: digital checkout, smart-locker operations, ecommerce
            workflows, and cinematic frontend craft.
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(147,51,234,0.32),transparent_34%),radial-gradient(circle_at_22%_18%,rgba(236,72,153,0.13),transparent_30%),linear-gradient(135deg,rgba(19,8,35,1),rgba(5,4,10,1)_58%,rgba(29,14,40,0.96))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,3,8,0.9)_0%,rgba(8,5,13,0.64)_44%,rgba(6,4,10,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:100%_18vh] opacity-35" />
        <div className="aksa-aurora absolute -left-[18vw] top-[6vh] h-[78vh] w-[70vw] rounded-full bg-violet-500/14 blur-3xl" />
        <div className="absolute -right-[10vw] bottom-[-12vh] h-[56vh] w-[48vw] rounded-full bg-fuchsia-500/8 blur-3xl" />
        <div className="absolute inset-y-[12vh] right-[7vw] w-px bg-[linear-gradient(180deg,transparent,rgba(221,214,254,0.22),transparent)] opacity-60" />

        <div className="camera-visual aksa-showcase-window absolute inset-0 z-10 overflow-hidden">
          <div className="aksa-vertical-track absolute inset-x-0 top-0">
            {aksaShowcaseFrames.map((frame, index) => (
              <AksaShowcaseStep
                key={frame.src}
                frame={frame}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="camera-copy absolute right-5 top-[8vh] z-30 hidden font-mono text-xs uppercase tracking-[0.34em] text-violet-100/36 sm:block sm:right-10 lg:right-16">
        Chapter 01 / Aksa Xiterz
      </p>
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
          A smart-locker system where RFID taps, switch signals, role access,
          and borrowing history are normalized into reliable Laravel records.
        </p>

        <div className="mt-7 flex flex-wrap justify-end gap-x-5 gap-y-3 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-white/40">
          <span>Laravel API</span>
          <span>RFID Flow</span>
          <span>Locker States</span>
          <span>Role Access</span>
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
          A fashion storefront shaped around catalog clarity, admin workflows,
          product-size logic, and a stronger public presentation for portfolio
          review.
        </p>

        <div className="mt-7 flex flex-wrap justify-end gap-x-5 gap-y-3 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-white/40">
          <span>Ecommerce UI</span>
          <span>Admin Flow</span>
          <span>Product Catalog</span>
          <span>Portfolio Polish</span>
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
            Available For Full-Stack Internship
          </p>

          <p className="max-w-md text-lg leading-7 text-slate-300 sm:text-xl sm:leading-8">
            I am looking for a place to grow by building useful web apps:
            Laravel backends, clean databases, payment logic, and interfaces
            that make real workflows easier to trust.
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
      <section className="panel-scroll relative z-10 h-[1180vh]">
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
