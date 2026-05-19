import {
  aksaShowcaseFrames,
  eduvestShowcaseFrames,
  fashionShowcaseFrames,
} from "./project-data";
import { AksaShowcaseStep, DesktopShowcaseStep } from "./showcase-steps";

export function PanelShell({
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

export function IntroPanel() {
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
            direction: digital checkout, finance education, ecommerce workflows,
            and cinematic frontend craft.
          </p>
        </div>
      </div>
    </PanelShell>
  );
}

export function AksaPanel() {
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
                frames={aksaShowcaseFrames}
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

export function EduvestPanel() {
  return (
    <PanelShell className="bg-[#080413]">
      <div className="camera-scene absolute inset-0 origin-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_26%,rgba(139,92,246,0.3),transparent_34%),radial-gradient(circle_at_16%_76%,rgba(14,165,233,0.14),transparent_34%),linear-gradient(135deg,rgba(10,4,22,1),rgba(4,2,10,1)_56%,rgba(28,18,54,0.94))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,2,13,0.92)_0%,rgba(12,5,26,0.56)_44%,rgba(6,3,12,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:100%_16vh] opacity-35" />
        <div className="absolute left-[12vw] top-[18vh] h-[52vh] w-px bg-[linear-gradient(180deg,transparent,rgba(216,180,254,0.24),transparent)]" />
        <div className="absolute right-[16vw] top-[8vh] h-[78vh] w-px bg-[linear-gradient(180deg,transparent,rgba(125,211,252,0.2),transparent)]" />

        <div className="camera-visual eduvest-showcase-window absolute inset-0 z-10 overflow-hidden">
          <div className="eduvest-vertical-track absolute inset-x-0 top-0">
            {eduvestShowcaseFrames.map((frame, index) => (
              <DesktopShowcaseStep
                key={frame.src}
                frame={frame}
                frames={eduvestShowcaseFrames}
                index={index}
                variant="eduvest"
              />
            ))}
          </div>
        </div>
      </div>

      <p className="camera-copy absolute right-5 top-[9vh] z-30 hidden font-mono text-xs uppercase tracking-[0.34em] text-violet-100/34 sm:block sm:right-10 lg:right-16">
        Chapter 02 / Finance Learning
      </p>
    </PanelShell>
  );
}

export function FashionPanel() {
  return (
    <PanelShell className="bg-[#1b1114]">
      <div className="camera-scene absolute inset-0 origin-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_66%,rgba(170,116,96,0.22),transparent_36%),linear-gradient(135deg,rgba(40,25,29,1),rgba(10,8,10,1)_52%,rgba(54,43,34,0.9))]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,8,10,0.78)_0%,rgba(16,10,12,0.5)_45%,rgba(12,9,8,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_17vh] opacity-35" />

        <div className="camera-visual fashion-showcase-window absolute inset-0 z-10 overflow-hidden">
          <div className="fashion-vertical-track absolute inset-x-0 top-0">
            {fashionShowcaseFrames.map((frame, index) => (
              <DesktopShowcaseStep
                key={frame.src}
                frame={frame}
                frames={fashionShowcaseFrames}
                index={index}
                variant="fashion"
              />
            ))}
          </div>
        </div>
      </div>

      <p className="camera-copy absolute left-5 top-[9vh] z-30 font-mono text-xs uppercase tracking-[0.34em] text-rose-100/34 sm:left-10 lg:left-16">
        Chapter 03 / Editorial Interface
      </p>
    </PanelShell>
  );
}

export function ClosingPanel() {
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

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-4 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/70">
            <a
              href="https://github.com/sxaksaa"
              target="_blank"
              rel="noreferrer"
              className="border-b border-white/40 pb-2"
            >
              GitHub
            </a>
            <a
              href="mailto:akbarsalahudinpurnomo@gmail.com"
              className="border-b border-white/40 pb-2 normal-case tracking-[0.03em]"
            >
              akbarsalahudinpurnomo@gmail.com
            </a>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
