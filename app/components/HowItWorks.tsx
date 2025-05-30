// src/components/HowItWorks.tsx
import { useForm } from "../contexts/FormContext";
import { Step } from "../types";
import { FaArrowRight } from "react-icons/fa";

const HowItWorks = () => {
  const { openForm } = useForm();

  const steps: Step[] = [
    {
      id: 1,
      title: "Subscribe & Share Goals",
      description:
        "Tell us about your career aspirations, skills, and preferences. We'll create your personalized job search strategy.",
    },
    {
      id: 2,
      title: "We Optimize & Apply",
      description:
        "Our experts tailor your resume for each application and submit to carefully selected job postings.",
    },
    {
      id: 3,
      title: "Real-Time Feedback",
      description:
        "Get updates on application status, employer responses, and personalized tips to improve your chances.",
    },
    {
      id: 4,
      title: "Land Interviews & Get Hired",
      description:
        "With more quality applications going out, you'll secure interviews faster and land your dream job.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How <span className="text-primary">NextRole</span> Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Our proven 4-step process gets you more interviews with less effort
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className="bg-white p-6 rounded-lg shadow-md text-center feature-card transition duration-300"
              >
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white mb-4">
                  <span className="text-xl font-bold">{step.id}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div onClick={openForm} className="mt-12 text-center">
            <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Get Started in Minutes
              <FaArrowRight className="ml-2" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
