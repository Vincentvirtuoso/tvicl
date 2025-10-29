import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCamera, FiCheck } from "react-icons/fi";
import { LuBuilding } from "react-icons/lu";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useToast } from "../context/ToastManager";
import ProfileCard from "../section/account/ProfileCard";
import MainSection from "../section/account/MainSection";
import { useAuth } from "../hooks/useAuth";
import useAgent from "../hooks/useAgent";

// Map frontend labels to backend role values
const ROLE_LABELS = {
  buyer: { label: "Buyer / Renter", value: "buyer" },
  agent: { label: "Agent", value: "agent" },
  estate: { label: "Real Estate Agency", value: "estate" },
};

export default function ProfilePage() {
  const { user, updateProfile, loading, updateRole } = useAuth();
  const { addToast: showToast } = useToast();

  const userRoles = user?.roles?.map((u) => {
    return ROLE_LABELS[u];
  });

  const { agent } = useAgent();
  const estate = { verified: false };

  const isBuyer = user.activeRole === "buyer";
  const isAgent = user.activeRole === "agent";
  const isEstate = user.activeRole === "estate";

  const roleBasedUser = isBuyer
    ? user
    : isAgent
    ? { ...user, agent }
    : { ...user, estate };

  // Form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    roles: ["buyer"],
    activeRole: "buyer",
    profilePhoto: "",
    coverPhoto: "",
    verified: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  // File uploads
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  // Initialize form when user changes
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        roles: user.roles || ["buyer"],
        activeRole: user.activeRole || "buyer",
        profilePhoto: user.profilePhoto || "",
        coverPhoto: user.coverPhoto || "",
        verified: user.verified || false,
      });
      setProfilePreview(user.profilePhoto || "");
      setCoverPreview(user.coverPhoto || "");
    }
  }, [user]);

  // Clean up blob URLs
  useEffect(() => {
    return () => {
      if (profilePreview.startsWith("blob:"))
        URL.revokeObjectURL(profilePreview);
      if (coverPreview.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
    };
  }, [profilePreview, coverPreview]);

  // ----------------- Handlers -----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const triggerProfileUpload = () => fileInputRef.current?.click();

  const handleProfilePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (profilePreview.startsWith("blob:")) URL.revokeObjectURL(profilePreview);
    const url = URL.createObjectURL(file);
    setProfilePreview(url);
    setProfileFile(file);
    setForm((p) => ({ ...p, profilePhoto: url }));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (coverPreview.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
    const url = URL.createObjectURL(file);
    setCoverPreview(url);
    setCoverFile(file);
    setForm((p) => ({ ...p, coverPhoto: url }));
  };

  const uploadFileToServer = async (file) => {
    if (!file) return null;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/uploads", { method: "POST", body: fd });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    return data.url;
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      let profilePhotoUrl = form.profilePhoto;
      let coverPhotoUrl = form.coverPhoto;

      if (profileFile) profilePhotoUrl = await uploadFileToServer(profileFile);
      if (coverFile) coverPhotoUrl = await uploadFileToServer(coverFile);

      const payload = {
        fullName: form.fullName,
        phone: form.phone,
        profilePhoto: profilePhotoUrl || "",
        coverPhoto: coverPhotoUrl || "",
        // backend handles roles array + activeRole
        roles: form.roles,
        activeRole: form.activeRole,
      };

      await updateProfile(payload);
      showToast("Profile updated successfully", "success");

      // cleanup blob URLs
      setProfileFile(null);
      setCoverFile(null);
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to update profile", "error");
      setIsEditing(true);
    }
  };

  const openRoleModal = () => setShowRoleModal(true);

  const selectRole = (value) => {
    setForm((p) => ({ ...p, activeRole: value }));
  };

  const confirmRole = async () => {
    try {
      await updateRole({ role: user.activeRole, makeActive: form.activeRole });
      showToast("Active role updated", "success");
    } catch (err) {
      showToast(err.message || "Failed to update role", "error");
    } finally {
      setShowRoleModal(false);
    }
  };

  // ----------------- JSX -----------------
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Hero */}
      <div className="relative w-full h-60 lg:h-90">
        <div className="group w-full h-full">
          <img
            src={
              coverPreview ||
              "https://images.unsplash.com/photo-1501183638710-841dd1904471"
            }
            alt="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={handleCoverUpload}
              className="hidden"
            />
            <div className="text-white flex items-center gap-2">
              <FiCamera /> Change Cover
            </div>
          </label>
        </div>

        {/* Profile avatar + card */}
        <div className="absolute -bottom-26 left-4 right-4 py-4 px-6 flex items-center gap-4 bg-slate-200 rounded-md">
          <div className="relative">
            <img
              src={profilePreview || "/default-avatar.png"}
              alt="profile"
              className="w-22 h-22 rounded-full object-cover border-4 border-gray-600 shadow-lg"
            />
            <button
              onClick={triggerProfileUpload}
              className="absolute right-0 bottom-0 bg-primary p-2 rounded-full"
            >
              <FiCamera />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfilePick}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <ProfileCard
              profile={form}
              openRoleModal={openRoleModal}
              user={roleBasedUser}
              isBuyer={isBuyer}
              isAgent={isAgent}
              isEstate={isEstate}
            />
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="p-6 mt-26 relative z-10">
        <MainSection
          profile={form}
          handleChange={handleChange}
          handleSave={handleSave}
          form={form}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          saving={loading.updateProfile}
        />
      </div>

      {/* Role Modal */}
      <AnimatePresence>
        {showRoleModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowRoleModal(false)}
            />
            <motion.div className="relative z-10 max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Select Active Role</h3>
              <div className="flex flex-col gap-3">
                {userRoles?.map((r) => (
                  <RoleOption
                    key={r.value}
                    title={r.label}
                    icon={
                      r.value === "agent" ? (
                        <IoBriefcaseOutline />
                      ) : (
                        <LuBuilding />
                      )
                    }
                    selected={form.activeRole === r.value}
                    onClick={() => selectRole(r.value)}
                  />
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowRoleModal(false)}
                  className="px-4 py-1.5 text-sm rounded-md border border-secondary text-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRole}
                  className="px-4 py-1.5 text-sm rounded-md bg-primary text-white"
                >
                  <FiCheck className="inline-block mr-2" /> Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RoleOption({ title, icon, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg border ${
        selected ? "border-black/10 bg-gray-50" : "border-gray-100"
      } hover:shadow`}
    >
      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white shadow">
        {icon}
      </div>
      <div className="flex-1 text-left font-medium">{title}</div>
      <div>{selected ? <FiCheck /> : null}</div>
    </button>
  );
}
