import { lazy, Suspense } from "react";
import { GrainOverlay } from "./components/media/GrainOverlay";
import { Navbar } from "./components/navigation/Navbar";
import { HeroSection } from "./features/hero/HeroSection";
import { useLenis } from "./hooks/useLenis";

const IntroSection = lazy(() => import("./features/intro/IntroSection").then(m => ({ default: m.IntroSection })));
const AboutSection = lazy(() => import("./features/about/AboutSection").then(m => ({ default: m.AboutSection })));
const SuperFinalSection = lazy(() => import("./features/superfinal/SuperFinalSection").then(m => ({ default: m.SuperFinalSection })));
const BastidoresSection = lazy(() => import("./features/bastidores/BastidoresSection").then(m => ({ default: m.BastidoresSection })));
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
        {/* Patrocínio é o objetivo (Dr. Hugo, 05/10): resultado de 2026, a Super Final
            com as cotas, quem já corre junto, e só depois o piloto e os bastidores.
            A apresentação do Dr. Hugo abre a página: pedido da assessoria em 10/11/2026. */}
        <IntroSection />
        <StatsSection />
        <SuperFinalSection />
        <SponsorsSection />
        <AboutSection />
        <BastidoresSection />
        <GallerySection />
        <FollowSection />
      </Suspense>
    </main>
  );
}
