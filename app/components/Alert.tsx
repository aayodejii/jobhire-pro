import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const Alert: React.FC<{ type: "success" | "error"; message: string }> = ({
  type,
  message,
}) => (
  <div
    className={`flex items-center p-4 rounded-md ${
      type === "success"
        ? "bg-green-50 text-green-800"
        : "bg-red-50 text-red-800"
    }`}
  >
    {type === "success" ? (
      <FiCheckCircle className="h-5 w-5 mr-2" />
    ) : (
      <FiAlertCircle className="h-5 w-5 mr-2" />
    )}
    <span>{message}</span>
  </div>
);

export default Alert;
