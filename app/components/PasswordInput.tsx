"use client";
import { Field } from "formik";
import { useState } from "react";
import { FiLock, FiEyeOff, FiEye } from "react-icons/fi";

const PasswordInput: React.FC<{ name: string; placeholder: string }> = ({
  name,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiLock className="h-5 w-5 text-gray-400" />
      </div>
      <Field
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="pl-10 pr-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <FiEyeOff className="h-5 w-5 text-gray-400" />
        ) : (
          <FiEye className="h-5 w-5 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
