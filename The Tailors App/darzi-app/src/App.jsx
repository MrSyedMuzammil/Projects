import React, { useState, useEffect, useRef } from "react";
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
  CheckCircle2,
  Clock,
  Package,
  Ruler,
  ArrowRight,
  LogOut,
  Briefcase,
  History,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

// --- TRANSLATION DICTIONARY ---
const TRANSLATIONS = {
  en: {
    appTitle: "Darzi Pro",
    welcomeSub: "Manage your boutique with style",
    dashboard: "Dashboard",
    orders: "Orders",
    newOrder: "New Order",
    customers: "Customers",
    expenses: "Expenses",
    staff: "Staff",
    activity: "Activity Logs",
    revenue: "Total Revenue",
    activeOrders: "Active Orders",
    dueToday: "Due Today",
    recentOrders: "Recent Orders",
    startOrder: "Start New Order",
    customerInfo: "Customer Information",
    garmentSelection: "Garment Selection",
    measurements: "Measurements",
    summary: "Order Summary",
    statusPipeline: "Production Status",
    saveOrder: "Save & Print Receipt",
    fields: {
      name: "Customer Name",
      phone: "Phone Number",
      date: "Delivery Date",
      type: "Type",
      price: "Total Price",
      advance: "Advance",
    },
    measurements_labels: {
      length: "Length",
      tera: "Shoulder (Tera)",
      chest: "Chest",
      waist: "Waist",
      arm: "Arm (Baju)",
      giera: "Giera",
      shalwar: "Shalwar",
      paicha: "Paicha",
      collar: "Collar",
    },
  },
  ur: {
    appTitle: "درزی پرو",
    welcomeSub: "اپنے بوتیک کو انداز سے چلائیں",
    dashboard: "ڈیش بورڈ",
    orders: "آرڈرز",
    newOrder: "نیا آرڈر",
    customers: "کسٹمرز",
    expenses: "اخراجات",
    staff: "عملہ",
    activity: "سرگرمیاں",
    revenue: "کل آمدنی",
    activeOrders: "جاری آرڈرز",
    dueToday: "آج کی ڈیلیوری",
    recentOrders: "حالیہ آرڈرز",
    startOrder: "نیا آرڈر شروع کریں",
    customerInfo: "کسٹمر کی معلومات",
    garmentSelection: "کپڑوں کا انتخاب",
    measurements: "پیمائش (انچ)",
    summary: "آرڈر کا خلاصہ",
    statusPipeline: "تیاری کے مراحل",
    saveOrder: "محفوظ کریں اور پرنٹ کریں",
    fields: {
      name: "کسٹمر کا نام",
      phone: "فون نمبر",
      date: "تاریخ واپسی",
      type: "قسم",
      price: "کل قیمت",
      advance: "ایڈوانس",
    },
    measurements_labels: {
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

// --- MOCK CHART DATA ---
const CHART_DATA = [
  { name: "Jan", uv: 4000 },
  { name: "Feb", uv: 3000 },
  { name: "Mar", uv: 2000 },
  { name: "Apr", uv: 2780 },
  { name: "May", uv: 1890 },
  { name: "Jun", uv: 2390 },
  { name: "Jul", uv: 3490 },
];

const INITIAL_ORDERS = [
  {
    id: 1001,
    name: "Ali Khan",
    type: "Shalwar Kameez",
    status: "Ready",
    price: 2500,
    date: "2023-11-01",
  },
  {
    id: 1002,
    name: "Usman Ghani",
    type: "Waistcoat",
    status: "Cutting",
    price: 3500,
    date: "2023-11-05",
  },
];

// --- COMPONENTS ---

const MagicCard = ({ children, className = "", delay = 0 }) => (
  <div
    className={`
      relative group overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/10
      rounded-2xl shadow-xl transition-all duration-500 ease-out
      hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10
      animate-in fade-in slide-in-from-bottom-8 fill-mode-forwards
      ${className}
    `}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 rounded-2xl p-[1px] bg-transparent group-hover:bg-gradient-to-r from-transparent via-blue-400 to-transparent bg-[length:200%_auto] bg-right-bottom group-hover:animate-shimmer transition-all"></div>
    <div className="relative h-full bg-[#0f172a]/90 rounded-2xl p-6">
      {children}
    </div>
  </div>
);

const NeonInput = ({
  label,
  type = "text",
  icon: Icon,
  dir,
  inputRef,
  onFocus,
  onBlur,
  placeholder,
}) => (
  <div className="relative group w-full">
    <label
      className={`block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider ${dir}`}
    >
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          size={16}
          className={`absolute top-3 text-slate-500 group-focus-within:text-blue-400 transition-colors ${
            dir === "text-right" ? "right-3" : "left-3"
          }`}
        />
      )}
      <input
        ref={inputRef}
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`
          w-full bg-slate-950 border border-slate-700 text-white rounded-lg py-2.5 text-sm
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          transition-all duration-300 placeholder:text-slate-700
          ${Icon ? (dir === "text-right" ? "pr-9" : "pl-9") : "px-3"}
          ${dir}
        `}
      />
    </div>
  </div>
);

