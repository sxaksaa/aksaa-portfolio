import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  ExternalLink as ExternalLinkIcon,
  FileText,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  Wrench,
} from "lucide-react";

const contactLinks = {
  email:
    "mailto:akbarsalahudinpurnomo@gmail.com?subject=Kesempatan%20Internship%20-%20Akbar%20Salahudin%20Purnomo",
  github: "https://github.com/sxaksaa",
  phone: "+6287784727890",
  cv: "/documents/cv-akbar-salahudin-purnomo.pdf",
  deck: "/documents/portfolio-akbar-salahudin-purnomo.pptx",
} as const;

const highlights = [
  { value: "D3 TI", label: "Universitas Brawijaya" },
  { value: "3.85", label: "IPK terakhir" },
  { value: "3", label: "Project full stack" },
  { value: "Laravel", label: "Stack utama" },
] as const;

const skillGroups = [
  {
    icon: ServerCog,
    title: "Backend",
    items: ["PHP", "Laravel", "MVC", "REST/API Integration"],
  },
  {
    icon: Code2,
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "Blade"],
  },
  {
    icon: Database,
    title: "Database",
    items: ["MySQL", "Relational database design"],
  },
  {
    icon: Wrench,
    title: "Deployment",
    items: ["GitHub", "Railway", "Vercel"],
  },
] as const;

