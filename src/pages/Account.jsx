import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCamera, FiCheck } from "react-icons/fi";
import { LuBuilding } from "react-icons/lu";
import ProfileCard from "../section/account/ProfileCard";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useToast } from "../context/ToastManager";
import MainSection from "../section/account/MainSection";
import { useAuth } from "../hooks/useAuth";

// --- Helper: map frontend labels to backend role values ---
const ROLE_LABELS = [
  { label: "Buyer / Renter", value: "buyer" },
  { label: "Agent", value: "agent" },
  { label: "Real Estate Agency", value: "seller" },
];

export default function ProfilePage() {
  const { user, updateProfile, loading } = useAuth();
  const { addToast: showToast } = useToast();

  // local form state derived from `user` (single source of truth is backend/user)
  const [form, setForm] = useState(() => ({
    fullName: "",
    email: "",
    phone: "",
    role: "buyer",
    profilePhoto: "",
    coverPhoto: "",
    verified: false
  }));

  const [isEditing, setIsEditing] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  // files & previews
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  // initialize form when user changes
  useEffect(() => {
    if (user) {
      setForm((p) => ({
        ...p,
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "buyer",
        profilePhoto: user.profilePhoto || "",
        coverPhoto: user.coverPhoto || "",
        verified: user.verified || false
      }));
      setProfilePreview(user.profilePhoto || "");
      setCoverPreview(user.coverPhoto || "");
    }
  }, [user]);

  // clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (profilePreview && profilePreview.startsWith("blob:")) URL.revokeObjectURL(profilePreview);
      if (coverPreview && coverPreview.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
    };
  }, [profilePreview, coverPreview]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function triggerProfileUpload() {
    fileInputRef.current?.click();
  }

  function handleProfilePick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    // revoke previous blob
    if (profilePreview && profilePreview.startsWith("blob:")) URL.revokeObjectURL(profilePreview);
    const url = URL.createObjectURL(file);
    setProfilePreview(url);
    setProfileFile(file);
    setForm((p) => ({ ...p, profilePhoto: url }));
  }

  function handleCoverUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (coverPreview && coverPreview.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
    const url = URL.createObjectURL(file);
    setCoverPreview(url);
    setCoverFile(file);
    setForm((p) => ({ ...p, coverPhoto: url }));
  }

  // Upload helper: POST to a backend route that handles Cloudinary (recommended)
  // Replace '/api/uploads' with your actual upload endpoint if different.
  async function uploadFileToServer(file) {
    if (!file) return null;
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/uploads", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Upload failed: ${txt}`);
      }
      const data = await res.json();
      // backend should return { url: "https://..." }
      return data.url;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // Save handler: upload images first (if any), then call updateProfile
  async function handleSave() {
    setIsEditing(false);
    try {
      let profilePhotoUrl = form.profilePhoto;
      let coverPhotoUrl = form.coverPhoto;

      // If user selected new files, upload them
      if (profileFile) {
        profilePhotoUrl = await uploadFileToServer(profileFile);
      }
      if (coverFile) {
        coverPhotoUrl = await uploadFileToServer(coverFile);
      }

      const payload = {
        fullName: form.fullName,
        phone: form.phone,
        // don't allow frontend to set role to 'admin' — that's reserved
        role: form.role === "admin" ? user.role || "buyer" : form.role,
        profilePhoto: profilePhotoUrl || "",
        coverPhoto: coverPhotoUrl || "",
      };

      await updateProfile(payload);
      showToast("Profile updated", "success");

      // cleanup blob urls & local files
      if (profilePreview && profilePreview.startsWith("blob:")) URL.revokeObjectURL(profilePreview);
      if (coverPreview && coverPreview.startsWith("blob:")) URL.revokeObjectURL(coverPreview);
      setProfileFile(null);
      setCoverFile(null);
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to update profile", "error");
      // revert editing state so user can try again
      setIsEditing(true);
    }
  }

  function openRoleModal() {
    setShowRoleModal(true);
  }

  function selectRole(label, value) {
    // frontend shows readable label, but we store backend role value
    setForm((p) => ({ ...p, role: value }));
  }

  async function confirmRole() {
    setShowRoleModal(false);
    try {
      // Persist role change immediately for clarity
      await updateProfile({ role: form.role });
      showToast("Role updated", "success");
    } catch (err) {
      showToast(err.message || "Failed to update role", "error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero */}
      <div className="relative w-full h-60 lg:h-90 ">
        <div className="group w-full h-full">
          <img
            src={coverPreview || "https://images.unsplash.com/photo-1501183638710-841dd1904471"}
            alt="cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 transition" />
          <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              ref={coverInputRef}
              className="hidden"
            />
            <div className="text-white flex items-center gap-2">
              <FiCamera /> Change Cover
            </div>
          </label>
        </div>

        <div className="absolute -bottom-16 left-4 right-4 py-4 px-6 flex items-center gap-4 bg-slate-200 rounded-md">
          <div className="relative">
            <img
              src={profilePreview || "/default-avatar.png"}
              alt="profile"
              className="w-22 h-22 rounded-full object-cover border-4 border-gray-600 shadow-lg"
            />
            <button
              onClick={triggerProfileUpload}
              title="Upload photo"
              className="absolute right-0 bottom-0 bg-primary hover:bg-primary/70 p-2 rounded-full backdrop-blur "
            >
              <FiCamera />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleProfilePick}
            />
          </div>
          <div className="flex-1">
            <ProfileCard profile={form} openRoleModal={openRoleModal} />
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <MainSection
        profile={form}
        handleChange={handleChange}
        handleSave={handleSave}
        form={form}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        saving={loading.updateProfile}
      />

      {/* Role Modal */}
      <AnimatePresence>
        {showRoleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowRoleModal(false)}
            />
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 8, opacity: 0 }}
              className="relative z-10 max-w-md w-full bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Select Role</h3>
              <div className="flex flex-col gap-3">
                {ROLE_LABELS.map((r) => (
                  <RoleOption
                    key={r.value}
                    title={r.label}
                    icon={r.value === "agent" ? <IoBriefcaseOutline /> : <LuBuilding />}
                    selected={form.role === r.value}
                    onClick={() => selectRole(r.label, r.value)}
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
                  className="px-4 py-1.5 text-sm rounded-md bg-primary"
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
      <div className="flex-1 text-left">
        <div className="font-medium">{title}</div>
      </div>
      <div>{selected ? <FiCheck /> : null}</div>
    </button>
  );
}
