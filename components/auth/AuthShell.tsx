import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
  title: string;
  description: string;
  prompt: string;
  linkText: string;
  linkHref: string;
};


export default function AuthShell({
  children,
  title,
  description,
  prompt,
  linkText,
  linkHref,
}: AuthShellProps) {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 -z-10 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-indigo-200/40 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10 lg:min-h-[620px] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative isolate overflow-hidden bg-gradient-to-br from-[#102b57] via-[#173f79] to-[#302c70] px-6 py-7 text-white sm:px-9 sm:py-9 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full border-[40px] border-white/[0.06]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-16 -z-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-2xl"
          />

          <Link
            href="/"
            className="flex w-fit items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-blue-950"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-extrabold text-blue-800 shadow-lg">
              E
            </span>
            <span className="text-lg font-bold tracking-tight">EduPortal</span>
          </Link>

          <div className="mt-9 max-w-md lg:mt-0 lg:py-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200">
              Your learning community
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              A brighter future starts with one step.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100 sm:text-base sm:leading-7">
              Stay connected to your studies, school services, and the people
              who help you succeed.
            </p>

            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 backdrop-blur-sm sm:mt-9 sm:gap-4 sm:p-4">
              <div className="flex shrink-0 -space-x-2.5" aria-hidden="true">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#173765] bg-cyan-200 text-xs font-bold text-blue-950">
                  A
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#173765] bg-violet-200 text-xs font-bold text-blue-950">
                  S
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#173765] bg-amber-100 text-xs font-bold text-blue-950">
                  M
                </span>
              </div>
              <p className="text-xs leading-5 text-blue-50 sm:text-sm">
                One place for your education journey
              </p>
            </div>
          </div>
      <p className="mt-7 text-xs font-medium tracking-wide text-blue-200 lg:mt-0">
            Learn <span className="mx-1 text-cyan-300">Â·</span> Grow{" "}
            <span className="mx-1 text-cyan-300">Â·</span> Achieve
          </p>
        </aside>
        <section className="flex items-center justify-center px-5 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div className="w-full max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
              Welcome to EduPortal
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              {description}
            </p>
     <div className="mt-8">{children}</div>
          <p className="mt-7 text-center text-sm text-slate-600">
              {prompt}{" "}
              <Link
                href={linkHref}
                className="font-semibold text-blue-700 underline decoration-blue-200 underline-offset-4 transition hover:text-blue-900 hover:decoration-blue-700"
              >
                {linkText}
              </Link>
            </p>
            <p className="mt-8 border-t border-slate-100 pt-5 text-center text-xs leading-5 text-slate-400">
              Demo interface only. Authentication is not connected to a secure
              user database.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
