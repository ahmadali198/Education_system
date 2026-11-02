"use client";
import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { saveDemoProfile, saveDemoSession } from "@/lib/auth/demo-session";


const inputClassName =
  "mt-2 block h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100";


export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  const passwordChecks = useMemo(
    () => ({
      length: password.length >= 8,
      number: /\d/.test(password),
    }),
    [password],
  );

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Enter your full name to create a profile.");
      return;
    }

    if (!passwordChecks.length || !passwordChecks.number) {
      setError("Your password needs at least 8 characters and one number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords don’t match yet.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please confirm that you understand this is a demo profile.");
      return;
    }
 saveDemoProfile({ name: name.trim(), email: email.trim() });
saveDemoSession(
  {    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: "Student",
  },
  true,
);

    router.push("/auth/dashboard");
  }

  return (
    <AuthShell
      title="Create your account"
      description="Set up your student profile and explore the EduPortal demo."
      prompt="Already have an account?"
      linkText="Sign in"
      linkHref="/login"
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm9-3v6m3-3h-6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Student profile
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              A few details to get you started
            </p>
          </div>
        </div>

        <label
          htmlFor="full-name"
          className="block text-sm font-semibold text-slate-700"
        >
          Full name
          <input
            id="full-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Alex Morgan"
            className={inputClassName}
          />
        </label>

        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700"
        >
          Email address
          <input
            id="email"
            name="email"
            autoComplete="email"
            required
            type="email"
            maxLength={254}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className={inputClassName}
          />
        </label>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-slate-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              autoComplete="new-password"
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              className={`${inputClassName} pr-20`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute inset-y-2 right-2 rounded-lg px-3 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div
            aria-live="polite"
            className="mt-3 flex flex-wrap gap-x-5 gap-y-2"
          >
            <PasswordCheck met={passwordChecks.length}>
              8 characters minimum
            </PasswordCheck>
            <PasswordCheck met={passwordChecks.number}>
              One number
            </PasswordCheck>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-semibold text-slate-700"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              name="confirmPassword"
              autoComplete="new-password"
              required
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Enter your password again"
              className={`${inputClassName} ${
                passwordsMatch
                  ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-100"
                  : ""
              }`}
            />
            {passwordsMatch && (
              <span className="absolute inset-y-0 right-4 flex items-center text-xs font-semibold text-emerald-700">
                Matches
              </span>
            )}
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-xs leading-5 text-slate-600 transition hover:border-slate-300">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          <span>
            This creates a demo profile in this browser only. It is not a secure
            account, and your password is not stored.
          </span>
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-5 text-rose-800"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-blue-900/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 active:translate-y-0"
        >
          Create demo account
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          >
            <path
              d="M4 10h12m-5-5 5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </AuthShell>
  );
}

function PasswordCheck({
  met,
  children,
}: {
  met: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs ${
        met ? "text-emerald-700" : "text-slate-500"
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
          met ? "bg-emerald-100" : "bg-slate-100"
        }`}
      >
        {met ? "✓" : "·"}
      </span>
      {children}
    </span>
  );
}