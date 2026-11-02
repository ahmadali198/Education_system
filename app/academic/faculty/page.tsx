"use client";

import { FormEvent, useMemo, useState } from "react";

type StaffMember = {
  id: string;
  name: string;
  email: string;
  title: string;
  department: string;
  status: "Active" | "On leave";
};

const initialStaff: StaffMember[] = [
  { id: "STF-001", name: "Dr. Nadia Malik", email: "nadia.malik@example.edu", title: "Senior Lecturer", department: "Computer Science", status: "Active" },
  { id: "STF-002", name: "Mr. Omar Siddiqui", email: "omar.siddiqui@example.edu", title: "Lecturer", department: "Business Administration", status: "Active" },
  { id: "STF-003", name: "Dr. Farah Iqbal", email: "farah.iqbal@example.edu", title: "Associate Professor", department: "Engineering", status: "On leave" },
  { id: "STF-004", name: "Ms. Sana Qureshi", email: "sana.qureshi@example.edu", title: "Admissions Officer", department: "Administration", status: "Active" },
];

export default function FacultyPage() {
  const [staff, setStaff] = useState(initialStaff);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("Teacher");
  const [department, setDepartment] = useState("Computer Science");

  const filteredStaff = useMemo(() => {
    const search = query.trim().toLowerCase();
    return staff.filter((member) =>
      `${member.name} ${member.email} ${member.title} ${member.department}`.toLowerCase().includes(search),
    );
  }, [query, staff]);

  function addStaffMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStaff((current) => [{ id: `STF-${String(current.length + 1).padStart(3, "0")}`, name, email, title, department, status: "Active" }, ...current]);
    setName("");
    setEmail("");
    setShowForm(false);
  }

  const activeCount = staff.filter((member) => member.status === "Active").length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Academic management</p>
        <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Teachers and staff</h1>
            <p className="mt-2 text-slate-600">Manage staff profiles, roles, and departments.</p>
          </div>
          <button onClick={() => setShowForm((open) => !open)} className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-800">
            {showForm ? "Cancel" : "+ Add staff member"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={addStaffMember} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">New staff profile</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <label className="text-sm font-medium text-slate-700">Full name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal" placeholder="Staff member name" /></label>
              <label className="text-sm font-medium text-slate-700">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal" placeholder="name@example.edu" /></label>
              <label className="text-sm font-medium text-slate-700">Role or title<select value={title} onChange={(event) => setTitle(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal"><option>Teacher</option><option>Lecturer</option><option>Professor</option><option>Admissions Officer</option><option>Administrator</option></select></label>
              <label className="text-sm font-medium text-slate-700">Department<select value={department} onChange={(event) => setDepartment(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal"><option>Computer Science</option><option>Business Administration</option><option>Engineering</option><option>Administration</option></select></label>
            </div>
            <button type="submit" className="mt-5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">Save staff profile</button>
          </form>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Total staff</p><p className="mt-2 text-3xl font-bold text-slate-950">{staff.length}</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Active</p><p className="mt-2 text-3xl font-bold text-emerald-700">{activeCount}</p></div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Departments</p><p className="mt-2 text-3xl font-bold text-blue-700">{new Set(staff.map((member) => member.department)).size}</p></div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="font-bold text-slate-900">Staff directory</h2><p className="mt-1 text-sm text-slate-500">{filteredStaff.length} profiles shown</p></div>
            <label className="sr-only" htmlFor="staff-search">Search staff</label>
            <input id="staff-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, role, or department" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm sm:max-w-sm" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-4 font-semibold">Staff member</th><th className="px-5 py-4 font-semibold">Staff ID</th><th className="px-5 py-4 font-semibold">Role</th><th className="px-5 py-4 font-semibold">Department</th><th className="px-5 py-4 font-semibold">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStaff.map((member) => <tr key={member.id} className="hover:bg-slate-50"><td className="px-5 py-4"><p className="font-semibold text-slate-900">{member.name}</p><p className="mt-1 text-slate-500">{member.email}</p></td><td className="px-5 py-4 text-slate-600">{member.id}</td><td className="px-5 py-4 text-slate-600">{member.title}</td><td className="px-5 py-4 text-slate-600">{member.department}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${member.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{member.status}</span></td></tr>)}
                {filteredStaff.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-500">No staff members match your search.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">Sample profiles and changes are temporary and reset when you reload.</p>
      </div>
    </main>
  );
}
