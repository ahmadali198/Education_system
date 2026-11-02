"use client";

import { FormEvent, useMemo, useState } from "react";

type Student = {
  id: string;
  name: string;
  email: string;
  program: string;
  year: string;
  status: "Active" | "Pending";
};

const initialStudents: Student[] = [
  { id: "STU-2026-001", name: "Ayesha Khan", email: "ayesha.khan@example.edu", program: "Computer Science", year: "Year 2", status: "Active" },
  { id: "STU-2026-002", name: "Hamza Ali", email: "hamza.ali@example.edu", program: "Business Administration", year: "Year 1", status: "Active" },
  { id: "STU-2026-003", name: "Sara Ahmed", email: "sara.ahmed@example.edu", program: "Engineering", year: "Year 3", status: "Pending" },
  { id: "STU-2026-004", name: "Usman Raza", email: "usman.raza@example.edu", program: "Computer Science", year: "Year 4", status: "Active" },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("Computer Science");

  const filteredStudents = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return students;
    return students.filter((student) =>
      `${student.name} ${student.email} ${student.id} ${student.program}`.toLowerCase().includes(search),
    );
  }, [query, students]);

  function addStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextNumber = students.length + 1;
    setStudents((current) => [
      { id: `STU-2026-${String(nextNumber).padStart(3, "0")}`, name, email, program, year: "Year 1", status: "Pending" },
      ...current,
    ]);
    setName("");
    setEmail("");
    setShowForm(false);
  }

  const activeCount = students.filter((student) => student.status === "Active").length;

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Academic management</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Student records</h1>
            <p className="mt-2 text-slate-600">View and manage student profiles and enrollment details.</p>
          </div>
          <button onClick={() => setShowForm((open) => !open)} className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
            {showForm ? "Cancel" : "+ Add student"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={addStudent} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">New student</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <label className="text-sm font-medium text-slate-700">Full name
                <input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="Student name" />
              </label>
              <label className="text-sm font-medium text-slate-700">Email address
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="student@example.edu" />
              </label>
              <label className="text-sm font-medium text-slate-700">Program
                <select value={program} onChange={(event) => setProgram(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
                  <option>Computer Science</option><option>Business Administration</option><option>Engineering</option>
                </select>
              </label>
            </div>
            <button type="submit" className="mt-5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">Save student</button>
          </form>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Total students</p><p className="mt-2 text-3xl font-bold text-slate-950">{students.length}</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Active students</p><p className="mt-2 text-3xl font-bold text-emerald-700">{activeCount}</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Pending enrollment</p><p className="mt-2 text-3xl font-bold text-amber-600">{students.length - activeCount}</p></div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="font-bold text-slate-900">All students</h2><p className="mt-1 text-sm text-slate-500">{filteredStudents.length} records shown</p></div>
            <label className="sr-only" htmlFor="student-search">Search students</label>
            <input id="student-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, email, ID, or program" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:max-w-sm" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Student</th><th className="px-5 py-4 font-semibold">Student ID</th><th className="px-5 py-4 font-semibold">Program</th><th className="px-5 py-4 font-semibold">Year</th><th className="px-5 py-4 font-semibold">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => <tr key={student.id} className="hover:bg-slate-50"><td className="px-5 py-4"><p className="font-semibold text-slate-900">{student.name}</p><p className="mt-1 text-slate-500">{student.email}</p></td><td className="px-5 py-4 text-slate-600">{student.id}</td><td className="px-5 py-4 text-slate-600">{student.program}</td><td className="px-5 py-4 text-slate-600">{student.year}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${student.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{student.status}</span></td></tr>)}
                {filteredStudents.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-500">No students match your search.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
