// components/AffiliateDashboard.tsx
"use client";
import Alert from "@/app/components/Alert";
import ReferralLinks from "@/app/components/dashboard/ReferralLinks";
import {
  AffiliateStats,
  Commission,
  ReferralLink,
  affiliateApi,
} from "@/app/utils/affiliateApi";
import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiCopy, FiEye, FiDollarSign, FiTrendingUp } from "react-icons/fi";

const AffiliateDashboard: React.FC = () => {
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [links, setLinks] = useState<ReferralLink[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "links" | "commissions"
  >("links");

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, linksData, commissionsData] = await Promise.all([
          affiliateApi.getStats(),
          affiliateApi.getReferralLinks(),
          affiliateApi.getCommissions(),
        ]);

        setStats(statsData);
        setLinks(linksData);
        setCommissions(commissionsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {message && <Alert type={message.type} message={message.text} />}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Affiliate Dashboard
        </h1>
        <p className="text-gray-600">
          Track your performance and manage your referral links
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FiEye className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Page Views
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total_page_views}
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AiOutlineUser className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Signups
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total_signups}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FiTrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total_conversions}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FiDollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.total_earnings}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FiDollarSign className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.pending_earnings}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            // { id: "overview", name: "Overview" },
            { id: "links", name: "Referral Links" },
            { id: "commissions", name: "Commissions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "links" && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Your Referral Links
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Link
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Page views
                  </th>{" "}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Signups
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <ReferralLinks
                links={links}
                onCopyLink={() =>
                  setMessage({ type: "success", text: "Copied to clipboard!" })
                }
              />
            </table>
          </div>
        </div>
      )}

      {activeTab === "commissions" && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Commission History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {commissions.map((commission) => (
                  <tr key={commission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(commission.calculated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {commission.referral_action_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${commission.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          commission.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : commission.status === "approved"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {commission.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateDashboard;
