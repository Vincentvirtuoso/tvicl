// Dashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaUsers,
  FaDollarSign,
  FaHome,
  FaChartLine,
  FaMapMarkerAlt,
  FaClipboardList,
  FaToolbox,
  FaCoins,
  FaTachometerAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useAuth } from "../hooks/useAuth";
import Hero from "../components/layout/Hero";

const Dashboard = ({ role }) => {
  const { user } = useAuth();

  const statsCards = [
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
    {
      id: "active_investors",
      title: "Active Investors",
      value: "8,456",
      change: "+24.3%",
      isPositive: true,
      icon: FaUsers,
      color: "bg-green-500",
      roles: ["admin"],
    },
    {
      id: "revenue",
      title: "Total Revenue",
      value: "$42.5M",
      change: "+18.7%",
      isPositive: true,
      icon: FaDollarSign,
      color: "bg-purple-500",
      roles: ["admin"],
    },
    {
      id: "token_circ",
      title: "Total Clients",
      value: "24",
      change: "+3.2%",
      isPositive: true,
      icon: FaCoins,
      color: "bg-yellow-500",
      roles: ["admin", "agent"],
    },
    {
      id: "my_listings",
      title: "My Listings",
      value: "28",
      change: "+2",
      isPositive: true,
      icon: FaHome,
      color: "bg-indigo-500",
      roles: ["agent"],
    },
    {
      id: "agent_commission",
      title: "Pending Commission",
      value: "$12,400",
      change: "-1.6%",
      isPositive: false,
      icon: FaDollarSign,
      color: "bg-red-500",
      roles: ["agent"],
    },
    {
      id: "occupancy",
      title: "Occupancy Rate",
      value: "89%",
      change: "+1.2%",
      isPositive: true,
      icon: FaTachometerAlt,
      color: "bg-teal-500",
      roles: ["estate"],
    },
    {
      id: "maintenance",
      title: "Open Maint. Requests",
      value: "6",
      change: "—",
      isPositive: true,
      icon: FaToolbox,
      color: "bg-rose-500",
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

  /* ----------------------
     ANIMATION VARS
     ---------------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45 } },
  };

  /* ----------------------
     RENDER
     ---------------------- */
  return (
    <div className="min-h-screen">
      <Hero
        title={role === "admin" ? "Platform Analytics" : `My Dashboard`}
        subtitle={
          role === "admin"
            ? "Monitor platform-wide performance and activity metrics."
            : role === "agent"
            ? "Track your property listings, client performance, and commissions."
            : role === "estate"
            ? "Manage estate performance, occupancy, and revenue insights."
            : "View your personalized dashboard analytics."
        }
      />
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-gray-600 font-medium">
            Welcome back,{" "}
            <span className="font-bold text-gray-800">{user.fullName}</span>.
            Overview of your {role} metrics.
          </h2>
        </motion.div>

        {/* Top summary cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6"
        >
          {statsCards
            .filter((c) => c.roles.includes(role))
            .map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`p-3 rounded-lg ${card.color} inline-flex items-center justify-center`}
                    >
                      <Icon className="text-white text-lg" />
                    </div>
                    <div
                      className={`text-sm font-semibold flex items-center gap-2 ${
                        card.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {card.isPositive ? <FaArrowUp /> : <FaArrowDown />}{" "}
                      {card.change}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs text-gray-500">{card.title}</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">
                      {card.value}
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left & Center: Charts (span 2 on large) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trend + Regional charts */}
            <div
              className={`grid grid-cols-1 ${
                role !== "estate" && "md:grid-cols-2"
              } gap-6`}
            >
              {(role === "admin" || role === "agent" || role === "estate") && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 "
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FaChartLine className="text-2xl text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500">
                          Investment Trend
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          Monthly sales & investors
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Last 10 months</div>
                  </div>

                  <div style={{ width: "100%", height: 260 }}>
                    <ResponsiveContainer>
                      <AreaChart
                        data={investmentTrend}
                        margin={{ top: 0, right: 10, left: -10, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="amtGrad"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#4f46e5"
                              stopOpacity={0.12}
                            />
                            <stop
                              offset="95%"
                              stopColor="#4f46e5"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#4f46e5"
                          fill="url(#amtGrad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {/* Sales by Region (admin & agent) */}
              {(role === "admin" || role === "agent") && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-2xl text-green-500" />
                      <div>
                        <div className="text-sm text-gray-500">
                          Sales by Region
                        </div>
                        <div className="text-lg font-semibold text-gray-900">
                          Top performing markets
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">This quarter</div>
                  </div>

                  <div style={{ width: "100%", height: 260 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={salesByRegion}
                        margin={{ top: 0, right: 6, left: -8, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="region" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Bar
                          dataKey="sales"
                          barSize={18}
                          radius={[6, 6, 0, 0]}
                          fill="#10b981"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Property distribution + Top properties */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Distribution (admin + estate + agent) */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FaBuilding className="text-2xl text-indigo-500" />
                    <div>
                      <div className="text-sm text-gray-500">Property Mix</div>
                      <div className="text-lg font-semibold text-gray-900">
                        Type distribution
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Overview</div>
                </div>

                <div style={{ width: "100%", height: 230 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={propertyDistribution}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {propertyDistribution.map((p, i) => (
                          <Cell key={i} fill={p.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Top performing properties */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FaClipboardList className="text-2xl text-yellow-600" />
                    <div>
                      <div className="text-sm text-gray-500">
                        Top Properties
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        Highest yield & revenue
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Real-time</div>
                </div>

                <div className="space-y-3">
                  {topProperties.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {p.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {p.id} • Occupancy {p.occupancy}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">
                          {p.yield}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {p.revenue}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Market Insights / Activity Feed */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FaChartLine className="text-lg text-gray-700" />
                  <div>
                    <div className="text-sm text-gray-500">Market Insights</div>
                    <div className="text-md font-semibold text-gray-900">
                      Notes & recent activity
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Latest</div>
              </div>

              <div className="space-y-3">
                {feed.map((f) => (
                  <div key={f.id} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <div className="text-sm text-gray-700">{f.text}</div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {f.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Map placeholder or Estate summary */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-xl text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-500">
                      Property Locations
                    </div>
                    <div className="text-md font-semibold text-gray-900">
                      Interactive map (placeholder)
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Coming soon</div>
              </div>

              <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-white rounded-lg flex items-center justify-center border-2 border-dashed border-blue-100">
                <div className="text-center">
                  <FaBuilding className="text-4xl text-blue-300 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">
                    Map integration (Mapbox / Leaflet) can be plugged here.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Role-specific boxes */}
            {/* ADMIN: Recent Transactions */}
            {role === "admin" && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FaDollarSign className="text-lg text-purple-500" />
                    <div>
                      <div className="text-sm text-gray-500">
                        Recent Transactions
                      </div>
                      <div className="text-md font-semibold text-gray-900">
                        Latest platform activity
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Real-time</div>
                </div>

                <div className="space-y-2">
                  {recentTransactions.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
                    >
                      <div className="text-xs font-mono text-gray-500">
                        {t.id}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {t.property}
                      </div>
                      <div className="text-sm text-gray-600">{t.investor}</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {t.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AGENT: Leads & Commissions */}
            {role === "agent" && (
              <>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FaUsers className="text-lg text-green-500" />
                      <div>
                        <div className="text-sm text-gray-500">
                          Active Leads
                        </div>
                        <div className="text-md font-semibold text-gray-900">
                          Client pipeline
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {agentLeads.length} leads
                    </div>
                  </div>

                  <div className="space-y-2">
                    {agentLeads.map((l) => (
                      <div
                        key={l.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {l.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {l.contact}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">
                            {l.status}
                          </div>
                          <div className="text-sm font-semibold text-gray-900 mt-1">
                            {l.budget}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FaDollarSign className="text-lg text-red-400" />
                      <div>
                        <div className="text-sm text-gray-500">
                          Commission Snapshot
                        </div>
                        <div className="text-md font-semibold text-gray-900">
                          Monthly & pending
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Updated</div>
                  </div>

                  <div className="text-sm text-gray-700">
                    <div className="text-2xl font-bold text-gray-900">
                      $12,400
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Estimated payout this month
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {/* ESTATE: Occupancy & Maintenance */}
            {role === "estate" && (
              <>
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FaTachometerAlt className="text-lg text-teal-500" />
                      <div>
                        <div className="text-sm text-gray-500">
                          Occupancy Overview
                        </div>
                        <div className="text-md font-semibold text-gray-900">
                          Unit performance
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Monthly</div>
                  </div>

                  <div className="text-sm text-gray-700">
                    <div className="text-2xl font-bold text-gray-900">89%</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Average occupancy across all units
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FaToolbox className="text-lg text-rose-500" />
                      <div>
                        <div className="text-sm text-gray-500">
                          Maintenance Requests
                        </div>
                        <div className="text-md font-semibold text-gray-900">
                          Open & scheduled
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {maintenanceRequests.length} open
                    </div>
                  </div>

                  <div className="space-y-2">
                    {maintenanceRequests.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {m.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {m.date} • Priority: {m.priority}
                          </div>
                        </div>
                        <div className="text-sm">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              m.status === "Open"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {m.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-12" />
      </div>
    </div>
  );
};

export default Dashboard;
