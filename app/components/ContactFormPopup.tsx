// components/ContactFormPopup.tsx
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FiX, FiCalendar, FiClock } from "react-icons/fi";
import api from "../lib/api";
import { useAffiliateTracking } from "../hooks/useAffiliateTracking";
import { ConversionTracker } from "./dashboard/ConversionTracker";

interface FormValues {
  full_name: string;
  phone: string;
  email: string;
  location: string;
  ref_id: string;
  commitment: "now" | "remind-later";
  reminder_time?: "1week" | "2weeks" | "1month" | "3months";
}

const ContactFormPopup = ({ onClose }: { onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [calendarRedirecting, setCalendarRedirecting] = useState(false);
  const { getReferralCode } = useAffiliateTracking();
  const [isConverted, setIsConverted] = useState(false);

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    location: Yup.string().required("Location is required"),
    ref_id: Yup.string().required("Location is required"),
    commitment: Yup.string()
      .oneOf(["now", "remind-later"])
      .required("Please select an option"),
    reminder_time: Yup.string().when("commitment", (commitment, schema) => {
      return commitment[0] === "remind-later"
        ? schema
            .required("Please select a reminder time")
            .oneOf(
              ["1week", "2weeks", "1month", "3months"],
              "Please select a valid option"
            )
        : schema.notRequired();
    }),
  });

  const affiliateCode = getReferralCode();

  const formik = useFormik<FormValues>({
    initialValues: {
      full_name: "",
      phone: "",
      email: "",
      location: "",
      commitment: "now",
      ref_id: affiliateCode ?? "",
      reminder_time: undefined,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await axios.post(
          "https://api.cast.i.ng/admin-dashboard/next-role/leads/",
          values
        );

        setSubmissionSuccess(true);

        // If user selects "Yes" to appointment

        if (values.commitment === "now") {
          console.log("committing now....");
          setIsConverted(true); // This will trigger the ConversionTracker

          // Redirect to Google Calendar for scheduling
          setCalendarRedirecting(true);
          window.location.href =
            "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3JW0tQ6BFZs5qm99FUUZwaWkj33Etty6FfrSmmY1WOA0ey_U8f3jeb_wBc8ViYEDI0pDuqcqBv";
        }
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <ConversionTracker
        isConverted={isConverted}
        conversionType="signup"
        metadata={{ formData: {} }}
      />

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Get Started</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            {submissionSuccess ? (
              <div className="text-center py-8">
                {formik.values.commitment === "now" && calendarRedirecting ? (
                  <div className="flex flex-col items-center">
                    <FiCalendar className="text-blue-500 text-5xl mb-4 animate-pulse" />
                    <h3 className="text-xl font-semibold mb-2">
                      Redirecting to Calendar
                    </h3>
                    <p className="text-gray-600">
                      Please wait while we redirect you to schedule your
                      appointment...
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiClock className="text-green-500 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-gray-600">
                      We'll remind you in{" "}
                      {formik.values.reminder_time?.replace("-", " ")}. Our team
                      will be in touch soon.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="full_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.full_name}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formik.touched.full_name && formik.errors.full_name ? (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.full_name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.phone}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.location}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    {formik.touched.location && formik.errors.location ? (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.location}
                      </p>
                    ) : null}
                  </div>

                  <div className="pt-2">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Are you ready to commit time and resources to this now, or
                      should we follow up later?
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="commitment"
                          value="now"
                          checked={formik.values.commitment === "now"}
                          onChange={formik.handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">
                          Yes, I'm ready to commit now
                        </span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="commitment"
                          value="remind-later"
                          checked={formik.values.commitment === "remind-later"}
                          onChange={formik.handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Remind me later</span>
                      </label>
                    </div>
                  </div>

                  {formik.values.commitment === "remind-later" && (
                    <div className="pl-6 border-l-2 border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        When should we remind you?
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "1week", label: "In 1 week" },
                          { value: "2weeks", label: "In 2 weeks" },
                          { value: "1month", label: "In 1 month" },
                          { value: "3months", label: "In 3 months" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="radio"
                              name="reminder_time"
                              value={option.value}
                              checked={
                                formik.values.reminder_time === option.value
                              }
                              onChange={formik.handleChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700 text-sm">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                      {formik.touched.reminder_time &&
                      formik.errors.reminder_time ? (
                        <p className="mt-1 text-sm text-red-600">
                          {formik.errors.reminder_time}
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Processing..." : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactFormPopup;
