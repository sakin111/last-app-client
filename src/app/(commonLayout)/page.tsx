import AIRecommendations from "@/components/modules/Home/AIRecommendations";
import CTASection from "@/components/modules/Home/CTASection";
import DestinationsSection from "@/components/modules/Home/DestinationsSection";
import FeaturesSection from "@/components/modules/Home/FeaturesSection";
import HeroSection from "@/components/modules/Home/HeroSection";
import HowItWorksSection from "@/components/modules/Home/HowItWorksSection";
import TestimonialsSection from "@/components/modules/Home/TestimonialsSection";

export const metadata = {
  title: "Travel Buddy Matcher - Find Your Perfect Exploring Partner",
  description:
    "Discover top-rated Travel Buddy and match with the energy of your travel style using our AI-powered platform.",
};

const page = () => {
  return (
    <main className="pt-20">
      <HeroSection />
      <FeaturesSection />
      <AIRecommendations />
      <DestinationsSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <CTASection />
    </main>
  );
};

export default page;