const projects = [
  {
    number: "01",
    name: "Aksa Xiterz",
    subtitle: "Digital License Storefront",
    url: "https://aksaxiterz.com",
    role: "Full Stack Developer",
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "QRIS/Pakasir", "Crypto Payment", "Binance Pay"],
    image: "/portfolio-deck/aksa-interface-flow.png",
    imageAlt: "Aksa Xiterz storefront, downloads, and public guides interface flow",
    summary:
      "Storefront lisensi digital dengan katalog, paket lisensi, cart checkout, voucher, riwayat pesanan, multi-payment, dan auto-delivery license key.",
    story: [
      {
        label: "Tantangan",
        text: "Pembelian lisensi digital butuh payment, stok key, dan pengiriman yang tetap sinkron.",
      },
      {
        label: "Solusi",
        text: "Checkout multi-payment dihubungkan ke status order, stok lisensi, dan auto-delivery.",
      },
      {
        label: "Yang saya buat",
        text: "Storefront, checkout, admin inventory/order, voucher, verification, dan fulfillment.",
      },
    ],
    bullets: [
      "Mengintegrasikan QRIS/Pakasir, direct crypto, dan Binance Pay dengan order sync, pay again, cancel order, serta verifikasi pembayaran otomatis.",
      "Membangun admin dashboard untuk produk, paket, stok lisensi, voucher, order, user, downloads, activity log, dan fulfillment license.",
      "Menambahkan Google login, public guides/downloads, dan HWID reset untuk mengurangi proses manual admin.",
    ],
    proof: "Bagian menariknya ada di business logic: payment, inventory lisensi, customer self-service, dan admin operation berada dalam satu alur.",
  },
  {
    number: "02",
    name: "EduVest",
    subtitle: "Video Learning Platform",
    url: "https://eduvest-production.up.railway.app",
    role: "Full Stack Developer",
    stack: ["Laravel", "MySQL", "YouTube Embed API", "Course Progress", "Admin Course"],
    image: "/portfolio-deck/eduvest-learning-journey.png",
    imageAlt: "EduVest course list, news, FAQ, and learning journey screens",
    summary:
      "Platform pembelajaran investasi saham dan kripto dengan autentikasi multi-user, course library, course detail, dashboard pengguna, profile, dan news page.",
    story: [
      {
        label: "Tantangan",
        text: "Materi investasi perlu alur belajar yang runtut agar pengguna tahu progresnya.",
      },
      {
        label: "Solusi",
        text: "Course dibuat dengan enrollment, progress materi, dan next material tracking.",
      },
      {
        label: "Yang saya buat",
        text: "Auth, course library, detail course, YouTube embed, dashboard, dan admin course.",
      },
    ],
    bullets: [
      "Membuat enrollment, progress materi, next material tracking, dan alur belajar berbasis video.",
      "Menggunakan YouTube Embed API untuk menampilkan materi pembelajaran dalam platform.",
      "Menyediakan admin course management untuk membuat, memperbarui, dan menghapus course serta konten pembelajaran.",
    ],
    proof: "Yang paling saya tekankan di project ini adalah alur belajar yang jelas, bukan hanya halaman landing.",
  },
  {
    number: "03",
    name: "BRL Fashion",
    subtitle: "Fashion E-Commerce",
    url: "https://brl-fashion-production.up.railway.app",
    role: "Full Stack Developer",
    stack: ["PHP", "Laravel", "Blade", "MySQL", "Cart", "Checkout"],
    image: "/portfolio-deck/brl-commerce-flow.png",
    imageAlt: "BRL Fashion product detail, cart, and checkout screens",
    summary:
      "Website e-commerce fashion dengan katalog produk, detail produk, cart, buy now, checkout, proses pembayaran, dan admin panel.",
    story: [
      {
        label: "Tantangan",
        text: "Produk fashion punya stok per ukuran, jadi checkout harus mencegah pembelian stok kosong.",
      },
      {
        label: "Solusi",
        text: "Validasi ukuran dan pengurangan stok dibuat dalam alur cart dan checkout.",
      },
      {
        label: "Yang saya buat",
        text: "Katalog, product detail, cart, buy now, checkout, payment flow, dan admin data.",
      },
    ],
    bullets: [
      "Menerapkan validasi stok per ukuran pakaian dan pengurangan stok saat checkout.",
      "Mengelola cart dan order menggunakan database transaction agar proses pembelian lebih aman.",
      "Membangun admin dashboard untuk produk, kategori, ukuran, user, stok, dan data cart/order.",
    ],
    proof: "Project ini memperlihatkan pemahaman alur commerce: katalog, keputusan beli, stok ukuran, cart, checkout, dan admin data.",
  },
] as const;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ActionLink({
  href,
  children,
  icon = "external",
  variant = "primary",
  download = false,
}: {
  href: string;
  children: React.ReactNode;
  icon?: "external" | "download" | "mail";
  variant?: "primary" | "secondary" | "dark";
  download?: boolean;
}) {
  const Icon = icon === "download" ? Download : icon === "mail" ? Mail : ArrowUpRight;

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      download={download || undefined}
      className={cx(
        "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2.5 text-sm font-bold transition-colors",
        variant === "primary" && "bg-violet-700 !text-white hover:bg-violet-800",
        variant === "secondary" && "border border-neutral-300 bg-white !text-neutral-950 hover:bg-neutral-100",
        variant === "dark" && "border border-violet-200 bg-violet-50 !text-violet-800 hover:bg-violet-100",
      )}
    >
      {children}
      <Icon aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

function MediaFrame({
  src,
  alt,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cx(
        "relative overflow-hidden rounded-md border border-neutral-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.10)]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes="(max-width: 768px) 92vw, (max-width: 1280px) 50vw, 760px"
        className="object-contain"
      />
    </figure>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal text-neutral-950 sm:text-5xl">
        {title}
      </h2>
      {body ? <p className="mt-5 text-lg leading-8 text-neutral-600">{body}</p> : null}
    </div>
  );
}

function WavyLineField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative min-h-[300px] overflow-hidden sm:min-h-[360px] lg:min-h-[560px]"
    >
      <svg
        className="absolute inset-[-8%] h-[116%] w-[116%]"
        viewBox="0 0 760 620"
        preserveAspectRatio="none"
      >
        <g
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-violet-300/70"
          strokeWidth="2.2"
        >
          <path d="M-20 52 C86 18 165 72 250 43 C358 6 474 38 556 19 C635 1 691 13 790 -18" />
          <path d="M-28 92 C74 53 150 114 250 81 C360 45 458 72 560 45 C650 21 710 38 792 8" />
          <path d="M-18 136 C84 88 170 157 270 124 C380 87 456 116 566 82 C654 55 716 70 796 42" />
          <path d="M-20 184 C72 126 178 203 286 165 C390 129 470 164 574 121 C650 89 720 100 798 72" />
          <path d="M-12 232 C72 169 174 250 298 207 C398 172 478 210 586 161 C660 128 725 140 800 106" />
          <path d="M0 282 C84 210 188 296 314 250 C414 214 486 255 592 203 C670 164 730 178 798 142" />
          <path d="M8 336 C98 258 205 346 330 294 C430 252 504 302 604 246 C676 206 740 214 800 184" />
          <path d="M22 390 C112 306 218 394 346 338 C442 296 516 350 612 290 C690 241 746 260 798 230" />
          <path d="M36 446 C122 358 232 448 362 388 C460 342 530 404 628 338 C700 289 754 310 804 280" />
          <path d="M48 502 C140 413 250 504 382 436 C475 388 548 458 642 389 C716 333 762 364 806 338" />
          <path d="M62 560 C154 466 270 558 402 490 C498 440 560 514 656 443 C730 388 774 418 808 394" />

          <path d="M120 -30 C160 58 102 146 146 232 C190 319 122 390 168 480 C194 532 194 575 170 650" />
          <path d="M190 -34 C242 60 178 152 220 236 C266 326 196 398 250 488 C286 548 276 590 244 654" />
          <path d="M270 -36 C326 56 258 146 298 236 C340 330 276 394 334 488 C374 554 364 596 330 658" />
          <path d="M355 -38 C406 48 346 138 386 230 C426 326 370 396 430 486 C474 552 464 594 428 654" />
          <path d="M438 -36 C488 44 432 128 476 222 C520 319 470 394 530 480 C578 550 570 596 532 652" />
          <path d="M520 -34 C572 42 520 122 564 212 C614 314 566 390 626 474 C676 544 672 596 638 650" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,248,251,0)_0%,rgba(247,248,251,0.22)_62%,rgba(247,248,251,0.82)_100%)]" />
    </div>
  );
}

