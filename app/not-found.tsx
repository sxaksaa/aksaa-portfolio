import Link from "next/link";
import { ArrowLeft, FileText, GitBranch, Mail } from "lucide-react";

const emailLink =
  "mailto:akbarsalahudinpurnomo@gmail.com?subject=Kesempatan%20Internship%20-%20Akbar%20Salahudin%20Purnomo";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f7f8fb] text-neutral-950">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-10">
        <div>
          <p className="inline-flex rounded-md border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-violet-800">
            404 - Halaman tidak ditemukan
          </p>
          <h1 className="mt-6 text-5xl font-black leading-none tracking-normal sm:text-7xl">
            Link ini belum ada.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-700">
            Kemungkinan URL-nya salah ketik atau halaman yang dicari sudah
            dipindahkan. Portfolio utama, CV, dan GitHub tetap bisa dibuka dari
            sini.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-violet-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-800"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              Kembali ke portfolio
            </Link>
            <a
              href={emailLink}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm font-bold text-neutral-950 transition-colors hover:bg-neutral-100"
            >
              Email saya
              <Mail aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid gap-3 rounded-md border border-neutral-200 bg-white p-5">
          <Link
            href="/#projects"
            className="flex items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 p-4 text-sm font-bold text-neutral-800 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800"
          >
            Lihat project utama
            <FileText aria-hidden="true" className="h-4 w-4" />
          </Link>
          <a
            href="/documents/cv-akbar-salahudin-purnomo.pdf"
            download
            className="flex items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 p-4 text-sm font-bold text-neutral-800 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800"
          >
            Download CV PDF
            <FileText aria-hidden="true" className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/sxaksaa"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 p-4 text-sm font-bold text-neutral-800 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800"
          >
            Buka GitHub
            <GitBranch aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
