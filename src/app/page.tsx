import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ManifestoView from "@/components/sections/manifesto-view";
import InteractiveTimeline from "@/components/sections/interactive-timeline";
import ThematicDomes from "@/components/sections/thematic-domes";
import DepthMasonry from "@/components/sections/depth-masonry";
import LiveCubesphere from "@/components/sections/live-cubesphere";
import TestimonialReel from "@/components/sections/testimonial-reel";
import AiChatVideo from "@/components/sections/ai-chat-video";
import Gallery from "@/components/sections/gallery";
import EventsCalendar from "@/components/sections/events-calendar";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { getNewsFromSheet } from "@/lib/news";
import ParticipationForm from "@/components/sections/participation-form";

function NewsLoadingSkeleton() {
  return (
    <section id="noticias" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Noticias y Actividades
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Mantente al día con las últimas noticias, eventos y comunicados de la campaña.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="h-[400px]">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <Skeleton className="h-1/2 w-full rounded-lg" />
                <div className="space-y-2 mt-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="mt-4">
                   <Skeleton className="h-8 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

async function NewsSection() {
  const newsItems = await getNewsFromSheet();
  return <DepthMasonry newsItems={newsItems} />;
}


export default function Home() {
  return (
    <>
      <Header />
      <ManifestoView />
      <InteractiveTimeline />
      <ThematicDomes />
      <Suspense fallback={<NewsLoadingSkeleton />}>
        <NewsSection />
      </Suspense>
      <EventsCalendar />
      <Gallery />
      {/* <LiveCubesphere /> // REDES SOCCIALES */}
      <TestimonialReel />
      <AiChatVideo />
      <ParticipationForm />
      <Footer />
    </>
  );
}
