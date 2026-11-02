
import Link from "next/link";

const programs = [
  {
    title: "Computer Science",
    duration: "4 Years",
    description:
      "Study software development, algorithms, databases, web technologies and modern computing.",
  },
  {
    title: "Business Administration",
    duration: "4 Years",
    description:
      "Develop knowledge in management, finance, marketing, entrepreneurship and organizational leadership.",
  },
  {
    title: "Engineering",
    duration: "4 Years",
    description:
      "Develop technical and analytical skills through engineering theory and practical learning.",
  },
  {
    title: "Information Technology",
    duration: "4 Years",
    description:
      "Explore information systems, networking, software and technology-driven business solutions.",
  },
  {
    title: "Accounting & Finance",
    duration: "4 Years",
    description:
      "Build expertise in accounting principles, financial management, reporting and business finance.",
  },
  {
    title: "English & Humanities",
    duration: "4 Years",
    description:
      "Develop communication, analytical thinking, writing and research skills.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
            Academic Programs
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Explore our programs
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Discover academic programs designed to develop knowledge,
            practical skills and professional opportunities.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <article
                key={program.title}
                className="rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                    EP
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    {program.duration}
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-bold">
                  {program.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  {program.description}
                </p>

                <Link
                  href="/admissions/apply"
                  className="mt-6 inline-block font-semibold text-blue-700 hover:text-blue-800"
                >
                  Apply for this program →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}