
const features = [
  {
    title: "Academic Excellence",
    description:
      "Structured academic programs designed to support meaningful learning and professional development.",
  },
  {
    title: "Modern Learning",
    description:
      "Digital learning resources, courses, assessments and tools for students and faculty.",
  },
  {
    title: "Student Support",
    description:
      "Centralized student services covering admissions, enrollment, attendance and academic records.",
  },
  {
    title: "Connected Community",
    description:
      "Communication tools that connect students, faculty and administration.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
            About Us
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight">
            A modern digital environment for education
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            EduPortal brings academic management, student services,
            admissions, learning and communication into one platform.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Our Platform
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Everything education needs in one place
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-slate-600">
            <p>
              EduPortal is designed to provide a centralized digital
              experience for students, faculty and administration.
            </p>

            <p>
              From applying for admission to managing courses, attendance,
              results, learning materials and academic records, the platform
              provides a connected experience throughout the student journey.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Why EduPortal
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Built around the education experience
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border bg-white p-8"
              >
                <h3 className="text-xl font-bold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}