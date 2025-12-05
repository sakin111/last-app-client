
import { CTASection } from "@/components/modules/Home/CTASection";
import { DestinationsSection } from "@/components/modules/Home/DestinationsSection";
import { FeaturesSection } from "@/components/modules/Home/FeaturesSection";
import { HeroSection } from "@/components/modules/Home/HeroSection";
import { HowItWorksSection } from "@/components/modules/Home/HowItWorksSection";
import { TestimonialsSection } from "@/components/modules/Home/TestimonialsSection";
import Head from "next/head";


const page = () => {
    return (
      <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated Travel Buddy and match with the energy of your travel style using our AI-powered platform."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DestinationsSection />
      <TestimonialsSection />
      <CTASection />
      </main>
    </>
    );
};

export default page;