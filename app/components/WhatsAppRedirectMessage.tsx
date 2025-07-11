import Link from "next/link";
import {
  FaCheck,
  FaLock,
  FaShieldAlt,
  FaKey,
  FaWhatsapp,
} from "react-icons/fa";

// Hi [Agent's Name],

// It's [Your Name] here (ID: [UserID]). I just completed signup and payment ✅

// Excited to get started! Let me know:
// 1. Which platforms you need access to (LinkedIn/Indeed/etc.)
// 2. Your preferred secure method to share my login details
// 3. Any other info you'll need from me

// I'm available on [your availability, e.g., "weekdays after 5PM"] if you'd like to walk me through the process.

// Thanks for your help!
// [Your Name]

const WhatsAppRedirectMessage = () => {
  const phone = "2348123456789"; // No "+" sign
  const message = encodeURIComponent(
    "Hi, I’m [User Name]. My Unique ID is [UserID]. I just completed my signup and payment and I’m ready to share my details for job applications"
  );
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg w-full max-h-[90vh] overflow-y-auto">
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Let's Get You Hired Faster! To give you the{" "}
          <span className="font-semibold">
            best chance at landing great jobs
          </span>
          , your dedicated agent will:
        </p>
      </div>

      <ul className="space-y-3 mb-6">
        <li className="flex items-start">
          <FaCheck className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
          <span>
            Optimize your profiles (LinkedIn, Indeed, etc.) to attract
            recruiters.
          </span>
        </li>
        <li className="flex items-start">
          <FaCheck className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
          <span>Apply to jobs for you—saving you hours of work.</span>
        </li>
        <li className="flex items-start">
          <FaCheck className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
          <span>Track applications and negotiate offers on your behalf.</span>
        </li>
      </ul>

      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">
          Why Share Your Login?
        </h3>
        <p className="text-blue-700 mb-3">We need temporary access to:</p>
        <ul className="list-disc list-inside text-blue-700 space-y-1 pl-2">
          <li>Update your profile with keywords recruiters search for</li>
          <li>Apply to jobs fast before positions fill up</li>
          <li>Ensure you never miss an opportunity</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">
          Your Security Comes First:
        </h3>
        <div className="space-y-3">
          {/* <div className="flex items-start">
            <div className="bg-white rounded-full p-1 mr-3">
              <FaLock className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-gray-700">
              End-to-end encryption for all shared details
            </span>
          </div> */}
          <div className="flex items-start">
            <div className="bg-white rounded-full p-1 mr-3">
              <FaShieldAlt className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-gray-700">
              Credentials are stored securely and never shared beyond your agent
            </span>
          </div>
          <div className="flex items-start">
            <div className="bg-white rounded-full p-1 mr-3">
              <FaKey className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-gray-700">
              You can change your password anytime after we're done
            </span>
          </div>
        </div>
      </div>

      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
      >
        <FaWhatsapp className="mr-2" />
        Continue to WhatsApp
      </Link>
    </div>
    // </div>
  );
};

export default WhatsAppRedirectMessage;
