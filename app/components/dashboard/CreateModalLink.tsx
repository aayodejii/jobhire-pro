"use client";

import api from "@/app/lib/api";
import { ReferralLink } from "@/app/types/types";
import { useState } from "react";

const CreateLinkModal = ({ affiliateId }: { affiliateId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [destinationUrl, setDestinationUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post<ReferralLink>("/referral-links/", {
        affiliate: affiliateId,
        destination_url: destinationUrl,
        slug: customSlug || undefined,
      });

      // Success - close modal and reset form
      setIsOpen(false);
      setDestinationUrl("");
      setCustomSlug("");
      // The parent component using SWR will automatically refetch the links
    } catch (err) {
      setError("Failed to create link. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Create New Link
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Create Referral Link
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="destinationUrl"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Destination URL
                  </label>
                  <input
                    type="url"
                    id="destinationUrl"
                    value={destinationUrl}
                    onChange={(e) => setDestinationUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="https://example.com"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="customSlug"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Custom Slug (optional)
                  </label>
                  <input
                    type="text"
                    id="customSlug"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="my-custom-link"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Leave blank to generate automatically
                  </p>
                </div>

                {error && (
                  <div className="mb-4 text-sm text-red-600">{error}</div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? "Creating..." : "Create Link"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateLinkModal;
