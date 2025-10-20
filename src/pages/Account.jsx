import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiHome,
  FiHeart,
  FiBell,
  FiSettings,
  FiEdit2,
  FiLogOut,
  FiSave,
  FiX,
} from "react-icons/fi";

// Single-file account dashboard with sidebar + tabs + editable profile + swipeable saved properties
// Dependencies: framer-motion, react-icons

const demoFavorites = [
  {
    id: "cedarwood-apartments",
    name: "Cedarwood Apartments",
    price: "₦450,000 / yr",
    location: "Ikeja, Lagos",
    img: "https://i.pravatar.cc/320?img=10",
  },
  {
    id: "riverside-condo",
    name: "Riverside Condo",
    price: "₦1,200,000 / yr",
    location: "VI, Lagos",
    img: "https://i.pravatar.cc/320?img=20",
  },
  {
    id: "greengate-villas",
    name: "Greengate Villas",
    price: "₦3,200,000 / yr",
    location: "Lekki, Lagos",
    img: "https://i.pravatar.cc/320?img=30",
  },
];

const sidebarItems = [
  { id: "profile", label: "Profile", icon: <FiUser /> },
  { id: "favorites", label: "Saved Properties", icon: <FiHeart /> },
  { id: "notifications", label: "Notifications", icon: <FiBell /> },
  { id: "settings", label: "Settings", icon: <FiSettings /> },
];

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
};

