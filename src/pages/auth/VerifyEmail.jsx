import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiRefreshCcw,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  const [status, setStatus] = useState("verifying"); // verifying | success | failed | already
  const [message, setMessage] = useState("");

  const handleVerify = useCallback(async () => {
    setStatus("verifying");
    try {
      const res = await verifyEmail(token);
      if (res.alreadyVerified) {
        setStatus("already");
        setMessage(res.message || "Your email is already verified.");
      } else {
        setStatus("success");
        setMessage(res.message || "Your email has been successfully verified!");
      }
    } catch (err) {
      setStatus("failed");
      setMessage(
        err.response?.data?.message ||
          "This verification link is invalid or has expired."
      );
    }
  }, [token, verifyEmail]);

  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center border border-gray-100">
        {/* Loading */}
        {status === "verifying" && (
          <>
            <FiLoader className="animate-spin text-blue-500 mx-auto mb-4" size={50} />
            <h2 className="text-xl font-semibold text-gray-800">
              Verifying your email...
            </h2>
            <p className="text-gray-500 mt-2">
              Please wait while we finish setting things up.
            </p>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <FiCheckCircle className="text-green-500 mx-auto mb-4" size={55} />
            <h2 className="text-2xl font-semibold text-green-700">Email Verified ✅</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <button
              onClick={() => navigate("/auth", { state: { action: "login" } })}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Proceed to Login
            </button>
          </>
        )}

        {/* Already Verified */}
        {status === "already" && (
          <>
            <FiCheckCircle className="text-green-500 mx-auto mb-4" size={55} />
            <h2 className="text-2xl font-semibold text-green-700">Already Verified</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <button
              onClick={() => navigate("/auth", { state: { action: "login" } })}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Go to Login
            </button>
          </>
        )}

        {/* Failed */}
        {status === "failed" && (
          <>
            <FiXCircle className="text-red-500 mx-auto mb-4" size={55} />
            <h2 className="text-2xl font-semibold text-red-600">Verification Failed</h2>
            <p className="text-gray-600 mt-2">{message}</p>

            <Link
              to="/auth"
              className="mt-6 w-full block bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Go Back to Register
            </Link>

            <button
              onClick={handleVerify}
              className="mt-3 w-full border border-gray-300 hover:bg-gray-100 py-2 rounded-md transition inline-flex justify-center items-center text-gray-700"
            >
              <FiRefreshCcw className="mr-2" /> Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
