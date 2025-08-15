import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ManifestoView from "@/components/sections/manifesto-view";
import InteractiveTimeline from "@/components/sections/interactive-timeline";
import ThematicDomes from "@/components/sections/thematic-domes";
import DepthMasonry from "@/components/sections/depth-masonry";
import LiveCubesphere from "@/components/sections/live-cubesphere";
import TestimonialReel from "@/components/sections/testimonial-reel";
import JoinCampaign from "@/components/sections/join-campaign";
import ContactForm from "@/components/sections/contact-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import AiChatVideo from "@/components/sections/ai-chat-video";
import Gallery from "@/components/sections/gallery";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Header />
        <ManifestoView />

        {/* Mobile-only Manifesto Content */}
        <div className="sm:hidden bg-background text-foreground text-center p-6 -mt-16 relative z-10">
          <div className="container mx-auto">
            <p className="max-w-xl mx-auto text-base text-muted-foreground">
              Unidos por la experiencia, la integridad y un compromiso
              inquebrantable con el futuro de nuestra nación.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 w-full max-w-sm mx-auto">
              <Button size="lg" className="w-full">
                Conóceme <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
              >
                Únete a la campaña <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <InteractiveTimeline />
        <ThematicDomes />
        <DepthMasonry />
        <Gallery />
        <LiveCubesphere />
        <TestimonialReel />
        <AiChatVideo />
        <JoinCampaign />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
