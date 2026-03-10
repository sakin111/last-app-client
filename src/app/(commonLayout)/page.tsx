
import AIRecommendations from "@/components/modules/Home/AIRecommendations";
import CTASection from "@/components/modules/Home/CTASection";
import DestinationsSection from "@/components/modules/Home/DestinationsSection";
import FeaturesSection from "@/components/modules/Home/FeaturesSection";
import HeroSection from "@/components/modules/Home/HeroSection";
import TiltText from "@/components/Shared/TiltText";
import HowItWorksSection from "@/components/modules/Home/HowItWorksSection";
import TestimonialsSection from "@/components/modules/Home/TestimonialsSection";
import WhyTravelSection from "@/components/modules/Home/WhyTravelSection";

export const metadata = {
  title: "A Travel Buddy website to get you a perfect exploring partner",
  description:
    "Discover top-rated Travel Buddy and match with the energy of your travel style using our AI-powered platform.",
};


const page = () => {
  return (
    <main>
      <HeroSection />
      <TiltText text="EXPLORE" />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyTravelSection />
      <AIRecommendations />
      <DestinationsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default page;