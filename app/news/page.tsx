
import Link from "next/link";
import { news } from "./newsData";

export default function NewsPage() {
  return (
    <>
      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
            News & Updates
          </p>

          <h1 className="mt-4 text-3xl font-bold">
            Latest news
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Stay updated with admissions, academic announcements and
            institutional news.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <div className="h-48 bg-slate-200" />

                <div className="p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">
                      {item.category}
                    </span>

                    <span className="text-sm text-slate-500">
                      {item.date}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold">
                    {item.title}
                  </h2>

                  <p className="mt-4 leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <Link href={`/news/${item.slug}`} className="mt-6 inline-block font-semibold text-blue-700 hover:text-blue-900">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
