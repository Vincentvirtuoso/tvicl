import {
  FaBuilding,
  FaUsers,
  FaDollarSign,
  FaHome,
  FaToolbox,
  FaCoins,
  FaTachometerAlt,
  FaUserCheck,
  FaPlusCircle,
  FaSmile,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  FaChartLine,
  FaComments,
  FaHandshake,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa6";

const statsCards = [
  // ADMIN + AGENT + ESTATE
  {
    id: "total_props",
    title: "Total Properties",
    value: "1,247",
    change: "+12.5%",
    isPositive: true,
    icon: FaBuilding,
    color: "bg-blue-500",
    roles: ["admin", "agent", "estate"],
  },

  // ADMIN
  {
    id: "verified_agents",
    title: "Verified Agents",
    value: "328",
    change: "+8.4%",
    isPositive: true,
    icon: FaUserCheck,
    color: "bg-green-600",
    roles: ["admin"],
  },
  {
    id: "total_sales",
    title: "Total Property Sales (₦)",
    value: "₦4.6B",
    change: "+21.3%",
    isPositive: true,
    icon: FaMoneyBillWave,
    color: "bg-purple-500",
    roles: ["admin"],
  },
  {
    id: "rental_income",
    title: "Total Rental Income (₦)",
    value: "₦312M",
    change: "+9.1%",
    isPositive: true,
    icon: FaChartLine,
    color: "bg-teal-600",
    roles: ["admin"],
  },
  {
    id: "active_investors",
    title: "Active Property Investors",
    value: "1,142",
    change: "+18.7%",
    isPositive: true,
    icon: FaUsers,
    color: "bg-amber-500",
    roles: ["admin"],
  },
  {
    id: "new_listings",
    title: "New Listings (This Month)",
    value: "94",
    change: "+11",
    isPositive: true,
    icon: FaPlusCircle,
    color: "bg-indigo-500",
    roles: ["admin"],
  },

  // AGENT
  {
    id: "my_listings",
    title: "My Active Listings",
    value: "37",
    change: "+4",
    isPositive: true,
    icon: FaHome,
    color: "bg-cyan-600",
    roles: ["agent"],
  },
  {
    id: "pending_commission",
    title: "Pending Commissions (₦)",
    value: "₦2.1M",
    change: "-2.3%",
    isPositive: false,
    icon: FaWallet,
    color: "bg-red-500",
    roles: ["agent"],
  },
  {
    id: "client_inquiries",
    title: "Client Inquiries",
    value: "118",
    change: "+16.2%",
    isPositive: true,
    icon: FaComments,
    color: "bg-orange-500",
    roles: ["agent"],
  },
  {
    id: "deals_closed",
    title: "Deals Closed (This Month)",
    value: "14",
    change: "+3",
    isPositive: true,
    icon: FaHandshake,
    color: "bg-emerald-600",
    roles: ["agent"],
  },

  // ESTATE MANAGEMENT
  {
    id: "occupancy_rate",
    title: "Occupancy Rate",
    value: "91%",
    change: "+1.2%",
    isPositive: true,
    icon: FaTachometerAlt,
    color: "bg-lime-600",
    roles: ["estate"],
  },
  {
    id: "maintenance_requests",
    title: "Open Maintenance Requests",
    value: "8",
    change: "—",
    isPositive: true,
    icon: FaToolbox,
    color: "bg-rose-500",
    roles: ["estate"],
  },
  {
    id: "tenant_satisfaction",
    title: "Tenant Satisfaction",
    value: "4.6 / 5",
    change: "+0.3",
    isPositive: true,
    icon: FaSmile,
    color: "bg-yellow-500",
    roles: ["estate"],
  },
  {
    id: "arrears",
    title: "Outstanding Rent (₦)",
    value: "₦7.8M",
    change: "-1.5%",
    isPositive: false,
    icon: FaExclamationTriangle,
    color: "bg-gray-700",
    roles: ["estate"],
  },
];

// Investment Trend (monthly)
const investmentTrend = [
  { month: "Jan", amount: 2400, investors: 140 },
  { month: "Feb", amount: 2800, investors: 168 },
  { month: "Mar", amount: 3200, investors: 195 },
  { month: "Apr", amount: 2900, investors: 178 },
  { month: "May", amount: 3800, investors: 225 },
  { month: "Jun", amount: 4200, investors: 258 },
  { month: "Jul", amount: 4800, investors: 292 },
  { month: "Aug", amount: 5200, investors: 315 },
  { month: "Sep", amount: 5600, investors: 330 },
  { month: "Oct", amount: 6000, investors: 360 },
];

// Sales by Region (bar)
const salesByRegion = [
  { region: "NYC", sales: 1200 },
  { region: "LA", sales: 980 },
  { region: "Chicago", sales: 750 },
  { region: "Houston", sales: 610 },
  { region: "Miami", sales: 480 },
];

// Property distribution
const propertyDistribution = [
  { name: "Residential", value: 620, color: "#3B82F6" },
  { name: "Commercial", value: 385, color: "#10B981" },
  { name: "Land", value: 142, color: "#F59E0B" },
  { name: "Industrial", value: 100, color: "#8B5CF6" },
];

// Top performing properties
const topProperties = [
  {
    id: "P-101",
    title: "Oceanview Apartment #402",
    yield: "8.6%",
    occupancy: "100%",
    revenue: "$125k",
  },
  {
    id: "P-278",
    title: "Downtown Office Suite",
    yield: "7.9%",
    occupancy: "95%",
    revenue: "$450k",
  },
  {
    id: "P-503",
    title: "Suburban Villa",
    yield: "9.2%",
    occupancy: "98%",
    revenue: "$320k",
  },
];

// Recent transactions (admin) or agent leads (agent) or tenant events (estate)
const recentTransactions = [
  {
    id: "TXN-001",
    property: "Oceanview Apt #402",
    investor: "John Doe",
    amount: "$125,000",
    date: "2024-10-27",
    type: "Purchase",
  },
  {
    id: "TXN-002",
    property: "Downtown Office Suite",
    investor: "Sarah Smith",
    amount: "$450,000",
    date: "2024-10-27",
    type: "Investment",
  },
  {
    id: "TXN-003",
    property: "Suburban Villa",
    investor: "Mike Johnson",
    amount: "$320,000",
    date: "2024-10-26",
    type: "Purchase",
  },
];

// Agent leads (if agent)
const agentLeads = [
  {
    id: "L-001",
    name: "Samuel K",
    contact: "sam@example.com",
    status: "Contacted",
    budget: "$150k",
  },
  {
    id: "L-002",
    name: "Grace M",
    contact: "grace@example.com",
    status: "Viewing",
    budget: "$320k",
  },
];

// Estate maintenance requests (estate role)
const maintenanceRequests = [
  {
    id: "MR-1001",
    title: "AC not cooling - Apt 402",
    priority: "High",
    status: "Open",
    date: "2024-10-26",
  },
  {
    id: "MR-1002",
    title: "Leaky pipe - Basement",
    priority: "Medium",
    status: "Scheduled",
    date: "2024-10-24",
  },
  {
    id: "MR-1003",
    title: "Broken gate lock",
    priority: "Low",
    status: "Open",
    date: "2024-10-22",
  },
];

// Market insights / activity feed
const feed = [
  {
    id: "F2",
    text: "Property sold, #120 completed.",
    time: "1d ago",
  },
  {
    id: "F3",
    text: "Maintenance completed at Oceanview Apt #402.",
    time: "2d ago",
  },
];

export {
  feed,
  salesByRegion,
  statsCards,
  maintenanceRequests,
  agentLeads,
  investmentTrend,
  propertyDistribution,
  topProperties,
  recentTransactions,
};
