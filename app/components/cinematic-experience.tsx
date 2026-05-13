"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const panels = ["intro", "aksa", "siemola", "fashion", "closing"] as const;
type PanelName = (typeof panels)[number];

const panelTransitions = [
  {
    incoming: "aksa",
    at: 1,
    incomingFrom: { yPercent: 100, scale: 1, clipPath: "inset(0% 0% 0% 0%)" },
    incomingTo: { yPercent: 0, scale: 1, duration: 1.5, ease: "none" },
    outgoingTo: {
      scale: 0.985,
      yPercent: -2,
      duration: 1.5,
      ease: "none",
    },
    goingAt: 1,
  },
  {
    incoming: "siemola",
    at: 2.5,
    incomingFrom: { yPercent: 100, scale: 1, clipPath: "inset(0% 0% 0% 0%)" },
    incomingTo: { yPercent: 0, scale: 1, duration: 1.5, ease: "none" },
    outgoingTo: {
      scale: 0.985,
      yPercent: -2,
      duration: 1.5,
      ease: "none",
    },
    outgoingAt: 2.5,
  },
  {
    incoming: "fashion",
    at: 4,
    incomingFrom: { yPercent: 100, scale: 1, clipPath: "inset(0% 0% 0% 0%)" },
    incomingTo: { yPercent: 0, scale: 1, duration: 1.5, ease: "none" },
    outgoingTo: {
      scale: 0.985,
      yPercent: -2,
      duration: 1.5,
      ease: "none",
    },
    outgoingAt: 4,
  },
  {
    incoming: "closing",
    at: 5.5,
    incomingFrom: { yPercent: 100, scale: 1, clipPath: "inset(0% 0% 0% 0%)" },
    incomingTo: { yPercent: 0, scale: 1, duration: 1.5, ease: "none" },
    outgoingTo: {
      scale: 0.985,
      yPercent: -2,
      duration: 1.5,
      ease: "none",
    },
    ingAt: 5.5,
  },
];

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
          clipPath: "inset(0% 0% 0% 0%)",
          transformOrigin: "center center",
          willChange: "transform, opacity",
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
          scrub: 1.5,
        },
      });

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

