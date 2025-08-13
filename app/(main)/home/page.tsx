"use client";
import Benefits from "@/app/components/Benefits";
import CTA from "@/app/components/CTA";
import FAQ from "@/app/components/FAQ";
import Footer from "@/app/components/Footer";
import HeroSection from "@/app/components/HeroSection";
import HowItWorks from "@/app/components/HowItWorks";
import Navbar from "@/app/components/Navbar";
import Pricing from "@/app/components/Pricing";
import TrustBadges from "@/app/components/TrustBadges";
import Testimonials from "@/app/components/Testimonials";
import { useState } from "react";
import WhyChooseUs from "@/app/components/WhyUs";
import Services from "@/app/components/Services";
import JobBoardCoverage from "@/app/components/JobBoardCoverage";
import { FormProvider } from "@/app/contexts/FormContext";
import FormPopup from "@/app/components/FormPopup";
import { AffiliateTracker } from "@/app/components/dashboard/AffiliateTracker";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <FormProvider>
      <AffiliateTracker autoTrackPageViews={true}>
        <div className="font-sans text-dark bg-light">
          <Navbar />
          <HeroSection />
          <WhyChooseUs />
          {/* <TrustBadges /> */}
          <Services />
          <HowItWorks />
          <Benefits />
          <JobBoardCoverage />
          {/* <Testimonials /> */}
          <Pricing />
          <FAQ activeFaq={activeFaq} toggleFaq={toggleFaq} />
          <CTA />
          <Footer />
          <FormPopup />
        </div>
      </AffiliateTracker>
    </FormProvider>
  );
}
