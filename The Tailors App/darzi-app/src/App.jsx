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
  Filter,
  Download,
  Trash2,
  Edit2,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
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
    revenue: "Revenue",
    settings: "Settings",
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
    revenue: "آمدنی",
    settings: "سیٹنگز",
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

// --- MOCK DATA ---
const CHART_DATA = [
  { name: "Jan", revenue: 4000, expenses: 2400 },
  { name: "Feb", revenue: 3000, expenses: 1398 },
  { name: "Mar", revenue: 9800, expenses: 2000 },
  { name: "Apr", revenue: 2780, expenses: 3908 },
  { name: "May", revenue: 1890, expenses: 4800 },
  { name: "Jun", revenue: 2390, expenses: 3800 },
  { name: "Jul", revenue: 3490, expenses: 4300 },
];

const MOCK_ORDERS = [
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
  {
    id: 1005,
    name: "Haji Sahab",
    type: "Sherwani",
    status: "Ready",
    price: 15000,
    date: "2023-11-03",
  },
];

const MOCK_CUSTOMERS = [
  {
    id: 1,
    name: "Ali Khan",
    phone: "0300-1234567",
    visits: 12,
    lastOrder: "2023-10-01",
  },
  {
    id: 2,
    name: "Usman Ghani",
    phone: "0321-7654321",
    visits: 5,
    lastOrder: "2023-09-15",
  },
  {
    id: 3,
    name: "Ahmed Raza",
    phone: "0333-9988776",
    visits: 8,
    lastOrder: "2023-10-20",
  },
  {
    id: 4,
    name: "Sardar Alam",
    phone: "0345-1122334",
    visits: 2,
    lastOrder: "2023-11-01",
  },
];

const MOCK_EXPENSES = [
  {
    id: 1,
    item: "Electricity Bill",
    amount: 12000,
    date: "2023-10-01",
    category: "Utilities",
  },
  {
    id: 2,
    item: "Thread & Buttons",
    amount: 5000,
    date: "2023-10-05",
    category: "Materials",
  },
  {
    id: 3,
    item: "Shop Rent",
    amount: 25000,
    date: "2023-10-01",
    category: "Rent",
  },
  {
    id: 4,
    item: "Machine Repair",
    amount: 1500,
    date: "2023-10-12",
    category: "Maintenance",
  },
];

const MOCK_STAFF = [
  {
    id: 1,
    name: "Master Tailor",
    role: "Owner",
    salary: 0,
    phone: "0300-0000000",
  },
  {
    id: 2,
    name: "Kashif Ali",
    role: "Cutter",
    salary: 35000,
    phone: "0312-3456789",
  },
  {
    id: 3,
    name: "Rizwan",
    role: "Stitcher",
    salary: 28000,
    phone: "0333-4455667",
  },
];

