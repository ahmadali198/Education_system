
export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <h2 className="text-2xl font-bold">EduPortal</h2>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            A modern digital education platform for students, faculty and
            administration.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Platform</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>Programs</p>
            <p>Admissions</p>
            <p>Learning</p>
            <p>Student Portal</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Resources</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>News</p>
            <p>Announcements</p>
            <p>Contact</p>
            <p>Help Center</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <p>info@eduportal.com</p>
            <p>+92 300 0000000</p>
            <p>Pakistan</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} EduPortal. All rights reserved.
      </div>
    </footer>
  );
}