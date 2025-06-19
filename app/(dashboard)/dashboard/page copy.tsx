"use client";

import useSWR from "swr";
import { Affiliate, ReferralLink, Commission, Payout } from "../../types/types";
import api from "../../lib/api";
import CreateLinkModal from "../../components/dashboard/CreateModalLink";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

const AffiliateDashboard = () => {
  const { data: affiliate, error: affiliateError } = useSWR<Affiliate>(
    "/affiliates/me/",
    fetcher
  );
  const { data: links, error: linksError } = useSWR<ReferralLink[]>(
    affiliate ? "/referral-links/" : null,
    fetcher
  );
  const { data: commissions, error: commissionsError } = useSWR<Commission[]>(
    affiliate ? "/commissions/" : null,
    fetcher
  );
  const { data: payouts, error: payoutsError } = useSWR<Payout[]>(
    affiliate ? "/payouts/" : null,
    fetcher
  );

  if (affiliateError || linksError || commissionsError || payoutsError)
    return <div>Error loading data</div>;
  if (!affiliate) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Your Balance</h3>
          <p className="text-3xl font-bold mt-2">
            ${affiliate.balance.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Payout threshold: ${affiliate.payout_threshold.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Active Links</h3>
          <p className="text-3xl font-bold mt-2">{links?.length || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">
            Total Commissions
          </h3>
          <p className="text-3xl font-bold mt-2">
            $
            {commissions?.reduce((sum, c) => sum + c.amount, 0).toFixed(2) ||
              "0.00"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReferralLinkSection affiliate={affiliate} links={links || []} />
        <PayoutSection affiliate={affiliate} payouts={payouts || []} />
      </div>
    </div>
  );
};

const ReferralLinkSection = ({
  affiliate,
  links,
}: {
  affiliate: Affiliate;
  links: ReferralLink[];
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-gray-900">Your Referral Links</h3>
      <CreateLinkModal affiliateId={affiliate.id} />
    </div>

    {links.length === 0 ? (
      <p className="text-gray-500">No referral links created yet</p>
    ) : (
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.id} className="border-b pb-3">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">
                  <a
                    href={`/r/${link.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {link.slug}
                  </a>
                </p>
                <p className="text-sm text-gray-500 truncate max-w-xs">
                  {link.destination_url}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  link.is_active
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {link.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const PayoutSection = ({
  affiliate,
  payouts,
}: {
  affiliate: Affiliate;
  payouts: Payout[];
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-gray-900">Payouts</h3>
      {affiliate.balance >= affiliate.payout_threshold && (
        <button
          onClick={() => handleRequestPayout(affiliate.id)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Request Payout
        </button>
      )}
    </div>

    {payouts.length === 0 ? (
      <p className="text-gray-500">No payout history</p>
    ) : (
      <ul className="space-y-3">
        {payouts.map((payout) => (
          <li key={payout.id} className="border-b pb-3">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">${payout.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  {new Date(payout.created_at).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  payout.status === "processed"
                    ? "bg-green-100 text-green-800"
                    : payout.status === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {payout.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const handleRequestPayout = async (affiliateId: string) => {
  try {
    await api.post("/payouts/request_payout/", { affiliate: affiliateId });
    // SWR will automatically revalidate the data
  } catch (error) {
    console.error("Payout request failed:", error);
  }
};

export default AffiliateDashboard;
