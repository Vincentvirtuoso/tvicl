// src/pages/auth/Register.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { LuLogIn } from "react-icons/lu";
import StepIndicator from "../section/register/StepIndicator";
import {
  AgentStep,
  Password,
  PersonalInfo,
  ReviewStep,
  RoleSelection,
} from "../section/register";
import { useRegisterForm } from "../hooks/useRegisterForm";

const DUMMY_AGENCIES = [
  {
    id: "AG001",
    name: "Premier Properties",
    rc: "RC-1001",
    address: "Victoria Island",
  },
  { id: "AG002", name: "GoldNest Realty", rc: "RC-1002", address: "Lekki" },
  { id: "AG003", name: "Urban Keys", rc: "RC-1003", address: "Ikoyi" },
];

const registerHeaderByRole = {
  buyer: {
    pageTitle: "Join as a Buyer",
    pageSubtitle: [
      "Discover properties that match your lifestyle",
      "Save your favorite listings and compare options easily",
      "Connect with trusted real estate professionals",
      "Get alerts on new listings based on your preferences",
      "Track price changes and property availability in real time",
      "Enjoy verified property listings with full details",
      "Explore mortgage-friendly properties that fit your budget",
      "Search by location, price, or property type instantly",
      "Chat securely with agents and property managers",
      "Schedule property tours at your convenience",
      "Access detailed neighborhood insights before buying",
      "Bookmark homes and track your buying journey",
      "View high-quality property photos and videos",
      "Avoid scams with verified listings and profiles",
      "View property amenities, documents, and ownership info",
      "Make informed decisions with market intelligence tools",
      "Use advanced filters for faster property discovery",
      "Negotiate confidently with expert assistance",
      "Your real estate journey starts here",
      "Experience smarter property buying on Vigilo",
    ],
  },

  agent: {
    pageTitle: "Join as an Agent",
    pageSubtitle: [
      "Manage and promote property listings professionally",
      "Connect with serious property buyers and sellers",
      "Track and organize client inquiries in one place",
      "Boost your visibility with a professional profile",
      "List unlimited properties with advanced tools",
      "Showcase verified agent credibility and reviews",
      "Respond to client messages faster and close more deals",
      "Enjoy a centralized workspace for real estate marketing",
      "Build your portfolio and grow your client trust",
      "Publish property listings with photos, videos, and docs",
      "Save time with automated client follow-ups",
      "Access smart insights for business growth",
      "Stand out in your area with top agent ranking",
      "Promote rental and sale listings with ease",
      "Showcase team collaborations and partnerships",
      "Track leads and measure conversion performance",
      "Boost your productivity with smart tools",
      "Earn more by reaching high-intent clients",
      "Manage clients and listings on web or mobile",
      "Build your real estate career with Vigilo",
    ],
  },

  agency: {
    pageTitle: "Register Your Agency",
    pageSubtitle: [
      "Manage your agency operations in one dashboard",
      "Assign roles and monitor agent activity in real time",
      "Oversee all agency property listings efficiently",
      "Track agent performance and conversions",
      "Approve or reject agent property uploads",
      "Maintain agency branding with verified profiles",
      "Centralize team communication and workflow",
      "Generate business insights from performance analytics",
      "Protect your agency reputation with verified agents",
      "Automate administrative tasks for better efficiency",
      "Add and manage multiple branches or locations",
      "Collaborate with team members seamlessly",
      "Showcase your agency portfolio publicly",
      "Gain trust with verified agency registration",
      "Monitor property engagement and lead activity",
      "Track agency revenue and conversion metrics",
      "Promote top-performing agents and listings",
      "Grow your real estate network and reach",
      "Build a professional agency presence online",
      "Lead your team to success with Vigilo",
    ],
  },
};

