import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import ShockSection from '@/components/landing/ShockSection';
import ProblemSection from '@/components/landing/ProblemSection';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import AppDemo from '@/components/landing/AppDemo';
import DashboardPreview from '@/components/landing/DashboardPreview';
import StatsCounter from '@/components/landing/StatsCounter';
import SecuritySection from '@/components/landing/SecuritySection';
import Testimonials from '@/components/landing/Testimonials';
import PricingCards from '@/components/landing/PricingCards';
import DownloadCTA from '@/components/landing/DownloadCTA';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ShockSection />
      <ProblemSection />
      <FeaturesGrid />
      <AppDemo />
      <DashboardPreview />
      <StatsCounter />
      <SecuritySection />
      <Testimonials />
      <PricingCards />
      <DownloadCTA />
      <Footer />
    </main>
  );
}
