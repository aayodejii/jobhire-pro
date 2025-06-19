"use client";

import Alert from "@/app/components/Alert";
import { useAuth } from "@/app/contexts/AuthContext";
import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import * as Yup from "yup";

const ResetPasswordForm: React.FC<{}> = ({}) => {
  // const { resetPassword } = useAuth();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const resetPasswordSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

      {message && <Alert type={message.type} message={message.text} />}

      <Formik
        initialValues={{ email: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setMessage(null);
            // await resetPassword(values.email);
            setMessage({ type: "success", text: "Password reset email sent!" });
          } catch (error: any) {
            const errorMsg = error.errors?.[0]?.message || "Reset failed";
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

            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Reset Email"}
            </button>
          </div>
        )}
      </Formik>

      <div className="mt-6 text-center">
        <button
          // onClick={onSwitchToLogin}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