const Register = () => {
  const navigate = useNavigate();

  const { changeHeader } = useOutletContext();

  const {
    step,
    steps,
    setRole,
    data,
    updateField,
    role,
    validateStep,
    errors,
    next,
    back,
    setStep,
  } = useRegisterForm();

  useEffect(() => {
    changeHeader(registerHeaderByRole[role]);
  }, [role]);

  const [submitting, setSubmitting] = useState(false);

  // form state

  // agent/agency fields
  const [agencyName, setAgencyName] = useState("");
  const [joinMode, setJoinMode] = useState("code"); // code | search | create
  const [agencyQuery, setAgencyQuery] = useState("");
  const [agencySearchResults, setAgencySearchResults] =
    useState(DUMMY_AGENCIES);

  // OTP simulation
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState(""); // generated code
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // simple validation errors

  useEffect(() => {
    // reset agency search results on query change (simulate)
    if (!agencyQuery) {
      setAgencySearchResults(DUMMY_AGENCIES);
      return;
    }
    const q = agencyQuery.toLowerCase().trim();
    setAgencySearchResults(
      DUMMY_AGENCIES.filter(
        (a) =>
          a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q)
      )
    );
  }, [agencyQuery]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // simulate registration
  const submitRegistration = () => {
    if (!validateStep(step)) return;
    setSubmitting(true);
    // simulate API call delay
    setTimeout(() => {
      setSubmitting(false);
      // generate OTP
      const code = String(Math.floor(100000 + Math.random() * 900000));
      setOtpCode(code);
      setShowOtp(true);
      setResendTimer(60);
      console.info("SIMULATED OTP:", code); // dev: OTP printed to console for testing
    }, 1200);
  };

  const verifyOtp = () => {
    setOtpError("");
    if (otpInput.trim() === otpCode) {
      // success
      setShowOtp(false);
      // show small success state then navigate to login
      setTimeout(() => {
        // Here you'd finalize user onboarding & redirect to /login or dashboard
        navigate("/login");
      }, 700);
    } else {
      setOtpError("Invalid code. Please try again.");
    }
  };

  const resendOtp = () => {
    if (resendTimer > 0) return;
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setOtpCode(code);
    setResendTimer(60);
    console.info("SIMULATED OTP (resent):", code);
  };

  // Simple rendered summary for review step
  const review = {
    role: data.role,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    licenseId: data.licenseId,
    experienceYears: data.experienceYears,
    agencyName:
      role === "agent"
        ? joinMode === "create"
          ? data.agencyName
          : data.agencyCode
          ? `Joined: ${data.agencyCode}`
          : agencyName
        : data.agencyName,
    agencyAddress: data.agencyAddress,
    rcNumber: data.rcNumber,
  };

  // animation variants
  const variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div>
      <StepIndicator step={step} steps={steps} />

      <div className="bg-white overflow-hidden">
        <AnimatePresence exitBeforeEnter initial={false}>
          {/* ROLE SELECTION */}
          {step === 0 && (
            <RoleSelection
              variants={variants}
              role={role}
              setRole={setRole}
              setStep={setStep}
            />
          )}

          {/* PERSONAL DETAILS */}
          {step === 1 && (
            <PersonalInfo
              variants={variants}
              errors={errors}
              next={next}
              back={back}
              {...data}
              onChange={updateField}
            />
          )}

          {/* AGENCY STEP (conditional) */}
          {role !== "buyer" && step === 2 && (
            <AgentStep
              variants={variants}
              role={role}
              errors={errors}
              back={back}
              {...data}
              onChange={updateField}
              next={next}
            />
          )}

          {/* SECURITY (password + tos) */}
          {((role === "buyer" && step === 2) ||
            (role !== "buyer" && step === 3)) && (
            <Password
              variants={variants}
              validateStep={validateStep}
              errors={errors}
              back={back}
              setStep={setStep}
              onChange={updateField}
              next={next}
              {...data}
            />
          )}

          {/* REVIEW & SUBMIT */}
          {((role === "buyer" && step === 3) ||
            (role !== "buyer" && step === 4)) && (
            <ReviewStep
              variants={variants}
              review={review}
              role={role}
              submitRegistration={submitRegistration}
              submitting={submitting}
              back={back}
            />
          )}
        </AnimatePresence>
      </div>

      {/* OTP Modal / Overlay */}
      <AnimatePresence>
        {showOtp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => {}}
            />

            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              className="relative z-50 max-w-md w-full bg-white rounded-2xl p-6 shadow-2xl border border-gray-100"
            >
              <h4 className="text-lg font-semibold mb-2">Verify your phone</h4>
              <p className="text-sm text-gray-500 mb-4">
                We sent a 6-digit code to {data.phone || data.email}.
                (Simulated)
              </p>

              <div className="flex gap-2">
                <input
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 p-3 border border-gray-200 rounded-lg text-sm"
                />
                <button
                  className="px-4 py-2 rounded-lg border"
                  onClick={verifyOtp}
                >
                  <FiCheck />
                </button>
              </div>
              {otpError && (
                <div className="text-xs text-red-500 mt-2">{otpError}</div>
              )}

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div>
                  {resendTimer > 0 ? (
                    <span>Resend available in {resendTimer}s</span>
                  ) : (
                    <button
                      onClick={resendOtp}
                      className="underline text-primary"
                    >
                      Resend code
                    </button>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => {
                      setShowOtp(false);
                    }}
                    className="text-sm px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="flex items-center gap-3 mt-4 text-sm justify-center w-full"
        onClick={() => navigate("/auth")}
      >
        <LuLogIn /> Have an account? Sign in
      </button>
    </div>
  );
};

export default Register;
