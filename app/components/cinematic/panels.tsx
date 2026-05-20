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
            Think
          </span>
          <span className="intro-word absolute inset-0 flex items-center justify-center text-center opacity-0">
            Build
          </span>
          <span className="intro-word absolute inset-0 flex items-center justify-center text-center opacity-0">
            Refine
          </span>
        </h1>
      </div>

      <div className="intro-content-group relative z-10 grid h-full place-items-center px-5 text-center">
        <div className="w-full max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-white/40">
            Full-Stack Developer • Backend Systems • Cinematic Web
          </p>

          <h1 className="mt-7 font-display text-[clamp(6.5rem,22vw,18rem)] font-semibold leading-[0.82] tracking-normal text-white">
            Aksaa
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-slate-300 sm:mt-8 sm:text-2xl sm:leading-9">
            I like building web apps where the backend is clear, the interface
            is calm, and every state has a reason.
          </p>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/48 sm:text-base sm:leading-7">
            My work sits between Laravel systems, payment flows, product logic,
            and cinematic frontend direction. I care about software that feels
            reliable before it tries to feel impressive.
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
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(19,8,35,1),rgba(6,3,13,1)_54%,rgba(30,10,44,0.98))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_62%,rgba(168,85,247,0.32),transparent_42%),radial-gradient(ellipse_at_78%_32%,rgba(217,70,239,0.24),transparent_37%),radial-gradient(ellipse_at_56%_78%,rgba(59,130,246,0.14),transparent_44%)]" />
        <div className="aksa-aurora absolute -left-[18vw] top-[3vh] h-[84vh] w-[72vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.34),rgba(236,72,153,0.16)_42%,transparent_72%)] opacity-85" />
        <div className="absolute -right-[14vw] bottom-[-16vh] h-[64vh] w-[58vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(192,132,252,0.22),rgba(14,165,233,0.1)_48%,transparent_74%)] opacity-75" />
        <div className="absolute inset-0 bg-[conic-gradient(from_215deg_at_44%_50%,transparent_0deg,rgba(168,85,247,0.16)_58deg,rgba(236,72,153,0.12)_104deg,transparent_158deg)] opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,3,8,0.82)_0%,rgba(8,5,13,0.5)_44%,rgba(6,4,10,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:100%_18vh] opacity-35" />
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
        Chapter 01 / Payment Logic
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
        Chapter 02 / Learning Systems
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
        Chapter 03 / Interface Structure
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
        <h2 className="max-w-[min(100%,54rem)] font-display text-[clamp(4.25rem,9.7vw,9.7rem)] font-semibold leading-[0.94] tracking-normal text-white">
          Let&apos;s build
          <br />
          something thoughtful.
        </h2>

        <div className="border-l border-white/12 pl-6">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-white/38">
            Backend Logic • Interface Clarity • Product Systems
          </p>

          <p className="max-w-md text-lg leading-7 text-slate-300 sm:text-xl sm:leading-8">
            I care about rules that are visible, data that moves through a
            clear path, and interfaces that help people understand what is
            happening. That is the kind of work I want to keep growing into.
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
