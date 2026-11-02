"use client";

import { FormEvent, useMemo, useState } from "react";

type Course = { code: string; name: string; program: string; instructor: string; credits: number; semester: string };

const initialCourses: Course[] = [
  { code: "CS-201", name: "Data Structures and Algorithms", program: "Computer Science", instructor: "Dr. Nadia Malik", credits: 3, semester: "Fall 2026" },
  { code: "CS-105", name: "Introduction to Programming", program: "Computer Science", instructor: "Mr. Ahmed Raza", credits: 4, semester: "Fall 2026" },
  { code: "BA-210", name: "Principles of Marketing", program: "Business Administration", instructor: "Mr. Omar Siddiqui", credits: 3, semester: "Fall 2026" },
  { code: "ENG-301", name: "Applied Thermodynamics", program: "Engineering", instructor: "Dr. Farah Iqbal", credits: 3, semester: "Fall 2026" },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [program, setProgram] = useState("Computer Science");
  const [instructor, setInstructor] = useState("");
  const [credits, setCredits] = useState("3");

  const visibleCourses = useMemo(() => {
    const search = query.trim().toLowerCase();
    return courses.filter((course) => `${course.code} ${course.name} ${course.program} ${course.instructor}`.toLowerCase().includes(search));
  }, [courses, query]);

  function addCourse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCourses((current) => [{ code: code.toUpperCase(), name, program, instructor, credits: Number(credits), semester: "Fall 2026" }, ...current]);
    setCode(""); setName(""); setInstructor(""); setOpen(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Academic management</p>
        <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Classes and subjects</h1><p className="mt-2 text-slate-600">Browse courses, subjects, instructors, and credit hours.</p></div>
          <button onClick={() => setOpen((current) => !current)} className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">{open ? "Cancel" : "+ Add subject"}</button>
        </div>

        {open && <form onSubmit={addCourse} className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">New subject</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <label className="text-sm font-medium text-slate-700">Subject code<input required value={code} onChange={(event) => setCode(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal" placeholder="CS-220" /></label>
            <label className="text-sm font-medium text-slate-700">Subject name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal" placeholder="Database Systems" /></label>
            <label className="text-sm font-medium text-slate-700">Program<select value={program} onChange={(event) => setProgram(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal"><option>Computer Science</option><option>Business Administration</option><option>Engineering</option></select></label>
            <label className="text-sm font-medium text-slate-700">Instructor<input required value={instructor} onChange={(event) => setInstructor(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal" placeholder="Instructor name" /></label>
            <label className="text-sm font-medium text-slate-700">Credit hours<input required type="number" min="1" max="6" value={credits} onChange={(event) => setCredits(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal" /></label>
          </div>
          <button type="submit" className="mt-5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">Save subject</button>
        </form>}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Subjects</p><p className="mt-2 text-3xl font-bold text-slate-950">{courses.length}</p></div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Programs</p><p className="mt-2 text-3xl font-bold text-blue-700">{new Set(courses.map((course) => course.program)).size}</p></div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Current term</p><p className="mt-2 text-3xl font-bold text-slate-950">Fall 2026</p></div>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold text-slate-900">Course catalog</h2><p className="mt-1 text-sm text-slate-500">{visibleCourses.length} subjects shown</p></div><label className="sr-only" htmlFor="course-search">Search courses</label><input id="course-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search code, subject, or program" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm sm:max-w-sm" /></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Subject</th><th className="px-5 py-4 font-semibold">Program</th><th className="px-5 py-4 font-semibold">Instructor</th><th className="px-5 py-4 font-semibold">Credits</th><th className="px-5 py-4 font-semibold">Term</th></tr></thead><tbody className="divide-y divide-slate-100">{visibleCourses.map((course) => <tr key={course.code} className="hover:bg-slate-50"><td className="px-5 py-4"><p className="font-semibold text-slate-900">{course.name}</p><p className="mt-1 text-slate-500">{course.code}</p></td><td className="px-5 py-4 text-slate-600">{course.program}</td><td className="px-5 py-4 text-slate-600">{course.instructor}</td><td className="px-5 py-4 text-slate-600">{course.credits}</td><td className="px-5 py-4 text-slate-600">{course.semester}</td></tr>)}{visibleCourses.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-500">No subjects match your search.</td></tr>}</tbody></table></div>
        </div>
        <p className="mt-4 text-xs text-slate-500">Sample subjects and changes are temporary and reset when you reload.</p>
      </div>
    </main>
  );
}
