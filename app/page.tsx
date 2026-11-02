import Link from "next/link";

const programs = [
  {
    title: "Computer Science",
    description:
      "Build strong foundations in software development, computing and modern technologies.",
  },
  {
    title: "Business Administration",
    description:
      "Develop business, management, leadership and entrepreneurial skills.",
  },
  {
    title: "Engineering",
    description:
      "Explore engineering disciplines through practical and academic learning.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Welcome to EduPortal
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Education for a
              <span className="text-blue-400"> better future.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A modern education platform connecting students, faculty and
              administration through one digital ecosystem.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/programs"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
              >
                Explore Programs
              </Link>

              <Link
                href="/admissions/apply"
                className="rounded-lg border border-slate-600 px-6 py-3 font-semibold hover:bg-slate-900"
              >
                Apply for Admission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            About Us
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            One platform for modern education
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            EduPortal brings academics, admissions, student records, learning,
            finance and communication together in one centralized platform.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Academic Programs
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Explore our programs
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program.title}
                className="rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                  EP
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {program.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {program.description}
                </p>

                <Link
                  href="/programs"
                  className="mt-6 inline-block font-semibold text-blue-700"
                >
                  View Program →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            School tools
          </p>
          <h2 className="mt-3 text-3xl font-bold">Explore the management pages</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              { title: "Student records", href: "/academic/sis/students", description: "Browse student profiles." },
              { title: "Teachers and staff", href: "/academic/faculty", description: "Manage staff profiles." },
              { title: "Classes and subjects", href: "/academic/courses", description: "Browse the course catalog." },
              { title: "Enrollment", href: "/admissions/applications", description: "Review applications." },
              { title: "Fee structure", href: "/finance/fees", description: "View program fees." },
              { title: "Attendance", href: "/academic/sis/attendance", description: "Record daily attendance." },
              { title: "Roles", href: "/admin/roles", description: "Preview role permissions." },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm">
                <h3 className="font-bold text-slate-900">{tool.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-blue-700">Open page →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl rounded-3xl bg-blue-700 px-8 py-16 text-white md:px-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-200">
              Admissions
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Start your academic journey
            </h2>

            <p className="mt-5 leading-7 text-blue-100">
              Submit your application, upload your documents and track your
              admission status through the online admission portal.
            </p>

            <Link
              href="/admissions/apply"
              className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
