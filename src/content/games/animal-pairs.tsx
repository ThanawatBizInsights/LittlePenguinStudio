/**
 * Animal Pairs — support and privacy page content.
 *
 * Every statement about app behaviour here was checked against the Animal
 * Pairs iOS source (ThanawatBizInsights/AnimalPairs, commit 2b39570). See
 * docs/animal-pairs-privacy-audit.md. If the app changes — a new SDK, network
 * call, permission, account, or iCloud sync — this page and the App Store
 * Connect App Privacy answers must be updated together.
 */
import type { ReactNode } from "react";
import Link from "next/link";
import { PH, gamePaths, studio, type Game } from "@/content/site";
import { EmailLink, Val } from "@/components/Content";

export type Section = { id: string; title: string; body: ReactNode };

const ext = "font-semibold text-cobalt-deep underline underline-offset-4";

/* ------------------------------------------------------------------ */
/* Support                                                             */
/* ------------------------------------------------------------------ */

export function supportSections(game: Game): Section[] {
  const paths = gamePaths(game.slug);
  const unlock = game.fullGameUnlock;
  const sections: Section[] = [
    {
      id: "parents-area",
      title: "Opening the Parents area",
      body: (
        <>
          <p>
            Settings, purchases, progress and links live in the <strong>Parents</strong> area, behind a short grown-ups
            check so little hands don’t wander in by accident.
          </p>
          <ol>
            <li>On the home screen, tap the <strong>gear button</strong> (Parents and settings) in the top corner.</li>
            <li>Answer the multiplication question. You can use the number pad or switch to the keyboard.</li>
            <li>The Parents area opens. It closes again when you leave it, when the app goes into the background, or after five minutes.</li>
          </ol>
          <p className="text-ink-soft">The grown-ups check is a simple speed bump. It isn’t age verification.</p>
        </>
      ),
    },
    {
      id: "sound",
      title: "Music and sound",
      body: (
        <>
          <p>
            The <strong>speaker button</strong> on the home screen and the game board turns music and sound effects on or off together.
          </p>
          <p>To choose them separately, open the Parents area and go to <strong>Settings</strong>:</p>
          <ul>
            <li><strong>Music</strong> — the gentle background music.</li>
            <li><strong>Sound Effects</strong> — card flips, matches, buttons and the animal sounds after a match.</li>
          </ul>
          <p>Your choices are remembered next time you open the game.</p>
          <h3>Still no sound?</h3>
          <ul>
            <li>Turn up the device volume.</li>
            <li>Check that Silent Mode is off — Animal Pairs follows the device’s silent setting.</li>
            <li>If another app is playing music or audio, Animal Pairs keeps its own music quiet so it doesn’t interrupt. Pause the other app.</li>
            <li>If headphones or a speaker are connected, check where the sound is going.</li>
          </ul>
        </>
      ),
    },
    {
      id: "playing",
      title: "Playing the game",
      body: (
        <>
          <p>
            Tap <strong>Play</strong>, choose a way to play and a board size, then tap <strong>Start</strong>. Turn over two cards
            at a time to find matching pairs. There’s no timer, and the <strong>Hint</strong> button is always there to help.
          </p>
          <ul>
            {game.modes.map((m) => (
              <li key={m.name}>
                <strong>{m.name}</strong> — {m.text}
                {m.fullGame && unlock ? ` (${unlock.name})` : ""}
              </li>
            ))}
          </ul>
          <p>
            To leave a round, tap the <strong>pause</strong> button on the board.
          </p>
        </>
      ),
    },
  ];

  if (unlock) {
    sections.push({
      id: "full-game",
      title: unlock.name,
      body: (
        <>
          <p>
            Animal Pairs is free to play, with an optional one-time purchase called <strong>{unlock.name}</strong>. It’s found in the
            Parents area, under <strong>Full Game</strong>.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-mint-soft p-4">
              <p className="font-display text-lg font-semibold">Free for everyone</p>
              <ul>{unlock.free.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
            <div className="rounded-2xl bg-lilac-soft p-4">
              <p className="font-display text-lg font-semibold">Added by {unlock.name}</p>
              <ul>{unlock.adds.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
          </div>
          <h3 id="restore">Restore a purchase</h3>
          <ol>
            <li>Make sure the device is signed in to the <strong>same Apple Account</strong> that made the purchase, and is online.</li>
            <li>Open the Parents area (gear button, then the grown-ups question).</li>
            <li>Under Full Game, tap <strong>Restore Purchases</strong>.</li>
          </ol>
          <p>The full game unlocks on every iPad or iPhone signed in to that Apple Account. Restoring never changes game progress.</p>
          <h3>Redeem a gift code</h3>
          <p>
            In the Parents area, tap <strong>Redeem Gift Code</strong> and enter the code in the App Store’s window. Apple checks the code;
            Animal Pairs never sees or stores it.
          </p>
          <h3>Waiting for approval</h3>
          <p>
            If your family uses Ask to Buy, the purchase shows as waiting until the family organiser approves it. It unlocks automatically once approved.
          </p>
          <h3>Refunds</h3>
          <p>
            Payments are handled by Apple, so refunds are requested from Apple at{" "}
            <a className={ext} href="https://reportaproblem.apple.com" rel="noopener noreferrer" target="_blank">
              reportaproblem.apple.com
            </a>
            .
          </p>
        </>
      ),
    });
  }

  sections.push(
    {
      id: "progress",
      title: "Progress and resetting",
      body: (
        <>
          <p>
            Finished games are listed in the Parents area under <strong>Progress</strong>. This history is stored only on the device.
          </p>
          <p>
            To clear it, tap <strong>Reset progress</strong> in the Parents area. This removes game history and any unfinished game from the
            device. {unlock ? `${unlock.name} stays unlocked.` : ""}
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: "Contact us",
      body: (
        <>
          <p>
            Email <EmailLink email={studio.supportEmail} ph={PH.supportEmail} subject={`${game.title} support`} />. We’ll reply as soon as we can.
          </p>
          <p>It helps to include:</p>
          <ul>
            <li>The app name ({game.title}) and app version — shown at the bottom of the Parents area</li>
            <li>Your device model, e.g. the type of iPad or iPhone</li>
            <li>The iPadOS or iOS version</li>
            <li>A short description of what happened</li>
          </ul>
          <p className="rounded-2xl bg-butter-soft p-4 font-semibold">
            Please don’t include your child’s name, photos, or any other personal information about your child.
          </p>
          <p>
            Read the <Link className={ext} href={paths.privacy}>{game.title} privacy policy</Link>.
          </p>
        </>
      ),
    },
  );

  return sections;
}

/* ------------------------------------------------------------------ */
/* Privacy policy                                                      */
/* ------------------------------------------------------------------ */

export function privacySummary(game: Game): string[] {
  return [
    `${game.title} does not collect personal information. We, the publisher, receive no data from the app.`,
    "No accounts, ads, tracking, analytics or third-party software development kits (SDKs).",
    "Game settings and progress are stored only on the device.",
    "The internet is only used, through Apple, for optional App Store purchases, gift codes and restoring purchases.",
  ];
}

export function privacySections(game: Game): Section[] {
  const unlock = game.fullGameUnlock;
  const contact = (
    <EmailLink email={studio.privacyEmail} ph={PH.privacyEmail} subject={`${game.title} privacy`} />
  );
  return [
    {
      id: "who",
      title: "Who we are",
      body: (
        <>
          <p>
            {game.title} is published by <Val value={studio.publisherName} ph={PH.publisher} />, trading as {studio.name}{" "}
            (“we”, “us”). This policy covers the {game.title} app for iPad and iPhone.
          </p>
          <p>Privacy questions and requests: {contact}.</p>
        </>
      ),
    },
    {
      id: "collect",
      title: "Information we collect",
      body: (
        <>
          <p>
            <strong>None.</strong> {game.title} does not send any information to us or to anyone else. It has no accounts, sign-in, chat,
            advertising, tracking, analytics or crash-reporting services, and no third-party SDKs.
          </p>
          <p>The app does not ask for, and cannot use:</p>
          <ul>
            <li>names, birthdays, email addresses or other contact details</li>
            <li>photos, the camera or the microphone</li>
            <li>location</li>
            <li>contacts, calendars or other personal files</li>
            <li>advertising identifiers or any other identifier used for tracking</li>
          </ul>
          <p>It does not ask for any device permissions.</p>
        </>
      ),
    },
    {
      id: "device",
      title: "Information stored only on the device",
      body: (
        <>
          <p>To work properly, the app keeps a small amount of information on the device itself. It is never sent to us.</p>
          <div className="overflow-hidden rounded-2xl ring-1 ring-ink/10">
            <table className="w-full border-collapse text-left text-base">
              <caption className="sr-only">Information stored on the device</caption>
              <thead className="bg-lilac-soft">
                <tr>
                  <th scope="col" className="px-4 py-3 font-display">What</th>
                  <th scope="col" className="px-4 py-3 font-display">Why</th>
                </tr>
              </thead>
              <tbody className="bg-paper align-top">
                <tr>
                  <td className="px-4 py-3">Settings: music, sound effects and voice on or off; the last game mode and board size chosen</td>
                  <td className="px-4 py-3">To remember your choices</td>
                </tr>
                <tr className="bg-cream/60">
                  <td className="px-4 py-3">Game history: when each finished game started and ended, the mode, board size, number of turns, hints used and pairs found (the latest 100 games are listed, with overall totals)</td>
                  <td className="px-4 py-3">To show progress in the Parents area</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">An unfinished game: the card layout and progress of the current round</td>
                  <td className="px-4 py-3">So a round isn’t lost if the app is interrupted</td>
                </tr>
                {unlock && (
                  <tr className="bg-cream/60">
                    <td className="px-4 py-3">The ID number of the Apple purchase receipt for {unlock.name}</td>
                    <td className="px-4 py-3">So the full game stays unlocked when the app starts before the App Store answers</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p>
            None of this identifies your child. Like other app data, it may be included in the device’s own iCloud or computer backups, which
            are controlled by you and handled by Apple.
          </p>
        </>
      ),
    },
    ...(unlock
      ? [
          {
            id: "purchases",
            title: "Purchases and gift codes",
            body: (
              <>
                <p>
                  {unlock.name} is an optional, one-time in-app purchase made through Apple’s App Store. Apple handles payment and your
                  Apple Account. We never receive your name, payment details or Apple Account information.
                </p>
                <p>
                  The app checks Apple’s signed purchase record on the device to decide whether the full game is unlocked. Gift codes are entered
                  in Apple’s own window and checked by Apple; the app never sees or stores them.
                </p>
                <p>
                  As the seller, Apple provides us with sales and download reports. These do not tell us who you are. Apple’s handling of
                  your information is described in{" "}
                  <a className={ext} href="https://www.apple.com/legal/privacy/" rel="noopener noreferrer" target="_blank">
                    Apple’s Privacy Policy
                  </a>
                  .
                </p>
              </>
            ),
          } satisfies Section,
        ]
      : []),
    {
      id: "internet",
      title: "Internet connections",
      body: (
        <>
          <p>{game.title} works fully offline. Everything needed to play is built into the app.</p>
          <p>
            The app only goes online through Apple’s App Store system, when a grown-up loads the price, buys, redeems a gift code or restores
            the full game, and to check purchase status. The app has no server of its own and makes no other connections.
          </p>
          <p>
            The Parents area contains links to this privacy policy and our support page. They open in the web browser and are only reachable
            after the grown-ups check.
          </p>
        </>
      ),
    },
    {
      id: "third-parties",
      title: "Third parties",
      body: (
        <>
          <p>The app contains no third-party code that collects data: no advertising, analytics or crash-reporting providers.</p>
          <p>
            If a device owner has chosen in their device settings to share analytics with app developers, Apple may give us anonymous,
            combined usage and crash statistics through App Store Connect. This is controlled by the device settings, not by the app, and
            does not identify anyone.
          </p>
        </>
      ),
    },
    {
      id: "children",
      title: "Children’s privacy",
      body: (
        <>
          <p>
            {game.title} is made for young children. Because the app collects no personal information, there is nothing for us to share,
            sell or use for advertising.
          </p>
          <p>
            Purchases, gift codes, settings, progress and the links to this website are kept in the Parents area, behind a grown-ups check
            (a multiplication question). The check helps keep young children out; it is not age verification or consent.
          </p>
          <p>
            If you email us about the app, please don’t include personal information about your child.
          </p>
        </>
      ),
    },
    {
      id: "retention",
      title: "Keeping and deleting information",
      body: (
        <>
          <ul>
            <li>
              <strong>Reset progress</strong> in the Parents area removes game history and any unfinished game from the device.
              {unlock ? ` It does not remove the ${unlock.name} purchase.` : ""}
            </li>
            <li>Deleting the app removes all of its information from the device. Copies in device backups follow your backup settings.</li>
            <li>{unlock ? "Purchase records are kept by Apple and managed through your Apple Account. " : ""}We hold no app data, so there is nothing on our side to delete.</li>
            <li>
              If you email us, we use your message only to reply and keep it for <Val value={studio.supportEmailRetention} ph={PH.emailRetention} />.
              Ask us at {contact} to delete it sooner.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "website",
      title: "Our website",
      body: (
        <p>
          This policy covers the app. Our website has its own short{" "}
          <Link className={ext} href="/privacy/">privacy notice</Link>.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: (
        <p>
          If the app changes how it handles information, we will update this policy before releasing that version and change the date at the
          top of this page.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      body: (
        <>
          <p>
            Questions or requests about privacy: {contact}.
          </p>
          <p>
            Publisher: <Val value={studio.publisherName} ph={PH.publisher} /> ({studio.name}).
          </p>
          <p>
            For help with the game, visit <Link className={ext} href={gamePaths(game.slug).support}>{game.title} support</Link>.
          </p>
        </>
      ),
    },
  ];
}
