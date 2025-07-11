"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { config } from "@/config";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaPrint,
  FaHome,
  FaHeadset,
} from "react-icons/fa";
import WhatsAppRedirectMessage from "@/app/components/WhatsAppRedirectMessage";

const SuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState("verifying");
  const [generatedContent, setGeneratedContent] = useState("");
  const [error, setError] = useState("");
  const baseURL = config.url.API_URL;

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      const checkStatus = async () => {
        try {
          const response = await axios.get(
            `${baseURL}/nextrole/check_payment_status/?session_id=${sessionId}`
          );

          if (response.data.status === "paid") {
            setPaymentStatus("paid");
            setGeneratedContent(response.data.generated_content);
          } else {
            setTimeout(checkStatus, 2000);
          }
        } catch (err) {
          setError(
            "Failed to verify payment. Please contact support if the problem persists."
          );
          setPaymentStatus("error");
        }
      };

      checkStatus();
    } else {
      setError(
        "Invalid session ID. Please return to the checkout page and try again."
      );
      setPaymentStatus("error");
    }
  }, [sessionId, baseURL]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          {paymentStatus === "verifying" && (
            <div className="flex flex-col items-center space-y-4">
              <FaSpinner className="h-12 w-12 text-blue-600 animate-spin" />
              <h2 className="text-2xl font-bold text-gray-800">
                Verifying Your Payment
              </h2>
              <p className="text-gray-600 text-center">
                Please wait while we confirm your payment. This may take a
                moment...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
              </div>
            </div>
          )}

          {paymentStatus === "paid" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <FaCheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 text-center">
                  Payment Successful!
                </h2>
                <p className="text-gray-600 mt-2 text-center">
                  Thank you for your purchase. Here's your user ID:
                </p>
              </div>

              <WhatsAppRedirectMessage />
              <div className="prose max-w-none text-gray-700">
                {generatedContent}
              </div>

              {/* <button
                onClick={() => window.print()}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                <FaPrint /> Print or Save
              </button> */}
            </div>
          )}

          {paymentStatus === "error" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <FaTimesCircle className="h-16 w-16 text-red-500 mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 text-center">
                  Payment Error
                </h2>
                <p className="text-gray-600 mt-2 text-center">{error}</p>
              </div>

              <div className="mt-6 space-y-4">
                <a
                  href="/"
                  className="w-full text-center flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
                >
                  <FaHome /> Return Home
                </a>
                <a
                  href="/support"
                  className="w-full text-center flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
                >
                  <FaHeadset /> Contact Support
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {paymentStatus === "paid" && (
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help?{" "}
            <a href="/support" className="text-blue-600 hover:text-blue-800">
              Contact our support team
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
