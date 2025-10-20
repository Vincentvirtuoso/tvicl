import {
  FiTrendingUp,
  FiList,
  FiCheckCircle,
  FiClock,
  FiStar,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
  { name: "May", value: 450 },
];

const ActivityTab = ({ profile }) => {
  return (
    <div className="flex flex-col gap-6">
      {profile.mode === "agent" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3">
              <FiTrendingUp className="text-blue-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Recent Sales</p>
                <p className="font-semibold">{profile.recentSales || 0}</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3">
              <FiCheckCircle className="text-blue-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Active Clients</p>
                <p className="font-semibold">{profile.activeClients || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-gray-600 font-semibold mb-2">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={profile.salesData || sampleData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {profile.mode === "estate" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 rounded-lg p-4 flex items-center gap-3">
              <FiList className="text-yellow-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Active Listings</p>
                <p className="font-semibold">{profile.listings || 0}</p>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 flex items-center gap-3">
              <FiClock className="text-yellow-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">New Requests</p>
                <p className="font-semibold">{profile.newRequests || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-gray-600 font-semibold mb-2">
              Listings Over Time
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={profile.listingHistory || sampleData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#facc15" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {profile.mode === "user" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 flex items-center gap-3">
              <FiStar className="text-green-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Favorites</p>
                <p className="font-semibold">{profile.favoritesCount || 0}</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 flex items-center gap-3">
              <FiClock className="text-green-500 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Recent Views</p>
                <p className="font-semibold">{profile.recentViews || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-gray-600 font-semibold mb-2">Activity Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={profile.activityData || sampleData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityTab;
