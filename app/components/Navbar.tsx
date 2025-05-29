// src/components/Navbar.tsx
import { FaBriefcase } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <FaBriefcase className="text-primary text-2xl mr-2" />
              <span className="text-xl font-bold text-primary">NextRole </span>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Benefits
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Success Stories
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="#pricing"
              className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
