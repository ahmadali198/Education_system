"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  clearDemoSession,
  getDemoSessionSnapshot,
  parseDemoSession,
  subscribeDemoSession,
} from "@/lib/auth/demo-session";

const LOADING_SESSION = "__demo_session_loading__";

function getServerSessionSnapshot() {
  return LOADING_SESSION;
}

const shortcuts = [
  {
    label: "My student profile",
    detail: "Browse the sample student directory",
    href: "/academic/sis/students",
    tint: "bg-blue-50 text-blue-700",
  },
  {
    label: "Classes and subjects",
    detail: "Explore the course catalog",
    href: "/academic/courses",
    tint: "bg-violet-50 text-violet-700",
  },
  {
    label: "Attendance",
    detail: "View the sample daily register",
    href: "/academic/sis/attendance",
    tint: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "School announcements",
    detail: "Read the latest campus news",
    href: "/news",
    tint: "bg-amber-50 text-amber-700",
  },
];

export default function StudentDashboardPage() {
  const router = useRouter();

  const rawSession = useSyncExternalStore(
    subscribeDemoSession,
    getDemoSessionSnapshot,
    getServerSessionSnapshot,
  );

  const isLoading = rawSession === LOADING_SESSION;
  const user = isLoading ? null : parseDemoSession(rawSession);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  function signOut() {
    clearDemoSession();
    router.replace("/login");
  }

  if (isLoading || !user) {
    return (
      <main className="flex min-h-[55vh] items-center justify-center text-sm text-slate-500">
        Loading your dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Student portal
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Good to see you, {user.name}
            </h1>
            <p className="mt-2 text-slate-600">
              Here are a few places to continue exploring.
            </p>
          </div>

          <button
            onClick={signOut}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Sign out
          </button>
        </div>

        <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <strong>Demo dashboard.</strong> This browser-only session is for
          previewing the interface. It does not authenticate a real account or
          protect student data.
        </div>

        <section
          className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Student portal shortcuts"
        >
          {shortcuts.map((shortcut, index) => (
            <Link
              key={shortcut.href}
              href={shortcut.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold ${shortcut.tint}`}
              >
                0{index + 1}
              </div>
              <h2 className="mt-5 font-bold text-slate-900 group-hover:text-blue-700">
                {shortcut.label}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {shortcut.detail}
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-blue-700">
                Open page →
              </span>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-2xl bg-gradient-to-r from-blue-800 to-indigo-700 p-7 text-white sm:p-9">
          <p className="text-sm font-semibold text-blue-200">
            Ready for what’s next?
          </p>
          <h2 className="mt-2 text-2xl font-bold">
            Explore programs and start an application
          </h2>
          <p className="mt-2 max-w-2xl leading-7 text-blue-100">
            Review available areas of study or try the admissions form in this
            demo.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/programs"
              className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-800 hover:bg-blue-50"
            >
              Explore programs
            </Link>
            <Link
              href="/admissions/apply"
              className="rounded-lg border border-white/40 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Apply now
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
