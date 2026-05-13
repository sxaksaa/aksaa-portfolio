"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const panels = ["intro", "aksa", "siemola", "fashion", "closing"] as const;

function useCinematicScroll(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    if (reduceMotion) {
      gsap.set(root.querySelectorAll(".cinematic-panel"), {
        clearProps: "all",
        minHeight: "100vh",
        position: "relative",
        yPercent: 0,
      });
      gsap.set(root.querySelector(".panel-stage"), {
        clearProps: "all",
        minHeight: "auto",
        overflow: "visible",
        position: "relative",
      });
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      touchMultiplier: 1.02,
      wheelMultiplier: 0.78,
    });

    let frame = 0;
    let idleFrames = 0;

    const raf = (time: number) => {
      lenis.raf(time);

      if (lenis.isScrolling || idleFrames < 2) {
        idleFrames = lenis.isScrolling ? 0 : idleFrames + 1;
        frame = requestAnimationFrame(raf);
        return;
      }

      frame = 0;
    };

    const wake = () => {
      if (frame) {
        return;
      }

      idleFrames = 0;
      frame = requestAnimationFrame(raf);
    };

    const offVirtualScroll = lenis.on("virtual-scroll", wake);
    const offScroll = lenis.on("scroll", ScrollTrigger.update);

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("wheel", wake, { passive: true });
    window.addEventListener("touchmove", wake, { passive: true });
    document.addEventListener("click", wake);

    const ctx = gsap.context(() => {
      const panelElements = gsap.utils.toArray<HTMLElement>(".cinematic-panel");

      panelElements.forEach((panel, index) => {
        gsap.set(panel, {
          scale: 1,
          transformOrigin: "center top",
          yPercent: index === 0 ? 0 : 100,
          zIndex: index + 1,
        });
      });

      const film = gsap.timeline({
        scrollTrigger: {
          end: "bottom bottom",
          scrub: 1.1,
          start: "top top",
          trigger: ".panel-scroll",
        },
      });

      panelElements.slice(1).forEach((panel, index) => {
        const previousPanel = panelElements[index];
        const time = index * 1.25;

        film
          .to(
            panel,
            {
              duration: 1,
              ease: "none",
              yPercent: 0,
            },
            time,
          )
          .to(
            previousPanel,
            {
              duration: 0.78,
              ease: "none",
              yPercent: -18,
            },
            time + 0.22,
          );
      });

      film.to({}, { duration: 0.55 });

      gsap.to(".world-gradient", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          end: "bottom bottom",
          scrub: 1.8,
          start: "top top",
          trigger: ".panel-scroll",
        },
      });

      ScrollTrigger.refresh();
      wake();
    }, root);

    return () => {
      ctx.revert();
      cancelAnimationFrame(frame);
      offVirtualScroll();
      offScroll();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("wheel", wake);
      window.removeEventListener("touchmove", wake);
      document.removeEventListener("click", wake);
      lenis.destroy();
    };
  }, [rootRef]);
}

function PanelShell({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className: string;
  index: number;
}) {
  return (
    <article
      className={`cinematic-panel absolute inset-0 overflow-hidden px-5 py-8 sm:px-8 md:py-10 lg:px-12 ${className}`}
      style={{ zIndex: index + 1 }}
    >
      {children}
    </article>
  );
}

function IntroPanel() {
  return (
    <PanelShell className="bg-[#050409]" index={0}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(116,65,151,0.25),transparent_34%),linear-gradient(135deg,rgba(5,4,9,1),rgba(13,10,17,0.98)_52%,rgba(4,6,8,1))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:100%_18vh] opacity-40" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-white/40">
            Backend Web Developer
          </p>
          <h1 className="mt-7 text-[clamp(7rem,23vw,20rem)] font-semibold uppercase leading-[0.72] tracking-normal text-white">
            Aksaa
          </h1>
          <p className="mt-8 max-w-xl text-2xl leading-9 text-slate-300">
            Backend systems, quietly composed.
          </p>
        </div>
      </div>
    </PanelShell>
  );
}

function AksaPanel() {
  return (
    <PanelShell className="bg-[#12081a]" index={1}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(133,77,160,0.26),transparent_34%),linear-gradient(135deg,rgba(22,8,37,1),rgba(7,5,11,1)_54%,rgba(42,22,48,0.9))]" />

      <p className="absolute right-5 top-[11vh] z-10 font-mono text-xs uppercase tracking-[0.34em] text-violet-100/34 sm:right-8 lg:right-12">
        01 / Commerce
      </p>
      <div className="absolute left-5 top-[11vh] z-10 max-w-sm sm:left-8 lg:left-12">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-violet-100/42">
          Luxury digital commerce
        </p>
        <p className="mt-5 text-xl leading-8 text-slate-300">
          A digital commerce experience designed with restraint.
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
            <span>premium checkout</span>
            <span>01</span>
          </div>
        </div>
        <div className="mx-auto h-4 w-[74%] rounded-b-2xl border-x border-b border-white/12 bg-white/[0.045]" />
      </div>

      <h2 className="absolute bottom-[6vh] left-5 z-10 max-w-[14ch] text-[clamp(5.2rem,15vw,14rem)] font-semibold uppercase leading-[0.74] tracking-normal text-white sm:left-8 lg:left-12">
        Aksa Xiterz
      </h2>
    </PanelShell>
  );
}

