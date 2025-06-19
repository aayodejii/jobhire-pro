"use client";

import Alert from "@/app/components/Alert";
import PasswordInput from "@/app/components/PasswordInput";
import { useAuth } from "@/app/contexts/AuthContext";
import { Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { FiMail, FiUser } from "react-icons/fi";
import * as Yup from "yup";
import { signup } from "@/app/lib/auth";

const RegisterForm: React.FC<{ onSwitchToLogin: () => void }> = ({
  onSwitchToLogin,
}) => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const registerSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    re_password: Yup.string()
      .oneOf([Yup.ref("re_password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

      {message && <Alert type={message.type} message={message.text} />}

      <Formik
        initialValues={{
          email: "",
          password: "",
          re_password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setMessage(null);
            await signup(values.email, values.password, values.re_password);
            setMessage({
              type: "success",
              text: "Account created successfully!",
            });
          } catch (error: any) {
            console.error("Registration error:", error);
            const errorMsg =
              error.errors?.[0]?.message || "Registration failed";
            setMessage({ type: "error", text: errorMsg });
          } finally {
            setSubmitting(false);
          }
        }}
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
        <span className="text-gray-600 text-sm">Already have an account? </span>
        <button
          onClick={onSwitchToLogin}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
