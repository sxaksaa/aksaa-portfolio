import Image from "next/image";
import type { ShowcaseFrame } from "./project-data";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function MetaTags({
  meta,
  alignRight = false,
}: {
  meta: string;
  alignRight?: boolean;
}) {
  return (
    <div
      className={cx(
        "mt-7 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-4 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/40",
        alignRight ? "justify-start lg:justify-end" : "justify-start",
      )}
    >
      {meta.split(", ").map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function ScreenWall({
  frames,
  activeIndex,
  wallClassName,
  tileClassName,
  activeTileClassName,
  inactiveTileClassName,
  imageClassName,
  sizes = "8vw",
}: {
  frames: readonly ShowcaseFrame[];
  activeIndex: number;
  wallClassName: string;
  tileClassName: string;
  activeTileClassName: string;
  inactiveTileClassName: string;
  imageClassName: string;
  sizes?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cx(wallClassName, "pointer-events-none grid grid-cols-2")}
    >
      {frames.map((screen, screenIndex) => (
        <div
          key={screen.src}
          className={cx(
            tileClassName,
            screenIndex === activeIndex ? activeTileClassName : inactiveTileClassName,
          )}
        >
          <Image
            src={screen.src}
            alt=""
            fill
            quality={58}
            sizes={sizes}
            className={imageClassName}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export function AksaShowcaseStep({
  frame,
  index,
  frames,
}: {
  frame: ShowcaseFrame;
  index: number;
  frames: readonly ShowcaseFrame[];
}) {
  const [primaryMeta, secondaryMeta = "Secure Delivery"] = frame.meta.split(", ");

  return (
    <section className="aksa-showcase-step relative h-screen min-h-[44rem] overflow-hidden px-5 sm:px-8 lg:px-[5vw]">
      <div className="aksa-visual-composition relative z-10 hidden h-[60vh] w-full overflow-hidden border border-white/10 bg-black/10 sm:block lg:h-[70vh]">
        <div className="absolute inset-y-0 left-[30%] w-px bg-white/10" />
        <div className="absolute inset-y-0 left-[70%] w-px bg-white/5" />
        <div className="absolute inset-x-0 top-[25%] h-px bg-white/10" />
        <div className="absolute inset-x-0 bottom-[20%] h-px bg-white/10" />

        <div className="absolute bottom-4 left-6 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-white/30">
          SYSTEM ENVIRONMENT // INTERACTION
        </div>
        <div className="absolute top-4 right-6 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-violet-100/30">
          {frame.meta}
        </div>

        <div className="absolute left-[6%] top-[35%] hidden scale-90 opacity-25 lg:block">
          <ScreenWall
            frames={frames.slice(0, 4)}
            activeIndex={index % 4}
            wallClassName="aksa-screen-wall gap-3"
            tileClassName="aksa-screen-tile relative aspect-[1290/2796] w-16 overflow-hidden rounded-[0.3rem] border transition-all duration-500"
            activeTileClassName="scale-105 border-violet-500/40 bg-violet-950/20 opacity-100"
            inactiveTileClassName="border-white/5 bg-black/40 opacity-40"
            imageClassName="object-contain opacity-60"
            sizes="4vw"
          />
        </div>

        <div className="aksa-phone-stage absolute left-[45%] top-[50%] z-20 aspect-[1290/2796] h-[85%] -translate-x-1/2 -translate-y-1/2">
          <span className="pointer-events-none absolute -inset-[15%] bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent_60%)] blur-2xl" />
          <figure className="relative h-full w-full overflow-hidden rounded-[1rem] border border-white/15 bg-[#0a0712] shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
            <Image
              src={frame.src}
              alt={`Aksa Xiterz ${frame.title}`}
              fill
              quality={75}
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-contain p-1"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </figure>
        </div>
      </div>

      <div className="aksa-step-copy relative z-20 text-left lg:text-right">
        <p className="font-mono text-xs uppercase tracking-[0.34em] text-violet-100/40">
          {frame.label}
        </p>
        <h2 className="aksa-editorial-title mt-6 font-display font-semibold leading-[0.9] tracking-normal text-white">
          Aksa Xiterz
        </h2>
        <h3 className="aksa-editorial-subtitle mt-4 font-display text-lg font-medium leading-[1.3] text-violet-200/90">
          {frame.title}
        </h3>
        <p className="mt-5 text-sm font-light leading-6 text-slate-400">
          {frame.body}
        </p>
        <div className="mt-8 flex flex-wrap justify-start gap-x-4 gap-y-2 border-t border-white/10 pt-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/40 lg:justify-end">
          <span>{primaryMeta}</span>
          <span>*</span>
          <span>{secondaryMeta}</span>
        </div>
      </div>
    </section>
  );
}

const desktopVariantStyles = {
  eduvest: {
    stepClass: "eduvest-showcase-step",
    visualClass: "eduvest-visual-composition bg-[#0b0614]",
    copyClass: "eduvest-step-copy",
    stageClass: "eduvest-screen-stage",
    wallClass: "eduvest-screen-wall gap-2",
    labelClass: "text-violet-100/42",
    titleClass:
      "mt-6 whitespace-nowrap font-display text-[clamp(3.4rem,6.4vw,7rem)] font-semibold leading-[0.86] tracking-normal text-white drop-shadow-[0_24px_60px_rgba(0,0,0,0.72)]",
    subtitleClass: "text-violet-100/88",
    visualGradient:
      "bg-[linear-gradient(135deg,rgba(139,92,246,0.24),rgba(8,4,18,0.96)_46%,rgba(14,165,233,0.12))]",
    frameBg: "bg-[#f5f1ff]",
    footerClass: "text-violet-50/38",
    footerLabel: "Video Learning",
  },
  fashion: {
    stepClass: "fashion-showcase-step",
    visualClass: "fashion-visual-composition bg-[#130d10]",
    copyClass: "fashion-step-copy",
    stageClass: "fashion-screen-stage",
    wallClass: "fashion-screen-wall gap-2",
    labelClass: "text-rose-100/40",
    titleClass:
      "mt-6 flex flex-col font-display text-[clamp(3.6rem,8vw,9.6rem)] font-semibold leading-[0.78] tracking-normal text-white drop-shadow-[0_24px_60px_rgba(0,0,0,0.72)] lg:items-end",
    subtitleClass: "text-rose-100/88",
    visualGradient:
      "bg-[linear-gradient(135deg,rgba(119,74,70,0.38),rgba(19,13,16,0.94)_44%,rgba(156,124,93,0.22))]",
    frameBg: "bg-[#f7f7f7]",
    footerClass: "text-white/36",
    footerLabel: "Product Rhythm",
  },
} as const;

export function DesktopShowcaseStep({
  frame,
  index,
  frames,
  variant,
}: {
  frame: ShowcaseFrame;
  index: number;
  frames: readonly ShowcaseFrame[];
  variant: keyof typeof desktopVariantStyles;
}) {
  const styles = desktopVariantStyles[variant];
  const title =
    variant === "eduvest" ? (
      "EduVest"
    ) : (
      <>
        <span className="block whitespace-nowrap">BRL</span>
        <span className="block whitespace-nowrap">Fashion</span>
      </>
    );

  return (
    <section
      className={cx(
        styles.stepClass,
        "relative h-screen min-h-[44rem] overflow-hidden px-5 sm:px-8 lg:px-[5vw]",
      )}
    >
      <div
        className={cx(
          styles.visualClass,
          "relative z-10 hidden h-[58vh] overflow-hidden border border-white/10 sm:block lg:h-[70vh]",
        )}
      >
        <div className={cx("absolute inset-0", styles.visualGradient)} />
        <div className="absolute inset-y-0 left-[22%] w-px bg-white/12" />
        <div className="absolute inset-y-0 left-[58%] w-px bg-white/10" />
        <div className="absolute inset-x-[8%] top-[25%] h-px bg-white/14" />
        <div className="absolute inset-x-[17%] bottom-[21%] h-px bg-white/12" />
        <div className="absolute left-[10%] top-[15%] h-[42%] w-[28%] border border-white/10 bg-black/16" />
        <div className="absolute bottom-[14%] left-[34%] h-[34%] w-[24%] border border-white/10 bg-white/[0.035]" />
        <div className="absolute right-[10%] top-[12%] h-[68%] w-[20%] border border-white/10 bg-black/14" />

        <div className="absolute left-[6%] top-[34%] hidden opacity-30 lg:block">
          <ScreenWall
            frames={frames}
            activeIndex={index}
            wallClassName={styles.wallClass}
            tileClassName="relative aspect-[1920/945] w-24 overflow-hidden rounded-md border transition-all duration-500"
            activeTileClassName={
              variant === "eduvest"
                ? "scale-105 border-violet-200/42 bg-violet-950/20 opacity-100"
                : "scale-105 border-rose-200/42 bg-rose-950/20 opacity-100"
            }
            inactiveTileClassName="border-white/5 bg-black/40 opacity-40"
            imageClassName="object-cover opacity-70"
          />
        </div>

        <div
          className={cx(
            styles.stageClass,
            "absolute left-[49%] top-[50%] z-20 aspect-[1920/945] -translate-x-1/2 -translate-y-1/2",
          )}
        >
          <figure
            className={cx(
              styles.frameBg,
              "relative h-full w-full overflow-hidden rounded-lg border border-white/16 shadow-[0_28px_90px_rgba(0,0,0,0.72)]",
            )}
          >
            <Image
              src={frame.src}
              alt={`${variant === "eduvest" ? "EduVest" : "BRL Fashion"} ${frame.title}`}
              fill
              quality={75}
              sizes="(max-width: 1024px) 82vw, 49vw"
              className="object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </figure>
        </div>

        <div
          className={cx(
            styles.footerClass,
            "absolute bottom-7 left-[10%] right-[10%] flex justify-between font-mono text-[0.56rem] uppercase tracking-[0.28em] sm:text-[0.62rem]",
          )}
        >
          <span>{styles.footerLabel}</span>
          <span>{frame.meta}</span>
        </div>
      </div>

      <div className={cx(styles.copyClass, "relative z-20 text-left lg:text-right")}>
        <p className={cx(styles.labelClass, "font-mono text-xs uppercase tracking-[0.34em]")}>
          {frame.label}
        </p>
        <h2 className={styles.titleClass}>{title}</h2>
        <h3
          className={cx(
            styles.subtitleClass,
            "mt-5 font-display text-[clamp(1.55rem,2.4vw,2.45rem)] font-medium leading-[1.08] tracking-normal",
          )}
        >
          {frame.title}
        </h3>
        <p className="mt-5 text-sm font-light leading-6 text-slate-300 sm:text-base sm:leading-7">
          {frame.body}
        </p>
        <MetaTags meta={frame.meta} alignRight />
      </div>
    </section>
  );
}
