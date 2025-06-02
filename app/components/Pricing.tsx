// src/components/Pricing.tsx
import { useForm } from "../contexts/FormContext";
import { PricingPlan } from "../types";
import { FaCheck, FaArrowRight } from "react-icons/fa";

const Pricing = () => {
  const { openForm } = useForm();

  const plans: PricingPlan[] = [
    {
      id: 1,
      name: "Standard Plan",
      price: "£100",
      description: "Our comprehensive job application service",
      features: [
        "10 applications per day",
        "5 days a week (Monday to Friday)",
        "Dedicated account manager",
        "Application tracking",
        "Weekly progress reports",
      ],
      buttonVariant: "primary",
      isPopular: true,
    },
  ];

  const additionalServices = [
    {
      name: "CV Optimization",
      price: "£25",
      description: "Professional CV rewrite tailored to your target roles",
    },
    {
      name: "LinkedIn Optimization",
      price: "£25",
      description: "Complete LinkedIn profile overhaul for maximum visibility",
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
            Our comprehensive job application service package
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`${
                  plan.isPopular
                    ? "bg-white border-2 border-primary"
                    : "bg-gray-50"
                } relative rounded-lg shadow-lg overflow-hidden pricing-card transition duration-300`}
              >
                <div className="px-6 py-8">
                  <div className=" flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-medium text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-6">{plan.description}</p>
                    </div>
                    {plan.isPopular && (
                      <span className="absolute top-3 right-3 w-[100px] flex justify-center items-center px-3 py-2 rounded-full text-[8px] font-medium bg-primary bg-opacity-10 text-white">
                        POPULAR CHOICE
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline mb-6">
                    <span className="text-5xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-lg font-medium text-gray-600">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`px-6 py-4 ${
                    plan.isPopular ? "bg-primary" : "bg-gray-100"
                  }`}
                >
                  <button
                    onClick={openForm}
                    className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium ${
                      plan.buttonVariant === "primary"
                        ? "text-primary bg-white hover:bg-gray-100"
                        : "text-white bg-gray-400 hover:bg-gray-500"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Additional Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              >
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.name}
                </h4>
                <div className="flex items-baseline mb-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {service.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button
                  onClick={openForm}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-secondary"
                >
                  Add to Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Need More Information?
              </h3>
              <p className="text-gray-600">
                Contact us to discuss your specific needs and how we can help
                with your job search.
              </p>
            </div>
            <button onClick={openForm} className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Contact Us
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
