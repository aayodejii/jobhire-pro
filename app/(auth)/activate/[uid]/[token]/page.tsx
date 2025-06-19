"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "@/app/contexts/AuthContext";
import { login } from "@/app/lib/auth";
import { config } from "@/config";

interface ActivateParams {
  uid: string;
  token: string;
}

export default function ActivateAccount({
  params,
}: {
  params: Promise<ActivateParams>;
}) {
  const [isActivating, setIsActivating] = useState(true);
  const [activationSuccess, setActivationSuccess] = useState(false);
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const baseURL = config.url.API_URL;

  // Unwrap the params Promise
  const resolvedParams = use(params);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const { uid, token } = resolvedParams;

        await axios.post(`${baseURL}/auth/users/activation/`, {
          uid,
          token,
        });

        setActivationSuccess(true);

        try {
          setTimeout(() => {
            router.push("/login?activated=true");
          }, 3000);
        } catch (loginError) {
          console.error("Error logging in after activation:", loginError);
          setTimeout(() => {
            router.push("/login?activated=true");
          }, 3000);
        }
      } catch (error) {
        console.error("Activation error:", error);
      } finally {
        setIsActivating(false);
      }
    };

    activateAccount();
  }, [resolvedParams, router, authLogin]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/img/blur.png')] bg-cover bg-center p-4">
      {/* <ToastContainer position="top-right" autoClose={5000} /> */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          {/* <img src="/img/logo3.png" alt="Logo" className="mx-auto mb-6" /> */}
          <h1 className="text-[30px] font-bold">NextRole</h1>

          {isActivating ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <h2 className="text-xl font-semibold mt-4">
                Activating your account...
              </h2>
              <p className="text-gray-600 mt-2">
                Please wait while we verify your account.
              </p>
            </div>
          ) : activationSuccess ? (
            <div className="flex flex-col items-center">
              <FiCheckCircle className="text-5xl text-green-500" />
              <h2 className="text-xl font-semibold mt-4">
                Account Successfully Activated!
              </h2>
              <p className="text-gray-600 mt-2">
                You're now being redirected to login...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FiAlertCircle className="text-5xl text-red-500" />
              <h2 className="text-xl font-semibold mt-4">Activation Failed</h2>
              <p className="text-gray-600 mt-2">
                The activation link may be expired or invalid.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="bg-primary text-white px-4 py-2 rounded-md mt-4 hover:bg-opacity-90 transition-all"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
