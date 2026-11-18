import { Container } from "@/components/Curve";
import { Button } from "@/components/Button";
import { Snowy } from "@/components/Brand";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-16 text-center">
      <Snowy pose="nap" className="w-48" />
      <h1 className="mt-6 text-5xl">This page drifted off to sleep</h1>
      <p className="mt-3 text-xl text-ink-soft">We couldn’t find the page you were looking for.</p>
      <Button href="/" arrow className="mt-8">Back to the homepage</Button>
    </Container>
  );
}
