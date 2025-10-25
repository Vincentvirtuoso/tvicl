import { useState } from "react";
import {
  FiUser,
  FiEdit2,
  FiX,
  FiSave,
  FiBriefcase,
  FiHome,
  FiStar,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import TextArea from "../../components/common/TextArea";
import Input from "../../components/common/Input";
import ActivityTab from "../../subsection/MainSection/ActivityTab";

// Icon mapping for fields
const fieldIcons = {
  agentId: <FiBriefcase />,
  propertiesManaged: <FiHome />,
  totalSales: <FiStar />,
  activeClients: <FiUser />,
  email: <FiMail />,
  phone: <FiPhone />,
  location: <FiMapPin />,
  manager: <FiUser />,
  listings: <FiHome />,
  avgPrice: <FiStar />,
  size: <FiHome />,
  established: <FiStar />,
  joinedDate: <FiStar />,
  favoritesCount: <FiStar />,
  recentViews: <FiStar />,
  activeRequests: <FiStar />,
};

const ProfileSection = ({ profile, form, handleChange, handleSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Details");

  const toggleEdit = () => setIsEditing((prev) => !prev);

  // Mode-specific fields
  const modeFields = {
    agent: [
      { label: "Agent ID", name: "agentId" },
      { label: "Full Name", name: "name" },
      { label: "Email", name: "email" },
      { label: "Phone Number", name: "phone" },
      { label: "Location", name: "location" },
      {
        label: "Properties Managed",
        name: "propertiesManaged",
        type: "number",
      },
      { label: "Total Sales ($)", name: "totalSales", type: "number" },
      { label: "Active Clients", name: "activeClients", type: "number" },
      { label: "Bio", name: "bio", type: "textarea" },
    ],
    estate: [
      { label: "Estate Name", name: "name" },
      { label: "Estate Manager", name: "manager" },
      { label: "Location", name: "location" },
      { label: "Total Listings", name: "listings", type: "number" },
      { label: "Average Price ($)", name: "avgPrice", type: "number" },
      { label: "Size (acres)", name: "size", type: "number" },
      { label: "Year Established", name: "established" },
      { label: "Description", name: "bio", type: "textarea" },
    ],
    user: [
      { label: "Full Name", name: "fullName" },
      { label: "Email", name: "email" },
      { label: "Phone Number", name: "phone" },
      { label: "Location", name: "location" },
      { label: "Member Since", name: "joinedDate" },
      { label: "Bio", name: "bio", type: "textarea" },
    ],
  };

  const fields = modeFields[profile.role?.toLowerCase()] || modeFields.user;
  const tabs = ["Details", "Activity", "Settings"];

  return (
    <div className="p-6 mt-16 relative z-10">
      <div className="">
        {/* Header + Mode Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiUser className="text-gray-600" /> My Profile
            </h2>
          </div>

          {/* Edit Buttons */}
          {activeTab === "Details" && (
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <button
                onClick={toggleEdit}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition text-sm"
              >
                {isEditing ? <FiX /> : <FiEdit2 />}{" "}
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-sm"
                >
                  <FiSave /> Save Changes
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700"
              } transition`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "Details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fields.map((f) =>
                f.type === "textarea" ? (
                  <TextArea
                    key={f.name}
                    label={f.label}
                    name={f.name}
                    value={form[f.name]}
                    editable={isEditing}
                    onChange={handleChange}
                  />
                ) : (
                  <Input
                    key={f.name}
                    label={f.label}
                    name={f.name}
                    value={form[f.name]}
                    editable={isEditing}
                    onChange={handleChange}
                    icon={fieldIcons[f.name]}
                  />
                )
              )}
            </div>
          )}

          {activeTab === "Activity" && <ActivityTab profile={profile} />}

          {activeTab === "Settings" && (
            <div className="text-gray-500 text-sm">
              {profile.mode === "agent" &&
                "Notification preferences, account settings, visibility..."}
              {profile.mode === "estate" &&
                "Estate management settings, team permissions, listing defaults..."}
              {profile.mode === "user" &&
                "Privacy settings, notification preferences, account management..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
