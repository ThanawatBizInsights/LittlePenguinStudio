import type { Metadata } from "next";
import Link from "next/link";
import { gamePaths, games, studio } from "@/content/site";
import { PageIntro, Panel } from "@/components/Content";
import { Container } from "@/components/Curve";
import { Arrow } from "@/components/Button";
import { Penguin } from "@/components/illustrations/Penguin";
import { Shield } from "@/components/illustrations/Decor";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy overview for the Little Penguin Studio website and links to each app’s privacy policy.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyOverview() {
  const contact = studio.privacyEmail || studio.supportEmail;
  return (
    <>
      <PageIntro
        eyebrow="Privacy"
        title="Privacy, made clear"
        art={
          <div className="relative aspect-square rounded-full bg-butter">
            <Shield className="absolute right-[6%] top-[6%] w-[26%]" />
            <Penguin pose="stand" className="absolute bottom-[4%] left-[16%] w-[62%]" />
          </div>
        }
      >
        <p>This page explains how this website works, and links to the separate privacy policy for each of our apps.</p>
      </PageIntro>

      <Container className="space-y-10 pb-6">
        <section aria-labelledby="apps-title">
          <h2 id="apps-title" className="text-4xl">App privacy policies</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {games.map((g) => (
              <li key={g.slug}>
                <Link
                  href={gamePaths(g.slug).privacy}
                  className="group flex min-h-20 items-center justify-between gap-4 rounded-[1.75rem] bg-paper p-6 ring-1 ring-ink/10 hover:ring-ink"
                >
                  <span>
                    <span className="block font-display text-2xl font-semibold">{g.title}</span>
                    <span className="text-ink-soft">Privacy policy</span>
                  </span>
                  <Arrow className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="site-title">
          <Panel tone="mint">
            <h2 id="site-title" className="text-3xl">This website</h2>
            <p className="mt-2 text-ink-soft">
              This describes how littlepenguinstudio.com is built. It does not describe our apps — see each app’s policy above.
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-6 text-lg">
              <li>The website does not use cookies, analytics, advertising, or tracking scripts.</li>
              <li>There are no accounts, sign-up forms, or contact forms on this website.</li>
              <li>
                The mini matching game runs entirely in your browser. It does not save scores or send any information anywhere.
              </li>
              <li>
                Like any website, our hosting provider processes standard technical information (such as IP addresses) to deliver and protect the site.
              </li>
              <li>If you email us, we use your message and email address to reply to you.</li>
            </ul>
          </Panel>
        </section>

        <section aria-labelledby="questions-title">
          <h2 id="questions-title" className="text-3xl">Questions</h2>
          <p className="mt-2 text-lg">
            {contact ? (
              <>
                Email{" "}
                <a className="font-semibold underline underline-offset-4" href={`mailto:${contact}`}>
                  {contact}
                </a>
                .
              </>
            ) : (
              "A privacy contact email address will be published here before launch."
            )}
          </p>
        </section>
      </Container>
    </>
  );
}
