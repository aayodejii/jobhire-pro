"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  FaUpload,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { FiUser, FiBriefcase, FiGlobe, FiMessageSquare } from "react-icons/fi";
import { config } from "@/config";

interface Phase2FormData {
  job_title: string;
  industry: string;
  location: string;
  salary_expectations: string;
  work_experience: string;
  education_level: string;
  skills: string;
  interview_availability: string;
  start_date_availability: string;
  resume: File | null;
  communication_method: "phone" | "email" | "whatsapp";
  time_zone: string;
  additional_notes: string;
}

interface OnboardingPhase2Props {
  submissionId: string | undefined;
}

const OnboardingPhase2: React.FC<OnboardingPhase2Props> = ({
  submissionId,
}) => {
  const baseURL = config.url.API_URL;

  const initialValues: Phase2FormData = {
    job_title: "",
    industry: "",
    location: "",
    salary_expectations: "",
    work_experience: "",
    education_level: "",
    skills: "",
    interview_availability: "",
    start_date_availability: "",
    resume: null,
    communication_method: "email",
    time_zone: "",
    additional_notes: "",
  };

  const validationSchema = Yup.object({
    job_title: Yup.string().required("Job title is required"),
    industry: Yup.string().required("Industry is required"),
    location: Yup.string().required("Location is required"),
    salary_expectations: Yup.string().required(
      "Salary expectations are required"
    ),
    work_experience: Yup.string().required("Work experience is required"),
    education_level: Yup.string().required("Education level is required"),
    skills: Yup.string().required("Skills are required"),
    interview_availability: Yup.string().required(
      "Interview availability is required"
    ),
    start_date_availability: Yup.string().required(
      "Start date availability is required"
    ),
    resume: Yup.mixed().required("Resume is required"),
    communication_method: Yup.string().required(
      "Communication method is required"
    ),
    time_zone: Yup.string().required("Time zone is required"),
  });

  const onSubmit = async (values: Phase2FormData) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axios.patch(
        `${baseURL}/nextrole/phase2/${submissionId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Redirect to WhatsApp with user ID
      // const userId = response.data.userId;
      console.log("phase2 data", response.data);
      const payment_url = response.data.payment_url;

      window.location.href = payment_url;
      // window.location.href = `https://buy.stripe.com/test_9B6dR91aq7CNaup6e03AY00`;
      // window.location.href = `https://wa.me/YOUR_AGENT_NUMBER?text=UserID:${userId}`;
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const inputClases =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Complete Your Onboarding
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Personal Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            <FiUser className="inline mr-2" />
            Professional Information
          </h3>

          <div>
            <label
              htmlFor="job_title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Desired Job Title
            </label>
            <input
              type="text"
              id="job_title"
              name="job_title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.job_title}
              className={inputClases}
            />
            {formik.touched.job_title && formik.errors.job_title ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.job_title}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Industry
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.industry}
              className={inputClases}
            />
            {formik.touched.industry && formik.errors.industry ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.industry}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Preferred Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
              className={inputClases}
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.location}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="salary_expectations"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Salary Expectations
            </label>
            <input
              type="text"
              id="salary_expectations"
              name="salary_expectations"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.salary_expectations}
              className={inputClases}
            />
            {formik.touched.salary_expectations &&
            formik.errors.salary_expectations ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.salary_expectations}
              </div>
            ) : null}
          </div>
        </div>

        {/* Experience & Education Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            <FiBriefcase className="inline mr-2" />
            Experience & Education
          </h3>

          <div>
            <label
              htmlFor="work_experience"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Work Experience (Years)
            </label>
            <input
              type="text"
              id="work_experience"
              name="work_experience"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.work_experience}
              className={inputClases}
            />
            {formik.touched.work_experience && formik.errors.work_experience ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.work_experience}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="education_level"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Education Level
            </label>
            <select
              id="education_level"
              name="education_level"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.education_level}
              className={inputClases}
            >
              <option value="">Select education level</option>
              <option value="high_school">High School</option>
              <option value="associate">Associate Degree</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
            </select>
            {formik.touched.education_level && formik.errors.education_level ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.education_level}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Skills (comma separated)
            </label>
            <textarea
              id="skills"
              name="skills"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.skills}
              className={inputClases}
              rows={3}
            />
            {formik.touched.skills && formik.errors.skills ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.skills}
              </div>
            ) : null}
          </div>
        </div>

        {/* Availability Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            <FaCalendarAlt className="inline mr-2" />
            Availability
          </h3>

          <div>
            <label
              htmlFor="interview_availability"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Interview Availability
            </label>
            <input
              type="text"
              id="interview_availability"
              name="interview_availability"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.interview_availability}
              placeholder="e.g., Weekdays 9am-5pm, Flexible evenings"
              className={inputClases}
            />
            {formik.touched.interview_availability &&
            formik.errors.interview_availability ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.interview_availability}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="start_date_availability"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date Availability
            </label>
            <input
              type="text"
              id="start_date_availability"
              name="start_date_availability"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.start_date_availability}
              placeholder="e.g., Immediately, 2 weeks notice, etc."
              className={inputClases}
            />
            {formik.touched.start_date_availability &&
            formik.errors.start_date_availability ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.start_date_availability}
              </div>
            ) : null}
          </div>
        </div>

        {/* Documents Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            <FaUpload className="inline mr-2" />
            Documents
          </h3>

          <div>
            <label
              htmlFor="resume"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Resume (PDF or DOCX)
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    formik.setFieldValue(
                      "resume",
                      event.currentTarget.files[0]
                    );
                  }
                }}
                onBlur={formik.handleBlur}
                className="sr-only"
                accept=".pdf,.doc,.docx"
              />
              <label
                htmlFor="resume"
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                Choose File
              </label>
              <span className="ml-2 text-sm text-gray-500">
                {formik.values.resume
                  ? formik.values.resume.name
                  : "No file chosen"}
              </span>
            </div>
            {formik.touched.resume && formik.errors.resume ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.resume}
              </div>
            ) : null}
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            <FiGlobe className="inline mr-2" />
            Communication Preferences
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Communication Method
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="communication_method"
                  value="phone"
                  checked={formik.values.communication_method === "phone"}
                  onChange={formik.handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700 flex items-center">
                  <FaPhone className="mr-1" /> Phone
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="communication_method"
                  value="email"
                  checked={formik.values.communication_method === "email"}
                  onChange={formik.handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700 flex items-center">
                  <FaEnvelope className="mr-1" /> Email
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="communication_method"
                  value="whatsapp"
                  checked={formik.values.communication_method === "whatsapp"}
                  onChange={formik.handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700 flex items-center">
                  <FaWhatsapp className="mr-1" /> WhatsApp
                </span>
              </label>
            </div>
            {formik.touched.communication_method &&
            formik.errors.communication_method ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.communication_method}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="time_zone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time Zone
            </label>
            <select
              id="time_zone"
              name="time_zone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.time_zone}
              className={inputClases}
            >
              <option value="">Select your time zone</option>
              <option value="GMT-12:00">
                (GMT-12:00) International Date Line West
              </option>
              <option value="GMT-08:00">
                (GMT-08:00) Pacific Time (US & Canada)
              </option>
              <option value="GMT-05:00">
                (GMT-05:00) Eastern Time (US & Canada)
              </option>
              <option value="GMT+00:00">
                (GMT+00:00) Greenwich Mean Time (London)
              </option>
              <option value="GMT+01:00">
                (GMT+01:00) Central European Time
              </option>
              <option value="GMT+05:30">(GMT+05:30) India Standard Time</option>
              <option value="GMT+08:00">
                (GMT+08:00) Singapore Standard Time
              </option>
              <option value="GMT+10:00">
                (GMT+10:00) Australian Eastern Time
              </option>
            </select>
            {formik.touched.time_zone && formik.errors.time_zone ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.time_zone}
              </div>
            ) : null}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label
            htmlFor="additional_notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <FiMessageSquare className="inline mr-2" />
            Additional Notes or Comments
          </label>
          <textarea
            id="additional_notes"
            name="additional_notes"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.additional_notes}
            className={inputClases}
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : "Complete Onboarding"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingPhase2;