function AksaScreenshot({
  src,
  alt,
  label,
  className,
}: {
  src: string;
  alt: string;
  label: string;
  className: string;
}) {
  return (
    <figure
      className={`absolute aspect-[1290/2796] overflow-hidden rounded-lg border border-white/14 bg-[#0b0811] shadow-[0_32px_90px_rgba(0,0,0,0.45)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 42vw, (max-width: 1024px) 24vw, 18vw"
        quality={76}
        className="object-cover object-top"
      />
      <figcaption className="absolute bottom-3 left-3 right-3 hidden items-center justify-between border-t border-white/10 bg-black/55 px-3 py-2 font-mono text-[0.52rem] uppercase tracking-[0.22em] text-white/54 sm:flex">
        <span>{label}</span>
        <span>Aksa Xiterz</span>
      </figcaption>
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(133,77,160,0.26),transparent_34%),linear-gradient(135deg,rgba(22,8,37,1),rgba(7,5,11,1)_54%,rgba(42,22,48,0.9))]" />

      <p className="absolute right-5 top-[11vh] z-20 hidden font-mono text-xs uppercase tracking-[0.34em] text-violet-100/34 sm:block sm:right-10 lg:right-16">
        Chapter 01 / Commercial System
      </p>

      <div className="absolute left-5 top-[11vh] z-20 max-w-[calc(100vw-2.5rem)] sm:left-10 sm:max-w-md lg:left-16">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-violet-100/42">
          Aksa Xiterz • Payment Automation
        </p>

        <p className="mt-5 text-lg leading-7 text-slate-300 sm:text-xl sm:leading-8">
          A digital commerce system shaped around exact payments, QRIS
          checkout, crypto flow, and calmer post-purchase operations.
        </p>

        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-white/42">
          <span>QRIS</span>
          <span>Crypto Flow</span>
          <span>Digital Delivery</span>
          <span>Ops Logic</span>
        </div>
      </div>

      <div className="absolute left-1/2 top-[39vh] z-10 h-[30vh] w-[116vw] -translate-x-1/2 sm:left-auto sm:right-[-12vw] sm:top-[21vh] sm:h-[63vh] sm:w-[78vw] sm:max-w-[68rem] sm:translate-x-0 lg:right-[2vw] lg:w-[63vw]">
        <div className="absolute inset-x-[18%] bottom-[6%] top-[2%] bg-violet-500/18 blur-3xl" />

        <AksaScreenshot
          src="/projects/aksa-xiterz/orders-mobile.png"
          alt="Aksa Xiterz mobile order history screen"
          label="Order Flow"
          className="left-[5%] top-[12%] h-[24vh] rotate-[-9deg] opacity-65 sm:left-[6%] sm:top-[12%] sm:h-[50vh] sm:opacity-70"
        />

        <AksaScreenshot
          src="/projects/aksa-xiterz/qris-mobile.png"
          alt="Aksa Xiterz QRIS payment invoice screen"
          label="QRIS Invoice"
          className="left-[36%] top-0 h-[31vh] -translate-x-1/2 rotate-[2deg] sm:left-[31%] sm:h-[62vh] sm:translate-x-0"
        />

        <AksaScreenshot
          src="/projects/aksa-xiterz/crypto-address-mobile.png"
          alt="Aksa Xiterz USDT crypto payment address screen"
          label="Crypto Payment"
          className="right-[13%] top-[8%] h-[27vh] rotate-[8deg] opacity-85 sm:right-[9%] sm:top-[8%] sm:h-[54vh]"
        />

        <AksaScreenshot
          src="/projects/aksa-xiterz/licenses-mobile.png"
          alt="Aksa Xiterz license delivery and copy screen"
          label="License Delivery"
          className="hidden sm:block sm:bottom-[3%] sm:left-[55%] sm:h-[36vh] sm:rotate-[-4deg] sm:opacity-90"
        />

        <div className="absolute bottom-1 left-[12%] right-[12%] flex justify-between font-mono text-[0.56rem] uppercase tracking-[0.26em] text-white/34 sm:bottom-0 sm:left-[16%] sm:right-[12%] sm:text-[0.62rem] sm:tracking-[0.3em]">
          <span>Checkout Engine</span>
          <span>Laravel Operations</span>
        </div>
      </div>

      <h2 className="absolute bottom-[6vh] left-5 z-20 max-w-[min(42rem,calc(100vw-2.5rem))] font-display text-[clamp(4.8rem,13vw,12rem)] font-semibold leading-[0.84] tracking-normal text-white sm:left-10 lg:left-16">
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(64,104,134,0.25),transparent_34%),linear-gradient(135deg,rgba(7,17,26,1),rgba(4,8,13,1)_58%,rgba(17,30,42,0.92))]" />

      <p className="absolute right-5 top-[11vh] z-10 hidden font-mono text-xs uppercase tracking-[0.34em] text-blue-100/34 sm:block sm:right-10 lg:right-16">
        Chapter 02 / Structured Systems
      </p>

      <h2 className="absolute left-5 top-[10vh] z-10 font-display text-[clamp(4.8rem,14vw,12.5rem)] font-semibold leading-[0.86] tracking-normal text-white sm:left-10 lg:left-16">
        Siemola
      </h2>

      <div className="absolute bottom-[8vh] right-[12vw] top-[22vh] z-10 w-[30vw] min-w-[16rem] border-x border-white/14">
        <div className="absolute inset-x-[-18vw] top-[18%] h-px bg-white/12" />
        <div className="absolute inset-x-[-12vw] top-[52%] h-px bg-white/16" />
        <div className="absolute inset-x-[-8vw] bottom-[18%] h-px bg-white/10" />
        <div className="absolute bottom-6 right-0 font-mono text-[0.62rem] uppercase tracking-[0.34em] text-white/34">
          structured workflows
        </div>
      </div>

      <div className="absolute bottom-[12vh] left-5 z-10 max-w-lg sm:left-10 lg:left-16">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-blue-100/38">
          Backend Workflows • Process Logic
        </p>

        <p className="mt-5 text-lg leading-7 text-slate-300 sm:text-xl sm:leading-8">
          A locker workflow study in backend state, database truth, and process
          timing, turning hardware signals into accountable records.
        </p>

        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 font-mono text-[0.62rem] uppercase tracking-[0.26em] text-white/40">
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_66%,rgba(170,116,96,0.22),transparent_36%),linear-gradient(135deg,rgba(40,25,29,1),rgba(10,8,10,1)_52%,rgba(54,43,34,0.9))]" />

      <p className="absolute left-5 top-[11vh] z-10 font-mono text-xs uppercase tracking-[0.34em] text-rose-100/34 sm:left-10 lg:left-16">
        Chapter 03 / Editorial Interface
      </p>

      <div className="absolute bottom-[8vh] left-5 top-[8vh] z-10 w-[42vw] min-w-[18rem] overflow-hidden border border-white/10 sm:left-10 lg:left-16">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(111,73,70,0.42),rgba(14,10,12,0.98)_60%,rgba(139,112,88,0.24))]" />
        <div className="absolute inset-x-8 top-[24%] h-px bg-white/14" />
        <div className="absolute bottom-8 left-8 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
          cinematic interface
        </div>
      </div>

      <div className="absolute right-8 top-[12vh] z-10 max-w-[min(44rem,calc(100vw-4rem))] text-right sm:right-12 lg:right-20">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-rose-100/40">
          Visual Systems • Cinematic UI
        </p>
        <h2 className="mt-6 flex flex-col items-end font-display text-[clamp(4rem,10vw,9.5rem)] font-semibold leading-[0.86] tracking-normal text-white sm:mt-7">
          <span className="block whitespace-nowrap">BRL</span>
          <span className="block whitespace-nowrap">Fashion</span>
        </h2>
      </div>

      <p className="absolute bottom-[12vh] right-8 z-10 max-w-md text-right text-lg leading-7 text-slate-300 sm:right-12 sm:text-xl sm:leading-8 lg:right-20">
        An interface direction shaped around composition, rhythm, and product
        mood, reduced into cinematic clarity.
      </p>
    </PanelShell>
  );
}

// ===============================
// CLOSING
// ===============================

function ClosingPanel() {
  return (
    <PanelShell className="bg-[#050409]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(100,82,141,0.18),transparent_34%),linear-gradient(135deg,rgba(5,4,9,1),rgba(9,8,17,1)_54%,rgba(7,9,12,1))]" />

      <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl items-center gap-10 px-5 sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:px-16">
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
      <section className="panel-scroll relative z-10 h-[700vh]">
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