function SiemolaPanel() {
  return (
    <PanelShell className="bg-[#061019]" index={2}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(64,104,134,0.25),transparent_34%),linear-gradient(135deg,rgba(7,17,26,1),rgba(4,8,13,1)_58%,rgba(17,30,42,0.92))]" />

      <p className="absolute right-5 top-[11vh] z-10 font-mono text-xs uppercase tracking-[0.34em] text-blue-100/34 sm:right-8 lg:right-12">
        02 / Operations
      </p>
      <h2 className="absolute left-5 top-[10vh] z-10 text-[clamp(5rem,17vw,15rem)] font-semibold uppercase leading-[0.72] tracking-normal text-white sm:left-8 lg:left-12">
        Siemola
      </h2>
      <div className="absolute bottom-[8vh] right-[12vw] top-[22vh] z-10 w-[30vw] min-w-[16rem] border-x border-white/14">
        <div className="absolute inset-x-[-18vw] top-[18%] h-px bg-white/12" />
        <div className="absolute inset-x-[-12vw] top-[52%] h-px bg-white/16" />
        <div className="absolute inset-x-[-8vw] bottom-[18%] h-px bg-white/10" />
        <div className="absolute bottom-6 right-0 font-mono text-[0.62rem] uppercase tracking-[0.34em] text-white/34">
          operational interval
        </div>
      </div>
      <div className="absolute bottom-[12vh] left-5 z-10 max-w-md sm:left-8 lg:left-12">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-blue-100/38">
          Industrial operational systems
        </p>
        <p className="mt-5 text-xl leading-8 text-slate-300">Systems moving in real space.</p>
      </div>
    </PanelShell>
  );
}

function FashionPanel() {
  return (
    <PanelShell className="bg-[#1b1114]" index={3}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_66%,rgba(170,116,96,0.22),transparent_36%),linear-gradient(135deg,rgba(40,25,29,1),rgba(10,8,10,1)_52%,rgba(54,43,34,0.9))]" />

      <p className="absolute left-5 top-[11vh] z-10 font-mono text-xs uppercase tracking-[0.34em] text-rose-100/34 sm:left-8 lg:left-12">
        03 / Retail
      </p>
      <div className="absolute bottom-[8vh] left-5 top-[8vh] z-10 w-[42vw] min-w-[18rem] overflow-hidden border border-white/10 sm:left-8 lg:left-12">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(111,73,70,0.42),rgba(14,10,12,0.98)_60%,rgba(139,112,88,0.24))]" />
        <div className="absolute inset-x-8 top-[24%] h-px bg-white/14" />
        <div className="absolute bottom-8 left-8 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
          editorial retail
        </div>
      </div>
      <div className="absolute right-5 top-[13vh] z-10 max-w-[46rem] text-right sm:right-8 lg:right-12">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-rose-100/40">
          Fashion editorial retail
        </p>
        <h2 className="mt-7 text-[clamp(4.8rem,13vw,12rem)] font-semibold uppercase leading-[0.74] tracking-normal text-white">
          BRL Fashion
        </h2>
      </div>
      <p className="absolute bottom-[12vh] right-5 z-10 max-w-md text-right text-xl leading-8 text-slate-300 sm:right-8 lg:right-12">
        Retail reduced to clarity.
      </p>
    </PanelShell>
  );
}

function ClosingPanel() {
  return (
    <PanelShell className="bg-[#050409]" index={4}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(100,82,141,0.18),transparent_34%),linear-gradient(135deg,rgba(5,4,9,1),rgba(9,8,17,1)_54%,rgba(7,9,12,1))]" />
      <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
        <h2 className="text-[clamp(5rem,14vw,13rem)] font-semibold uppercase leading-[0.74] tracking-normal text-white">
          Quiet systems. Clear direction.
        </h2>
        <div className="border-l border-white/12 pl-6">
          <p className="max-w-md text-xl leading-8 text-slate-300">
            A continuous cinematic portfolio for backend work, paced like moving frames.
          </p>
          <div className="mt-9 flex gap-7 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/70">
            <a
              href="https://github.com/sxaksaa"
              target="_blank"
              rel="noreferrer"
              className="border-b border-white/40 pb-2 transition-colors duration-300 hover:text-white"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@aksaa.dev"
              className="border-b border-white/40 pb-2 transition-colors duration-300 hover:text-white"
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
      data-page-root
      className="experience relative min-h-screen overflow-x-clip bg-[#050505] text-white"
    >
      <div className="world-gradient fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,#1b1027,transparent_40%),radial-gradient(circle_at_bottom,#0b1520,transparent_40%),#050505]" />

      <section className="panel-scroll relative z-10 h-[620vh]">
        <div className="panel-stage sticky top-0 h-screen overflow-hidden">
          {panels.map((panel) => (
            <span key={panel} className="sr-only">
              {panel}
            </span>
          ))}
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
