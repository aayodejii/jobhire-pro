// src/components/Pricing.tsx
import { useForm } from "../contexts/FormContext";
import { PricingPlan } from "../types";
import { FaCheck, FaArrowRight } from "react-icons/fa";

const Pricing = () => {
  const { openForm } = useForm();

  const plans: PricingPlan[] = [
    {
      id: 1,
      name: "Basic",
      price: "£49",
      description: "Ideal for those testing the waters",
      features: [
        "15 applications per month",
        "Resume optimization",
        "Basic cover letters",
        "Application tracking",
      ],
      buttonVariant: "secondary",
    },
    {
      id: 2,
      name: "Professional",
      price: "£100",
      description: "Our most popular choice",
      features: [
        "40 applications per month",
        "Premium resume optimization",
        "Custom-tailored cover letters",
        "Detailed application tracking",
        "Basic interview preparation",
      ],
      isPopular: true,
      buttonVariant: "primary",
    },
    {
      id: 3,
      name: "Executive",
      price: "£199",
      description: "For serious career advancement",
      features: [
        "Unlimited applications",
        "Executive resume optimization",
        "Premium cover letters",
        "Advanced application tracking",
        "1-on-1 interview coaching",
        "Salary negotiation support",
      ],
      buttonVariant: "secondary",
    },
  ];

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, <span className="text-primary">Transparent</span> Pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Choose the plan that fits your job search needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${
                plan.isPopular
                  ? "bg-white border-2 border-primary transform scale-105"
                  : "bg-gray-50"
              } rounded-lg shadow-md overflow-hidden pricing-card transition duration-300`}
            >
              <div className="px-6 py-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                  </div>
                  {plan.isPopular && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary bg-opacity-10 text-primary">
                      BEST VALUE
                    </span>
                  )}
                </div>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-lg font-medium text-gray-600">
                    /month
                  </span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`px-6 py-4 ${
                  plan.isPopular ? "bg-primary" : "bg-gray-100"
                }`}
              >
                <a
                  href="#"
                  className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${
                    plan.buttonVariant === "primary"
                      ? "text-primary bg-white hover:bg-gray-100"
                      : "text-white bg-gray-400 hover:bg-gray-500"
                  }`}
                >
                  Get Started
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Not Sure Which Plan Is Right?
              </h3>
              <p className="text-gray-600">
                Take our 2-minute quiz to get a personalized recommendation
                based on your career goals and job search needs.
              </p>
            </div>
            <button onClick={openForm} className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Find My Perfect Plan
                <FaArrowRight className="ml-2" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
