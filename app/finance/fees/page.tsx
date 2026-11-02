"use client";

import { FormEvent, useState } from "react";

type Fee = { name: string; program: string; amount: number; period: string };
const initialFees: Fee[] = [
  { name: "Tuition fee", program: "Computer Science", amount: 85000, period: "Per semester" },
  { name: "Tuition fee", program: "Business Administration", amount: 78000, period: "Per semester" },
  { name: "Tuition fee", program: "Engineering", amount: 92000, period: "Per semester" },
  { name: "Registration fee", program: "All programs", amount: 5000, period: "One time" },
];

const currency = new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 });

export default function FeesPage() {
  const [fees, setFees] = useState(initialFees);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [program, setProgram] = useState("All programs");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("Per semester");
  function addFee(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setFees(current => [...current, { name, program, amount: Number(amount), period }]); setName(""); setAmount(""); setOpen(false); }
  const tuitionTotal = fees.filter(f => f.name.toLowerCase().includes("tuition")).reduce((sum, f) => sum + f.amount, 0);
  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-6xl">
    <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Finance</p><div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-3xl font-bold text-slate-950">Fee structure</h1><p className="mt-2 text-slate-600">Set tuition and other charges by program and billing period.</p></div><button onClick={() => setOpen(!open)} className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">{open ? "Cancel" : "+ Add fee"}</button></div>
    {open && <form onSubmit={addFee} className="mt-7 rounded-2xl border bg-white p-6 shadow-sm"><h2 className="font-bold">New fee item</h2><div className="mt-4 grid gap-4 md:grid-cols-4"><label className="text-sm font-medium">Fee name<input required value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal" placeholder="Lab fee" /></label><label className="text-sm font-medium">Program<select value={program} onChange={e => setProgram(e.target.value)} className="mt-2 w-full rounded-lg border bg-white px-3 py-2.5 font-normal"><option>All programs</option><option>Computer Science</option><option>Business Administration</option><option>Engineering</option></select></label><label className="text-sm font-medium">Amount (PKR)<input required min="1" type="number" value={amount} onChange={e => setAmount(e.target.value)} className="mt-2 w-full rounded-lg border px-3 py-2.5 font-normal" placeholder="10000" /></label><label className="text-sm font-medium">Billing period<select value={period} onChange={e => setPeriod(e.target.value)} className="mt-2 w-full rounded-lg border bg-white px-3 py-2.5 font-normal"><option>Per semester</option><option>Per year</option><option>One time</option><option>Monthly</option></select></label></div><button className="mt-5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white">Save fee item</button></form>}
    <div className="mt-7 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border bg-white p-5"><p className="text-sm text-slate-500">Fee items</p><p className="mt-2 text-3xl font-bold">{fees.length}</p></div><div className="rounded-2xl border bg-white p-5"><p className="text-sm text-slate-500">Tuition across programs</p><p className="mt-2 text-3xl font-bold text-blue-700">{currency.format(tuitionTotal)}</p></div><div className="rounded-2xl border bg-white p-5"><p className="text-sm text-slate-500">Currency</p><p className="mt-2 text-3xl font-bold">PKR</p></div></div>
    <div className="mt-7 overflow-x-auto rounded-2xl border bg-white shadow-sm"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr>{["Fee item", "Program", "Billing period", "Amount"].map(x => <th key={x} className="px-5 py-4 font-semibold">{x}</th>)}</tr></thead><tbody className="divide-y">{fees.map((fee, index) => <tr key={`${fee.name}-${fee.program}-${index}`}><td className="px-5 py-4 font-semibold">{fee.name}</td><td className="px-5 py-4 text-slate-600">{fee.program}</td><td className="px-5 py-4 text-slate-600">{fee.period}</td><td className="px-5 py-4 font-semibold">{currency.format(fee.amount)}</td></tr>)}</tbody></table></div>
    <p className="mt-4 text-xs text-slate-500">Example fee amounts are editable demo data, not an official school fee schedule.</p>
  </div></main>;
}
