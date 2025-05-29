"use client";

// src/components/HeroSection.tsx

import { useState } from "react";
import { FaPlay, FaPlayCircle } from "react-icons/fa";
import ContactFormPopup from "./ContactFormPopup";

const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="hero-gradient text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Professional Job Application Management by
            <span className="underline decoration-accent">
              {" "}
              Real Human Experts
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl mb-8">
            Stop wasting hours applying. We handle the job search while you
            focus on preparing for interviews.
          </p>
          <div
            onClick={() => setIsFormOpen(true)}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <span className="px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 animate-pulse-slow">
              Book Your Consultation Call
            </span>
            <a
              href="#how-it-works"
              className="px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary bg-opacity-20 hover:bg-opacity-30 md:py-4 md:text-lg md:px-10"
            >
              <FaPlayCircle className="mr-2 inline" /> How It Works
            </a>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="relative rounded-lg overflow-hidden shadow-xl max-w-4xl w-full">
              <img
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
                alt="Happy professional at work"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-primary bg-opacity-20 flex items-center justify-center">
                <div className="bg-white text-primary rounded-full p-4 shadow-lg">
                  <FaPlay className="text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isFormOpen && <ContactFormPopup onClose={() => setIsFormOpen(false)} />}
    </section>
  );
};

export default HeroSection;
