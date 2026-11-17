import type { Metadata } from "next";
import { PageIntro } from "@/components/Content";
import { Container } from "@/components/Curve";
import { SupportCenter } from "@/components/SupportCenter";
import { Art } from "@/components/Art";
import { Penguin } from "@/components/illustrations/Penguin";
import { Bubble, SpeechBubble } from "@/components/illustrations/Decor";

export const metadata: Metadata = {
  title: "Support",
  description: "Help with Little Penguin Studio games: common questions and how to contact us.",
  alternates: { canonical: "/support/" },
};

export default function SupportPage() {
  return (
    <>
      <PageIntro
        eyebrow="Support"
        title="Need a little help?"
        art={
          <div className="relative aspect-square rounded-full bg-sky">
            <SpeechBubble className="absolute right-[6%] top-[6%] w-[26%]" />
            <Bubble className="absolute left-[12%] top-[16%] w-[10%]" />
            <div className="absolute bottom-[4%] left-[14%] w-[66%]">
              <Art slot="penguinPeek" className="w-full" fallback={<Penguin pose="wave" bob className="w-full" />} />
            </div>
          </div>
        }
      >
        <p>Choose a game to see common questions and how to get in touch.</p>
      </PageIntro>
      <Container className="pb-6">
        <SupportCenter />
      </Container>
    </>
  );
}
