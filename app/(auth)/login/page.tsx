"use client";

import Alert from "@/app/components/Alert";
import PasswordInput from "@/app/components/PasswordInput";
import { useAuth } from "@/app/contexts/AuthContext";
import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import * as Yup from "yup";
import { login } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

const LoginForm: React.FC<{}> = () => {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

      {message && <Alert type={message.type} message={message.text} />}

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setMessage(null);
            const { user, access, refresh } = await login(
              values.email,
              values.password
            );
            if (access && refresh) {
              authLogin(user, access, refresh);
              router.push("/vx/dashboard");
            }
            setMessage({ type: "success", text: "Successfully logged in!" });
          } catch (error: any) {
            const errorMsg = error.errors?.[0]?.message || "Login failed";
            setMessage({ type: "error", text: errorMsg });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
        )}
      </Formik>

      <div className="mt-6 text-center space-y-2">
        <button
          // onClick={onSwitchToReset}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Forgot your password?
        </button>
        <div>
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <button
            // onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