function ProjectCase({ project }: { project: (typeof projects)[number] }) {
  return (
    <article
      id={project.name.toLowerCase().replaceAll(" ", "-")}
      className="grid gap-8 border-t border-neutral-200 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:py-20"
    >
      <div>
        <div className="flex items-center gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-violet-700 font-mono text-sm font-black text-white">
            {project.number}
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
              {project.role}
            </p>
            <h3 className="text-3xl font-black tracking-normal text-neutral-950 sm:text-4xl">
              {project.name}
            </h3>
          </div>
        </div>

        <p className="mt-5 text-xl font-bold text-violet-800">{project.subtitle}</p>
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
          {project.summary}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {project.story.map((item) => (
            <div
              key={item.label}
              className="rounded-md border border-neutral-200 bg-neutral-50 p-4"
            >
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-700">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{item.text}</p>
            </div>
          ))}
        </div>

        <ul className="mt-6 space-y-3">
          {project.bullets.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-neutral-700">
              <BadgeCheck
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-violet-700"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 border-l-4 border-violet-700 bg-violet-50 px-5 py-4">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-violet-900">
            Yang bisa dilihat
          </p>
          <p className="mt-2 text-sm leading-6 text-neutral-800">{project.proof}</p>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-bold text-neutral-800"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-8">
          <ActionLink href={project.url} variant="dark">
            Lihat project live
          </ActionLink>
        </div>
      </div>

      <MediaFrame
        src={project.image}
        alt={project.imageAlt}
        className="aspect-[16/10] lg:aspect-[16/9]"
      />
    </article>
  );
}

export function CinematicScrollExperience() {
  return (
    <main className="min-h-screen bg-[#f7f8fb] text-neutral-950">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/92 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href="#" className="text-sm font-black tracking-normal text-neutral-950">
            AKBAR
          </a>
          <div className="hidden items-center gap-7 text-sm font-bold text-neutral-600 md:flex">
            <a href="#profile" className="hover:text-neutral-950">
              Profile
            </a>
            <a href="#skills" className="hover:text-neutral-950">
              Skills
            </a>
            <a href="#projects" className="hover:text-neutral-950">
              Projects
            </a>
            <a href="#contact" className="hover:text-neutral-950">
              Contact
            </a>
          </div>
          <ActionLink href={contactLinks.cv} icon="download" variant="secondary" download>
            CV
          </ActionLink>
        </nav>
      </header>

      <section id="profile" className="relative overflow-hidden border-b border-neutral-200 bg-[#f7f8fb]">
        <div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(124,58,237,0.10),rgba(247,248,251,0))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:min-h-[calc(100vh-73px)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-10 lg:py-20">
          <div>
            <p className="inline-flex rounded-md border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-violet-800">
              Junior Laravel Full Stack Developer
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] tracking-normal text-neutral-950 sm:mt-7 sm:text-7xl lg:text-8xl">
              Akbar Salahudin Purnomo
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-700 sm:mt-7 sm:text-xl sm:leading-9">
              Mahasiswa D3 Teknologi Informasi Universitas Brawijaya yang fokus
              pada pengembangan web fullstack menggunakan Laravel, PHP, MySQL,
              JavaScript, REST API, dan antarmuka web responsif.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:max-w-none">
              <ActionLink href={contactLinks.cv} icon="download" download>
                Download CV
              </ActionLink>
              <ActionLink href={contactLinks.deck} icon="download" variant="secondary" download>
                Portfolio Deck
              </ActionLink>
              <ActionLink href={contactLinks.github} variant="secondary">
                GitHub
              </ActionLink>
            </div>

            <div className="mt-10 grid gap-x-8 gap-y-3 text-sm font-semibold leading-5 text-neutral-700 sm:grid-cols-[1.35fr_0.85fr]">
              <p className="flex min-w-0 items-start gap-2">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-700" />
                <span>Malang, Jawa Timur</span>
              </p>
              <p className="flex min-w-0 items-start gap-2">
                <GraduationCap aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-700" />
                <span>D3 Teknologi Informasi, Universitas Brawijaya</span>
              </p>
              <a
                href={contactLinks.email}
                className="flex min-w-0 items-start gap-2 hover:text-violet-800"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-700" />
                <span className="min-w-0 whitespace-nowrap">akbarsalahudinpurnomo@gmail.com</span>
              </a>
              <a
                href={contactLinks.phone}
                className="flex min-w-0 items-start gap-2 hover:text-violet-800"
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-700" />
                <span>+62 877 8472 7890</span>
              </a>
            </div>
          </div>

          <div className="relative lg:pl-8">
            <WavyLineField />
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-5 py-6 sm:grid-cols-4 sm:px-8 lg:px-10">
          {highlights.map((item) => (
            <div key={item.label} className="border-l border-neutral-200 pl-4">
              <p className="text-2xl font-black text-neutral-950">{item.value}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Keahlian Teknis"
            title="Stack yang biasa saya pakai di project."
            body="Saya biasa membangun fitur web dengan Laravel, menyusun data di MySQL, lalu merapikan tampilan memakai Blade, HTML, CSS, dan JavaScript. Setelah semuanya siap, saya sinkronkan ke GitHub, lalu deploy ke Railway atau Vercel."
          />

          <div className="grid gap-3">
            {skillGroups.map((group) => {
              const Icon = group.icon;

              return (
                <article
                  key={group.title}
                  className="grid gap-4 rounded-md border border-neutral-200 bg-white p-5 sm:grid-cols-[12rem_1fr] sm:items-start"
                >
                  <div className="flex items-center gap-3">
                    <Icon aria-hidden="true" className="h-5 w-5 text-violet-700" />
                    <h3 className="text-base font-black text-neutral-950">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm font-bold text-neutral-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="py-16 lg:py-20">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness aria-hidden="true" className="h-5 w-5 text-violet-700" />
              <p className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                Pengalaman Proyek
              </p>
            </div>
            <h2 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-normal text-neutral-950 sm:text-6xl">
              Tiga project utama yang paling relevan.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
              Beberapa project yang paling enak dilihat dulu: storefront lisensi
              digital, video learning platform, dan e-commerce fashion.
            </p>
          </div>

          {projects.map((project) => (
            <ProjectCase key={project.name} project={project} />
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-neutral-200 bg-[#f7f8fb]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.72fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-700">
              Fullstack Developer - Paid Internship
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-normal text-neutral-950 sm:text-6xl">
              Siap belajar di lingkungan developer profesional.
            </h2>
          </div>

          <div className="self-end">
            <p className="text-lg leading-8 text-neutral-700">
              Saya mencari kesempatan internship untuk mengembangkan kemampuan
              Laravel, backend, database, REST API, dan pengembangan aplikasi web
              secara lebih profesional.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href={contactLinks.email} icon="mail">
                Email saya
              </ActionLink>
              <ActionLink href={contactLinks.github} variant="secondary">
                GitHub
              </ActionLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-neutral-600">
              <a href={contactLinks.cv} download className="inline-flex items-center gap-2 hover:text-violet-800">
                <FileText aria-hidden="true" className="h-4 w-4" />
                CV PDF
              </a>
              <a href={contactLinks.deck} download className="inline-flex items-center gap-2 hover:text-violet-800">
                <ExternalLinkIcon aria-hidden="true" className="h-4 w-4" />
                Portfolio PPTX
              </a>
              <a href={contactLinks.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-violet-800">
                <GitBranch aria-hidden="true" className="h-4 w-4" />
                github.com/sxaksaa
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
