"use client";

import {
  FiLink,
  FiDollarSign,
  FiActivity,
  FiCopy,
  FiUser,
} from "react-icons/fi";
import useSWR from "swr";
import {
  getAffiliateProfile,
  getReferralLinks,
  getCommissions,
  createReferralLink,
} from "@/app/lib/affiliate";
import { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "@/app/components/Alert";

const AffiliateDashboard2 = () => {
  const {
    data: profile,
    error: profileError,
    mutate: mutateProfile,
  } = useSWR("affiliate-profile", getAffiliateProfile);
  const {
    data: links,
    error: linksError,
    mutate: mutateLinks,
  } = useSWR("referral-links", getReferralLinks);
  const { data: commissions, error: commissionsError } = useSWR(
    "commissions",
    getCommissions
  );
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleCreateLink = async (values: {
    name: string;
    destination_url: string;
  }) => {
    try {
      await createReferralLink(values);
      mutateLinks();
      setMessage({
        type: "success",
        text: "Referral link created successfully!",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create referral link" });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setMessage({ type: "success", text: "Copied to clipboard!" });
  };

  if (profileError || linksError || commissionsError)
    return <div>Error loading data</div>;
  if (!profile || !links || !commissions) return <div>Loading...</div>;

  const totalEarnings = commissions.reduce(
    (sum, commission) => sum + commission.amount,
    0
  );
  const pendingEarnings = commissions
    .filter((c) => c.status === "pending")
    .reduce((sum, commission) => sum + commission.amount, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        NextRole | Affiliate Dashboard
      </h1>

      {message && <Alert type={message.type} message={message.text} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FiDollarSign size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-500">Balance</h3>
              <p className="text-2xl font-bold">
                ${profile.balance}
                {/* TODO:fix */}
                {/* ${profile.balance.toFixed(2)} */}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FiActivity size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-500">
                Total Earnings
              </h3>
              <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <FiUser size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-500">Your Code</h3>
              <div className="flex items-center">
                <p className="text-2xl font-bold mr-2">{profile.code}</p>
                <button
                  onClick={() => copyToClipboard(profile.code)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Copy to clipboard"
                >
                  <FiCopy size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Create New Referral Link</h2>
          <Formik
            initialValues={{ name: "", destination_url: "" }}
            validationSchema={Yup.object({
              name: Yup.string().required("Name is required"),
              destination_url: Yup.string()
                .url("Must be a valid URL")
                .required("Destination URL is required"),
            })}
            onSubmit={handleCreateLink}
          >
            {({ isSubmitting, handleSubmit }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Summer Promotion"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destination URL
                  </label>
                  <Field
                    name="destination_url"
                    type="url"
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourproduct.com"
                  />
                  <ErrorMessage
                    name="destination_url"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Link"}
                </button>
              </form>
            )}
          </Formik>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Your Referral Links</h2>
          {links.length === 0 ? (
            <p className="text-gray-500">
              You haven't created any referral links yet.
            </p>
          ) : (
            <div className="space-y-4">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="border-b border-gray-200 pb-4 last:border-0"
                >
                  <h3 className="font-medium">{link.slug}</h3>
                  <div className="flex items-center mt-1">
                    <a
                      href={`${window.location.origin}/ref/${link.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {`${window.location.origin}/ref/${link.slug}`}
                    </a>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `${window.location.origin}/ref/${link.slug}`
                        )
                      }
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      title="Copy to clipboard"
                    >
                      <FiCopy size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Points to: {link.destination_url}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Your Commissions</h2>
        {commissions.length === 0 ? (
          <p className="text-gray-500">No commissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {commissions.map((commission) => (
                  <tr key={commission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(commission.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${commission.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          commission.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : commission.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {commission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {commission.referral_action?.action_type || "Unknown"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {profile.balance >= profile.payout_threshold && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Request Payout</h2>
          <p className="mb-4">
            You have ${profile.balance.toFixed(2)} available for payout. Minimum
            payout threshold is ${profile.payout_threshold.toFixed(2)}.
          </p>
          <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Request Payout
          </button>
        </div>
      )}
    </div>
  );
};

export default AffiliateDashboard2;
