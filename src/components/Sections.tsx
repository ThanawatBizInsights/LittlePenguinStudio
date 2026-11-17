import type { Section } from "@/content/games";
import { Panel } from "./Content";

/** "On this page" list plus numbered sections, used by support and privacy pages. */
export function SectionedArticle({ sections, numbered = false }: { sections: Section[]; numbered?: boolean }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:items-start">
      <nav aria-label="On this page" className="lg:sticky lg:top-6">
        <Panel tone="lilac" className="!p-5">
          <h2 className="text-xl">On this page</h2>
          <ol className={`mt-2 space-y-1 ${numbered ? "list-decimal pl-6" : ""}`}>
            {sections.map((s) => (
              <li key={s.id}>
                <a className="inline-flex min-h-9 items-center underline underline-offset-4" href={`#${s.id}`}>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </Panel>
      </nav>
      <div className="space-y-12">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-6">
            <h2 id={`${s.id}-h`} className="mb-4 text-3xl">
              {numbered && <span className="mr-2 text-coral-deep">{i + 1}.</span>}
              {s.title}
            </h2>
            <div className="prose-lp space-y-4 text-lg">{s.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
