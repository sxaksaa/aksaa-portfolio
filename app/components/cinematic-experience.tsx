"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  AksaPanel,
  ClosingPanel,
  EduvestPanel,
  FashionPanel,
  IntroPanel,
} from "./cinematic/panels";

const panels = ["intro", "aksa", "eduvest", "fashion", "closing"] as const;
type PanelName = (typeof panels)[number];

const transitionAt = {
  aksa: 0.12,
  eduvest: 10.46,
  fashion: 16.88,
  closing: 24.48,
} as const;

const showcaseSequenceAt = {
  aksa: 1.52,
  eduvest: 11.12,
  fashion: 17.62,
} as const;

const connectedPanelMotion = {
  incomingFrom: {
    yPercent: 8,
    scale: 1.014,
    clipPath: "inset(0% 0% 0% 0%)",
  },
  incomingTo: {
    yPercent: 0,
    scale: 1,
    duration: 1.3,
    ease: "none",
    immediateRender: false,
  },
  incomingFadeTo: {
    autoAlpha: 1,
    duration: 0.56,
    ease: "none",
  },
  outgoingTo: {
    scale: 0.986,
    yPercent: -1.1,
    duration: 1.15,
    ease: "none",
  },
  outgoingFadeTo: {
    autoAlpha: 0,
    duration: 0.42,
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
    incoming: "eduvest",
    at: transitionAt.eduvest,
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

type ShowcaseTimelineConfig = {
  panelName: Extract<PanelName, "aksa" | "eduvest" | "fashion">;
  trackSelector: string;
  stepSelector: string;
  startAt: number;
  stepDuration: number;
  fadeInDuration?: number;
  fadeInLead?: number;
  fadeOutDelay?: number;
  fadeOutDuration?: number;
  depthTargets?: (panel: HTMLElement) => HTMLElement[];
};

function useCinematicScroll(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
    });

    window.scrollTo(0, 0);

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

      const introTl = gsap.timeline({
        onComplete: () => ScrollTrigger.refresh(),
      });

      introTl.set(".intro-content-group", {
        autoAlpha: 0,
        y: 20,
        scale: 0.99,
      });
      introTl.set(".intro-words-container", { autoAlpha: 1 });
      introTl.to(root, { autoAlpha: 1, duration: 0.2, ease: "power1.in" });

      gsap.utils.toArray<HTMLElement>(".intro-word").forEach((word) => {
        introTl
          .fromTo(
            word,
            { yPercent: 38, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
          )
          .to(
            word,
            {
              yPercent: -38,
              autoAlpha: 0,
              duration: 0.55,
              ease: "power3.in",
            },
            "+=0.25",
          );
      });

      introTl
        .to(
          ".intro-words-container",
          {
            autoAlpha: 0,
            y: -8,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.1",
        )
        .to(
          ".intro-content-group",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.08",
        );

      const film = gsap.timeline({
        scrollTrigger: {
          trigger: ".panel-scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
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
            film.fromTo(scene, { scale: 1.032 }, { scale: 1, duration: 2.3, ease: "none" }, at);
          }
          if (visual) {
            film.fromTo(visual, { scale: 1.02 }, { scale: 1, duration: 2.3, ease: "none" }, at);
          }
          if (copy.length) {
            film.fromTo(copy, { y: 6 }, { y: 0, duration: 1.8, ease: "none" }, at + 0.16);
          }
          return;
        }

        if (scene) {
          film.to(scene, { scale: 1.028, duration: 2.3, ease: "none" }, at);
        }
        if (visual) {
          film.to(visual, { scale: 1.02, duration: 2.3, ease: "none" }, at);
        }
        if (copy.length) {
          film.to(copy, { y: -6, duration: 1.8, ease: "none" }, at);
        }
      };

      const addVerticalShowcase = ({
        panelName,
        trackSelector,
        stepSelector,
        startAt,
        stepDuration,
        fadeInDuration = 0.42,
        fadeInLead = 0.58,
        fadeOutDelay = 0.52,
        fadeOutDuration = 0.44,
        depthTargets,
      }: ShowcaseTimelineConfig) => {
        const panel = panelByName.get(panelName);
        if (!panel) return;

        const verticalTrack = panel.querySelector<HTMLElement>(trackSelector);
        const steps = gsap.utils.toArray<HTMLElement>(
          panel.querySelectorAll<HTMLElement>(stepSelector),
        );
        if (!verticalTrack || steps.length <= 1) return;

        const sequence = gsap.timeline();
        const sequenceDuration = stepDuration * (steps.length - 1);
        const extraDepthTargets = depthTargets?.(panel).filter(Boolean) ?? [];

        gsap.set([verticalTrack, ...extraDepthTargets], {
          willChange: "transform",
          force3D: true,
          backfaceVisibility: "hidden",
        });
        gsap.set(steps, {
          autoAlpha: 0,
          y: 24,
          willChange: "opacity, transform",
        });
        gsap.set(steps[0], { autoAlpha: 1, y: 0 });

        sequence.to(
          verticalTrack,
          {
            y: `-${(steps.length - 1) * 100}vh`,
            duration: sequenceDuration,
            ease: "none",
          },
          0,
        );

        if (extraDepthTargets.length) {
          sequence.to(
            extraDepthTargets,
            {
              yPercent: 2,
              scale: 1.012,
              duration: sequenceDuration,
              ease: "none",
            },
            0,
          );
        }

        steps.forEach((step, index) => {
          const centerAt = index * stepDuration;

          if (index > 0) {
            sequence.fromTo(
              step,
              { autoAlpha: 0, y: 30 },
              {
                autoAlpha: 1,
                y: 0,
                duration: fadeInDuration,
                ease: "none",
                immediateRender: false,
              },
              centerAt - fadeInLead,
            );
          }

          if (index < steps.length - 1) {
            sequence.to(
              step,
              {
                autoAlpha: 0,
                y: -26,
                duration: fadeOutDuration,
                ease: "none",
              },
              centerAt + fadeOutDelay,
            );
          }
        });

        film.add(sequence, startAt);
      };

      addVerticalShowcase({
        panelName: "aksa",
        trackSelector: ".aksa-vertical-track",
        stepSelector: ".aksa-showcase-step",
        startAt: showcaseSequenceAt.aksa,
        stepDuration: 1.28,
        depthTargets: (panel) => [
          panel.querySelector<HTMLElement>(".aksa-aurora"),
        ].filter(Boolean) as HTMLElement[],
      });

      addVerticalShowcase({
        panelName: "eduvest",
        trackSelector: ".eduvest-vertical-track",
        stepSelector: ".eduvest-showcase-step",
        startAt: showcaseSequenceAt.eduvest,
        stepDuration: 1.1,
      });

      addVerticalShowcase({
        panelName: "fashion",
        trackSelector: ".fashion-vertical-track",
        stepSelector: ".fashion-showcase-step",
        startAt: showcaseSequenceAt.fashion,
        stepDuration: 1.1,
      });

      panelTransitions.forEach((transition) => {
        const incomingPanel = panelByName.get(transition.incoming as PanelName);
        const incomingIndex = panels.indexOf(transition.incoming as PanelName);
        const outgoingPanel = panelElements[incomingIndex - 1];
        const outgoingAt = transition.at;
        const incomingAt = transition.at + 0.58;

        if (!incomingPanel || !outgoingPanel) return;

        film
          .fromTo(
            incomingPanel,
            { ...transition.incomingFrom },
            { ...transition.incomingTo },
            incomingAt,
          )
          .to(
            incomingPanel,
            { ...transition.incomingFadeTo },
            incomingAt + 0.1,
          )
          .to(
            outgoingPanel,
            { ...transition.outgoingTo },
            outgoingAt,
          )
          .to(
            outgoingPanel,
            { ...transition.outgoingFadeTo },
            outgoingAt,
          );

        addCameraDepth(incomingPanel, incomingAt, "enter");
        addCameraDepth(outgoingPanel, outgoingAt, "exit");
      });

      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, [rootRef]);
}

export function CinematicScrollExperience() {
  const rootRef = useRef<HTMLElement>(null);
  useCinematicScroll(rootRef);

  return (
    <main
      ref={rootRef}
      className="experience invisible relative min-h-screen overflow-x-clip bg-[#050505] opacity-0 text-white"
    >
      <div className="world-gradient fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,#1b1027,transparent_40%),radial-gradient(circle_at_bottom,#0b1520,transparent_40%),#050505]" />
      <section className="panel-scroll relative z-10 h-[2600vh]">
        <div className="panel-stage sticky top-0 h-screen overflow-clip bg-[#050505]">
          <IntroPanel />
          <AksaPanel />
          <EduvestPanel />
          <FashionPanel />
          <ClosingPanel />
        </div>
      </section>
    </main>
  );
}
