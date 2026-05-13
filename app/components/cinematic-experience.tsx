"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scenes = [
  "landing",
  "aksa",
  "siemola",
  "fashion",
  "closing",
] as const;

function useFilmScroll(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    if (reduceMotion) {
      gsap.set(root.querySelectorAll(".film-scene, .scene-piece"), {
        autoAlpha: 1,
        clearProps: "transform",
      });
      gsap.set(root.querySelectorAll(".film-scene"), {
        minHeight: "100vh",
        position: "relative",
      });
      gsap.set(root.querySelector(".film-stage"), { clearProps: "all" });
      return;
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      touchMultiplier: 1.04,
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
      gsap.set(".film-scene", { autoAlpha: 0, scale: 1.04, y: 88 });
      gsap.set(".landing-scene", { autoAlpha: 1, scale: 1, y: 0 });
      gsap.set(".takeover", { autoAlpha: 0, scaleX: 0, scaleY: 0 });
      gsap.set(".scene-piece", { willChange: "transform, opacity" });

      const film = gsap.timeline({
        scrollTrigger: {
          anticipatePin: 1,
          end: "+=620%",
          pin: ".film-stage",
          scrub: 1.05,
          start: "top top",
          trigger: ".film-scroll",
        },
      });

      film
        .to(".landing-title", { ease: "none", scale: 1.08, y: -82 }, 0)
        .to(".landing-copy", { ease: "none", autoAlpha: 0.28, y: -40 }, 0)
        .to(".takeover-aksa", { autoAlpha: 0.72, duration: 0.28, ease: "none", scaleY: 1 }, 0.6)
        .fromTo(
          ".aksa-scene",
          { autoAlpha: 0, scale: 1.08, y: 86 },
          { autoAlpha: 1, duration: 0.52, ease: "none", scale: 1, y: 0 },
          0.68,
        )
        .to(".landing-scene", { autoAlpha: 0, duration: 0.58, ease: "none", scale: 0.94, y: -140 }, 0.66)
        .to(".takeover-aksa", { autoAlpha: 0, duration: 0.36, ease: "none", scaleY: 0.18, transformOrigin: "top center" }, 1.02)
        .to(".aksa-title", { ease: "none", xPercent: -6 }, 1.08)
        .to(".aksa-device", { ease: "none", scale: 1.045, xPercent: 3, y: -58 }, 1.08)
        .to(".aksa-copy", { ease: "none", y: -28 }, 1.12)
        .to(".takeover-siemola", { autoAlpha: 0.66, duration: 0.34, ease: "none", scaleX: 1 }, 1.54)
        .fromTo(
          ".siemola-scene",
          { autoAlpha: 0, scale: 0.97, x: 160, y: 0 },
          { autoAlpha: 1, duration: 0.6, ease: "none", scale: 1, x: 0, y: 0 },
          1.58,
        )
        .to(".aksa-scene", { autoAlpha: 0, duration: 0.62, ease: "none", scale: 0.93, x: -80, y: -120 }, 1.62)
        .to(".takeover-siemola", { autoAlpha: 0, duration: 0.4, ease: "none", scaleX: 0.12, transformOrigin: "right center" }, 2.0)
        .to(".siemola-title", { ease: "none", y: -72 }, 2.14)
        .to(".siemola-structure", { ease: "none", xPercent: -8 }, 2.14)
        .to(".siemola-copy", { ease: "none", y: -20 }, 2.2)
        .to(".takeover-fashion-a", { autoAlpha: 0.58, duration: 0.34, ease: "none", scaleY: 1 }, 2.66)
        .to(".takeover-fashion-b", { autoAlpha: 0.58, duration: 0.34, ease: "none", scaleY: 1 }, 2.72)
        .fromTo(
          ".fashion-scene",
          { autoAlpha: 0, scale: 1.06, y: 120 },
          { autoAlpha: 1, duration: 0.64, ease: "none", scale: 1, y: 0 },
          2.78,
        )
        .to(".siemola-scene", { autoAlpha: 0, duration: 0.62, ease: "none", scale: 0.96, x: -70 }, 2.82)
        .to(".takeover-fashion-a", { autoAlpha: 0, duration: 0.42, ease: "none", scaleY: 0.12, transformOrigin: "top center" }, 3.18)
        .to(".takeover-fashion-b", { autoAlpha: 0, duration: 0.42, ease: "none", scaleY: 0.12, transformOrigin: "bottom center" }, 3.22)
        .to(".fashion-image", { ease: "none", scale: 1.055, y: -44 }, 3.22)
        .to(".fashion-title", { ease: "none", y: -34 }, 3.24)
        .to(".takeover-closing", { autoAlpha: 0.76, duration: 0.36, ease: "none", scaleY: 1 }, 3.76)
        .fromTo(
          ".closing-scene",
          { autoAlpha: 0, scale: 0.94, y: 110 },
          { autoAlpha: 1, duration: 0.58, ease: "none", scale: 1, y: 0 },
          3.88,
        )
        .to(".fashion-scene", { autoAlpha: 0, duration: 0.58, ease: "none", scale: 0.93, y: -120 }, 3.9)
        .to(".takeover-closing", { autoAlpha: 0, duration: 0.44, ease: "none", scaleY: 0.12, transformOrigin: "top center" }, 4.24)
        .to(".closing-title", { ease: "none", xPercent: -5 }, 4.28);

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

function Scene({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <section className={`film-scene absolute inset-0 overflow-hidden px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </section>
  );
}

function LandingScene() {
  return (
    <Scene className="landing-scene flex items-center bg-[#050409]">
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="landing-copy scene-piece font-mono text-xs uppercase tracking-[0.34em] text-white/40">
          Backend Web Developer
        </p>
        <h1 className="landing-title scene-piece mt-7 text-[clamp(7rem,23vw,20rem)] font-semibold uppercase leading-[0.72] tracking-normal text-white">
          Aksaa
        </h1>
        <p className="landing-copy scene-piece mt-8 max-w-xl text-2xl leading-9 text-slate-300">
          Backend systems, quietly composed.
        </p>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,4,9,1),rgba(13,10,17,0.98)_52%,rgba(4,6,8,1))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:100%_18vh] opacity-50" />
    </Scene>
  );
}

function AksaScene() {
  return (
    <Scene className="aksa-scene">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(22,8,37,1),rgba(7,5,11,1)_54%,rgba(42,22,48,0.9))]" />
      <div className="aksa-copy scene-piece absolute left-5 top-[11vh] z-10 max-w-sm sm:left-8 lg:left-12">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-violet-100/42">Luxury digital commerce</p>
        <p className="mt-5 text-xl leading-8 text-slate-300">
          A digital commerce experience designed with restraint.
        </p>
      </div>
      <div className="aksa-device scene-piece absolute left-1/2 top-[24vh] z-10 w-[84vw] max-w-6xl -translate-x-1/2">
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
      <h2 className="aksa-title scene-piece absolute bottom-[6vh] left-5 z-10 max-w-[14ch] text-[clamp(5.2rem,15vw,14rem)] font-semibold uppercase leading-[0.74] tracking-normal text-white sm:left-8 lg:left-12">
        Aksa Xiterz
      </h2>
    </Scene>
  );
}

function SiemolaScene() {
  return (
    <Scene className="siemola-scene">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,17,26,1),rgba(4,8,13,1)_58%,rgba(17,30,42,0.92))]" />
      <h2 className="siemola-title scene-piece absolute left-5 top-[10vh] z-10 text-[clamp(5rem,17vw,15rem)] font-semibold uppercase leading-[0.72] tracking-normal text-white sm:left-8 lg:left-12">
        Siemola
      </h2>
      <div className="siemola-structure scene-piece absolute bottom-[8vh] right-[12vw] top-[22vh] z-10 w-[30vw] min-w-[16rem] border-x border-white/14">
        <div className="absolute inset-x-[-18vw] top-[18%] h-px bg-white/12" />
        <div className="absolute inset-x-[-12vw] top-[52%] h-px bg-white/16" />
        <div className="absolute inset-x-[-8vw] bottom-[18%] h-px bg-white/10" />
        <div className="absolute bottom-6 right-0 font-mono text-[0.62rem] uppercase tracking-[0.34em] text-white/34">
          operational interval
        </div>
      </div>
      <div className="siemola-copy scene-piece absolute bottom-[12vh] left-5 z-10 max-w-md sm:left-8 lg:left-12">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-blue-100/38">Industrial operational systems</p>
        <p className="mt-5 text-xl leading-8 text-slate-300">Systems moving in real space.</p>
      </div>
    </Scene>
  );
}

function FashionScene() {
  return (
    <Scene className="fashion-scene">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(40,25,29,1),rgba(10,8,10,1)_52%,rgba(54,43,34,0.9))]" />
      <div className="fashion-image scene-piece absolute bottom-[8vh] left-5 top-[8vh] z-10 w-[42vw] min-w-[18rem] overflow-hidden border border-white/10 sm:left-8 lg:left-12">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(111,73,70,0.42),rgba(14,10,12,0.98)_60%,rgba(139,112,88,0.24))]" />
        <div className="absolute inset-x-8 top-[24%] h-px bg-white/14" />
        <div className="absolute bottom-8 left-8 font-mono text-[0.62rem] uppercase tracking-[0.32em] text-white/36">
          editorial retail
        </div>
      </div>
      <div className="absolute right-5 top-[13vh] z-10 max-w-[46rem] text-right sm:right-8 lg:right-12">
        <p className="fashion-copy scene-piece font-mono text-xs uppercase tracking-[0.34em] text-rose-100/40">
          Fashion editorial retail
        </p>
        <h2 className="fashion-title scene-piece mt-7 text-[clamp(4.8rem,13vw,12rem)] font-semibold uppercase leading-[0.74] tracking-normal text-white">
          BRL Fashion
        </h2>
      </div>
      <p className="fashion-copy scene-piece absolute bottom-[12vh] right-5 z-10 max-w-md text-right text-xl leading-8 text-slate-300 sm:right-8 lg:right-12">
        Retail reduced to clarity.
      </p>
    </Scene>
  );
}

function ClosingScene() {
  return (
    <Scene className="closing-scene flex items-center bg-[#050409]">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
        <h2 className="closing-title scene-piece text-[clamp(5rem,14vw,13rem)] font-semibold uppercase leading-[0.74] tracking-normal text-white">
          Quiet systems. Clear direction.
        </h2>
        <div className="scene-piece border-l border-white/12 pl-6">
          <p className="max-w-md text-xl leading-8 text-slate-300">
            A continuous cinematic portfolio for backend work, paced like separate worlds.
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
    </Scene>
  );
}

function Takeovers() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      <div className="takeover takeover-aksa absolute inset-0 origin-bottom bg-[#0b0610]" />
      <div className="takeover takeover-siemola absolute inset-0 origin-left bg-[#050b12]" />
      <div className="takeover takeover-fashion-a absolute left-0 top-0 h-1/2 w-full origin-bottom bg-[#120b0d]" />
      <div className="takeover takeover-fashion-b absolute bottom-0 left-0 h-1/2 w-full origin-top bg-[#120b0d]" />
      <div className="takeover takeover-closing absolute inset-0 origin-bottom bg-[#030306]" />
    </div>
  );
}

export function CinematicScrollExperience() {
  const rootRef = useRef<HTMLElement>(null);

  useFilmScroll(rootRef);

  return (
    <main
      ref={rootRef}
      data-page-root
      className="relative isolate min-h-screen overflow-hidden bg-[#05020b] text-white"
    >
      <section className="film-scroll relative min-h-screen">
        <div className="film-stage relative min-h-screen overflow-hidden">
          {scenes.map((scene) => (
            <span key={scene} className="sr-only">
              {scene}
            </span>
          ))}
          <LandingScene />
          <AksaScene />
          <SiemolaScene />
          <FashionScene />
          <ClosingScene />
          <Takeovers />
        </div>
      </section>
    </main>
  );
}
