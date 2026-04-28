import React, { useState, useEffect, createContext, useContext } from "react";
import {
  ArrowRight,
  Sparkles,
  Layout,
  Palette,
  Code,
  Briefcase,
  User,
  CheckCircle2,
  Star,
  Zap,
  ChevronRight,
  Menu,
  X,
  LogIn,
  MessageCircle,
  Link,
  Globe,
  Check,
  Edit3,
  Eye,
  Download,
  Settings,
  Trash2,
  Plus,
  Upload,
  BarChart3,
  Clock,
} from "lucide-react";

// --- Custom CSS for "Framer Motion" style Animations ---
const customStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulseSoft {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
  .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
  .animate-slide-in-right { animation: slideInRight 0.5s ease-out forwards; }
  .animate-pulse-soft { animation: pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  .stagger-1 { animation-delay: 100ms; }
  .stagger-2 { animation-delay: 200ms; }
  .stagger-3 { animation-delay: 300ms; }
  .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.2); }
  .dark .glass-card { background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(255, 255, 255, 0.05); }
  
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

// --- Global State & Context ---
const AppContext = createContext();

const initialPortfolio = {
  personal: { name: "", role: "", bio: "", email: "", location: "" },
  skills: [],
  projects: [],
  experience: [],
  theme: "minimal",
};

