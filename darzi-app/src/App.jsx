import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Scissors,
  Users,
  Settings,
  PlusCircle,
  Search,
  Bell,
  Menu,
  X,
  DollarSign,
  Calendar,
  User,
  Phone,
  Shirt,
  TrendingUp,
  Activity,
  FileText,
  ChevronRight,
  Globe,
} from "lucide-react";

// --- TRANSLATION DICTIONARY (English & Urdu) ---
const TRANSLATIONS = {
  en: {
    appTitle: "Darzi Pro",
    dashboard: "Dashboard",
    orders: "Orders",
    newOrder: "New Order",
    customers: "Customers",
    expenses: "Expenses",
    settings: "Settings",
    revenue: "Total Revenue",
    activeOrders: "Active Orders",
    pending: "Pending",
    ready: "Ready",
    delivered: "Delivered",
    welcome: "Welcome back",
    searchPlaceholder: "Search orders, customers...",
    measurements: "Measurements",
    saveOrder: "Save Order",
    cancel: "Cancel",
    customerDetails: "Customer Details",
    garmentDetails: "Garment Details",
    recentOrders: "Recent Orders",
    dueToday: "Due Today",
    urduToggle: "Switch to Urdu",
    garments: {
      sk: "Shalwar Kameez",
      pc: "Pent Coat",
      wc: "Waistcoat",
    },
    fields: {
      name: "Full Name",
      phone: "Phone Number",
      type: "Garment Type",
      price: "Price",
      date: "Due Date",
      length: "Length",
      tera: "Tera (Shoulder)",
      chest: "Chest (Chaati)",
      waist: "Waist (Kamar)",
      arm: "Arm (Baju)",
      giera: "Giera (Hem)",
      shalwar: "Shalwar Length",
      paicha: "Paicha",
      collar: "Collar",
    },
  },
  ur: {
    appTitle: "درزی پرو",
    dashboard: "ڈیش بورڈ",
    orders: "آرڈرز",
    newOrder: "نیا آرڈر",
    customers: "کسٹمرز",
    expenses: "اخراجات",
    settings: "سیٹنگز",
    revenue: "کل آمدنی",
    activeOrders: "جاری آرڈرز",
    pending: "زیر التواء",
    ready: "تیار",
    delivered: "حوالے",
    welcome: "خوش آمدید",
    searchPlaceholder: "تلاش کریں...",
    measurements: "پیمائش (انچ)",
    saveOrder: "آرڈر محفوظ کریں",
    cancel: "منسوخ کریں",
    customerDetails: "کسٹمر کی تفصیلات",
    garmentDetails: "کپڑوں کی تفصیلات",
    recentOrders: "حالیہ آرڈرز",
    dueToday: "آج کی ڈیلیوری",
    urduToggle: "انگریزی میں",
    garments: {
      sk: "شلوار قمیض",
      pc: "پینٹ کوٹ",
      wc: "ویسٹ کوٹ",
    },
    fields: {
      name: "پورا نام",
      phone: "فون نمبر",
      type: "کپڑے کی قسم",
      price: "قیمت",
      date: "تاریخ واپسی",
      length: "لمبائی",
      tera: "تیرا",
      chest: "چھاتی",
      waist: "کمر",
      arm: "بازو",
      giera: "گھیرا",
      shalwar: "شلوار",
      paicha: "پائنچہ",
      collar: "کالر",
    },
  },
};

// --- MOCK DATA ---
const MOCK_ORDERS = [
  {
    id: 101,
    name: "Ali Khan",
    type: "sk",
    status: "Ready",
    price: 2500,
    date: "2023-11-01",
  },
  {
    id: 102,
    name: "Usman Ghani",
    type: "wc",
    status: "Pending",
    price: 3500,
    date: "2023-11-05",
  },
  {
    id: 103,
    name: "Ahmed Raza",
    type: "pc",
    status: "Cutting",
    price: 12000,
    date: "2023-10-30",
  },
];

