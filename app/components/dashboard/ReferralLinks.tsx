import { useState } from "react";
import { FiCopy, FiEdit2, FiCheck, FiX } from "react-icons/fi";

// Add this to your existing imports
import { affiliateApi, ReferralLink } from "@/app/utils/affiliateApi";
import Alert from "../Alert";

const ReferralLinks = ({
  links: initialLinks,
  onCopyLink,
}: {
  links: ReferralLink[];
  onCopyLink: () => void;
}) => {
  const [links, setLinks] = useState(initialLinks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedSlug, setEditedSlug] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleCopyLink = (link: ReferralLink) => {
    navigator.clipboard.writeText(link.full_url);
    onCopyLink();
  };

  const handleEditClick = (link: ReferralLink) => {
    setEditingId(link.id);
    setEditedSlug(link.slug);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedSlug("");
    setError("");
  };

  const handleSaveEdit = async (linkId: number) => {
    if (!editedSlug.trim()) {
      setError("Slug cannot be empty");
      return;
    }

    setIsUpdating(true);
    setError("");

    try {
      // Call your API to update the slug
      const updatedLink = await affiliateApi.updateReferralLink(linkId, {
        slug: editedSlug,
      });

      // Update local state
      setLinks(
        links.map((link) =>
          link.id === linkId
            ? {
                ...link,
                slug: updatedLink.slug,
                full_url: updatedLink.full_url,
              }
            : link
        )
      );

      setEditingId(null);
    } catch (err) {
      // @ts-ignore
      setError(err.response?.data?.message || "Failed to update slug");
      console.error("Error updating slug:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Add this to your affiliateApi.ts
  /*
  updateReferralLink: async (id: number, data: { slug: string }): Promise<ReferralLink> => {
    const response = await api.patch(`/api/referral-links/${id}/`, data);
    return response.data;
  },
  */

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {links.map((link) => (
        <tr key={link.id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {link.slug}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <div className="flex items-center">
              {editingId === link.id ? (
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={editedSlug}
                    onChange={(e) => setEditedSlug(e.target.value)}
                    className="border rounded px-2 py-1 text-sm w-32"
                    disabled={isUpdating}
                  />
                  {error && (
                    <span className="text-red-500 text-xs">{error}</span>
                  )}
                </div>
              ) : (
                <span className="truncate max-w-xs">{link.full_url}</span>
              )}
              <button
                onClick={() => handleCopyLink(link)}
                // onClick={() => copyToClipboard(link.full_url)}
                className="ml-2 text-blue-600 hover:text-blue-800"
                title="Copy link"
              >
                <FiCopy className="h-4 w-4" />
              </button>
              {editingId === link.id ? (
                <div className="flex ml-2">
                  <button
                    onClick={() => handleSaveEdit(link.id)}
                    className="text-green-600 hover:text-green-800 ml-1"
                    title="Save"
                    disabled={isUpdating}
                  >
                    <FiCheck className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-red-600 hover:text-red-800 ml-1"
                    title="Cancel"
                    disabled={isUpdating}
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditClick(link)}
                  className="ml-2 text-gray-600 hover:text-gray-800"
                  title="Edit slug"
                >
                  <FiEdit2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {link.total_page_views}
          </td>{" "}
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {link.total_signups}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {link.total_conversions}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                link.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {link.is_active ? "Active" : "Inactive"}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ReferralLinks;
