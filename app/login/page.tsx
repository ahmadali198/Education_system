"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import {
  readDemoProfileName,
  saveDemoSession,
} from "@/lib/auth/demo-session";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    const displayName =
      readDemoProfileName(normalizedEmail) ??
      normalizedEmail
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

    saveDemoSession(
      {
        name: displayName,
        email: normalizedEmail,
        role: "Student",
      },
      remember,
    );

    router.replace("/auth/dashboard");
  }

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to continue to your EduPortal dashboard."
      prompt="New to EduPortal?"
      linkText="Create an account"
      linkHref="/signup"
    >
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-900">
        <strong>Demo sign-in:</strong> Any valid email and non-empty password
        will open the sample dashboard. Don&apos;t enter a real password.
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <label className="block text-sm font-semibold text-slate-700">
          Email address
          <input
            autoComplete="email"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Password
          <span className="relative mt-2 block">
            <input
              autoComplete="current-password"
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter any password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-20 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute inset-y-0 right-3 my-auto h-fit text-xs font-bold text-blue-700 hover:text-blue-900"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </span>
        </label>

        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-blue-700"
            />
            Keep me signed in
          </label>
          <span className="text-xs text-slate-400">
            Password recovery unavailable in demo
          </span>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-rose-50 px-3 py-2.5 text-sm text-rose-800"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-700 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          Sign in to dashboard
        </button>
      </form>
    </AuthShell>
  );
}