import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../context/ToastManager";
import { useAuth } from "./useAuth";

export const useRoleSwitch = (user) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const { updateRole, loading } = useAuth();

  const switchRole = async (role) => {
    try {
      // Get current intended location (if redirected from another route)
      const from = location.state?.from || "/";

      // Check if user has the role
      if (!user.roles?.includes(role)) {
        navigate("/become-agent-or-agency", {
          state: { role, redirectTo: from },
        });
        return;
      }

      // Update active role via API
      await updateRole({
        role: user?.activeRole,
        makeActive: role,
      });

      // Show confirmation toast
      addToast(
        `You are now viewing as ${role === "buyer" ? "a" : "an"} ${role}`,
        "info",
        { duration: 4000 }
      );

      // Check if a redirect path was saved
      const redirectPath =
        sessionStorage.getItem("pendingRedirect") ||
        location.state?.redirectTo ||
        (role === "buyer" ? "/" : `/${role}/dashboard`);

      // Clear pending redirect after using it
      sessionStorage.removeItem("pendingRedirect");

      // Redirect user
      window.location.href = redirectPath;
    } catch (err) {
      console.error("Role switch failed:", err);
      const msg =
        err?.response?.data?.message ||
        "Unable to switch role. Please try again.";
      addToast(msg, "error", { duration: 6000 });
    }
  };

  const saveRedirect = (path) => {
    sessionStorage.setItem("pendingRedirect", path);
  };

  return { switchRole, saveRedirect, isUpdating: loading?.updateRole };
};
