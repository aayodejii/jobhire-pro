// src/components/FAQ.tsx
import { FAQItem } from "../types";
import { FaChevronDown, FaChevronUp, FaEnvelope } from "react-icons/fa";

interface FAQProps {
  activeFaq: number | null;
  toggleFaq: (id: number) => void;
}

const FAQ = ({ activeFaq, toggleFaq }: FAQProps) => {
  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "How do you match me with the right jobs?",
      answer:
        "Our proprietary matching algorithm analyzes your skills, experience, and preferences against thousands of job postings. Before we apply, you'll review and approve all selected opportunities to ensure they align with your career goals.",
    },
    {
      id: 2,
      question: "Can I provide input on which jobs to apply for?",
      answer:
        "Absolutely! You can specify companies you're interested in, set salary requirements, and even blacklist certain organizations. Our dashboard allows you to review and approve every application before submission.",
    },
    {
      id: 3,
      question: "What if I don't get any interviews?",
      answer:
        "While our success rate is over 85%, if you don't receive at least 3 interview invitations in your first month, we'll work with you to refine your approach at no extra cost. Our 14-day money-back guarantee ensures you can try risk-free.",
    },
    {
      id: 4,
      question: "How does the resume optimization work?",
      answer:
        "Our certified resume writers analyze your existing resume and enhance it by incorporating industry-specific keywords, quantifying achievements, and formatting it to pass Applicant Tracking Systems (ATS). Each application gets a customized version tailored to the specific job.",
    },
    {
      id: 5,
      question: "Can I cancel anytime?",
      answer:
        "Yes! You can cancel your subscription at any time with no hidden fees or penalties. We'll complete any pending applications you've approved, and you'll maintain access to all your materials and dashboard until the end of your billing period.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently <span className="text-primary">Asked</span> Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Everything you need to know about JobHire Pro
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white shadow overflow-hidden rounded-lg"
            >
              <div className="px-6 py-5 border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                  {activeFaq === faq.id ? (
                    <FaChevronUp className="text-primary" />
                  ) : (
                    <FaChevronDown className="text-primary" />
                  )}
                </button>
              </div>
              <div
                className={`px-6 py-4 ${
                  activeFaq === faq.id ? "block" : "hidden"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're happy to help!
          </p>
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaEnvelope className="mr-2" /> Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
