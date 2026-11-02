"use client";

import { useMemo, useState } from "react";

type Mark = "Present" | "Absent" | "Late";
const initial = [
  { id: "STU-2026-001", name: "Ayesha Khan", program: "Computer Science", mark: "Present" as Mark },
  { id: "STU-2026-002", name: "Hamza Ali", program: "Business Administration", mark: "Present" as Mark },
  { id: "STU-2026-003", name: "Sara Ahmed", program: "Engineering", mark: "Absent" as Mark },
  { id: "STU-2026-004", name: "Usman Raza", program: "Computer Science", mark: "Late" as Mark },
  { id: "STU-2026-005", name: "Hiba Noor", program: "Engineering", mark: "Present" as Mark },
];

export default function AttendancePage() {
  const [students, setStudents] = useState(initial);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => students.filter(s => `${s.name} ${s.id} ${s.program}`.toLowerCase().includes(query.toLowerCase())), [students, query]);
  function update(id: string, mark: Mark) { setStudents(current => current.map(s => s.id === id ? { ...s, mark } : s)); }
  const present = students.filter(s => s.mark === "Present").length;
  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-6xl">
    <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Academic management</p><div className="mt-2"><h1 className="text-3xl font-bold text-slate-950">Attendance</h1><p className="mt-2 text-slate-600">Record daily attendance by student.</p></div>
    <div className="mt-7 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border bg-white p-5"><p className="text-sm text-slate-500">Students listed</p><p className="mt-2 text-3xl font-bold">{students.length}</p></div><div className="rounded-2xl border bg-white p-5"><p className="text-sm text-slate-500">Present</p><p className="mt-2 text-3xl font-bold text-emerald-700">{present}</p></div><div className="rounded-2xl border bg-white p-5"><p className="text-sm text-slate-500">Attendance rate</p><p className="mt-2 text-3xl font-bold text-blue-700">{Math.round((present / students.length) * 100)}%</p></div></div>
    <div className="mt-7 overflow-hidden rounded-2xl border bg-white shadow-sm"><div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold">Daily register</h2><p className="mt-1 text-sm text-slate-500">{new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(new Date())}</p></div><input value={query} onChange={e => setQuery(e.target.value)} aria-label="Search students" placeholder="Search students" className="rounded-lg border px-4 py-2.5 text-sm sm:w-72" /></div><div className="divide-y">{visible.map(student => <div key={student.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-slate-900">{student.name}</p><p className="mt-1 text-sm text-slate-500">{student.id} · {student.program}</p></div><div className="flex gap-2">{(["Present", "Absent", "Late"] as Mark[]).map(mark => <button key={mark} onClick={() => update(student.id, mark)} aria-pressed={student.mark === mark} className={`rounded-lg px-3 py-2 text-xs font-semibold ${student.mark === mark ? mark === "Present" ? "bg-emerald-600 text-white" : mark === "Absent" ? "bg-rose-600 text-white" : "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{mark}</button>)}</div></div>)}{visible.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No students found.</p>}</div></div>
    <p className="mt-4 text-xs text-slate-500">Attendance changes are temporary demo data and reset when you reload.</p>
  </div></main>;
}
