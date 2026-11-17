import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { games, getGame, studio, TO_BE_CONFIRMED } from "@/content/site";
import { DraftBanner, Panel } from "@/components/Content";
import { Container } from "@/components/Curve";
import { Wave } from "@/components/illustrations/Decor";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const game = getGame((await params).slug);
  if (!game) return {};
  return {
    title: `${game.title} Privacy Policy`,
    description: `Privacy policy for the ${game.title} app by Little Penguin Studio.`,
    alternates: { canonical: `/privacy/${game.slug}/` },
    robots: game.privacy.status === "draft" ? { index: false } : undefined,
  };
}

function Pending({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl border-2 border-dashed border-ink/25 bg-cream/70 p-4 text-ink-soft">
      <strong className="text-ink">To be confirmed: </strong>
      {children}
    </p>
  );
}

export default async function AppPrivacyPage({ params }: { params: Promise<{ slug: string }> }) {
  const game = getGame((await params).slug);
  if (!game) notFound();
  const contact = studio.privacyEmail || studio.supportEmail;
  const draft = game.privacy.status === "draft";

  const sections: { id: string; title: string; body: React.ReactNode }[] = [
    {
      id: "publisher",
      title: "Publisher and contact details",
      body: (
        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[12rem_1fr]">
          <dt className="font-semibold">Publisher</dt>
          <dd>{studio.publisherName || <span className="text-ink-soft">{TO_BE_CONFIRMED}</span>}</dd>
          <dt className="font-semibold">Trading as</dt>
          <dd>{studio.name}</dd>
          <dt className="font-semibold">Privacy contact</dt>
          <dd>
            {contact ? (
              <a className="underline underline-offset-4" href={`mailto:${contact}`}>{contact}</a>
            ) : (
              <span className="text-ink-soft">{TO_BE_CONFIRMED}</span>
            )}
          </dd>
        </dl>
      ),
    },
    {
      id: "data",
      title: "Data collected",
      body: (
        <Pending>
          Which information the app handles — for example game progress or sound preferences — and whether it stays only on the device, syncs through the player’s own iCloud, or is sent to any server. Each type of data and its purpose will be listed here.
        </Pending>
      ),
    },
    {
      id: "third-parties",
      title: "Third-party SDKs and services",
      body: (
        <Pending>
          A list of every software development kit (SDK) or outside service included in the app — such as analytics or crash reporting — and what information each receives. If there are none, that will be stated once checked against the released app.
        </Pending>
      ),
    },
    {
      id: "ads-purchases",
      title: "Advertising and purchases",
      body: (
        <Pending>
          Whether the app shows advertising, and whether it offers in-app purchases. If purchases are offered through Apple, payment is handled by Apple; any purchase information the app itself receives will be described here.
        </Pending>
      ),
    },
    {
      id: "children",
      title: "Children’s privacy",
      body: (
        <Pending>
          Whether the app collects any personal information from children, how any links or purchases are kept behind a parental gate, and any parental consent process that applies.
        </Pending>
      ),
    },
    {
      id: "retention",
      title: "Retention and deletion",
      body: (
        <Pending>
          How long any information is kept, how progress stored on the device can be reset or removed (for example by deleting the app), and how a parent can ask for any server-held information to be deleted, if there is any.
        </Pending>
      ),
    },
    {
      id: "updates",
      title: "Policy updates",
      body: (
        <p>
          We may update this policy when the app changes. The date at the top of this page shows when it was last updated.
          {contact ? (
            <>
              {" "}Questions can be sent to{" "}
              <a className="underline underline-offset-4" href={`mailto:${contact}`}>{contact}</a>.
            </>
          ) : null}
        </p>
      ),
    },
  ];

  return (
    <Container className="max-w-4xl pb-6 pt-6 md:pt-10">
      <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-coral-deep">Privacy policy</p>
      <h1 className="mt-3 text-[clamp(2.3rem,6vw,3.6rem)]">{game.title} Privacy Policy</h1>
      <Wave className="mt-3 h-4 w-40" />
      <p className="mt-4 text-ink-soft">
        Last updated: {game.privacy.lastUpdated ?? TO_BE_CONFIRMED}
      </p>

      {draft && (
        <div className="mt-6">
          <DraftBanner>Draft — app data practices and publisher details require confirmation.</DraftBanner>
        </div>
      )}

      <p className="mt-6 text-lg">
        This policy will explain how the {game.title} app handles information. It covers the app only — see the{" "}
        <Link className="underline underline-offset-4" href="/privacy/">privacy overview</Link> for this website.
      </p>

      <nav aria-label="On this page" className="mt-8">
        <Panel tone="lilac" className="!p-5">
          <h2 className="text-xl">On this page</h2>
          <ol className="mt-2 grid list-decimal gap-x-8 gap-y-1 pl-6 sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a className="underline underline-offset-4" href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </Panel>
      </nav>

      <div className="mt-10 space-y-10">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-6">
            <h2 id={`${s.id}-h`} className="mb-4 text-3xl">
              <span className="mr-2 text-coral-deep">{i + 1}.</span>
              {s.title}
            </h2>
            {s.body}
          </section>
        ))}
      </div>
    </Container>
  );
}
