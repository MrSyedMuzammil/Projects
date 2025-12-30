import React, { useState, useRef } from "react";
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
  MoreHorizontal,
} from "lucide-react";

// --- TRANSLATION DICTIONARY ---
const TRANSLATIONS = {
  en: {
    appTitle: "Darzi Pro",
    welcomeSub: "Manage your boutique with style",
    dashboard: "Dashboard",
    orders: "Orders",
    newOrder: "New Order",
    revenue: "Total Revenue",
    activeOrders: "Active Orders",
    dueToday: "Due Today",
    customers: "Total Customers",
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
    revenue: "کل آمدنی",
    activeOrders: "جاری آرڈرز",
    dueToday: "آج کی ڈیلیوری",
    customers: "کل کسٹمرز",
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

// --- MOCK DATA ---
const RECENT_ORDERS = [
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
  {
    id: 1003,
    name: "Ahmed Raza",
    type: "Pent Coat",
    status: "Sewing",
    price: 12000,
    date: "2023-10-30",
  },
  {
    id: 1004,
    name: "Mr. Bilal",
    type: "Shalwar Kameez",
    status: "Pending",
    price: 2500,
    date: "2023-11-02",
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
    {/* Animated Gradient Border on Hover */}
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
}) => (
  <div className="relative group">
    <label
      className={`block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider ${dir}`}
    >
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          size={18}
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
        className={`
          w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-3
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          transition-all duration-300 placeholder:text-slate-600
          ${Icon ? (dir === "text-right" ? "pr-10" : "pl-10") : "px-4"}
          ${dir}
        `}
      />
    </div>
  </div>
);

// --- INTERACTIVE VISUALIZER ---
const Visualizer = ({ activePart, onClickPart }) => {
  const getFill = (part) => (activePart === part ? "#3b82f6" : "#1e293b"); // Blue if active, Dark if not
  const stroke = "#475569";

  return (
    <div className="relative w-64 h-96 mx-auto my-4 opacity-90">
      <svg
        viewBox="0 0 200 400"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
      >
        {/* Length (Vertical Line) */}
        <path
          d="M10,40 L10,300"
          stroke={activePart === "length" ? "#3b82f6" : "#334155"}
          strokeWidth="4"
          strokeDasharray="8,4"
          className="cursor-pointer hover:stroke-blue-400"
          onClick={() => onClickPart("length")}
        />
        <text
          x="15"
          y="200"
          fill="#94a3b8"
          fontSize="12"
          className="select-none"
        >
          Length
        </text>

        {/* Collar */}
        <path
          d="M85,30 Q100,50 115,30 L115,20 Q100,40 85,20 Z"
          fill={getFill("collar")}
          stroke={stroke}
          strokeWidth="2"
          className="cursor-pointer hover:fill-slate-600 transition-colors"
          onClick={() => onClickPart("collar")}
        />

        {/* Tera (Shoulders) */}
        <path
          d="M60,40 L140,40 L150,60 L50,60 Z"
          fill={getFill("tera")}
          stroke={stroke}
          strokeWidth="2"
          className="cursor-pointer hover:fill-slate-600 transition-colors"
          onClick={() => onClickPart("tera")}
        />

        {/* Arms (Baju) */}
        <rect
          x="20"
          y="60"
          width="30"
          height="150"
          rx="5"
          fill={getFill("arm")}
          stroke={stroke}
          strokeWidth="2"
          className="cursor-pointer hover:fill-slate-600 transition-colors"
          onClick={() => onClickPart("arm")}
        />
        <rect
          x="150"
          y="60"
          width="30"
          height="150"
          rx="5"
          fill={getFill("arm")}
          stroke={stroke}
          strokeWidth="2"
          className="cursor-pointer hover:fill-slate-600 transition-colors"
          onClick={() => onClickPart("arm")}
        />

        {/* Chest (Upper Body) */}
        <path
          d="M50,60 L150,60 L145,130 L55,130 Z"
          fill={getFill("chest")}
          stroke={stroke}
          strokeWidth="2"
          className="cursor-pointer hover:fill-slate-600 transition-colors"
          onClick={() => onClickPart("chest")}
        />

        {/* Waist (Middle Body) */}
        <path
          d="M55,130 L145,130 L140,200 L60,200 Z"
          fill={getFill("waist")}
          stroke={stroke}
          strokeWidth="2"
          className="cursor-pointer hover:fill-slate-600 transition-colors"
          onClick={() => onClickPart("waist")}
        />

        {/* Giera (Hem - Bottom of Shirt) */}
        <path
          d="M60,200 L140,200 L145,280 L55,280 Z"
          fill={getFill("giera")}
          stroke={stroke}
          strokeWidth="2"
          className="cursor-pointer hover:fill-slate-600 transition-colors"
          onClick={() => onClickPart("giera")}
        />

        {/* Shalwar (Legs) */}
        <path
          d="M60,290 L95,290 L90,380 L65,380 Z"
          fill={getFill("shalwar")}
          stroke={stroke}
          strokeWidth="2"
          className="cursor-pointer hover:fill-slate-600 transition-colors"
          onClick={() => onClickPart("shalwar")}
        />
        <path
          d="M105,290 L140,290 L135,380 L110,380 Z"
          fill={getFill("shalwar")}
          stroke={stroke}
          strokeWidth="2"
          className="cursor-pointer hover:fill-slate-600 transition-colors"
          onClick={() => onClickPart("shalwar")}
        />

        {/* Paicha (Bottom of Legs) */}
        <rect
          x="65"
          y="380"
          width="25"
          height="15"
          fill={getFill("paicha")}
          stroke={stroke}
          strokeWidth="2"
          className="cursor-pointer hover:fill-slate-600 transition-colors"
          onClick={() => onClickPart("paicha")}
        />
        <rect
          x="110"
          y="380"
          width="25"
          height="15"
          fill={getFill("paicha")}
          stroke={stroke}
          strokeWidth="2"
          className="cursor-pointer hover:fill-slate-600 transition-colors"
          onClick={() => onClickPart("paicha")}
        />
      </svg>
      <div className="absolute bottom-0 w-full text-center text-xs text-blue-400 font-mono bg-slate-900/80 rounded py-1">
        Interactive Model - Click to Edit
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

  // Refs for focusing inputs
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
    if (inputRefs[part] && inputRefs[part].current) {
      inputRefs[part].current.focus();
    }
  };

  const t = TRANSLATIONS[lang];
  const isUrdu = lang === "ur";
  const dirClass = isUrdu
    ? "text-right font-[Noto_Nastaliq_Urdu]"
    : "text-left";
  const flexDir = isUrdu ? "flex-row-reverse" : "flex-row";

  // --- DASHBOARD VIEW ---
  const Dashboard = () => (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <div className={`flex justify-between items-end ${flexDir}`}>
        <div>
          <h1 className={`text-3xl font-bold text-white mb-1 ${dirClass}`}>
            {t.dashboard}
          </h1>
          <p className={`text-slate-400 ${dirClass}`}>{t.welcomeSub}</p>
        </div>
        <button
          onClick={() => setActiveTab("newOrder")}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/50 flex items-center gap-2 transform hover:scale-105 transition-all"
        >
          <PlusCircle size={20} /> {t.startOrder}
        </button>
      </div>

      {/* KPI Grid (Restored All) */}
      <div
        className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${
          isUrdu ? "rtl" : "ltr"
        }`}
      >
        <MagicCard delay={0} className="border-l-4 border-l-emerald-500">
          <div className={`flex justify-between items-start ${flexDir}`}>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                {t.revenue}
              </p>
              <h2 className="text-2xl font-bold text-white mt-1">Rs. 85,000</h2>
            </div>
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
              <DollarSign size={24} />
            </div>
          </div>
        </MagicCard>
        <MagicCard delay={100} className="border-l-4 border-l-blue-500">
          <div className={`flex justify-between items-start ${flexDir}`}>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                {t.activeOrders}
              </p>
              <h2 className="text-2xl font-bold text-white mt-1">12</h2>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <Scissors size={24} />
            </div>
          </div>
        </MagicCard>
        <MagicCard delay={200} className="border-l-4 border-l-purple-500">
          <div className={`flex justify-between items-start ${flexDir}`}>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                {t.customers}
              </p>
              <h2 className="text-2xl font-bold text-white mt-1">148</h2>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <Users size={24} />
            </div>
          </div>
        </MagicCard>
        <MagicCard delay={300} className="border-l-4 border-l-red-500">
          <div className={`flex justify-between items-start ${flexDir}`}>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                {t.dueToday}
              </p>
              <h2 className="text-2xl font-bold text-white mt-1">03</h2>
            </div>
            <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
              <Clock size={24} />
            </div>
          </div>
        </MagicCard>
      </div>

      {/* Recent Orders Table (Restored) */}
      <MagicCard delay={400}>
        <div className={`flex items-center justify-between mb-6 ${flexDir}`}>
          <h3 className={`text-xl font-bold text-white ${dirClass}`}>
            {t.recentOrders}
          </h3>
          <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className={`w-full text-sm text-left ${dirClass}`}>
            <thead className="text-xs text-slate-500 uppercase bg-slate-900/50 border-b border-slate-700">
              <tr>
                <th
                  className={`px-4 py-3 ${isUrdu ? "text-right" : "text-left"}`}
                >
                  Order ID
                </th>
                <th
                  className={`px-4 py-3 ${isUrdu ? "text-right" : "text-left"}`}
                >
                  {t.fields.name}
                </th>
                <th
                  className={`px-4 py-3 ${isUrdu ? "text-right" : "text-left"}`}
                >
                  {t.fields.type}
                </th>
                <th
                  className={`px-4 py-3 ${isUrdu ? "text-right" : "text-left"}`}
                >
                  Status
                </th>
                <th
                  className={`px-4 py-3 ${isUrdu ? "text-right" : "text-left"}`}
                >
                  {t.fields.price}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {RECENT_ORDERS.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-slate-400">
                    #{order.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">
                    {order.name}
                  </td>
                  <td className="px-4 py-3 text-slate-400">{order.type}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        order.status === "Ready"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : order.status === "Pending"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-white">
                    Rs. {order.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MagicCard>

      {/* Pipeline Visual */}
      <MagicCard delay={500}>
        <h3 className={`text-xl font-bold text-white mb-6 ${dirClass}`}>
          {t.statusPipeline}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["Pending", "Cutting", "Sewing", "Ready"].map((status, i) => (
            <div
              key={status}
              className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 hover:border-blue-500/50 transition-colors"
            >
              <div
                className={`flex items-center justify-between mb-3 ${flexDir}`}
              >
                <span
                  className={`font-bold ${
                    i === 3 ? "text-emerald-400" : "text-slate-300"
                  }`}
                >
                  {status}
                </span>
                <span className="bg-slate-800 text-xs px-2 py-1 rounded text-slate-400">
                  {Math.floor(Math.random() * 5)}
                </span>
              </div>
              {/* Mock Item */}
              <div className="bg-slate-800 p-2 rounded-lg text-xs text-slate-400 mb-2 border-l-2 border-blue-500">
                {i === 1 ? "Usman Ghani (WC)" : "Empty Slot"}
              </div>
            </div>
          ))}
        </div>
      </MagicCard>
    </div>
  );

  // --- NEW ORDER FORM ---
  const NewOrder = () => (
    <div
      className={`max-w-6xl mx-auto space-y-6 pb-12 animate-in slide-in-from-right duration-500 ${
        isUrdu ? "rtl" : "ltr"
      }`}
    >
      <div className={`flex items-center gap-4 ${flexDir}`}>
        <button
          onClick={() => setActiveTab("dashboard")}
          className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-white transition-colors"
        >
          <ArrowRight className={isUrdu ? "" : "rotate-180"} />
        </button>
        <h1 className="text-3xl font-bold text-white">{t.newOrder}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <MagicCard>
            <h3
              className={`text-lg font-bold text-blue-400 mb-6 flex items-center gap-2 ${dirClass}`}
            >
              <User size={18} /> {t.customerInfo}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="relative group">
                <label
                  className={`block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider ${dirClass}`}
                >
                  {t.fields.type}
                </label>
                <select
                  className={`w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 appearance-none ${dirClass}`}
                >
                  <option>Shalwar Kameez</option>
                  <option>Pent Coat</option>
                  <option>Waistcoat</option>
                </select>
              </div>
            </div>
          </MagicCard>

          <MagicCard>
            <h3
              className={`text-lg font-bold text-blue-400 mb-6 flex items-center gap-2 ${dirClass}`}
            >
              <Ruler size={18} /> {t.measurements}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
        </div>

        {/* Right Column: Visualizer & Total */}
        <div className="space-y-6">
          {/* Visualizer Card */}
          <MagicCard className="bg-slate-800/80">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider text-center mb-4">
              Interactive Guide
            </h3>
            <Visualizer
              activePart={focusedField}
              onClickPart={handleVisualizerClick}
            />
          </MagicCard>

          {/* Pricing Card */}
          <MagicCard className="bg-gradient-to-br from-blue-900/50 to-slate-900 border-blue-500/30">
            <h3 className={`text-lg font-bold text-white mb-4 ${dirClass}`}>
              {t.summary}
            </h3>
            <div className="space-y-4 mb-6">
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
            <div
              className={`flex justify-between items-center text-sm text-slate-400 border-t border-slate-700 pt-4 mb-6 ${flexDir}`}
            >
              <span>Balance Due:</span>
              <span className="text-xl font-bold text-white">Rs. 0</span>
            </div>
            <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 transform transition active:scale-95 flex items-center justify-center gap-2">
              <CheckCircle2 size={20} /> {t.saveOrder}
            </button>
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
        w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group
        ${
          activeTab === id
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
            : "text-slate-400 hover:bg-white/5 hover:text-white"
        }
        ${flexDir}
      `}
    >
      <Icon
        size={20}
        className={`transition-transform duration-300 ${
          activeTab === id ? "scale-110" : "group-hover:scale-110"
        }`}
      />
      <span
        className={`font-medium tracking-wide ${
          isUrdu ? "font-[Noto_Nastaliq_Urdu] text-lg" : ""
        }`}
      >
        {t[id]}
      </span>

      {/* Active Indicator Dot */}
      {activeTab === id && (
        <span
          className={`w-1.5 h-1.5 bg-white rounded-full ${
            isUrdu ? "mr-auto" : "ml-auto"
          }`}
        ></span>
      )}
    </button>
  );

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-100 font-sans overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] animate-float"></div>
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-[#0f172a]/95 backdrop-blur-2xl border-r border-white/5
        transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className={`p-8 flex items-center gap-4 ${flexDir}`}>
          <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-3 hover:rotate-6 transition-transform">
            <Scissors className="text-white" size={24} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0f172a]"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Darzi<span className="text-blue-400">Pro</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono tracking-widest">
              V2.1.0
            </p>
          </div>
        </div>

        <nav className="px-6 space-y-2 mt-4">
          <p
            className={`text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-4 ${dirClass}`}
          >
            Main Menu
          </p>
          <NavItem id="dashboard" icon={LayoutDashboard} />
          <NavItem id="newOrder" icon={PlusCircle} />
          <NavItem id="orders" icon={Package} />
          <p
            className={`text-xs font-bold text-slate-500 uppercase tracking-widest mt-8 mb-4 px-4 ${dirClass}`}
          >
            Management
          </p>
          <NavItem id="revenue" icon={DollarSign} />
          <NavItem id="settings" icon={Settings} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-white/5 bg-[#0f172a]/50 backdrop-blur-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-white hover:bg-white/10 p-2 rounded-lg"
          >
            <Menu />
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 w-96 focus-within:w-[500px] focus-within:bg-white/10 focus-within:border-blue-500/50 transition-all duration-300 group">
            <Search
              className="text-slate-500 group-focus-within:text-blue-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search orders, clients..."
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang((l) => (l === "en" ? "ur" : "en"))}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <Globe size={14} /> {lang === "en" ? "اردو" : "English"}
            </button>
            <div className="h-8 w-px bg-white/10 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-white">Master Tailor</p>
                <p className="text-xs text-emerald-400">Online</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20 border-2 border-[#0f172a]">
                MT
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-track]:bg-slate-900">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "newOrder" && <NewOrder />}
          {["orders", "revenue", "settings"].includes(activeTab) && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 animate-in zoom-in duration-500">
              <Activity size={64} className="mb-6 opacity-20" />
              <h2 className="text-2xl font-bold text-slate-400">Coming Soon</h2>
              <p className="text-sm">This module is under development.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
