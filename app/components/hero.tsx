"use client";

import { useEffect } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import { ArrowRight, Code2, Sparkles } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const navReveal: Variants = {
  hidden: {
    opacity: 0,
    y: -14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: "blur(12px)",
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      delay,
      ease: smoothEase,
    },
  }),
};

const panelReveal: Variants = {
  hidden: {
    opacity: 0,
    x: 34,
    filter: "blur(14px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: 0.48,
      ease: smoothEase,
    },
  },
};

const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 1.2,
      ease: smoothEase,
    },
  },
};

const systemLabels = ["API Gateway", "Auth Layer", "Data Core", "Queue Bus"];
const codeLines = [
  "route.post('/api/core', securePipeline)",
  "await services.sync({ latency: 'low' })",
  "return response.stable(scale.ready)",
];

type MotionControls = ReturnType<typeof useAnimationControls>;

function playEntrance(...controls: MotionControls[]) {
  controls.forEach((control) => control.set("hidden"));

  return requestAnimationFrame(() => {
    controls.forEach((control) => {
      void control.start("visible");
    });
  });
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const navControls = useAnimationControls();
  const contentControls = useAnimationControls();
  const panelControls = useAnimationControls();
  const scrollControls = useAnimationControls();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const frame = playEntrance(navControls, contentControls, panelControls, scrollControls);

    return () => cancelAnimationFrame(frame);
  }, [contentControls, navControls, panelControls, reduceMotion, scrollControls]);

  const loopingTransition: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" };

  return (
    <section className="relative isolate flex min-h-screen overflow-hidden bg-[#05020b] px-5 text-white sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute inset-0 opacity-80"
          animate={
            reduceMotion
              ? undefined
              : {
                  backgroundPosition: ["0% 0%", "100% 85%", "0% 0%"],
                }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 16% 18%, rgba(168, 85, 247, 0.34), transparent 28%), radial-gradient(circle at 80% 10%, rgba(34, 211, 238, 0.17), transparent 30%), radial-gradient(circle at 70% 78%, rgba(217, 70, 239, 0.2), transparent 34%), linear-gradient(135deg, rgba(5, 2, 11, 0.96), rgba(16, 8, 33, 0.86) 45%, rgba(5, 2, 11, 1))",
            backgroundSize: "150% 150%",
          }}
        />

        <motion.div
          className="absolute left-[-18%] top-[20%] h-72 w-[136%] -rotate-6 bg-[linear-gradient(90deg,transparent,rgba(168,85,247,0.0),rgba(168,85,247,0.34),rgba(34,211,238,0.18),rgba(217,70,239,0.22),transparent)] blur-3xl"
          animate={reduceMotion ? undefined : { x: ["-4%", "5%", "-4%"], opacity: [0.34, 0.68, 0.34] }}
          transition={loopingTransition}
        />

        <motion.div
          className="absolute bottom-[-18%] left-[-10%] h-96 w-[120%] rotate-3 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.16),rgba(168,85,247,0.2),transparent)] blur-3xl"
          animate={reduceMotion ? undefined : { x: ["3%", "-4%", "3%"], opacity: [0.28, 0.56, 0.28] }}
          transition={{ ...loopingTransition, duration: 13 }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_26%,transparent_76%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,2,11,0.18)_42%,rgba(5,2,11,0.86)_86%)]" />
        <div className="hero-noise absolute inset-0 opacity-[0.16]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col">
        <motion.header
          variants={navReveal}
          initial={false}
          animate={navControls}
          className="flex items-center justify-between py-5 text-sm text-white/72"
        >
          <a href="#top" className="font-mono text-xs uppercase tracking-[0.32em] text-violet-100">
            Aksaa
          </a>
          <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/68 shadow-[0_0_36px_rgba(168,85,247,0.12)] backdrop-blur-md sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.95)]" />
            Backend systems in motion
          </div>
        </motion.header>

        <main id="top" className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)] items-center gap-12 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:py-8">
          <div className="w-full min-w-0 max-w-3xl text-center sm:text-left">
            <motion.div
              variants={fadeUp}
              custom={0.18}
              initial={false}
              animate={contentControls}
              className="mx-auto mb-6 inline-flex max-w-full items-center justify-center gap-2 rounded-lg border border-violet-300/20 bg-white/[0.055] px-3 py-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-violet-100 shadow-[0_0_42px_rgba(168,85,247,0.16)] backdrop-blur-xl sm:mx-0 sm:text-xs sm:tracking-[0.28em]"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
              Premium backend craft
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={0.3}
              initial={false}
              animate={contentControls}
              className="mb-4 font-mono text-sm uppercase tracking-[0.36em] text-cyan-200/80"
            >
              Backend Web Developer
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={0.42}
              initial={false}
              animate={contentControls}
              className="max-w-4xl bg-gradient-to-b from-white via-violet-100 to-violet-300 bg-clip-text text-6xl font-semibold leading-[0.95] text-transparent drop-shadow-[0_0_34px_rgba(168,85,247,0.26)] sm:text-7xl lg:text-8xl"
            >
              Aksaa
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.54}
              initial={false}
              animate={contentControls}
              className="mx-auto mt-7 max-w-2xl px-1 text-base leading-8 text-slate-300 sm:mx-0 sm:px-0 sm:text-lg"
            >
              I build modern backend systems, scalable APIs, and reliable product infrastructure that keep digital experiences fast, secure, and ready to grow.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.66}
              initial={false}
              animate={contentControls}
              className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            >
              <motion.a
                href="#projects"
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-[#12071f] shadow-[0_0_34px_rgba(255,255,255,0.18),0_0_52px_rgba(168,85,247,0.35)] transition-colors hover:bg-violet-100 sm:w-auto"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </motion.a>
              <motion.a
                href="https://github.com/sxaksaa"
                target="_blank"
                rel="noreferrer"
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_34px_rgba(168,85,247,0.18)] backdrop-blur-xl transition-colors hover:border-cyan-200/40 hover:bg-white/[0.095] sm:w-auto"
              >
                <Code2 className="h-4 w-4" />
                GitHub
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            variants={panelReveal}
            initial={false}
            animate={panelControls}
            className="relative mx-auto w-full min-w-0 max-w-full sm:max-w-xl"
          >
            <motion.div
              className="absolute inset-x-6 top-8 h-40 bg-violet-500/24 blur-3xl"
              animate={reduceMotion ? undefined : { opacity: [0.35, 0.72, 0.35], y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#0d0718]/68 p-4 shadow-[0_24px_100px_rgba(0,0,0,0.45),0_0_80px_rgba(168,85,247,0.18)] backdrop-blur-2xl sm:p-5">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_15px_rgba(240,171,252,0.8)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-300 shadow-[0_0_15px_rgba(196,181,253,0.8)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_15px_rgba(165,243,252,0.8)]" />
                </div>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.25em] text-white/42">runtime</span>
              </div>

              <div className="relative min-h-[23rem] overflow-hidden rounded-lg border border-white/10 bg-black/18 p-5">
                <motion.div
                  className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/18"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/10"
                  animate={reduceMotion ? undefined : { rotate: -360 }}
                  transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
                />

                {systemLabels.map((label, index) => (
                  <motion.div
                    key={label}
                    className="absolute rounded-lg border border-white/10 bg-white/[0.07] px-2 py-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/72 shadow-[0_0_24px_rgba(168,85,247,0.12)] backdrop-blur-xl sm:px-3 sm:text-[0.68rem] sm:tracking-[0.2em]"
                    style={{
                      left: index === 0 || index === 3 ? "7%" : "auto",
                      right: index === 1 || index === 2 ? "6%" : "auto",
                      top: index < 2 ? "16%" : "69%",
                    }}
                    animate={reduceMotion ? undefined : { y: index % 2 === 0 ? [0, -8, 0] : [0, 8, 0] }}
                    transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {label}
                  </motion.div>
                ))}

                <div className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-violet-200/16 bg-[#0b0614]/82 p-4 shadow-[0_0_70px_rgba(168,85,247,0.22)] backdrop-blur-xl sm:w-[78%]">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.24em] text-violet-100/82">core.service</span>
                    <motion.span
                      className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.95)]"
                      animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                  </div>

                  <div className="space-y-3">
                    {codeLines.map((line, index) => (
                      <div key={line} className="flex items-center gap-3 font-mono text-xs text-slate-300">
                        <span className="text-violet-300/60">0{index + 1}</span>
                        <span className="truncate">{line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        <motion.a
          href="#projects"
          variants={scrollReveal}
          initial={false}
          animate={scrollControls}
          className="mx-auto mb-7 flex flex-col items-center gap-2 text-[0.68rem] uppercase tracking-[0.32em] text-white/48"
          aria-label="Scroll to projects"
        >
          <span>Scroll</span>
          <span className="relative h-9 w-px overflow-hidden bg-white/16">
            <motion.span
              className="absolute left-0 top-0 h-3 w-px bg-cyan-200 shadow-[0_0_14px_rgba(103,232,249,0.9)]"
              animate={reduceMotion ? undefined : { y: [0, 28, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
