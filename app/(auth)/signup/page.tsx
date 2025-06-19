// src/app/components/AffiliateRegistrationForm.tsx
"use client";

import Alert from "@/app/components/Alert";
import PasswordInput from "@/app/components/PasswordInput";
import { useAuth } from "@/app/contexts/AuthContext";
import { Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { FiMail, FiUser, FiLink, FiDollarSign } from "react-icons/fi";
import * as Yup from "yup";
import { signup } from "@/app/lib/auth";
import { createReferralLink } from "@/app/lib/affiliate";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AffiliateRegistrationForm: React.FC<{}> = ({}) => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [step, setStep] = useState<"register" | "verify">("register");
  const [userData, setUserData] = useState<{
    email: string;
    id: string;
  } | null>(null);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const registerSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    re_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleRegister = async (values: {
    email: string;
    password: string;
    re_password: string;
  }) => {
    try {
      setMessage(null);

      const { user, access, refresh } = await signup(
        values.email,
        values.password,
        values.re_password
      );
      if (access && refresh) {
        console.log("logginin", user, access, refresh);
        authLogin(user, access, refresh);
      }
      setUserData({ email: user.email, id: String(user.id) });
      setStep("verify");
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMsg =
        error.response?.data?.message || error.message || "Registration failed";
      setMessage({ type: "error", text: errorMsg });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {step === "register" ? "Create Account" : "Affiliate Setup"}
      </h2>

      {message && <Alert type={message.type} message={message.text} />}
      {step === "verify" && (
        <div className="mb-4">
          <p className="text-sm text-center text-gray-600">
            Welcome, {userData?.email}! Let's set up your affiliate account. A
            verification link has been sent to your mail please click to
            continue
          </p>
        </div>
      )}

      {step === "register" && (
        <>
          <Formik
            initialValues={{
              email: "",
              password: "",
              re_password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting, handleSubmit }) => (
              <div className="space-y-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <PasswordInput name="password" placeholder="Password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                <div>
                  <PasswordInput
                    name="re_password"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage
                    name="re_password"
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
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            )}
          </Formik>

          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              // onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Sign in
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AffiliateRegistrationForm;
