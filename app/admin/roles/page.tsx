"use client";

import { useState } from "react";

const permissions = ["View student records", "Edit student records", "Manage attendance", "View fee structure", "Manage fees", "Manage users and roles"];
const initialRoles = [
  { name: "Administrator", description: "Manage school settings and users", allowed: [true, true, true, true, true, true] },
  { name: "Teacher", description: "Manage classes and student attendance", allowed: [true, false, true, false, false, false] },
  { name: "Student", description: "View personal academic information", allowed: [true, false, false, false, false, false] },
  { name: "Finance staff", description: "Manage fee information", allowed: [false, false, false, true, true, false] },
];

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles);
  function toggle(roleIndex: number, permissionIndex: number) {
    setRoles(current => current.map((role, index) => index === roleIndex ? { ...role, allowed: role.allowed.map((allowed, pIndex) => pIndex === permissionIndex ? !allowed : allowed) } : role));
  }
  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-7xl">
    <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Administration</p><h1 className="mt-2 text-3xl font-bold text-slate-950">Role based access</h1><p className="mt-2 max-w-2xl text-slate-600">Review which school tasks belong to each role.</p>
    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><strong>Permission matrix preview:</strong> Changes here are temporary and do not protect pages. Secure role access requires sign-in, server checks, and persistent user roles.</div>
    <div className="mt-7 overflow-x-auto rounded-2xl border bg-white shadow-sm"><table className="w-full min-w-[980px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4 font-semibold">Role</th>{permissions.map(p => <th key={p} className="max-w-36 px-3 py-4 text-center font-semibold">{p}</th>)}</tr></thead><tbody className="divide-y">{roles.map((role, rIndex) => <tr key={role.name}><td className="px-5 py-5"><p className="font-semibold text-slate-900">{role.name}</p><p className="mt-1 max-w-48 text-xs text-slate-500">{role.description}</p></td>{role.allowed.map((allowed, pIndex) => <td key={permissions[pIndex]} className="px-3 py-5 text-center"><button type="button" onClick={() => toggle(rIndex, pIndex)} aria-label={`${role.name}: ${permissions[pIndex]} ${allowed ? "allowed" : "denied"}`} aria-pressed={allowed} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${allowed ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{allowed ? "Allowed" : "Denied"}</button></td>)}</tr>)}</tbody></table></div>
    <p className="mt-4 text-xs text-slate-500">Role changes are only held in this browser page and reset on reload.</p>
  </div></main>;
}
