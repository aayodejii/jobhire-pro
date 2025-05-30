"use client";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import TrustBadges from "./components/TrustBadges";
import Testimonials from "./components/Testimonials";
import { useState } from "react";
import WhyChooseUs from "./components/WhyUs";
import Services from "./components/Services";
import JobBoardCoverage from "./components/JobBoardCoverage";
import { FormProvider } from "./contexts/FormContext";
import FormPopup from "./components/FormPopup";

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <FormProvider>
      <div className="font-sans text-dark bg-light">
        <Navbar />
        <HeroSection />
        <WhyChooseUs />
        {/* <TrustBadges /> */}
        <Services />
        <HowItWorks />
        <Benefits />
        <JobBoardCoverage />
        <Testimonials />
        <Pricing />
        <FAQ activeFaq={activeFaq} toggleFaq={toggleFaq} />
        <CTA />
        <Footer />
        <FormPopup />
      </div>
    </FormProvider>
  );
}
