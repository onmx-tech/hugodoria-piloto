import { lazy, Suspense } from "react";
import { GrainOverlay } from "./components/media/GrainOverlay";
import { Navbar } from "./components/navigation/Navbar";
import { HeroSection } from "./features/hero/HeroSection";
import { useLenis } from "./hooks/useLenis";

const AboutSection = lazy(() => import("./features/about/AboutSection").then(m => ({ default: m.AboutSection })));
const MindsetSection = lazy(() => import("./features/mindset/MindsetSection").then(m => ({ default: m.MindsetSection })));
const StatsSection = lazy(() => import("./features/stats/StatsSection").then(m => ({ default: m.StatsSection })));
const GallerySection = lazy(() => import("./features/gallery/GallerySection").then(m => ({ default: m.GallerySection })));
const SponsorsSection = lazy(() => import("./features/sponsors/SponsorsSection").then(m => ({ default: m.SponsorsSection })));
const FollowSection = lazy(() => import("./features/follow/FollowSection").then(m => ({ default: m.FollowSection })));

export default function App() {
  useLenis();

  return (
    <main className="bg-[#041221] overflow-x-hidden snap-y snap-proximity">
      <GrainOverlay />
      <Navbar />
      <HeroSection />
      <Suspense>
        <AboutSection />
        <MindsetSection />
        <StatsSection />
        <GallerySection />
        <SponsorsSection />
        <FollowSection />
      </Suspense>
    </main>
  );
}
