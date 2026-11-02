
export default function ContactPage() {
  return (
    <>
      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
            Contact Us
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Get in touch
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Have a question about admissions, programs or student services?
            Contact our team.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">
              Contact information
            </h2>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="mt-1 text-slate-600">
                  info@eduportal.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="mt-1 text-slate-600">
                  +92 300 0000000
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="mt-1 text-slate-600">
                  Pakistan
                </p>
              </div>
            </div>
          </div>

          <form className="rounded-2xl border bg-white p-8 shadow-sm">
            <div className="grid gap-6">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="button"
                className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
