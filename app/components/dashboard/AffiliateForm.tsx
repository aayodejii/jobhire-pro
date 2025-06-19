// @ts-nocheck
import React from "react";

const AffiliateForm = () => {
  const affiliateSchema = Yup.object({
    payoutMethod: Yup.string().required("Payout method is required"),
    referralName: Yup.string().required("Referral link name is required"),
    destinationUrl: Yup.string()
      .url("Must be a valid URL")
      .required("Destination URL is required"),
  });

  const handleAffiliateSetup = async (values: {
    payoutMethod: string;
    referralName: string;
    destinationUrl: string;
  }) => {
    try {
      setMessage(null);

      // Create referral link
      await createReferralLink({
        name: values.referralName,
        destination_url: values.destinationUrl,
      });

      setMessage({
        type: "success",
        text: "Affiliate account setup complete! Redirecting to dashboard...",
      });

      // Redirect to dashboard after short delay
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (error: any) {
      console.error("Affiliate setup error:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Affiliate setup failed";
      setMessage({ type: "error", text: errorMsg });
    }
  };

  return (
    <Formik
      initialValues={{
        payoutMethod: "",
        referralName: "",
        destinationUrl: "",
      }}
      validationSchema={affiliateSchema}
      onSubmit={handleAffiliateSetup}
    >
      {({ isSubmitting, handleSubmit }) => (
        <div className="space-y-4">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Welcome, {userData?.email}! Let's set up your affiliate account.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payout Method
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <Field
                as="select"
                name="payoutMethod"
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select payout method</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="crypto">Cryptocurrency</option>
              </Field>
            </div>
            <ErrorMessage
              name="payoutMethod"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Referral Link Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLink className="h-5 w-5 text-gray-400" />
              </div>
              <Field
                name="referralName"
                type="text"
                placeholder="e.g. Summer Promotion"
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <ErrorMessage
              name="referralName"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLink className="h-5 w-5 text-gray-400" />
              </div>
              <Field
                name="destinationUrl"
                type="url"
                placeholder="https://yourproduct.com"
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <ErrorMessage
              name="destinationUrl"
              component="div"
              className="text-red-600 text-sm mt-1"
            />
          </div>

          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Setting Up..." : "Complete Setup"}
          </button>
        </div>
      )}
    </Formik>
  );
};

export default AffiliateForm;
