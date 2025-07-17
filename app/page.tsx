"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdPlace,
  MdAttachMoney,
  MdGroup,
  MdCheckCircle,
  MdDescription,
  MdTrendingUp,
  MdStar,
} from "react-icons/md";
import axios from "axios";
import { config } from "@/config";
import { useRouter } from "next/navigation";
import CountrySelector from "./components/CountrySelector";
import Link from "next/link";

const NextRoleWaitlist = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const baseURL = config.url.API_URL;
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    current_location: Yup.string().required("Current location is required"),
    desired_location: Yup.string().required("Desired job location is required"),
    willing_to_pay: Yup.string().required("Please select your budget range"),
    affiliate_interest: Yup.string().required(
      "Please let us know about affiliate interest"
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      current_location: "",
      desired_location: "",
      willing_to_pay: "",
      affiliate_interest: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${baseURL}/nextrole/waitlist/`,
          values
        );
        if (response.status === 201) {
          router.push("/joined-waitlist");
        }
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        // setIsSubmitted(false);
      }
    },
  });

  // if (isSubmitted) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
  //       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
  //         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
  //           <MdCheckCircle className="w-8 h-8 text-green-600" />
  //         </div>
  //         <h2 className="text-2xl font-bold text-gray-900 mb-4">
  //           You're on the list!
  //         </h2>
  //         <p className="text-gray-600 mb-6">
  //           Thank you for joining our waitlist. We'll notify you as soon as
  //           NextRole launches and you'll be among the first to experience
  //           professional job application management.
  //         </p>
  //         <div className="bg-blue-50 rounded-lg p-4">
  //           <p className="text-sm text-blue-800 font-medium">
  //             Keep an eye on your inbox for exclusive early access and special
  //             launch offers!
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center"> */}
              {/* <MdTarget className="w-6 h-6 text-white" /> */}
              <Link href={""}>
                <img
                  src="/img/NextRole-full-logo.png"
                  alt=""
                  className="w-[140px]"
                />
              </Link>

              {/* </div> */}

              {/* <h1 className="text-2xl font-bold text-white">NextRole</h1> */}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Description */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                You Could’ve Landed That Job… If You Had the Time to Apply.
                {/* Stop Wasting Hours on Job Applications */}
              </h2>
              {/* <p className="text-xl text-gray-300 mb-8">
                Get hired faster with professional job application management by
                real human experts.
              </p> */}
              {/* <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                <p className="text-gray-300 leading-relaxed">
                  While you're spending 20+ hours a week crafting applications
                  and getting lost in job board black holes, you could be
                  preparing for interviews and advancing your career. NextRole's
                  human experts handle your entire job search process—from
                  tailoring applications to tracking responses—so you can focus
                  on what matters most.
                </p>
              </div> */}
            </div>

            {/* What We Do */}
            <div className="bg-gray-800 rounded-xl p-3 lg:p-8 shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <MdStar className="w-6 h-6 text-yellow-500 mr-2" />
                What We Do for You
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      25 high-quality, tailored applications per week
                    </strong>{" "}
                    submitted across all major job platforms
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      Human-crafted applications
                    </strong>{" "}
                    customized for each position by career professionals
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      Position-specific CV tailoring
                    </strong>{" "}
                    that speaks directly to hiring managers
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      Strategic cover letters
                    </strong>{" "}
                    addressing specific job requirements
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">Transparent tracking</strong>{" "}
                    with weekly progress reports from your dedicated career
                    advisor
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">
                    <strong className="text-white">
                      Additional services available:
                    </strong>{" "}
                    Professional CV rewriting and LinkedIn profile optimization
                  </p>
                </div>
              </div>
            </div>

            {/* The NextRole Advantage */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-3 lg:p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <MdTrendingUp className="w-6 h-6 mr-2" />
                The NextRole Advantage
              </h3>
              {/* <p className="text-blue-100 leading-relaxed mb-6">
                Skip the endless hours of generic applications that disappear
                into black holes. Our human experts will handle your entire job
                search with personalized attention, strategic targeting, and
                comprehensive coverage across all major job platforms—so you can
                focus on preparing for the interviews we help you secure.
              </p> */}
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white font-medium">
                  Ready to transform your job search? Join our waitlist and be
                  among the first to experience professional job application
                  management that actually works.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-gray-800 rounded-xl shadow-xl p-3 lg:p-8 border border-gray-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Join the Waitlist
                </h3>
                <p className="text-gray-400">
                  Be the first to know when NextRole launches
                </p>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <MdEmail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...formik.getFieldProps("email")}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                    placeholder="your@email.com"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <MdPhone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...formik.getFieldProps("phone")}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                    placeholder="+44 7123 456789"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-1 text-sm text-red-400">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>

                {/* Current Location */}
                <div>
                  <label
                    htmlFor="current_location"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <MdLocationOn className="w-4 h-4 inline mr-1" />
                    Current Location
                  </label>
                  <CountrySelector
                    value={formik.values.current_location}
                    onChange={(value: string) =>
                      formik.setFieldValue("current_location", value)
                    }
                    placeholder="Select your current country"
                    hasError={
                      !!(
                        formik.touched.current_location &&
                        formik.errors.current_location
                      )
                    }
                  />
                  {formik.touched.current_location &&
                    formik.errors.current_location && (
                      <p className="mt-1 text-sm text-red-400">
                        {formik.errors.current_location}
                      </p>
                    )}
                </div>

                {/* Desired Location */}
                <div>
                  <label
                    htmlFor="desired_location"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <MdPlace className="w-4 h-4 inline mr-1" />
                    Desired Job Location
                  </label>
                  <CountrySelector
                    value={formik.values.desired_location}
                    onChange={(value: string) =>
                      formik.setFieldValue("desired_location", value)
                    }
                    placeholder="Select desired job country"
                    hasError={
                      !!(
                        formik.touched.desired_location &&
                        formik.errors.desired_location
                      )
                    }
                  />
                  {formik.touched.desired_location &&
                    formik.errors.desired_location && (
                      <p className="mt-1 text-sm text-red-400">
                        {formik.errors.desired_location}
                      </p>
                    )}
                </div>

                {/* Willing to Pay */}
                <div>
                  <label
                    htmlFor="willing_to_pay"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <MdAttachMoney className="w-4 h-4 inline mr-1" />
                    What's your budget for professional job application
                    management?
                  </label>
                  <select
                    id="willing_to_pay"
                    {...formik.getFieldProps("willing_to_pay")}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                  >
                    <option value="">Select budget range</option>
                    <option value="100-150">£100 - £150 per month</option>
                    <option value="150-200">£150 - £200 per month</option>
                    <option value="150-200">£200 - £250 per month</option>
                  </select>
                  {formik.touched.willing_to_pay &&
                    formik.errors.willing_to_pay && (
                      <p className="mt-1 text-sm text-red-400">
                        {formik.errors.willing_to_pay}
                      </p>
                    )}
                </div>

                {/* Affiliate Interest */}
                <div>
                  <label
                    htmlFor="affiliate_interest"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    <MdGroup className="w-4 h-4 inline mr-1" />
                    Would you be interested in joining our 10% affiliate program
                    to earn commissions by referring others?
                  </label>
                  <select
                    id="affiliate_interest"
                    {...formik.getFieldProps("affiliate_interest")}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                  >
                    <option value="">Select your interest</option>
                    <option value="very-interested">Very interested</option>
                    <option value="somewhat-interested">
                      Somewhat interested
                    </option>
                    <option value="not-interested">Not interested</option>
                    <option value="tell-me-more">Tell me more</option>
                  </select>
                  {formik.touched.affiliate_interest &&
                    formik.errors.affiliate_interest && (
                      <p className="mt-1 text-sm text-red-400">
                        {formik.errors.affiliate_interest}
                      </p>
                    )}
                </div>

                <button
                  type="button"
                  onClick={() => formik.handleSubmit()}
                  disabled={formik.isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {formik.isSubmitting
                    ? "Joining Waitlist..."
                    : "Join Waitlist"}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  By joining our waitlist, you'll be notified when NextRole
                  launches and receive exclusive early access offers.
                </p>
              </div>
            </div>

            {/* Service Summary */}
            {/* <div className="mt-6 bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Service Summary
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MdDescription className="w-4 h-4 text-blue-600" />
                  <span>25 applications per week (5 per day)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MdGpsFixed className="w-4 h-4 text-blue-600" />
                  <span>100 applications per month</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MdTrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Weekly progress reviews</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NextRoleWaitlist;
