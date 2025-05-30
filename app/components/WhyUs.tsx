import {
  FaBalanceScale,
  FaUserGraduate,
  FaUsers,
  FaHeartbeat,
} from "react-icons/fa";
import { useForm } from "../contexts/FormContext";

const WhyChooseUs = () => {
  const { openForm } = useForm();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Not algorithms or AI, we personally handle your job search.
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                We understand that your time is valuable, especially when
                you're:
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <FaBalanceScale className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Balancing current employment while seeking better
                    opportunities
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <FaUsers className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Managing family responsibilities alongside career
                    aspirations
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <FaUserGraduate className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Investing time in upskilling rather than administrative
                    application tasks
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <FaHeartbeat className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recovering from burnout and needing expert support
                  </h3>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-xl text-gray-600 mb-6">
                Our human experts meticulously tailor each application to
                maximize your chances of success.
              </p>
              <button
                onClick={openForm}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Schedule Your Career Strategy Session
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[300px] lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
            <div
              className="absolute h-full flex items-center justify-center
             bg-gradient-to-r from-indigo-100 to-purple-100"
            >
              <img
                src="/img/about-img.jpg"
                alt="NextRole team helping candidates"
                className="object-contain w-full h-full"
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
