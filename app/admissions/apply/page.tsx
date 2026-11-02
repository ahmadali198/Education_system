"use client";

import { FormEvent, useState } from "react";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSending(true);
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          program: formData.get("program"),
          previousEducation: formData.get("previousEducation"),
        }),
      });
      const responseText = await response.text();
      let result: { error?: string; testMode?: boolean };
      try {
        result = JSON.parse(responseText) as { error?: string };
      } catch {
        throw new Error(
          response.ok
            ? "The server returned an unexpected response. Please restart the app and try again."
            : `The application server returned an error (HTTP ${response.status}). Check the terminal running the app for details.`,
        );
      }
      if (!response.ok) throw new Error(result.error || `We could not submit your application (HTTP ${response.status}).`);
      if (result.testMode) {
        setError("Test mode is on: Resend simulated the test email; it was not delivered to the applicant.");
      }
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not submit your application. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-slate-950 px-7 py-10 text-white sm:px-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400">Admissions</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Apply to EduPortal</h1>
          <p className="mt-4 leading-7 text-slate-300">Complete the form to submit your application of interest. Our admissions team will follow up with next steps.</p>
        </div>

        {submitted ? (
          <div role="status" className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
            <h2 className="text-xl font-bold text-emerald-900">Application received</h2>
            <p className="mt-2 leading-7 text-emerald-800">Thank you for your interest. {error || "A confirmation email has been sent to the address you provided."}</p>
            <button onClick={() => setSubmitted(false)} className="mt-5 font-semibold text-emerald-900 underline">Submit another application</button>
          </div>
        ) : (
          <form onSubmit={submitApplication} className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div><h2 className="text-xl font-bold text-slate-900">Applicant information</h2><p className="mt-1 text-sm text-slate-500">Fields marked required must be completed.</p></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">First name *<input name="firstName" required autoComplete="given-name" maxLength={80} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="First name" /></label>
              <label className="text-sm font-medium text-slate-700">Last name *<input name="lastName" required autoComplete="family-name" maxLength={80} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="Last name" /></label>
              <label className="text-sm font-medium text-slate-700">Email address *<input name="email" required type="email" autoComplete="email" maxLength={254} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="you@example.com" /></label>
              <label className="text-sm font-medium text-slate-700">Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={30} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="+92 300 0000000" /></label>
              <label className="text-sm font-medium text-slate-700 sm:col-span-2">Program of interest *<select name="program" required defaultValue="" className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"><option value="" disabled>Select a program</option><option>Computer Science</option><option>Business Administration</option><option>Engineering</option><option>Information Technology</option><option>Accounting & Finance</option><option>English & Humanities</option></select></label>
              <label className="text-sm font-medium text-slate-700 sm:col-span-2">Previous education<textarea name="previousEducation" maxLength={1000} rows={3} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="Tell us about your most recent education" /></label>
            </div>
            {error && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
            <button type="submit" disabled={isSending} className="w-full rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60 sm:w-auto">{isSending ? "Sending application…" : "Submit application"}</button>
            <p className="text-xs text-slate-500">Application details are not saved in a student database. In test mode, Resend simulates delivery instead of emailing the applicant.</p>
          </form>
        )}
      </div>
    </main>
  );
}
