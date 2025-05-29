import {
  FaLinkedin,
  FaGlobeAmericas,
  FaIndustry,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiIndeed, SiGlassdoor } from "react-icons/si";
import { MdWork } from "react-icons/md";

const JobBoardCoverage = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Extensive <span className="text-primary"> Job Board </span>Coverage
        </h2>

        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Our team submits applications across all major job platforms and
          industry-specific boards, including:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* General Job Boards */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <FaGlobeAmericas className="text-indigo-600 text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">
                General Job Boards
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaLinkedin className="text-gray-500 mr-2" />
                LinkedIn Jobs
              </li>
              <li className="flex items-center">
                <SiIndeed className="text-blue-500 mr-2" />
                Indeed
              </li>
              <li className="flex items-center">
                <SiGlassdoor className="text-green-600 mr-2" />
                Glassdoor
              </li>
              <li className="flex items-center">
                <MdWork className="text-purple-500 mr-2" />
                Monster
              </li>
              <li className="flex items-center">
                <MdWork className="text-blue-600 mr-2" />
                CareerBuilder
              </li>
              <li className="flex items-center">
                <MdWork className="text-yellow-500 mr-2" />
                ZipRecruiter
              </li>
              <li className="flex items-center">
                <MdWork className="text-red-500 mr-2" />
                SimplyHired
              </li>
            </ul>
          </div>

          {/* Industry-Specific Platforms */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <FaIndustry className="text-indigo-600 text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">
                Industry-Specific
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MdWork className="text-blue-600 mr-2" />
                Dice (Technology)
              </li>
              <li className="flex items-center">
                <MdWork className="text-green-600 mr-2" />
                eFinancialCareers (Finance)
              </li>
              <li className="flex items-center">
                <MdWork className="text-red-500 mr-2" />
                Health eCareers (Healthcare)
              </li>
              <li className="flex items-center">
                <MdWork className="text-purple-600 mr-2" />
                Mediabistro (Media)
              </li>
              <li className="flex items-center">
                <MdWork className="text-orange-500 mr-2" />
                Ladders (Executive)
              </li>
              <li className="flex items-center">
                <MdWork className="text-black mr-2" />
                AngelList (Startups)
              </li>
              <li className="flex items-center">
                <MdWork className="text-blue-800 mr-2" />
                USAJobs (Government)
              </li>
            </ul>
          </div>

          {/* Regional Job Boards */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-indigo-600 text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">
                Regional Job Boards
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MdWork className="text-red-600 mr-2" />
                Craigslist (Local postings)
              </li>
              <li className="flex items-center">
                <MdWork className="text-blue-600 mr-2" />
                Totaljobs (UK)
              </li>
              <li className="flex items-center">
                <MdWork className="text-yellow-500 mr-2" />
                SEEK (Australia)
              </li>
              <li className="flex items-center">
                <MdWork className="text-green-600 mr-2" />
                Naukri (India)
              </li>
              <li className="flex items-center">
                <MdWork className="text-red-500 mr-2" />
                Jobstreet (Southeast Asia)
              </li>
            </ul>
          </div>

          {/* Direct Applications */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <FaIndustry className="text-indigo-600 text-2xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">
                Additional Reach
              </h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  +
                </span>
                <span>
                  <strong>Direct applications</strong> to company career pages
                  not listed on major job boards
                </span>
              </li>
              <li className="text-gray-600 mt-4">
                We monitor all platforms daily for new opportunities matching
                your profile
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-4 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Begin Your Professional Job Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobBoardCoverage;
