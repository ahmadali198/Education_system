"use client";

import { FormEvent, useState } from "react";

type Application = { id: string; name: string; email: string; program: string; submitted: string; status: "Under review" | "Accepted" };

const seed: Application[] = [
  { id: "APP-2026-014", name: "Mariam Shah", email: "mariam.shah@example.com", program: "Computer Science", submitted: "Oct 12, 2026", status: "Under review" },
  { id: "APP-2026-013", name: "Bilal Hussain", email: "bilal.h@example.com", program: "Business Administration", submitted: "Oct 10, 2026", status: "Accepted" },
  { id: "APP-2026-012", name: "Noor Fatima", email: "noor.f@example.com", program: "Engineering", submitted: "Oct 08, 2026", status: "Under review" },
];

export default function EnrollmentPage() {
  const [applications, setApplications] = useState(seed);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("Computer Science");

  function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApplications((current) => [{ id: `APP-2026-${String(15 + current.length - seed.length).padStart(3, "0")}`, name, email, program, submitted: new Intl.DateTimeFormat("en", { month: "short", day: "2-digit", year: "numeric" }).format(new Date()), status: "Under review" }, ...current]);
    setName(""); setEmail(""); setFormOpen(false);
  }

  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-6xl">
    <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Admissions</p><div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-3xl font-bold text-slate-950">Student enrollment</h1><p className="mt-2 text-slate-600">Review applications and register prospective students.</p></div><button onClick={() => setFormOpen(!formOpen)} className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">{formOpen ? "Close form" : "+ New application"}</button></div>
    {formOpen && <form onSubmit={submitApplication} className="mt-7 rounded-2xl border bg-white p-6 shadow-sm"><h2 className="font-bold text-slate-900">Applicant details</h2><div className="mt-4 grid gap-4 md:grid-cols-3"><label className="text-sm font-medium">Full name<input required value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal" placeholder="Applicant name" /></label><label className="text-sm font-medium">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal" placeholder="name@example.com" /></label><label className="text-sm font-medium">Program<select value={program} onChange={e => setProgram(e.target.value)} className="mt-2 w-full rounded-lg border bg-white px-3 py-2.5 font-normal"><option>Computer Science</option><option>Business Administration</option><option>Engineering</option></select></label></div><button className="mt-5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white">Submit application</button></form>}
    <div className="mt-7 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border bg-white p-5"><p className="text-sm text-slate-500">Applications</p><p className="mt-2 text-3xl font-bold">{applications.length}</p></div><div className="rounded-2xl border bg-white p-5"><p className="text-sm text-slate-500">Under review</p><p className="mt-2 text-3xl font-bold text-amber-600">{applications.filter(a => a.status === "Under review").length}</p></div><div className="rounded-2xl border bg-white p-5"><p className="text-sm text-slate-500">Accepted</p><p className="mt-2 text-3xl font-bold text-emerald-700">{applications.filter(a => a.status === "Accepted").length}</p></div></div>
    <div className="mt-7 overflow-x-auto rounded-2xl border bg-white shadow-sm"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>{["Applicant", "Application ID", "Program", "Submitted", "Status"].map(x => <th key={x} className="px-5 py-4 font-semibold">{x}</th>)}</tr></thead><tbody className="divide-y">{applications.map(a => <tr key={a.id}><td className="px-5 py-4"><p className="font-semibold">{a.name}</p><p className="mt-1 text-slate-500">{a.email}</p></td><td className="px-5 py-4 text-slate-600">{a.id}</td><td className="px-5 py-4 text-slate-600">{a.program}</td><td className="px-5 py-4 text-slate-600">{a.submitted}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${a.status === "Accepted" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{a.status}</span></td></tr>)}</tbody></table></div>
    <p className="mt-4 text-xs text-slate-500">Demo data is held in this page only and resets when you reload.</p>
  </div></main>;
}
