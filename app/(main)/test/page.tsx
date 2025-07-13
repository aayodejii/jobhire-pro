"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
} from "react-icons/fi";
import axios from "axios";

const WaitlistPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      currentLocation: "",
      desiredJobLocation: "",
      willingToPay: "",
      interestedInAffiliate: false,
      notifyOnLaunch: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be at least 10 digits"),
      currentLocation: Yup.string().required("Required"),
      desiredJobLocation: Yup.string().required("Required"),
      willingToPay: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Replace with your actual API endpoint
        await axios.post("https://api.example.com/waitlist", values);
        setSubmitted(true);
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">
            You're on the list!
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Thank you for joining the NextRole waitlist. We'll be in touch soon
            with more details about our launch.
          </p>
          <div className="text-gray-400">
            <p>In the meantime, follow us on social media for updates:</p>
            <div className="flex justify-center space-x-4 mt-4">
              {/* Social icons would go here */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Logo */}
        <header className="flex justify-center mb-12">
          <div className="bg-blue-600 text-white font-bold text-2xl px-6 py-3 rounded-lg">
            NextRole
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Description Section */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-white mb-6">
              Stop Wasting Hours on Job Applications
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Get hired faster with professional job application management by
              real human experts.
            </p>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
              <p className="text-gray-300 mb-6">
                While you're spending 20+ hours a week crafting applications and
                getting lost in job board black holes, you could be preparing
                for interviews and advancing your career. NextRole's human
                experts handle your entire job search process—from tailoring
                applications to tracking responses—so you can focus on what
                matters most.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                What We Do for You
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    25 high-quality, tailored applications per week submitted
                    across all major job platforms
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Human-crafted applications customized for each position by
                    career professionals
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Position-specific CV tailoring that speaks directly to
                    hiring managers
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Strategic cover letters addressing specific job requirements
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Transparent tracking with weekly progress reports from your
                    dedicated career advisor
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>
                    Additional services available: Professional CV rewriting and
                    LinkedIn profile optimization
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-white mb-4">
                The NextRole Advantage
              </h2>
              <p className="text-gray-300">
                Skip the endless hours of generic applications that disappear
                into black holes. Our human experts will handle your entire job
                search with personalized attention, strategic targeting, and
                comprehensive coverage across all major job platforms—so you can
                focus on preparing for the interviews we help you secure.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:w-1/2">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Ready to transform your job search?
              </h2>
              <p className="text-gray-400 mb-6">
                Join our waitlist and be among the first to experience
                professional job application management that actually works.
              </p>

              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-500" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="pl-10 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        placeholder="your@email.com"
                      />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                      <p className="mt-1 text-sm text-red-400">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-500" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        className="pl-10 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        placeholder="1234567890"
                      />
                    </div>
                    {formik.touched.phone && formik.errors.phone ? (
                      <p className="mt-1 text-sm text-red-400">
                        {formik.errors.phone}
                      </p>
                    ) : null}
                  </div>

                  {/* Current Location */}
                  <div>
                    <label
                      htmlFor="currentLocation"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Current Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-500" />
                      </div>
                      <input
                        id="currentLocation"
                        name="currentLocation"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.currentLocation}
                        className="pl-10 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        placeholder="City, Country"
                      />
                    </div>
                    {formik.touched.currentLocation &&
                    formik.errors.currentLocation ? (
                      <p className="mt-1 text-sm text-red-400">
                        {formik.errors.currentLocation}
                      </p>
                    ) : null}
                  </div>

                  {/* Desired Job Location */}
                  <div>
                    <label
                      htmlFor="desiredJobLocation"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Desired Job Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiBriefcase className="text-gray-500" />
                      </div>
                      <input
                        id="desiredJobLocation"
                        name="desiredJobLocation"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.desiredJobLocation}
                        className="pl-10 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        placeholder="City, Country or 'Remote'"
                      />
                    </div>
                    {formik.touched.desiredJobLocation &&
                    formik.errors.desiredJobLocation ? (
                      <p className="mt-1 text-sm text-red-400">
                        {formik.errors.desiredJobLocation}
                      </p>
                    ) : null}
                  </div>

                  {/* Willing to Pay */}
                  <div>
                    <label
                      htmlFor="willingToPay"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      How much would you be willing to pay for this service?
                      (per month in £)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiDollarSign className="text-gray-500" />
                      </div>
                      <select
                        id="willingToPay"
                        name="willingToPay"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.willingToPay}
                        className="pl-10 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-white"
                      >
                        <option value="" className="bg-gray-800">
                          Select a price range
                        </option>
                        <option value="20-50" className="bg-gray-800">
                          £20 - £50
                        </option>
                        <option value="50-100" className="bg-gray-800">
                          £50 - £100
                        </option>
                        <option value="100-150" className="bg-gray-800">
                          £100 - £150
                        </option>
                        <option value="150-200" className="bg-gray-800">
                          £150 - £200
                        </option>
                        <option value="200+" className="bg-gray-800">
                          £200+
                        </option>
                      </select>
                    </div>
                    {formik.touched.willingToPay &&
                    formik.errors.willingToPay ? (
                      <p className="mt-1 text-sm text-red-400">
                        {formik.errors.willingToPay}
                      </p>
                    ) : null}
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notifyOnLaunch"
                          name="notifyOnLaunch"
                          type="checkbox"
                          onChange={formik.handleChange}
                          checked={formik.values.notifyOnLaunch}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="notifyOnLaunch"
                          className="font-medium text-gray-300"
                        >
                          Notify me when this product launches
                        </label>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="interestedInAffiliate"
                          name="interestedInAffiliate"
                          type="checkbox"
                          onChange={formik.handleChange}
                          checked={formik.values.interestedInAffiliate}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="interestedInAffiliate"
                          className="font-medium text-gray-300"
                        >
                          Would you be interested in joining our 10% affiliate
                          program?
                        </label>
                        <p className="text-gray-400">
                          Earn 10% commission for every referral
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 disabled:opacity-70"
                    >
                      {isLoading ? "Joining Waitlist..." : "Join Waitlist Now"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;
