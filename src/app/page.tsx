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

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ManifestoView />
        <InteractiveTimeline />
        <ThematicDomes />
        <DepthMasonry />
        <LiveCubesphere />
        <TestimonialReel />
        <JoinCampaign />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