const AppProvider = ({ children }) => {
  const [page, setPage] = useState("landing");
  const [theme, setTheme] = useState("dark");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [portfolio, setPortfolio] = useState(initialPortfolio);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const navigate = (newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  return (
    <AppContext.Provider
      value={{
        page,
        navigate,
        theme,
        toggleTheme,
        isAuthenticated,
        setIsAuthenticated,
        portfolio,
        setPortfolio,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// --- Reusable Components ---
const Button = ({
  children,
  variant = "primary",
  className = "",
  icon,
  onClick,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 active:scale-95";
  const variants = {
    primary:
      "bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5",
    secondary:
      "bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
    ghost:
      "text-gray-600 dark:text-gray-300 hover:text-[#6C5CE7] dark:hover:text-[#00CEC9] hover:bg-gray-100 dark:hover:bg-gray-800",
    danger:
      "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && icon}
    </button>
  );
};

const Input = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && (
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
    )}
    <input
      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6C5CE7]/50 focus:border-[#6C5CE7] transition-all outline-none"
      {...props}
    />
  </div>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
  >
    {children}
  </div>
);

// --- Layouts ---
const Navbar = () => {
  const { navigate, isAuthenticated, setIsAuthenticated, theme, toggleTheme } =
    useContext(AppContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-card shadow-sm py-3" : "bg-transparent py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("landing")}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#00CEC9] flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 tracking-tight">
            PortfoliAI
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <button
            onClick={() => navigate("landing")}
            className="hover:text-[#6C5CE7] transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => navigate("pricing")}
            className="hover:text-[#6C5CE7] transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => navigate("templates")}
            className="hover:text-[#6C5CE7] transition-colors"
          >
            Templates
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
          >
            {theme === "light" ? <Zap size={18} /> : <Star size={18} />}
          </button>

          {isAuthenticated ? (
            <Button
              variant="secondary"
              onClick={() => navigate("dashboard")}
              className="hidden sm:flex"
            >
              Dashboard
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate("auth")}
                className="hidden sm:flex"
              >
                Login
              </Button>
              <Button onClick={() => navigate("auth")}>Get Started</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

// --- Page Components ---

// 1. Landing Page
const LandingPage = () => {
  const { navigate } = useContext(AppContext);
  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-in text-center sm:text-left">
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-[#6C5CE7] text-sm font-semibold mb-6 animate-fade-in-up">
          <Sparkles size={14} /> AI-Powered V2.0 is Live
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6 animate-fade-in-up stagger-1 max-w-4xl">
          Create your pro portfolio in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9]">
            minutes
          </span>
          , not hours.
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 animate-fade-in-up stagger-2 max-w-2xl mx-auto">
          No coding required. Let our AI write your bio, organize your skills,
          and deploy a stunning, SEO-optimized personal website instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
          <Button
            onClick={() => navigate("auth")}
            className="px-8 py-4 text-lg"
          >
            Start for free <ArrowRight size={20} />
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("templates")}
            className="px-8 py-4 text-lg"
          >
            View Templates
          </Button>
        </div>

        <div className="mt-20 w-full max-w-5xl relative animate-fade-in-up stagger-3">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] rounded-[2rem] blur-2xl opacity-20 dark:opacity-40 animate-pulse-soft"></div>
          <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200&h=600"
              alt="Dashboard Preview"
              className="w-full object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800/50 py-24 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="text-[#6C5CE7]" size={32} />,
                title: "AI Bio Generator",
                desc: "Type a few keywords, and our AI crafts a compelling professional story.",
              },
              {
                icon: <Palette className="text-[#00CEC9]" size={32} />,
                title: "Beautiful Templates",
                desc: "Stripe-level design quality out of the box. Fully responsive and accessible.",
              },
              {
                icon: <Globe className="text-[#6C5CE7]" size={32} />,
                title: "Instant Hosting",
                desc: "Deploy with one click. Get a custom shareable link and fast SEO.",
              },
            ].map((f, i) => (
              <Card
                key={i}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-indigo-50 dark:bg-gray-800 border border-indigo-100 dark:border-gray-700 flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// 2. Auth Page
const AuthPage = () => {
  const { setIsAuthenticated, navigate } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate("dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="w-full max-w-md animate-fade-in-up">
        <Card className="p-8 shadow-2xl shadow-indigo-500/10 border-0">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-gray-500">
              Let's build something amazing today.
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <Button variant="secondary" className="w-full">
              <Code size={18} /> Github
            </Button>
            <Button variant="secondary" className="w-full">
              <Briefcase size={18} /> LinkedIn
            </Button>
          </div>

          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">
              Or continue with email
            </span>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <Input label="Full Name" placeholder="Your Name" required />
            )}
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              required
            />
            <Button className="w-full mt-4 py-3" type="submit">
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#6C5CE7] font-semibold hover:underline"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

// 3. Dashboard
const Dashboard = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here's your overview.
          </p>
        </div>
        <Button onClick={() => navigate("wizard")} icon={<Plus size={18} />}>
          New Portfolio
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          {
            label: "Total Views",
            value: "1,248",
            icon: <Eye className="text-blue-500" />,
            trend: "+12%",
          },
          {
            label: "Profile Clicks",
            value: "342",
            icon: <User className="text-indigo-500" />,
            trend: "+5%",
          },
          {
            label: "Avg. Time on Site",
            value: "2m 14s",
            icon: <Clock className="text-emerald-500" />,
            trend: "+18%",
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="animate-fade-in-up flex items-center gap-4"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                <span className="text-xs text-green-500 font-medium mb-1">
                  {stat.trend}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Your Portfolios
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col animate-fade-in-up stagger-3 group">
          <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg mb-4 overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1507238692062-110ce05f94dd?auto=format&fit=crop&w=600&q=80"
              alt="Preview"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Published
            </div>
          </div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            Software Engineer Pro
          </h3>
          <p className="text-sm text-gray-500 mb-4">Updated 2 days ago</p>
          <div className="flex gap-2 mt-auto">
            <Button
              variant="secondary"
              className="flex-1 text-sm py-2"
              onClick={() => navigate("editor")}
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              className="flex-1 text-sm py-2"
              onClick={() => navigate("public")}
            >
              View
            </Button>
          </div>
        </Card>

        <div
          onClick={() => navigate("wizard")}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center p-6 text-gray-500 hover:text-[#6C5CE7] hover:border-[#6C5CE7] hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all cursor-pointer min-h-[300px] animate-fade-in-up stagger-3"
        >
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
            <Plus size={24} />
          </div>
          <p className="font-medium">Create New Portfolio</p>
        </div>
      </div>
    </div>
  );
};

// 4. Create Portfolio Wizard
const WizardPage = () => {
  const { navigate, portfolio, setPortfolio } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [keywords, setKeywords] = useState("");

  const handleNext = () => (step < 5 ? setStep(step + 1) : navigate("editor"));
  const handlePrev = () =>
    step > 1 ? setStep(step - 1) : navigate("dashboard");

  const generateAIBio = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setPortfolio((p) => ({
        ...p,
        personal: {
          ...p.personal,
          bio: `Driven and innovative professional with a strong foundation in ${keywords || "modern technologies"}. I specialize in bridging the gap between elegant design and robust engineering to create scalable, impactful digital experiences. Always eager to tackle complex challenges and drive growth.`,
        },
      }));
      setIsGenerating(false);
    }, 1500);
  };

  const steps = ["Personal", "Skills", "Projects", "Experience", "Theme"];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Build your Portfolio
        </h1>

        <div className="flex items-center justify-between relative mt-8">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full -z-10"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] rounded-full -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          ></div>

          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 ${i + 1 <= step ? "text-[#6C5CE7]" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i + 1 < step ? "bg-[#6C5CE7] text-white" : i + 1 === step ? "bg-white border-2 border-[#6C5CE7] text-[#6C5CE7]" : "bg-gray-200 dark:bg-gray-800 text-gray-500"}`}
              >
                {i + 1 < step ? <Check size={16} /> : i + 1}
              </div>
              <span className="text-xs hidden sm:block font-medium">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <Card className="min-h-[400px] flex flex-col relative overflow-hidden animate-slide-in-right">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Personal Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={portfolio.personal.name}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    personal: { ...portfolio.personal, name: e.target.value },
                  })
                }
                placeholder="Your Name"
              />
              <Input
                label="Professional Role"
                value={portfolio.personal.role}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    personal: { ...portfolio.personal, role: e.target.value },
                  })
                }
                placeholder="e.g. Frontend Developer"
              />
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bio / Summary
                </label>
                <div className="flex gap-2 w-2/3 items-center">
                  <Input
                    placeholder="Keywords: React, UI/UX..."
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                  <Button
                    variant="secondary"
                    onClick={generateAIBio}
                    disabled={isGenerating}
                    className="whitespace-nowrap px-3 text-sm"
                  >
                    {isGenerating ? (
                      "Generating..."
                    ) : (
                      <>
                        <Sparkles size={14} className="text-purple-500" /> AI
                        Auto-Write
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#6C5CE7]/50 outline-none h-32 resize-none"
                value={portfolio.personal.bio}
                onChange={(e) =>
                  setPortfolio({
                    ...portfolio,
                    personal: { ...portfolio.personal, bio: e.target.value },
                  })
                }
                placeholder="Write about yourself..."
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Technologies
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Add the skills you excel at.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "React",
                "Node.js",
                "Tailwind CSS",
                "Figma",
                "TypeScript",
                "Python",
              ].map((skill) => (
                <span
                  key={skill}
                  onClick={() => {
                    if (!portfolio.skills.includes(skill))
                      setPortfolio({
                        ...portfolio,
                        skills: [...portfolio.skills, skill],
                      });
                  }}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm cursor-pointer hover:bg-indigo-50 hover:text-[#6C5CE7] transition-colors border border-transparent hover:border-indigo-200"
                >
                  + {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 p-4 min-h-[100px] border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50">
              {portfolio.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 bg-[#6C5CE7] text-white rounded-full text-sm flex items-center gap-2"
                >
                  {skill}{" "}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() =>
                      setPortfolio({
                        ...portfolio,
                        skills: portfolio.skills.filter((s) => s !== skill),
                      })
                    }
                  />
                </div>
              ))}
              {portfolio.skills.length === 0 && (
                <span className="text-gray-400 text-sm my-auto mx-auto">
                  Selected skills will appear here
                </span>
              )}
            </div>
          </div>
        )}

        {(step === 3 || step === 4) && (
          <div className="space-y-4 animate-fade-in flex flex-col items-center justify-center h-full text-center py-10">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-[#6C5CE7]">
              {step === 3 ? <Briefcase size={28} /> : <Layout size={28} />}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Add your {step === 3 ? "Projects" : "Experience"}
            </h2>
            <p className="text-gray-500 text-sm max-w-sm mb-6">
              You can add detailed information about your{" "}
              {step === 3 ? "portfolio projects" : "work history"} later in the
              visual editor.
            </p>
            <Button variant="secondary" icon={<Plus size={16} />}>
              Add Item Now
            </Button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Select Starting Theme
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {["Minimalist", "Creative Dark", "Corporate", "Gradient Pop"].map(
                (t, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      setPortfolio({ ...portfolio, theme: t.toLowerCase() })
                    }
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${portfolio.theme === t.toLowerCase() ? "border-[#6C5CE7] bg-indigo-50/50 dark:bg-[#6C5CE7]/10" : "border-gray-200 dark:border-gray-700 hover:border-gray-300"}`}
                  >
                    <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 rounded-md mb-3 flex items-center justify-center">
                      Preview
                    </div>
                    <p className="font-medium text-center text-sm dark:text-white">
                      {t}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        <div className="mt-auto pt-8 flex justify-between">
          <Button variant="ghost" onClick={handlePrev}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            onClick={handleNext}
            icon={step === 5 ? <Check size={18} /> : <ArrowRight size={18} />}
          >
            {step === 5 ? "Generate Portfolio" : "Next Step"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

// 5. Templates Page
const TemplatesPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Beautiful Templates
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Start with a professionally designed template and customize it to
          match your brand perfectly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="group cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 relative aspect-[4/3] mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300">
              <img
                src={`https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=450&sig=${i}`}
                alt="Template"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button className="scale-90 group-hover:scale-100 transition-transform">
                  Use Template
                </Button>
              </div>
            </div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              Template Variant {i}
            </h3>
            <p className="text-sm text-gray-500">Perfect for Creatives</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 6 & 7. Editor & Preview Page
const EditorPage = () => {
  const { portfolio, navigate } = useContext(AppContext);
  const [view, setView] = useState("desktop");

  return (
    <div className="h-screen pt-16 flex flex-col bg-gray-100 dark:bg-gray-900 animate-fade-in overflow-hidden">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between z-10 shadow-sm">
        <div className="flex gap-4 items-center">
          <Button
            variant="ghost"
            className="px-2"
            onClick={() => navigate("dashboard")}
          >
            <ArrowRight size={20} className="rotate-180" />
          </Button>
          <span className="font-semibold text-gray-800 dark:text-gray-200 border-l border-gray-200 dark:border-gray-700 pl-4">
            Editing: Minimalist Theme
          </span>
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
          <button
            onClick={() => setView("desktop")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === "desktop" ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-500"}`}
          >
            Desktop
          </button>
          <button
            onClick={() => setView("mobile")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${view === "mobile" ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white" : "text-gray-500"}`}
          >
            Mobile
          </button>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            icon={<Eye size={16} />}
            onClick={() => navigate("public")}
          >
            Preview
          </Button>
          <Button icon={<Upload size={16} />}>Publish</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto z-10 custom-scrollbar p-5 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layout size={16} /> Sections
            </h3>
            <div className="space-y-2">
              {[
                "Hero Header",
                "About Me",
                "Skills Matrix",
                "Project Grid",
                "Contact Footer",
              ].map((sec) => (
                <div
                  key={sec}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 cursor-grab hover:border-[#6C5CE7] transition-colors"
                >
                  <span className="text-sm font-medium dark:text-gray-300">
                    {sec}
                  </span>
                  <Menu size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex justify-center py-8 relative bg-gray-100/50 dark:bg-gray-900/50 pattern-grid">
          <div
            className={`bg-white dark:bg-gray-950 shadow-2xl transition-all duration-500 origin-top overflow-y-auto ${view === "mobile" ? "w-[375px] h-[812px] rounded-[3rem] border-[8px] border-gray-800" : "w-full max-w-5xl h-full rounded-lg border border-gray-200 dark:border-gray-800"}`}
          >
            <div className="p-10 animate-fade-in">
              <nav className="flex justify-between items-center mb-20">
                <h2 className="text-2xl font-bold tracking-tighter dark:text-white">
                  {portfolio.personal.name || "Your Name"}
                </h2>
                <div className="flex gap-4 text-sm font-medium dark:text-gray-300">
                  <span>Work</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
              </nav>
              <header className="mb-20 max-w-2xl">
                <h1 className="text-5xl font-bold mb-6 dark:text-white leading-tight">
                  Hi, I'm a{" "}
                  <span className="text-[#6C5CE7]">
                    {portfolio.personal.role || "Creative Developer"}
                  </span>{" "}
                  based in the digital world.
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                  {portfolio.personal.bio ||
                    "I craft beautiful, scalable web experiences that solve real problems."}
                </p>
                <button className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium">
                  Get in touch
                </button>
              </header>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 8. Public Portfolio Page
const PublicPortfolio = () => {
  const { portfolio, navigate } = useContext(AppContext);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
      <button
        onClick={() => navigate("dashboard")}
        className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-full shadow-xl text-sm z-50 flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <ArrowRight className="rotate-180" size={16} /> Back to Builder
      </button>

      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24 animate-fade-in-up">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
              {portfolio.personal.name || "Your Name"}
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              {portfolio.personal.role || "Full-Stack React Developer"}
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Code size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 transition-colors"
            >
              <Briefcase size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 transition-colors"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </header>

        <main className="space-y-24">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
              About
            </h2>
            <p className="text-lg md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 max-w-3xl">
              {portfolio.personal.bio ||
                "I'm a passionate developer focusing on modern web technologies. I love building intuitive, pixel-perfect user interfaces and robust backend systems."}
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
              Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {(portfolio.skills.length > 0
                ? portfolio.skills
                : ["React", "JavaScript", "Node.js", "Tailwind", "UI/UX Design"]
              ).map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium hover:border-[#6C5CE7] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </main>

        <footer className="mt-32 pt-12 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} {portfolio.personal.name || "Developer"}.
          Built with PortfoliAI.
        </footer>
      </div>
    </div>
  );
};

// 9. Pricing Page
const PricingPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-6xl mx-auto animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Start for free, upgrade when you need custom domains and advanced
          analytics.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="p-8 border-gray-200 dark:border-gray-700 animate-slide-in-right">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Hobby
          </h3>
          <p className="text-gray-500 mb-6">
            Perfect to get your name out there.
          </p>
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
            $0<span className="text-lg font-normal text-gray-500">/mo</span>
          </div>

          <ul className="space-y-4 mb-8">
            {[
              "1 Portfolio Website",
              "Standard Templates",
              "PortfoliAI.com Subdomain",
              "Basic SEO Meta tags",
            ].map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
              >
                <CheckCircle2 size={18} className="text-green-500" /> {feature}
              </li>
            ))}
          </ul>
          <Button variant="secondary" className="w-full py-3 text-lg">
            Start for free
          </Button>
        </Card>

        <Card className="p-8 border-[#6C5CE7] ring-2 ring-[#6C5CE7]/20 relative shadow-2xl shadow-indigo-500/10 animate-slide-in-right stagger-1">
          <div className="absolute top-0 right-8 transform -translate-y-1/2">
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00CEC9] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Most Popular
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pro Freelancer
          </h3>
          <p className="text-gray-500 mb-6">
            For professionals who need a serious web presence.
          </p>
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
            $12<span className="text-lg font-normal text-gray-500">/mo</span>
          </div>

          <ul className="space-y-4 mb-8">
            {[
              "Unlimited Portfolios",
              "Premium UI Templates",
              "Custom Domain Support",
              "Advanced Analytics",
              "Remove PortfoliAI Branding",
              "AI Bio & Copy Generator",
            ].map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
              >
                <CheckCircle2 size={18} className="text-[#6C5CE7]" /> {feature}
              </li>
            ))}
          </ul>
          <Button className="w-full py-3 text-lg">Upgrade to Pro</Button>
        </Card>
      </div>
    </div>
  );
};

// 10. Settings Page
const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(AppContext);
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Account Settings
      </h1>

      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        <div className="space-y-1 hidden md:block">
          <div className="px-4 py-2 bg-indigo-50 dark:bg-gray-800 text-[#6C5CE7] dark:text-[#00CEC9] rounded-lg font-medium cursor-pointer">
            Profile
          </div>
          <div className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg cursor-pointer">
            Billing
          </div>
        </div>

        <div className="space-y-8">
          <Card className="animate-slide-in-right">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Personal Information
            </h2>
            <div className="space-y-4 max-w-md">
              <Input label="Full Name" defaultValue="Your Name" />
              <Input label="Email Address" defaultValue="email@example.com" />
              <Button className="mt-2">Save Changes</Button>
            </div>
          </Card>

          <Card className="animate-slide-in-right stagger-1">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Preferences
            </h2>
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
              <div>
                <p className="font-medium dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-500">
                  Toggle between light and dark UI.
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full relative transition-colors ${theme === "dark" ? "bg-[#6C5CE7]" : "bg-gray-300"}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${theme === "dark" ? "translate-x-7" : "translate-x-1"}`}
                ></div>
              </button>
            </div>
          </Card>

          <Card className="animate-slide-in-right stagger-2 border-red-100 dark:border-red-900/30">
            <h2 className="text-xl font-bold mb-4 text-red-600 dark:text-red-400">
              Danger Zone
            </h2>
            <p className="text-gray-500 mb-4">
              Once you delete your account, there is no going back.
            </p>
            <Button variant="danger" icon={<Trash2 size={16} />}>
              Delete Account
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const MainApp = () => {
  const { page } = useContext(AppContext);

  const renderPage = () => {
    switch (page) {
      case "landing":
        return <LandingPage />;
      case "auth":
        return <AuthPage />;
      case "dashboard":
        return <Dashboard />;
      case "wizard":
        return <WizardPage />;
      case "templates":
        return <TemplatesPage />;
      case "editor":
        return <EditorPage />;
      case "public":
        return <PublicPortfolio />;
      case "pricing":
        return <PricingPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <LandingPage />;
    }
  };

  const hideNavigation = ["editor", "public"].includes(page);

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#111827] text-gray-900 dark:text-white transition-colors duration-300 font-sans selection:bg-[#6C5CE7]/30">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      {!hideNavigation && <Navbar />}

      <main>{renderPage()}</main>

      {!hideNavigation && page !== "auth" && (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-12 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#6C5CE7] to-[#00CEC9] flex items-center justify-center text-white font-bold text-xs">
              P
            </div>
            <span className="font-bold text-lg dark:text-white">
              PortfoliAI
            </span>
          </div>
          <p className="text-gray-500 mb-6">
            Designed with precision. Built for freelancers.
          </p>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