const MOCK_ACTIVITY = [
  {
    id: 1,
    user: "Master Tailor",
    action: "Created Order #1005",
    time: "10:30 AM",
  },
  {
    id: 2,
    user: "Kashif Ali",
    action: "Updated Order #1002 to Cutting",
    time: "11:15 AM",
  },
  {
    id: 3,
    user: "Master Tailor",
    action: "Added Expense: Thread",
    time: "01:00 PM",
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

// Improved NeonInput with number arrow hiding
const NeonInput = ({
  label,
  type = "text",
  icon: Icon,
  dir,
  inputRef,
  onFocus,
  onBlur,
  placeholder,
  defaultValue,
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
        defaultValue={defaultValue}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`
          w-full bg-slate-950 border border-slate-700 text-white rounded-lg py-2.5 text-sm
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          transition-all duration-300 placeholder:text-slate-700
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
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
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
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
    if (inputRefs[part] && inputRefs[part].current) {
      // preventScroll: true prevents the page from jumping when focusing
      inputRefs[part].current.focus({ preventScroll: true });
    }
  };

  const t = TRANSLATIONS[lang];
  const isUrdu = lang === "ur";
  const dirClass = isUrdu
    ? "text-right font-[Noto_Nastaliq_Urdu]"
    : "text-left";
  const flexDir = isUrdu ? "flex-row-reverse" : "flex-row";

  // --- VIEWS ---

  const DashboardView = () => (
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

      <div
        className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${
          isUrdu ? "rtl" : "ltr"
        }`}
      >
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
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </MagicCard>

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

  const OrdersView = () => (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`flex justify-between items-center ${flexDir}`}>
        <h1 className="text-2xl font-bold text-white">{t.orders}</h1>
        <div className="flex gap-2">
          <button className="p-2 bg-slate-800 text-slate-300 rounded-lg">
            <Filter size={18} />
          </button>
          <button className="p-2 bg-slate-800 text-slate-300 rounded-lg">
            <Download size={18} />
          </button>
        </div>
      </div>
      <MagicCard>
        <div className="overflow-x-auto">
          <table className={`w-full text-sm text-left ${dirClass}`}>
            <thead className="text-xs text-slate-500 uppercase bg-slate-900/50 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">{t.fields.name}</th>
                <th className="px-6 py-4">{t.fields.type}</th>
                <th className="px-6 py-4">{t.fields.date}</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">{t.fields.price}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-slate-400">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-white">
                    {order.name}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{order.type}</td>
                  <td className="px-6 py-4 text-slate-400">{order.date}</td>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4 font-bold text-white">
                    Rs. {order.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MagicCard>
    </div>
  );

  const CustomersView = () => (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-white">{t.customers}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CUSTOMERS.map((c) => (
          <MagicCard key={c.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {c.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-white">{c.name}</h3>
                  <p className="text-xs text-slate-500">ID: #{c.id}</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-white">
                <Edit2 size={16} />
              </button>
            </div>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Phone:</span>{" "}
                <span className="text-slate-300">{c.phone}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Total Visits:</span>{" "}
                <span className="text-slate-300">{c.visits}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Order:</span>{" "}
                <span className="text-slate-300">{c.lastOrder}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-white/5 hover:bg-white/10 text-blue-400 py-2 rounded-lg text-xs font-bold transition-colors">
              View Profile
            </button>
          </MagicCard>
        ))}
      </div>
    </div>
  );

  const ExpensesView = () => (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">{t.expenses}</h1>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <PlusCircle size={16} /> Add Expense
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MagicCard>
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4">Item</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {MOCK_EXPENSES.map((e) => (
                  <tr key={e.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-medium text-white">
                      {e.item}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <span className="px-2 py-1 bg-slate-800 rounded text-xs">
                        {e.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{e.date}</td>
                    <td className="px-6 py-4 font-bold text-red-400">
                      - Rs. {e.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MagicCard>
        </div>
        <MagicCard>
          <h3 className="font-bold text-white mb-4">Expense Breakdown</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Util", amt: 12000 },
                  { name: "Rent", amt: 25000 },
                  { name: "Mat", amt: 5000 },
                ]}
              >
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <RechartsTooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                  }}
                />
                <Bar dataKey="amt" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Monthly:</span>
              <span className="font-bold text-white">Rs. 43,500</span>
            </div>
          </div>
        </MagicCard>
      </div>
    </div>
  );

  const StaffView = () => (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-white">{t.staff}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_STAFF.map((s) => (
          <MagicCard key={s.id}>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-2xl mb-4 border-2 border-blue-500">
                {s.name[0]}
              </div>
              <h3 className="font-bold text-white text-lg">{s.name}</h3>
              <p className="text-blue-400 text-sm mb-4">{s.role}</p>
              <div className="w-full space-y-2 text-sm text-slate-400 bg-slate-900/50 p-4 rounded-xl">
                <div className="flex justify-between">
                  <span>Salary:</span>{" "}
                  <span className="text-white">Rs. {s.salary}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>{" "}
                  <span className="text-white">{s.phone}</span>
                </div>
              </div>
            </div>
          </MagicCard>
        ))}
      </div>
    </div>
  );

  const ActivityView = () => (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-white">{t.activity}</h1>
      <MagicCard>
        <div className="space-y-6">
          {MOCK_ACTIVITY.map((act, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {i !== MOCK_ACTIVITY.length - 1 && (
                  <div className="w-0.5 h-full bg-slate-800 my-1"></div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {act.action}{" "}
                  <span className="text-slate-500">by {act.user}</span>
                </p>
                <p className="text-xs text-slate-500">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </MagicCard>
    </div>
  );

  const SettingsView = () => (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-white">{t.settings}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MagicCard>
          <h3 className="font-bold text-white mb-4">Appearance</h3>
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg mb-2">
            <span className="text-sm text-slate-300">Dark Mode</span>
            <div className="w-10 h-5 bg-blue-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
            <span className="text-sm text-slate-300">Compact View</span>
            <div className="w-10 h-5 bg-slate-700 rounded-full relative">
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </MagicCard>
        <MagicCard>
          <h3 className="font-bold text-white mb-4">Data Management</h3>
          <button className="w-full text-left p-3 hover:bg-slate-800 rounded-lg text-sm text-slate-300 flex items-center gap-2">
            <Download size={16} /> Export All Data (CSV)
          </button>
          <button className="w-full text-left p-3 hover:bg-red-900/20 rounded-lg text-sm text-red-400 flex items-center gap-2 mt-2">
            <Trash2 size={16} /> Reset Local Storage
          </button>
        </MagicCard>
      </div>
    </div>
  );

  const NewOrderView = () => (
    <div
      className={`h-[calc(100vh-100px)] overflow-hidden flex flex-col ${
        isUrdu ? "rtl" : "ltr"
      }`}
    >
      <div className={`flex-none flex items-center gap-4 mb-4 ${flexDir}`}>
        <button
          onClick={() => setActiveTab("dashboard")}
          className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-white transition-colors"
        >
          <ArrowRight size={20} className={isUrdu ? "" : "rotate-180"} />
        </button>
        <h1 className="text-2xl font-bold text-white">{t.newOrder}</h1>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        <div className="lg:col-span-7 overflow-y-auto pr-2 pb-20 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-700">
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
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "newOrder" && <NewOrderView />}
          {activeTab === "orders" && <OrdersView />}
          {activeTab === "customers" && <CustomersView />}
          {activeTab === "revenue" && <DashboardView />}{" "}
          {/* Reusing dashboard for revenue overview */}
          {activeTab === "expenses" && <ExpensesView />}
          {activeTab === "staff" && <StaffView />}
          {activeTab === "activity" && <ActivityView />}
          {activeTab === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
}
