import {
  FaUserEdit,
  FaFileAlt,
  FaSearchDollar,
  FaLinkedin,
  FaHandshake,
} from "react-icons/fa";
import {
  MdTrackChanges,
  MdWorkOutline,
  MdOutlineRateReview,
} from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiReplay10Fill } from "react-icons/ri";
import { useForm } from "../contexts/FormContext";

const Services = () => {
  const { openForm } = useForm();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our <span className="text-primary"> Comprehensive </span> Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Core Services */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center">
              {/* <FaUserEdit className="mr-3" /> */}
              Core Service: Professional Application Management
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-[18px] text-primary">
                  <RiReplay10Fill />
                </div>
                <p className="ml-4 text-lg text-gray-700">
                  <span className="font-medium">
                    Up to 50 high-qulaity, tailored applications per week
                  </span>{" "}
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <FaFileAlt />
                </div>
                <p className="ml-4 text-lg text-gray-700">
                  <span className="font-medium">
                    Human-crafted applications
                  </span>{" "}
                  customized for each position
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <MdOutlineRateReview />
                </div>
                <p className="ml-4 text-lg text-gray-700">
                  <span className="font-medium">
                    Position-specific CV tailoring
                  </span>{" "}
                  for every role you pursue
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <FaFileAlt />
                </div>
                <p className="ml-4 text-lg text-gray-700">
                  <span className="font-medium">Strategic cover letters</span>{" "}
                  addressing specific job requirements
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <MdTrackChanges />
                </div>
                <p className="ml-4 text-lg text-gray-700">
                  <span className="font-medium">
                    Transparent application tracking
                  </span>{" "}
                  through our client portal
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <HiOutlineDocumentReport />
                </div>
                <p className="ml-4 text-lg text-gray-700">
                  <span className="font-medium">Weekly progress reports</span>{" "}
                  delivered by your dedicated career advisor
                </p>
              </li>
            </ul>
          </div>

          {/* Additional Services */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center">
              {/* <FaHandshake className="mr-3" /> */}
              Additional Professional Services
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <FaUserEdit />
                </div>
                <p className="ml-4 text-lg text-gray-700">
                  <span className="font-medium">Complete CV rewriting</span> by
                  industry specialists
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <FaLinkedin />
                </div>
                <p className="ml-4 text-lg text-gray-700">
                  <span className="font-medium">
                    LinkedIn profile optimization
                  </span>{" "}
                  to attract recruiters
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <MdWorkOutline />
                </div>
                <p className="ml-4 text-lg text-gray-700">
                  <span className="font-medium">
                    Interview preparation sessions
                  </span>{" "}
                  with former hiring managers
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <FaSearchDollar />
                </div>
                <p className="ml-4 text-lg text-gray-700">
                  <span className="font-medium">
                    Salary negotiation coaching
                  </span>{" "}
                  to maximize your compensation
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-primary">
                  <FaHandshake />
                </div>
                <p className="ml-4 text-lg text-gray-700">
                  <span className="font-medium">
                    Career transition strategy
                  </span>{" "}
                  for industry or role changes
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={openForm}
            className="inline-flex items-center px-4 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Begin Your Professional Partnership
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
