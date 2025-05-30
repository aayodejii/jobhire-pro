// src/components/CTA.tsx
import { FaPhoneAlt } from "react-icons/fa";
import { useForm } from "../contexts/FormContext";

const CTA = () => {
  const { openForm } = useForm();

  return (
    <section className="py-16 hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
          Stop Struggling Alone—
          <span className="underline decoration-accent">
            Let's Get You Hired!
          </span>
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Schedule your free 30-minute career strategy consultation to discuss
          how we can help you secure better opportunities aligned with your
          career goals.
        </p>
        <button onClick={openForm} className="flex justify-center w-full gap-4">
          <span className="px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-primary bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
            <FaPhoneAlt className="mr-2 inline" /> Book a Free Consultation
          </span>
        </button>
      </div>
    </section>
  );
};

export default CTA;
