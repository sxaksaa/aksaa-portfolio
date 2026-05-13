"use client";

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
          zIndex: panels.length - index,
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          transformOrigin: "center center",
          willChange: "transform, opacity",
          force3D: true,
          backfaceVisibility: "hidden",
        });
      });

      // ==========================================
      // TAMBAHAN: INTRO ANIMATION (READY FOR INTERNSHIP)
      // ==========================================
      const introTl = gsap.timeline();
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

// ===============================
// INTRO PANEL
// ===============================

function IntroPanel() {
  return (
    <PanelShell className="bg-[#050409]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(116,65,151,0.25),transparent_34%),linear-gradient(135deg,rgba(5,4,9,1),rgba(13,10,17,0.98)_52%,rgba(4,6,8,1))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:100%_18vh] opacity-40" />

      <div className="intro-words-container absolute inset-0 z-20 grid place-items-center overflow-hidden px-5 text-center">
        <h1 className="relative h-[clamp(3.5rem,8vw,6rem)] w-full max-w-[min(88vw,64rem)] overflow-hidden text-[clamp(3rem,8vw,6rem)] font-semibold uppercase leading-none tracking-normal text-white">
          <span className="intro-word absolute inset-0 flex items-center justify-center text-center opacity-0">
            Ready
          </span>
          <span className="intro-word absolute inset-0 flex items-center justify-center text-center opacity-0">
            For
          </span>
          <span className="intro-word absolute inset-0 flex items-center justify-center text-center opacity-0">
            Internship
          </span>
        </h1>
      </div>

      <div className="intro-content-group relative z-10 grid h-full place-items-center px-5 text-center">
        <div className="w-full max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-white/40">
            Backend Developer • System Builder
          </p>

          <h1 className="mt-7 text-[clamp(7rem,23vw,20rem)] font-semibold uppercase leading-[0.72] tracking-normal text-white">
            Aksaa
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-2xl leading-9 text-slate-300">
            Building cinematic digital systems with quiet precision.
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

      <p className="absolute right-5 top-[11vh] z-10 font-mono text-xs uppercase tracking-[0.34em] text-violet-100/34 sm:right-10 lg:right-16">
        Featured Commerce System
      </p>

      <div className="absolute left-5 top-[11vh] z-10 max-w-md sm:left-10 lg:left-16">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-violet-100/42">
          Laravel • Payment Automation
        </p>

        <p className="mt-5 text-xl leading-8 text-slate-300">
          Automated digital commerce system with QRIS, crypto payments, and
          operational workflows.
        </p>
      </div>

      <div className="absolute left-1/2 top-[24vh] z-10 w-[84vw] max-w-6xl -translate-x-1/2">
        <div className="relative h-[48vh] overflow-hidden rounded-t-xl border border-white/14 bg-[#110817] shadow-[0_30px_80px_rgba(0,0,0,0.34)]">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(78,36,104,0.48),rgba(12,8,17,0.98)_55%,rgba(117,86,101,0.28))]" />
          <div className="absolute left-[8%] top-[18%] h-px w-[52%] bg-white/18" />
          <div className="absolute left-[8%] top-[30%] h-px w-[34%] bg-white/10" />
          <div className="absolute bottom-[18%] left-[8%] h-12 w-[22%] border border-white/14 bg-white/[0.045]" />
          <div className="absolute bottom-[18%] right-[8%] h-[46%] w-[32%] border border-white/12 bg-black/18" />

          <div className="absolute bottom-7 left-8 right-8 flex justify-between font-mono text-[0.62rem] uppercase tracking-[0.3em] text-white/34">
            <span>Automated Store</span>
            <span>Laravel Backend</span>
          </div>
        </div>
      </div>

      <h2 className="absolute bottom-[6vh] left-5 z-10 max-w-[14ch] text-[clamp(5.2rem,15vw,14rem)] font-semibold uppercase leading-[0.74] tracking-normal text-white sm:left-10 lg:left-16">
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

      <p className="absolute right-5 top-[11vh] z-10 font-mono text-xs uppercase tracking-[0.34em] text-blue-100/34 sm:right-10 lg:right-16">
        Operational Architecture
      </p>

      <h2 className="absolute left-5 top-[10vh] z-10 text-[clamp(5rem,17vw,15rem)] font-semibold uppercase leading-[0.72] tracking-normal text-white sm:left-10 lg:left-16">
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
          Industrial Operational Systems
        </p>

        <p className="mt-5 text-xl leading-8 text-slate-300">
          Backend workflows, database structures, and operational systems moving
          in real space.
        </p>
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
        Editorial Interface
      </p>

      <div className="absolute bottom-[8vh] left-5 top-[8vh] z-10 w-[42vw] min-w-[18rem] overflow-hidden border border-white/10 sm:left-10 lg:left-16">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(111,73,70,0.42),rgba(14,10,12,0.98)_60%,rgba(139,112,88,0.24))]" />
        <div className="absolute inset-x-8 top-[24%] h-px bg-white/14" />
        <div className="absolute bottom-8 left-8 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
          cinematic interface
        </div>
      </div>

      <div className="absolute right-5 top-[13vh] z-10 max-w-[46rem] text-right sm:right-10 lg:right-16">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-rose-100/40">
          Motion • Visual Composition
        </p>
        <h2 className="mt-7 text-[clamp(4.8rem,13vw,12rem)] font-semibold uppercase leading-[0.74] tracking-normal text-white">
          BRL Fashion
        </h2>
      </div>

      <p className="absolute bottom-[12vh] right-5 z-10 max-w-md text-right text-xl leading-8 text-slate-300 sm:right-10 lg:right-16">
        Interface systems reduced into cinematic clarity.
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

      <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
        <h2 className="text-[clamp(5rem,14vw,13rem)] font-semibold uppercase leading-[0.74] tracking-normal text-white">
          Quiet systems.
          <br />
          Clear direction.
        </h2>

        <div className="border-l border-white/12 pl-6">
          <p className="max-w-md text-xl leading-8 text-slate-300">
            Currently exploring cinematic web systems, backend architecture, and
            interactive digital experiences.
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
