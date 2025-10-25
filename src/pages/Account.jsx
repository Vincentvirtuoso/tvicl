import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCamera, FiHome, FiCheck } from "react-icons/fi";
import { LuBuilding } from "react-icons/lu";
import ProfileCard from "../section/account/ProfileCard";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useToast } from "../context/ToastManager";
import MainSection from "../section/account/MainSection";
import { mockProfiles } from "../data/mockProfile";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const [mode, setMode] = useState("user");

  const [profile, setProfile] = useState(mockProfiles[mode]);

  const {user}=useAuth()

  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState(profile.photo);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const { addToast: showToast } = useToast();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSave() {
    setProfile(form);
    setProfileImage(form.photo);
    setIsEditing(false);
    showToast("Profile updated", "success");
  }

  function triggerProfileUpload() {
    fileInputRef.current?.click();
  }

  function handleProfilePick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((p) => ({ ...p, photo: url }));
  }

  function handleCoverUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCoverImage(url);
  }

  function openRoleModal() {
    setShowRoleModal(true);
  }

  function selectRole(title, role) {
    setForm((p) => ({ ...p, mode: role, modeTitle: title }));
  }

  function confirmRole() {
    setProfile((p) => ({ ...p, mode: form.mode, modeTitle: form.modeTitle }));
    setShowRoleModal(false);
    showToast("Role updated");
    setMode(form.mode);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero */}
      <div className="relative w-full h-60 lg:h-90 ">
        <div className="group w-full h-full">
          <img
            src={
              coverImage ||
              "https://images.unsplash.com/photo-1501183638710-841dd1904471"
            }
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
              src={profileImage}
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
            <ProfileCard profile={user} openRoleModal={openRoleModal} />
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <MainSection
        profile={user}
        handleChange={handleChange}
        handleSave={handleSave}
        form={user}
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
              <h3 className="text-lg font-semibold mb-4">Select User Mode</h3>
              <div className="flex flex-col gap-3">
                <RoleOption
                  id="agent"
                  title="Real Estate Agent"
                  icon={<IoBriefcaseOutline />}
                  selected={form.modeTitle === "Real Estate Agent"}
                  onClick={() => selectRole("Real Estate Agent", "agent")}
                />
                <RoleOption
                  id="user"
                  title="Buyer / Renter"
                  icon={<FiHome />}
                  selected={form.modeTitle === "Buyer / Renter"}
                  onClick={() => selectRole("Buyer / Renter", "user")}
                />
                <RoleOption
                  id="estate"
                  title="Real Estate Agency"
                  icon={<LuBuilding />}
                  selected={form.modeTitle === "Real Estate Agency"}
                  onClick={() => selectRole("Real Estate Agency", "estate")}
                />
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