// --- VISUALIZER ---
const Visualizer = ({ activePart, onClickPart }) => {
  const getFill = (part) => (activePart === part ? "#3b82f6" : "#1e293b");
  const stroke = "#475569";

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 200 400"
        className="h-full w-auto max-h-[60vh] drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
      >
        {/* Length */}
        <path
          d="M10,40 L10,300"
          stroke={activePart === "length" ? "#3b82f6" : "#334155"}
          strokeWidth="4"
          strokeDasharray="8,4"
          className="cursor-pointer hover:stroke-blue-400"
          onClick={() => onClickPart("length")}
        />
        <text
          x="20"
          y="200"
          fill="#64748b"
          fontSize="10"
          className="select-none rotate-90"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          Length
        </text>

        {/* Body Parts */}
        <path
          d="M85,30 Q100,50 115,30 L115,20 Q100,40 85,20 Z"
          fill={getFill("collar")}
          stroke={stroke}
          onClick={() => onClickPart("collar")}
          className="cursor-pointer hover:fill-slate-700"
        />
        <path
          d="M60,40 L140,40 L150,60 L50,60 Z"
          fill={getFill("tera")}
          stroke={stroke}
          onClick={() => onClickPart("tera")}
          className="cursor-pointer hover:fill-slate-700"
        />
        <rect
          x="20"
          y="60"
          width="30"
          height="150"
          rx="5"
          fill={getFill("arm")}
          stroke={stroke}
          onClick={() => onClickPart("arm")}
          className="cursor-pointer hover:fill-slate-700"
        />
        <rect
          x="150"
          y="60"
          width="30"
          height="150"
          rx="5"
          fill={getFill("arm")}
          stroke={stroke}
          onClick={() => onClickPart("arm")}
          className="cursor-pointer hover:fill-slate-700"
        />
        <path
          d="M50,60 L150,60 L145,130 L55,130 Z"
          fill={getFill("chest")}
          stroke={stroke}
          onClick={() => onClickPart("chest")}
          className="cursor-pointer hover:fill-slate-700"
        />
        <path
          d="M55,130 L145,130 L140,200 L60,200 Z"
          fill={getFill("waist")}
          stroke={stroke}
          onClick={() => onClickPart("waist")}
          className="cursor-pointer hover:fill-slate-700"
        />
        <path
          d="M60,200 L140,200 L145,280 L55,280 Z"
          fill={getFill("giera")}
          stroke={stroke}
          onClick={() => onClickPart("giera")}
          className="cursor-pointer hover:fill-slate-700"
        />
        <path
          d="M60,290 L95,290 L90,380 L65,380 Z"
          fill={getFill("shalwar")}
          stroke={stroke}
          onClick={() => onClickPart("shalwar")}
          className="cursor-pointer hover:fill-slate-700"
        />
        <path
          d="M105,290 L140,290 L135,380 L110,380 Z"
          fill={getFill("shalwar")}
          stroke={stroke}
          onClick={() => onClickPart("shalwar")}
          className="cursor-pointer hover:fill-slate-700"
        />
        <rect
          x="65"
          y="380"
          width="25"
          height="15"
          fill={getFill("paicha")}
          stroke={stroke}
          onClick={() => onClickPart("paicha")}
          className="cursor-pointer hover:fill-slate-700"
        />
        <rect
          x="110"
          y="380"
          width="25"
          height="15"
          fill={getFill("paicha")}
          stroke={stroke}
          onClick={() => onClickPart("paicha")}
          className="cursor-pointer hover:fill-slate-700"
        />
      </svg>
      <div className="absolute bottom-4 bg-slate-900/90 text-blue-400 text-[10px] px-3 py-1 rounded-full border border-blue-500/30">
        Click body part to edit
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function UltraDarzi() {
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [focusedField, setFocusedField] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Local Storage Logic
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("darzi_orders");
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem("darzi_orders", JSON.stringify(orders));
  }, [orders]);

  // Refs
  const inputRefs = {
    length: useRef(null),
    tera: useRef(null),
    chest: useRef(null),
    waist: useRef(null),
    arm: useRef(null),
    giera: useRef(null),
    shalwar: useRef(null),
    paicha: useRef(null),
    collar: useRef(null),
  };

  const handleVisualizerClick = (part) => {
    setFocusedField(part);
    // Timeout ensures the UI updates the 'focusedField' visual state before we force DOM focus
    setTimeout(() => {
      if (inputRefs[part] && inputRefs[part].current) {
        inputRefs[part].current.focus();
      }
    }, 10);
  };

  const t = TRANSLATIONS[lang];
  const isUrdu = lang === "ur";
  const dirClass = isUrdu
    ? "text-right font-[Noto_Nastaliq_Urdu]"
    : "text-left";
  const flexDir = isUrdu ? "flex-row-reverse" : "flex-row";

  // --- DASHBOARD VIEW ---
  const Dashboard = () => (
    <div className="space-y-6 pb-12">
      <div
        className={`flex flex-col md:flex-row justify-between items-end gap-4 ${flexDir}`}
      >
        <div>
          <h1 className={`text-2xl font-bold text-white mb-1 ${dirClass}`}>
            {t.dashboard}
          </h1>
          <p className={`text-slate-400 text-sm ${dirClass}`}>{t.welcomeSub}</p>
        </div>
        <button
          onClick={() => setActiveTab("newOrder")}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-900/50 flex items-center gap-2 transform hover:scale-105 transition-all text-sm"
        >
          <PlusCircle size={18} /> {t.startOrder}
        </button>
      </div>

      {/* KPI Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${
          isUrdu ? "rtl" : "ltr"
        }`}
      >
        {[
          {
            label: t.revenue,
            val: "Rs. 85k",
            icon: DollarSign,
            color: "text-emerald-400",
            border: "border-l-emerald-500",
          },
          {
            label: t.activeOrders,
            val: orders.length,
            icon: Scissors,
            color: "text-blue-400",
            border: "border-l-blue-500",
          },
          {
            label: t.customers,
            val: "142",
            icon: Users,
            color: "text-purple-400",
            border: "border-l-purple-500",
          },
          {
            label: t.dueToday,
            val: "03",
            icon: Clock,
            color: "text-red-400",
            border: "border-l-red-500",
          },
        ].map((kpi, i) => (
          <MagicCard
            key={i}
            delay={i * 100}
            className={`border-l-4 ${kpi.border}`}
          >
            <div className={`flex justify-between items-start ${flexDir}`}>
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  {kpi.label}
                </p>
                <h2 className="text-xl font-bold text-white mt-1">{kpi.val}</h2>
              </div>
              <div className={`p-2 bg-white/5 rounded-lg ${kpi.color}`}>
                <kpi.icon size={20} />
              </div>
            </div>
          </MagicCard>
        ))}
      </div>

      {/* Chart & Pipeline Section */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${
          isUrdu ? "rtl" : "ltr"
        }`}
      >
        {/* Chart */}
        <MagicCard className="lg:col-span-2 min-h-[300px]" delay={400}>
          <h3 className={`text-lg font-bold text-white mb-4 ${dirClass}`}>
            Revenue Analytics
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#3b82f6" }}
                />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </MagicCard>

        {/* Pipeline */}
        <div className="space-y-4">
          {["Pending", "Cutting", "Sewing", "Ready"].map((status, i) => (
            <MagicCard key={status} delay={500 + i * 100} className="!p-4">
              <div className={`flex items-center justify-between ${flexDir}`}>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      i === 3 ? "bg-emerald-500" : "bg-blue-500"
                    }`}
                  ></div>
                  <span className="font-bold text-slate-200 text-sm">
                    {status}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {Math.floor(Math.random() * 10)} Orders
                </span>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </div>
  );

  // --- NEW ORDER FORM (Split View) ---
  const NewOrder = () => (
    <div
      className={`h-[calc(100vh-100px)] overflow-hidden flex flex-col ${
        isUrdu ? "rtl" : "ltr"
      }`}
    >
      {/* Header */}
      <div className={`flex-none flex items-center gap-4 mb-4 ${flexDir}`}>
        <button
          onClick={() => setActiveTab("dashboard")}
          className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-white transition-colors"
        >
          <ArrowRight size={20} className={isUrdu ? "" : "rotate-180"} />
        </button>
        <h1 className="text-2xl font-bold text-white">{t.newOrder}</h1>
      </div>

      {/* Main Content - Split Screen */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* Left: Input Forms (Scrollable) */}
        <div className="lg:col-span-7 overflow-y-auto pr-2 pb-20 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-700">
          {/* Customer Info */}
          <MagicCard>
            <h3
              className={`text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 uppercase tracking-wide ${dirClass}`}
            >
              <User size={16} /> {t.customerInfo}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NeonInput label={t.fields.name} icon={User} dir={dirClass} />
              <NeonInput
                label={t.fields.phone}
                icon={Phone}
                dir={dirClass}
                type="tel"
              />
              <NeonInput
                label={t.fields.date}
                icon={Calendar}
                dir={dirClass}
                type="date"
              />
              <div className="relative group w-full">
                <label
                  className={`block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider ${dirClass}`}
                >
                  {t.fields.type}
                </label>
                <select
                  className={`w-full bg-slate-950 border border-slate-700 text-white rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:border-blue-500 appearance-none ${dirClass}`}
                >
                  <option>Shalwar Kameez</option>
                  <option>Pent Coat</option>
                  <option>Waistcoat</option>
                </select>
              </div>
            </div>
          </MagicCard>

          {/* Measurements Input */}
          <MagicCard>
            <h3
              className={`text-sm font-bold text-blue-400 mb-4 flex items-center gap-2 uppercase tracking-wide ${dirClass}`}
            >
              <Ruler size={16} /> {t.measurements}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.keys(t.measurements_labels).map((key) => (
                <div key={key}>
                  <NeonInput
                    inputRef={inputRefs[key]}
                    label={t.measurements_labels[key]}
                    dir={dirClass}
                    type="number"
                    onFocus={() => setFocusedField(key)}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              ))}
            </div>
          </MagicCard>

          {/* Summary */}
          <MagicCard className="bg-slate-800/50">
            <div className="grid grid-cols-2 gap-4">
              <NeonInput
                label={t.fields.price}
                icon={DollarSign}
                dir={dirClass}
                type="number"
              />
              <NeonInput
                label={t.fields.advance}
                icon={DollarSign}
                dir={dirClass}
                type="number"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-900/20 flex items-center gap-2 transition-all">
                <CheckCircle2 size={18} /> {t.saveOrder}
              </button>
            </div>
          </MagicCard>
        </div>

        {/* Right: Visualizer (Sticky/Fixed) */}
        <div className="hidden lg:block lg:col-span-5 h-full">
          <MagicCard className="h-full bg-slate-900/80 !p-0 flex flex-col">
            <div className="flex-1 relative">
              <Visualizer
                activePart={focusedField}
                onClickPart={handleVisualizerClick}
              />
            </div>
          </MagicCard>
        </div>
      </div>
    </div>
  );

  // --- NAVIGATION ITEM ---
  const NavItem = ({ icon: Icon, id }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSidebarOpen(false);
      }}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
        ${
          activeTab === id
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
            : "text-slate-400 hover:bg-white/5 hover:text-white"
        }
        ${flexDir}
      `}
    >
      <Icon
        size={18}
        className={`${
          activeTab === id
            ? "scale-110"
            : "group-hover:scale-110 transition-transform"
        }`}
      />
      <span
        className={`font-medium tracking-wide text-sm ${
          isUrdu ? "font-[Noto_Nastaliq_Urdu] text-base" : ""
        }`}
      >
        {t[id]}
      </span>
    </button>
  );

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-100 font-sans overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0b1120] border-r border-white/5 flex flex-col
        transform transition-transform duration-300 ease-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className={`p-6 flex items-center gap-3 ${flexDir}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Scissors className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Darzi<span className="text-blue-500">Pro</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono">
              ULTRA EDITION
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1 [&::-webkit-scrollbar]:w-0">
          <p
            className={`text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2 px-4 ${dirClass}`}
          >
            Main
          </p>
          <NavItem id="dashboard" icon={LayoutDashboard} />
          <NavItem id="newOrder" icon={PlusCircle} />
          <NavItem id="orders" icon={Package} />
          <NavItem id="customers" icon={Users} />

          <p
            className={`text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-6 mb-2 px-4 ${dirClass}`}
          >
            Management
          </p>
          <NavItem id="revenue" icon={DollarSign} />
          <NavItem id="expenses" icon={FileText} />
          <NavItem id="staff" icon={Briefcase} />
          <NavItem id="activity" icon={History} />
          <NavItem id="settings" icon={Settings} />
        </div>

        <div className="p-4 border-t border-white/5">
          <button
            className={`flex items-center gap-3 text-slate-500 hover:text-white transition-colors w-full px-4 py-2 text-sm ${flexDir}`}
          >
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col h-full min-w-0">
        {/* Topbar */}
        <header className="h-16 px-4 md:px-8 flex items-center justify-between border-b border-white/5 bg-[#0f172a]/50 backdrop-blur-md sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-white p-2"
          >
            <Menu size={20} />
          </button>

          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-96 focus-within:bg-white/10 transition-colors">
            <Search className="text-slate-500" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang((l) => (l === "en" ? "ur" : "en"))}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <Globe size={12} /> {lang === "en" ? "اردو" : "English"}
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white text-xs font-bold border-2 border-[#0f172a]">
              MT
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-700">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "newOrder" && <NewOrder />}
          {[
            "orders",
            "customers",
            "revenue",
            "expenses",
            "staff",
            "activity",
            "settings",
          ].includes(activeTab) && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 animate-in zoom-in duration-300">
              <Activity size={48} className="mb-4 opacity-20" />
              <h2 className="text-xl font-bold text-slate-400">Coming Soon</h2>
              <p className="text-xs">
                The {activeTab} module is under development.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