export default function AccountPage({ user: initialUser = {} }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    name: initialUser.name || "Felix Vincent",
    email: initialUser.email || "felix@example.com",
    phone: initialUser.phone || "+234 812 345 6789",
    photo: initialUser.photo || "/images/logo.png",
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);
  const [favorites, setFavorites] = useState(demoFavorites);
  const [showSavedToast, setShowSavedToast] = useState(false);

  function startEdit() {
    setForm(user);
    setEditing(true);
  }
  function cancelEdit() {
    setEditing(false);
    setForm(user);
  }
  function saveProfile() {
    setUser(form);
    setEditing(false);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  }

  function removeFavorite(id) {
    setFavorites((s) => s.filter((f) => f.id !== id));
  }

  function handleLogout() {
    // wire to your auth/logout flow
    console.log("Logout requested");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      {/* Sidebar */}
      <aside className="w-72 hidden md:flex flex-col gap-6 bg-white/60 backdrop-blur-sm border-r p-6">
        <div className="flex items-center gap-3">
          <img
            src={user.photo}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <div className="text-sm text-gray-500">Welcome back</div>
            <div className="font-semibold">{user.name}</div>
          </div>
        </div>

        <nav className="flex-1">
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-2"
          >
            {sidebarItems.map((it) => (
              <motion.li variants={itemVariants} key={it.id}>
                <button
                  onClick={() => setActiveTab(it.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium justify-start ${
                    {
                      true: "",
                    }[true]
                  } ${
                    activeTab === it.id
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  <span className="text-lg">{it.icon}</span>
                  <span>{it.label}</span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src={user.photo}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <div className="text-xs text-gray-500">Welcome back</div>
              <div className="font-semibold text-sm">{user.name}</div>
            </div>
          </div>

          <div className="flex gap-2">
            {sidebarItems.map((it) => (
              <button
                key={it.id}
                onClick={() => setActiveTab(it.id)}
                className={`p-2 rounded-md ${
                  activeTab === it.id ? "bg-blue-600 text-white" : "bg-white"
                }`}
                title={it.label}
              >
                {it.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-6 bg-gradient-to-r from-white to-sky-50 border mb-6"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={user.photo}
              alt={user.name}
              className="w-28 h-28 rounded-xl object-cover shadow"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600 mt-1">
                Manage your account & saved properties
              </p>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={startEdit}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white"
                >
                  <FiEdit2 /> Edit Profile
                </button>

                <button
                  onClick={() => setActiveTab("favorites")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border text-gray-700"
                >
                  <FiHeart /> View Saved
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Content area */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            {activeTab === "profile" && (
              <ProfileTab
                user={user}
                editing={editing}
                form={form}
                setForm={setForm}
                saveProfile={saveProfile}
                cancelEdit={cancelEdit}
              />
            )}

            {activeTab === "favorites" && (
              <SavedPropertiesTab
                favorites={favorites}
                onRemove={removeFavorite}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "notifications" && <NotificationsTab />}

            {activeTab === "settings" && <SettingsTab />}
          </motion.section>
        </AnimatePresence>

        {/* Toast */}
        <AnimatePresence>
          {showSavedToast && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="fixed right-6 bottom-6 bg-white border rounded-lg shadow p-4"
            >
              <div className="font-medium">Profile saved</div>
              <div className="text-sm text-gray-500">
                Your changes have been updated.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function ProfileTab({ user, editing, form, setForm, saveProfile, cancelEdit }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your name, email and phone number.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            value={editing ? form.name : user.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            readOnly={!editing}
            className={`w-full border rounded-md px-3 py-2 mt-1 ${
              editing ? "bg-white" : "bg-gray-50"
            }`}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            value={editing ? form.email : user.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            readOnly={!editing}
            className={`w-full border rounded-md px-3 py-2 mt-1 ${
              editing ? "bg-white" : "bg-gray-50"
            }`}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Phone</label>
          <input
            value={editing ? form.phone : user.phone}
            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
            readOnly={!editing}
            className={`w-full border rounded-md px-3 py-2 mt-1 ${
              editing ? "bg-white" : "bg-gray-50"
            }`}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Profile Photo URL</label>
          <input
            value={editing ? form.photo : user.photo}
            onChange={(e) => setForm((s) => ({ ...s, photo: e.target.value }))}
            readOnly={!editing}
            className={`w-full border rounded-md px-3 py-2 mt-1 ${
              editing ? "bg-white" : "bg-gray-50"
            }`}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        {editing ? (
          <>
            <button
              onClick={saveProfile}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white"
            >
              <FiSave /> Save
            </button>
            <button
              onClick={cancelEdit}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100"
            >
              <FiX /> Cancel
            </button>
          </>
        ) : (
          <div className="text-sm text-gray-500">
            Click{" "}
            <span className="font-medium text-gray-700">Edit Profile</span> in
            the hero to update details.
          </div>
        )}
      </div>
    </div>
  );
}

function SavedPropertiesTab({ favorites, onRemove }) {
  // Use framer-motion to provide a draggable/swipeable horizontal list
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Saved Properties</h2>
        <p className="text-sm text-gray-500">
          Swipe left on a card to remove (mobile) or click Remove.
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4">
          {favorites.length === 0 && (
            <div className="p-6 bg-white rounded-xl shadow w-full">
              No saved properties yet.
            </div>
          )}

          {favorites.map((fav) => (
            <motion.article
              key={fav.id}
              className="min-w-[280px] max-w-xs bg-white rounded-xl shadow p-4 flex-shrink-0"
              drag="x"
              dragConstraints={{ left: -120, right: 120 }}
              onDragEnd={(e, info) => {
                // If user swiped left fast enough -> remove
                if (info.offset.x < -120 || info.velocity.x < -700) {
                  onRemove(fav.id);
                }
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-40 rounded-md overflow-hidden mb-3">
                <img
                  src={fav.img}
                  alt={fav.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{fav.name}</h3>
                  <p className="text-xs text-gray-500">{fav.location}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">{fav.price}</div>
                  <button
                    onClick={() => onRemove(fav.id)}
                    className="mt-3 text-xs bg-red-50 text-red-600 px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Desktop grid fallback */}
      <div className="mt-6 hidden md:grid md:grid-cols-3 md:gap-4">
        {favorites.map((fav) => (
          <div key={fav.id} className="bg-white rounded-xl shadow p-4">
            <div className="h-40 rounded-md overflow-hidden mb-3">
              <img
                src={fav.img}
                alt={fav.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-sm">{fav.name}</h3>
                <p className="text-xs text-gray-500">{fav.location}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">{fav.price}</div>
                <button
                  onClick={() => onRemove(fav.id)}
                  className="mt-3 text-xs bg-red-50 text-red-600 px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-3">Notifications Center</h2>
      <p className="text-gray-600">
        You have no new notifications at the moment 📭
      </p>

      <div className="mt-6 text-sm text-gray-500">
        When important updates arrive, they'll appear here.
      </div>
    </div>
  );
}

function SettingsTab() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold">Account Settings</h2>

      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Email Notifications</div>
          <div className="text-sm text-gray-500">
            Receive emails about updates and offers
          </div>
        </div>
        <input
          type="checkbox"
          checked={emailNotif}
          onChange={() => setEmailNotif((s) => !s)}
          className="scale-125 accent-blue-600"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Dark Mode</div>
          <div className="text-sm text-gray-500">
            Switch the dashboard to a darker theme
          </div>
        </div>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode((s) => !s)}
          className="scale-125 accent-blue-600"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Two-Factor Authentication</div>
          <div className="text-sm text-gray-500">
            Add an extra layer of security to your account
          </div>
        </div>
        <input
          type="checkbox"
          checked={twoFA}
          onChange={() => setTwoFA((s) => !s)}
          className="scale-125 accent-blue-600"
        />
      </div>

      <div className="pt-4 border-t">
        <button className="px-4 py-2 bg-red-50 text-red-600 rounded">
          Delete account
        </button>
      </div>
    </div>
  );
}