// --- 3D CARD COMPONENT ---
const GlassCard = ({ children, className = "", delay = 0 }) => (
  <div
    className={`
      bg-white/80 backdrop-blur-xl border border-white/20 
      shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-6 
      transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]
      animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards
      ${className}
    `}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

// --- MAIN APP ---
export default function DarziApp() {
  const [lang, setLang] = useState("en"); // 'en' or 'ur'
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const isUrdu = lang === "ur";

  // Styles for text alignment based on language
  const dirClass = isUrdu
    ? "text-right font-[Noto_Nastaliq_Urdu]"
    : "text-left";
  const flexDir = isUrdu ? "flex-row-reverse" : "flex-row";

  // --- DASHBOARD VIEW ---
  const Dashboard = () => (
    <div className="space-y-6">
      {/* 3D KPI Cards */}
      <div
        className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${
          isUrdu ? "rtl" : "ltr"
        }`}
      >
        <GlassCard
          delay={0}
          className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none"
        >
          <div className={`flex items-start justify-between ${flexDir}`}>
            <div>
              <p className="text-blue-100 text-sm font-medium">{t.revenue}</p>
              <h3 className="text-3xl font-bold mt-2">Rs. 45,000</h3>
            </div>
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs text-blue-100">
            <TrendingUp size={14} /> +12% from last month
          </div>
        </GlassCard>

        <GlassCard delay={100}>
          <div className={`flex items-start justify-between ${flexDir}`}>
            <div>
              <p className="text-slate-500 text-sm font-medium">
                {t.activeOrders}
              </p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">24</h3>
            </div>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Scissors size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard delay={200}>
          <div className={`flex items-start justify-between ${flexDir}`}>
            <div>
              <p className="text-slate-500 text-sm font-medium">
                {t.customers}
              </p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">189</h3>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Users size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard delay={300}>
          <div className={`flex items-start justify-between ${flexDir}`}>
            <div>
              <p className="text-slate-500 text-sm font-medium">{t.dueToday}</p>
              <h3 className="text-3xl font-bold text-slate-800 mt-2">3</h3>
            </div>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <Activity size={24} />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Main Content Split */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${
          isUrdu ? "rtl" : "ltr"
        }`}
      >
        {/* Recent Orders Table */}
        <GlassCard className="lg:col-span-2 min-h-[400px]" delay={400}>
          <div className={`flex items-center justify-between mb-6 ${flexDir}`}>
            <h3 className="text-xl font-bold text-slate-800">
              {t.recentOrders}
            </h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className={`w-full ${dirClass}`}>
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                  <th
                    className={`px-4 py-3 ${
                      isUrdu ? "text-right" : "text-left"
                    }`}
                  >
                    #ID
                  </th>
                  <th
                    className={`px-4 py-3 ${
                      isUrdu ? "text-right" : "text-left"
                    }`}
                  >
                    {t.fields.name}
                  </th>
                  <th
                    className={`px-4 py-3 ${
                      isUrdu ? "text-right" : "text-left"
                    }`}
                  >
                    {t.fields.type}
                  </th>
                  <th
                    className={`px-4 py-3 ${
                      isUrdu ? "text-right" : "text-left"
                    }`}
                  >
                    {t.fields.price}
                  </th>
                  <th
                    className={`px-4 py-3 ${
                      isUrdu ? "text-right" : "text-left"
                    }`}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-slate-600">
                      #{order.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {order.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {t.garments[order.type]}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-700">
                      {order.price}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`
                        px-2 py-1 rounded text-xs font-semibold
                        ${
                          order.status === "Ready"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }
                      `}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Visual Decoration (3D Model Placeholder) */}
        <GlassCard
          delay={500}
          className="bg-slate-900 text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative z-10">
            <h3 className={`text-xl font-bold mb-2 ${dirClass}`}>
              Premium Service
            </h3>
            <p className={`text-slate-400 text-sm mb-6 ${dirClass}`}>
              {isUrdu
                ? "اپنے کسٹمرز کو بہترین سہولیات فراہم کریں"
                : "Provide the best quality to your customers."}
            </p>

            {/* 3D-like CSS Element */}
            <div className="flex justify-center my-8">
              <div className="relative w-32 h-40 bg-gradient-to-tr from-slate-700 to-slate-600 rounded-xl shadow-2xl transform transition-transform duration-700 group-hover:rotate-y-12 group-hover:scale-110 flex items-center justify-center border border-slate-500/30">
                <Shirt
                  size={48}
                  className="text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]"
                />
                <div className="absolute -bottom-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs border border-white/10">
                  New Order
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("newOrder")}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold shadow-lg shadow-blue-900/50 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <PlusCircle size={18} /> {t.newOrder}
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  // --- NEW ORDER FORM ---
  const NewOrderForm = () => (
    <div className={`max-w-4xl mx-auto ${isUrdu ? "rtl" : "ltr"}`}>
      <div className={`flex items-center gap-3 mb-6 ${flexDir}`}>
        <button
          onClick={() => setActiveTab("dashboard")}
          className="p-2 hover:bg-slate-200 rounded-full transition-colors"
        >
          <ChevronRight className={isUrdu ? "" : "rotate-180"} size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-800">{t.newOrder}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Info */}
        <GlassCard className="md:col-span-3">
          <h3
            className={`text-lg font-bold text-blue-900 border-b border-blue-100 pb-3 mb-4 ${dirClass}`}
          >
            {t.customerDetails}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className={`block text-sm text-slate-500 mb-1 ${dirClass}`}
              >
                {t.fields.name}
              </label>
              <input
                type="text"
                className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow ${dirClass}`}
              />
            </div>
            <div>
              <label
                className={`block text-sm text-slate-500 mb-1 ${dirClass}`}
              >
                {t.fields.phone}
              </label>
              <input
                type="tel"
                className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow ${dirClass}`}
              />
            </div>
            <div>
              <label
                className={`block text-sm text-slate-500 mb-1 ${dirClass}`}
              >
                {t.fields.date}
              </label>
              <input
                type="date"
                className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow ${dirClass}`}
              />
            </div>
          </div>
        </GlassCard>

        {/* Measurements */}
        <GlassCard className="md:col-span-2">
          <div
            className={`flex justify-between items-center border-b border-slate-100 pb-3 mb-4 ${flexDir}`}
          >
            <h3 className="text-lg font-bold text-slate-800">
              {t.measurements}
            </h3>
            <select className="bg-slate-100 border-none text-sm p-2 rounded text-slate-600 outline-none">
              <option>{t.garments.sk}</option>
              <option>{t.garments.pc}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "length",
              "tera",
              "chest",
              "waist",
              "arm",
              "giera",
              "shalwar",
              "paicha",
              "collar",
            ].map((field) => (
              <div key={field} className="relative group">
                <label
                  className={`block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider ${dirClass}`}
                >
                  {t.fields[field]}
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-slate-200 rounded-lg text-center font-mono text-lg font-semibold focus:border-blue-500 outline-none group-hover:shadow-md transition-all"
                />
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Summary & Actions */}
        <GlassCard className="h-fit bg-slate-50">
          <h3 className={`text-lg font-bold text-slate-800 mb-4 ${dirClass}`}>
            Summary
          </h3>
          <div className="space-y-3 mb-6">
            <div className={`flex justify-between text-sm ${flexDir}`}>
              <span className="text-slate-500">Base Price</span>
              <span className="font-bold">Rs. 0</span>
            </div>
            <div className={`flex justify-between text-sm ${flexDir}`}>
              <span className="text-slate-500">Tax (0%)</span>
              <span className="font-bold">Rs. 0</span>
            </div>
            <div
              className={`flex justify-between text-lg font-bold border-t border-slate-200 pt-2 ${flexDir}`}
            >
              <span>Total</span>
              <span className="text-blue-600">Rs. 0</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95">
              {t.saveOrder}
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition-colors"
            >
              {t.cancel}
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  // --- SIDEBAR NAVIGATION ---
  const NavItem = ({ icon: Icon, id }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSidebarOpen(false);
      }}
      className={`
        w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
        ${
          activeTab === id
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
            : "text-slate-400 hover:bg-white/10 hover:text-white"
        }
        ${flexDir}
      `}
    >
      <Icon size={20} />
      <span
        className={`font-medium ${
          isUrdu ? "font-[Noto_Nastaliq_Urdu] text-lg" : ""
        }`}
      >
        {t[id]}
      </span>
    </button>
  );

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-800 font-sans overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Background Gradients for "Glass" effect */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/90 backdrop-blur-xl border-r border-white/10
        transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className={`p-8 flex items-center gap-3 ${flexDir}`}>
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Scissors className="text-white" size={20} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {t.appTitle}
          </h1>
        </div>

        <nav className="px-4 space-y-2 mt-4">
          <NavItem id="dashboard" icon={LayoutDashboard} />
          <NavItem id="newOrder" icon={PlusCircle} />
          <NavItem id="orders" icon={FileText} />
          <NavItem id="customers" icon={Users} />
          <NavItem id="expenses" icon={DollarSign} />
          <NavItem id="settings" icon={Settings} />
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-4">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
            <div className={`flex items-center gap-3 ${flexDir}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                MT
              </div>
              <div className={isUrdu ? "text-right" : "text-left"}>
                <p className="text-white text-sm font-bold">Master Tailor</p>
                <p className="text-xs text-slate-400">Peshawar Branch</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 relative z-10 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-white"
          >
            <Menu />
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-slate-800/50 rounded-full px-4 py-2 border border-white/10 w-96 transition-all focus-within:w-[450px] focus-within:bg-slate-800 focus-within:border-blue-500/50">
            <Search className="text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className={`bg-transparent border-none outline-none text-white text-sm ml-2 w-full ${
                isUrdu ? "text-right" : ""
              }`}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang((l) => (l === "en" ? "ur" : "en"))}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-white/10 text-slate-300 text-xs hover:bg-slate-700 transition-colors"
            >
              <Globe size={14} />
              {t.urduToggle}
            </button>
            <button className="relative p-2 text-slate-300 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#F1F5F9]">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "newOrder" && <NewOrderForm />}
          {["orders", "customers", "expenses", "settings"].includes(
            activeTab
          ) && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 animate-in fade-in zoom-in duration-500">
              <Settings size={64} className="mb-4 text-slate-300" />
              <h3 className="text-xl font-bold text-slate-600">
                Module Under Construction
              </h3>
              <p className="text-sm">
                This {activeTab} section will be available in the final build.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
