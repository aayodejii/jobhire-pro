// src/components/Benefits.tsx
import { JSX } from "react";
import { Benefit } from "../types";
import {
  FaClock,
  FaChartLine,
  FaCommentDots,
  FaBell,
  FaLock,
  FaHandHoldingUsd,
  FaArrowRight,
} from "react-icons/fa";

const Benefits = () => {
  const benefits: Benefit[] = [
    {
      id: 1,
      icon: "FaClock",
      title: "Save 20+ Hours Weekly",
      description:
        "No more endless applications. Our team handles the time-consuming parts while you prepare for interviews or upskill.",
    },
    {
      id: 2,
      icon: "FaChartLine",
      title: "3x More Interviews",
      description:
        "Professionally tailored applications significantly increase your response rate compared to generic applications.",
    },
    {
      id: 3,
      icon: "FaCommentDots",
      title: "Personalized Feedback",
      description:
        "Get actionable insights on your applications and interview performance to continuously improve.",
    },
    {
      id: 4,
      icon: "FaBell",
      title: "Real-Time Updates",
      description:
        "Stay informed with regular updates on application status and employer responses—no more black holes.",
    },
    {
      id: 5,
      icon: "FaLock",
      title: "Complete Control",
      description:
        "Review and approve every application before submission. You're always in the driver's seat.",
    },
    {
      id: 6,
      icon: "FaHandHoldingUsd",
      title: "Risk-Free Guarantee",
      description:
        "Not satisfied? We offer a full refund within 14 days if you don't get at least 3 interview invitations.",
    },
  ];

  const iconComponents: Record<string, JSX.Element> = {
    FaClock: <FaClock className="text-white text-xl" />,
    FaChartLine: <FaChartLine className="text-white text-xl" />,
    FaCommentDots: <FaCommentDots className="text-white text-xl" />,
    FaBell: <FaBell className="text-white text-xl" />,
    FaLock: <FaLock className="text-white text-xl" />,
    FaHandHoldingUsd: <FaHandHoldingUsd className="text-white text-xl" />,
  };

  return (
    <section id="benefits" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why <span className="text-primary">Thousands</span> of Job Seekers
            Choose Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            We take the frustration out of job searching so you can focus on
            what matters
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-primary bg-opacity-10 p-3 rounded-full">
                  {iconComponents[benefit.icon]}
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary rounded-lg p-8 text-white">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-2">
                Ready to Transform Your Job Search?
              </h3>
              <p className="text-primary-100">
                Join thousands of professionals who've landed their dream jobs
                with our help.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <a
                href="#pricing"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                Get Started Today
                <FaArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
