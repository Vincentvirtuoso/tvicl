// Auth.jsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuEye,
  LuEyeOff,
  LuMail,
  LuLock,
  LuUser,
  LuCircleCheck,
  LuX,
} from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "/images/logo.png";
import hero from "/images/hero.jpeg";
import { FcGoogle } from "react-icons/fc";
import { authHeader } from "../data/authHeader";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../context/ToastManager";

const PRIMARY = "#1E90FF";

function getPasswordChecks(password) {
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

function getPasswordScore(password) {
  const checks = Object.values(getPasswordChecks(password)).filter(
    Boolean
  ).length;
  // 0..4 -> convert to percent
  return Math.round((checks / 4) * 100);
}

export default function Auth() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [view, setView] = useState(state?.action || "register"); // register | dashboard
  const isRegister = view === "register";
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastResendTime, setLastResendTime] = useState(null);
  const [user, setUser] = useState(null);

  const { pageTitle = "", pageSubtitle = [] } =
    authHeader[view] || authHeader.login;
  const [fade, setFade] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { register, login, loading, resendVerificationEmail } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (typeof pageSubtitle === "string") {
      return;
    }
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((p) => (p + 1) % pageSubtitle.length);
        setFade(true);
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, [pageSubtitle, pageSubtitle.length]);

  const pwdChecks = useMemo(
    () => getPasswordChecks(form.password),
    [form.password]
  );
  const pwdScore = useMemo(
    () => getPasswordScore(form.password),
    [form.password]
  );

  const validate = () => {
    const err = {};

    // Common fields for both register and login
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = "Valid email is required";
    }
    if (!form.password.trim()) {
      err.password = "Password is required";
    }

    // Extra validation only during REGISTER
    if (isRegister) {
      if (!form.fullName.trim()) {
        err.fullName = "Full name is required";
      }
      if (!form.phone.trim()) {
        err.phone = "Phone number is required";
      }
      if (form.password.length < 8) {
        err.password = "Password must be at least 8 characters";
      }
      if (Object.values(pwdChecks).some((c) => !c)) {
        err.password = "Password must meet all rules";
      }
      if (form.password !== form.confirm) {
        err.confirm = "Passwords do not match";
      }
      if (!form.terms) {
        err.terms = "You must accept terms & privacy";
      }
    }

    return err;
  };

  const handleChange = (field) => (e) => {
    const value = field === "terms" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [field]: value }));
    setErrors((s) => ({ ...s, [field]: undefined }));
  };

  const handleActionSwitch = (action) => {
    setView(action);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      let response;
      if (isRegister) {
        response = await register(form);
        navigate("/auth/verify-notice", { state: { email: form.email } });
        addToast(
          "Account created successfully. Check your email to verify.",
          "success"
        );
        setShowSuccess(true);
        return;
      }

      // LOGIN
      response = await login(form);

      addToast(response.message || "Logged in successfully", "success");
      // After login or refresh
      if (response?.user?.activeRole === "agent") navigate("/agent/dashboard");
      else if (response?.user?.activeRole === "estate")
        navigate("/estate/dashboard");
      else if (response?.user?.activeRole === "admin")
        navigate("/admin/dashboard");
      else navigate("/");
    } catch (error) {
      const data = error.response?.data;

      // Handle unverified email
      if (data?.requiresVerification) {
        const now = Date.now();
        if (!lastResendTime || now - lastResendTime > 60000) {
          // 60 sec cooldown
          try {
            await resendVerificationEmail(data.email);
            setLastResendTime(now);
            addToast("Verification email resent. Check your inbox.", "info");
          } catch (resendErr) {
            console.warn("Resend failed", resendErr);
            addToast(
              "Failed to resend verification email. Try again later.",
              "error"
            );
          }
        }

        navigate("/auth/verify-notice", { state: { email: data.email } });
        return;
      }

      addToast(
        data?.message ||
          "Authentication failed. Check your connection and try again.",
        "error",
        { duration: 6000 }
      );
    }
  };

  const handleGuest = () => {
    const guest = { id: "guest", name: "Guest", role: "guest" };
    setUser(guest);
    navigate("/");
  };

  const finishSuccess = () => {
    setShowSuccess(false);
    navigate("/");
  };

  // Animations
  const panelVariants = {
    hidden: { opacity: 0, y: 16 },
    enter: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
  };

  // Register view (Split screen)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full overflow-hidden grid grid-cols-1 lg:grid-cols-2 lg:h-screen">
        {/* LEFT: Banner */}
        <motion.div
          className="relative hidden lg:block h-screen z-1 sticky top-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,20,34,0.55), rgba(10,20,34,0.55)), url(${hero})`,
            filter: "contrast(1.02) saturate(0.95)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="text-white max-w-xs">
              <h3 className="text-2xl font-bold mb-2">
                Find or list luxury properties
              </h3>
              <p className="text-sm opacity-90">
                EstateHub helps sellers and buyers connect. Create a profile and
                list your property in minutes.
              </p>
            </div>
            <div className="mt-6 text-white/80 text-xs">
              Trusted by thousands of professionals
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center">
                  A
                </div>
                <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center">
                  B
                </div>
                <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center">
                  C
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="p-5 lg:h-screen lg:overflow-y-auto"
        >
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between sm:flex-row flex-col gap-4">
              <div className="flex items-center gap-2 flex-1 sm:flex-row flex-col">
                <img
                  src={logo}
                  alt="TVCIL"
                  className="w-15 transition-all duration-300 hover:drop-shadow-[0_10px_20px_rgba(250,204,21,0.2)] rounded-full cursor-pointer"
                  onClick={() => {
                    if (state.from !== "unauthorized") {
                      navigate("/");
                    }
                  }}
                />
                <motion.div
                  key={view}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-center sm:text-left"
                >
                  {pageTitle ? (
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {pageTitle}
                    </h2>
                  ) : (
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Welcome
                    </h2>
                  )}

                  {pageSubtitle && (
                    <p
                      className={`text-sm text-gray-500 mt-1 max-w-md transition-opacity duration-500 ${
                        fade ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {pageSubtitle[currentIndex]}
                    </p>
                  )}
                </motion.div>
              </div>

              <div className="text-sm text-gray-500">
                {isRegister ? "Already a member?" : "New to TVICL?"}{" "}
                <button
                  onClick={() =>
                    handleActionSwitch(isRegister ? "login" : "register")
                  }
                  className="text-blue-400 underline"
                >
                  Sign {isRegister ? "in" : "up"}
                </button>
              </div>
            </div>
            {state?.from?.pathname === "/become-agent-or-agency" && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-2 mt-2 text-center">
                <p>
                  Please <span className="font-semibold">login</span> or{" "}
                  <span className="font-semibold">create an account</span>{" "}
                  before setting up an{" "}
                  <span className="font-semibold">agent</span> or{" "}
                  <span className="font-semibold">estate</span> profile.
                </p>
              </div>
            )}

            <AnimatePresence mode="wait" initial={false}>
              <motion.form
                key="registerForm"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-6 space-y-4"
              >
                {/* Full name */}
                {isRegister && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <LuUser className="w-4 h-4" />
                      </div>
                      <input
                        value={form.fullName}
                        onChange={handleChange("fullName")}
                        className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none ${
                          errors.fullName ? "border-red-400" : "border-gray-200"
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <LuMail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                {isRegister && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <div className="mt-1 flex rounded-md overflow-hidden border border-gray-200 shadow-sm">
                      {/* simple country code stub */}
                      <div className="bg-gray-100 px-3 flex items-center text-sm text-gray-600">
                        +234
                      </div>
                      <input
                        value={form.phone}
                        onChange={handleChange("phone")}
                        className={`w-full pl-3 pr-3 py-2 border-0 focus:outline-none ${
                          errors.phone ? "ring-1 ring-red-400" : ""
                        }`}
                        placeholder="801 234 5678"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <LuLock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange("password")}
                      className={`block w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none ${
                        errors.password ? "border-red-400" : "border-gray-200"
                      }`}
                      placeholder="At least 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <LuEyeOff className="w-4 h-4" />
                      ) : (
                        <LuEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.password}
                    </p>
                  )}

                  {/* Password strength / rules */}
                  {isRegister && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="mt-3"
                    >
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <div>Password strength</div>
                        <div className="font-medium">{pwdScore}%</div>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pwdScore}%`,
                            background:
                              pwdScore >= 80
                                ? "linear-gradient(90deg,#34d399,#10b981)"
                                : pwdScore >= 50
                                ? "#60a5fa"
                                : "#fb7185",
                          }}
                        />
                      </div>

                      <ul className="mt-3 text-xs space-y-1">
                        <li className="flex items-center gap-2">
                          <span
                            className={`${
                              pwdChecks.length
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          >
                            {pwdChecks.length ? (
                              <LuCircleCheck className="w-4 h-4" />
                            ) : (
                              <span className="w-4 h-4 inline-block" />
                            )}
                          </span>
                          <span
                            className={
                              pwdChecks.length
                                ? "text-gray-700"
                                : "text-gray-400"
                            }
                          >
                            At least 8 characters
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span
                            className={`${
                              pwdChecks.upper
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          >
                            {pwdChecks.upper ? (
                              <LuCircleCheck className="w-4 h-4" />
                            ) : (
                              <span className="w-4 h-4 inline-block" />
                            )}
                          </span>
                          <span
                            className={
                              pwdChecks.upper
                                ? "text-gray-700"
                                : "text-gray-400"
                            }
                          >
                            One uppercase letter
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span
                            className={`${
                              pwdChecks.number
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          >
                            {pwdChecks.number ? (
                              <LuCircleCheck className="w-4 h-4" />
                            ) : (
                              <span className="w-4 h-4 inline-block" />
                            )}
                          </span>
                          <span
                            className={
                              pwdChecks.number
                                ? "text-gray-700"
                                : "text-gray-400"
                            }
                          >
                            One number
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span
                            className={`${
                              pwdChecks.special
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          >
                            {pwdChecks.special ? (
                              <LuCircleCheck className="w-4 h-4" />
                            ) : (
                              <span className="w-4 h-4 inline-block" />
                            )}
                          </span>
                          <span
                            className={
                              pwdChecks.special
                                ? "text-gray-700"
                                : "text-gray-400"
                            }
                          >
                            One special character
                          </span>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </div>

                {/* Confirm password */}
                {isRegister && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Confirm password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <LuLock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        value={form.confirm}
                        onChange={handleChange("confirm")}
                        className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none ${
                          errors.confirm ? "border-red-400" : "border-gray-200"
                        }`}
                        placeholder="Re-type password"
                      />
                    </div>
                    {errors.confirm && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.confirm}
                      </p>
                    )}
                  </div>
                )}

                {/* Terms */}
                {isRegister && (
                  <div className="flex items-start gap-3">
                    <input
                      id="terms"
                      type="checkbox"
                      checked={form.terms}
                      onChange={handleChange("terms")}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-[#1E90FF] underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#1E90FF] underline">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>
                )}
                {errors.terms && (
                  <p className="text-xs text-red-500 mt-1">{errors.terms}</p>
                )}

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={handleSubmit}
                    disabled={loading.register || loading.login}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium bg-primary text-sm ${
                      loading.register || loading.login
                        ? "bg-primary/50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {loading.register || loading.login ? (
                      <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                    ) : isRegister ? (
                      "Create account"
                    ) : (
                      "Sign in"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleGuest}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-600/30 text-sm hover:border-gray-600/50 text-gray-600"
                  >
                    Continue as guest
                  </button>

                  <div className="flex md:items-center flex-col md:flex-row justify-between text-sm text-gray-500 mt-1 gap-3">
                    <div className="flex items-center justify-center gap-2 py-2 px-4 border border-primary rounded-md">
                      <FcGoogle className="w-4 h-4" />
                      <button
                        type="button"
                        className="text-gray-500"
                        onClick={() => alert("Google sign-in placeholder")}
                      >
                        Continue with Google
                      </button>
                    </div>

                    <div className="text-right text-xs">
                      <div className="text-gray-500">
                        You can become an agent later
                      </div>
                      <div className="text-gray-400">
                        Add properties to TVICL
                      </div>
                    </div>
                  </div>
                </div>
              </motion.form>
            </AnimatePresence>

            {/* Success modal */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ background: PRIMARY }}
                        >
                          ✓
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">
                            Account created
                          </h3>
                          <p className="text-sm text-gray-500">
                            You're all set — welcome to EstateHub.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowSuccess(false)}
                        className="text-gray-400"
                      >
                        <LuX />
                      </button>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={finishSuccess}
                        className="flex-1 px-4 py-2 rounded-md text-white font-medium"
                        style={{ background: PRIMARY }}
                      >
                        Go to dashboard
                      </button>
                      <button
                        onClick={() => {
                          setShowSuccess(false);
                        }}
                        className="flex-1 px-4 py-2 rounded-md border"
                      >
                        Stay here
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
