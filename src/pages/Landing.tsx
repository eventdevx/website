import {
  useEffect,
  useMemo,
  useState,
  type ElementType,
} from "react";

import { motion } from "motion/react";

import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  Blocks,
  Bot,
  BrainCircuit,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  Command,
  Cpu,
  Database,
  ExternalLink,
  FileBadge2,
  FolderKanban,
  Gauge,
  Globe2,
  ClipboardCheck,
  HardDrive,
  LayoutDashboard,
  LineChart,
  LockKeyhole,
  Menu,
  Network,
  Radar,
  Rocket,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  UserPlus,
  Users,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

type PlatformItem = {
  key: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: ElementType;
  href: string;
  count: string;
  countLabel: string;
  buttonLabel: string;
  accent:
    | "indigo"
    | "cyan"
    | "violet"
    | "emerald"
    | "orange"
    | "amber";
};

type EventItem = {
  id: number;
  name: string;
  type: string;
  description: string;
  participants: number;
  status: "live" | "pending" | "upcoming";
  icon: ElementType;
  gradient: string;
};

type ProjectItem = {
  id: number;
  name: string;
  type: string;
  description: string;
  progress: number;
  status: string;
  icon: ElementType;
};

type CommunityMember = {
  id: number;
  name: string;
  role: string;
  initials: string;
  events: number;
  certificates: number;
  points: number;
  level: string;
};

type InfrastructureItem = {
  id: number;
  title: string;
  description: string;
  value: string;
  label: string;
  icon: ElementType;
  percentage: number;
};

type ActivityItem = {
  id: number;
  title: string;
  detail: string;
  time: string;
  icon: ElementType;
  iconClass: string;
};

type MetricItem = {
  value: string;
  title: string;
  detail: string;
  icon: ElementType;
};

const PLATFORM_ITEMS: PlatformItem[] = [
  {
    key: "events",
    title: "Events Arena",
    shortTitle: "Events",
    description:
      "Explore live hackathons, campus events, conferences, workshops and technology programs.",
    icon: CalendarDays,
    href: "/events",
    count: "42",
    countLabel: "active events",
    buttonLabel: "Open Events",
    accent: "indigo",
  },
  {
    key: "projects",
    title: "Live Projects",
    shortTitle: "Projects",
    description:
      "Track collaborative engineering work, project progress, ownership and delivery.",
    icon: FolderKanban,
    href: "/projects",
    count: "6",
    countLabel: "live projects",
    buttonLabel: "View Projects",
    accent: "cyan",
  },
  {
    key: "community",
    title: "Global Collective",
    shortTitle: "Community",
    description:
      "Connect organizers, developers, campus groups, sponsors and technology partners.",
    icon: Users,
    href: "/community",
    count: "1,284+",
    countLabel: "members",
    buttonLabel: "Open Community",
    accent: "violet",
  },
  {
    key: "analytics",
    title: "Analytics",
    shortTitle: "Analytics",
    description:
      "See registrations, engagement, retention, event success and platform activity.",
    icon: BarChart3,
    href: "/analytics",
    count: "92%",
    countLabel: "event success",
    buttonLabel: "View Analytics",
    accent: "emerald",
  },
  {
    key: "infrastructure",
    title: "Infrastructure Hub",
    shortTitle: "Infrastructure",
    description:
      "Manage event connectivity, equipment, check-in systems and technology support.",
    icon: Server,
    href: "/infrastructure",
    count: "99.9%",
    countLabel: "platform uptime",
    buttonLabel: "Open Infrastructure",
    accent: "orange",
  },
  {
    key: "certificates",
    title: "Certificate Studio",
    shortTitle: "Certificates",
    description:
      "Create clean achievement certificates and issue verified event recognition.",
    icon: Award,
    href: "/certificates",
    count: "8,342",
    countLabel: "certificates",
    buttonLabel: "Open Certificate Studio",
    accent: "amber",
  },
];

const EVENTS: EventItem[] = [
  {
    id: 1,
    name: "Indo-Hack 2026",
    type: "Hackathon",
    description:
      "India's largest decentralized hackathon focused on ZK-Proof technologies.",
    participants: 2300,
    status: "live",
    icon: Code2,
    gradient: "from-indigo-600 via-indigo-500 to-violet-600",
  },
  {
    id: 2,
    name: "TechSummit Alpha",
    type: "College Level",
    description:
      "Building regional innovation ecosystems across North India.",
    participants: 500,
    status: "pending",
    icon: BrainCircuit,
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
  },
  {
    id: 3,
    name: "PyConf India",
    type: "Conference",
    description:
      "Talks, workshops, community sessions and Python-focused learning.",
    participants: 1200,
    status: "upcoming",
    icon: Terminal,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    id: 4,
    name: "WebDev Sprint",
    type: "Hackathon",
    description:
      "A 48-hour frontend and full-stack challenge for the developer network.",
    participants: 780,
    status: "live",
    icon: Blocks,
    gradient: "from-violet-600 via-fuchsia-500 to-pink-500",
  },
  {
    id: 5,
    name: "AI Olympiad 2026",
    type: "Summit",
    description:
      "A national AI challenge connecting teams across technology communities.",
    participants: 3000,
    status: "upcoming",
    icon: Bot,
    gradient: "from-rose-500 via-red-500 to-orange-500",
  },
  {
    id: 6,
    name: "Open Source Day",
    type: "Workshop",
    description:
      "Guided sessions for developers starting their open-source journey.",
    participants: 400,
    status: "upcoming",
    icon: Globe2,
    gradient: "from-cyan-500 via-sky-500 to-blue-600",
  },
];

const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    name: "Project Orion",
    type: "Web3 Framework",
    description:
      "Web3 framework for event management and decentralized ticketing.",
    progress: 75,
    status: "Active",
    icon: Code2,
  },
  {
    id: 2,
    name: "Atlas Network",
    type: "Identity Protocol",
    description:
      "Decentralized identity system for event participants and communities.",
    progress: 42,
    status: "Building",
    icon: Network,
  },
  {
    id: 3,
    name: "CertChain",
    type: "Blockchain",
    description:
      "Blockchain-verified certificate issuance and validation workflow.",
    progress: 88,
    status: "Near Complete",
    icon: ShieldCheck,
  },
  {
    id: 4,
    name: "EventOS",
    type: "Infrastructure",
    description:
      "Real-time operating layer for large-scale technology events.",
    progress: 31,
    status: "Building",
    icon: Cpu,
  },
  {
    id: 5,
    name: "HackBot AI",
    type: "AI / ML",
    description:
      "Assistant for hackathon participants, mentors and organizers.",
    progress: 60,
    status: "Active",
    icon: Bot,
  },
  {
    id: 6,
    name: "NodeDash",
    type: "Observability",
    description:
      "Monitoring dashboard for distributed event infrastructure.",
    progress: 95,
    status: "Production Ready",
    icon: Radar,
  },
];

const COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "Hackathon Organizer",
    initials: "AS",
    events: 12,
    certificates: 8,
    points: 2340,
    level: "Gold",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "College Tech Society",
    initials: "PN",
    events: 7,
    certificates: 5,
    points: 1860,
    level: "Silver",
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Community Partner",
    initials: "VS",
    events: 21,
    certificates: 14,
    points: 4120,
    level: "Platinum",
  },
  {
    id: 4,
    name: "Ananya Patel",
    role: "Corporate Sponsor",
    initials: "AP",
    events: 4,
    certificates: 2,
    points: 980,
    level: "Bronze",
  },
  {
    id: 5,
    name: "Rohan Mehta",
    role: "Hackathon Organizer",
    initials: "RM",
    events: 9,
    certificates: 11,
    points: 2670,
    level: "Gold",
  },
  {
    id: 6,
    name: "Sneha Kapoor",
    role: "Individual Developer",
    initials: "SK",
    events: 3,
    certificates: 3,
    points: 720,
    level: "Bronze",
  },
];

const INFRASTRUCTURE: InfrastructureItem[] = [
  {
    id: 1,
    title: "Dedicated Bandwidth",
    description:
      "High-throughput connectivity for live events and large workloads.",
    value: "10 Gbps",
    label: "capacity",
    icon: Wifi,
    percentage: 94,
  },
  {
    id: 2,
    title: "Check-in Kiosks",
    description:
      "Fast registration and attendance support for physical events.",
    value: "48",
    label: "available",
    icon: ClipboardCheckIcon,
    percentage: 82,
  },
  {
    id: 3,
    title: "Technical Support",
    description:
      "Operational support for critical event technology systems.",
    value: "24/7",
    label: "support",
    icon: ShieldCheck,
    percentage: 100,
  },
  {
    id: 4,
    title: "SLA Guarantee",
    description:
      "Infrastructure reliability with a clear availability target.",
    value: "99.9%",
    label: "SLA",
    icon: Gauge,
    percentage: 99,
  },
  {
    id: 5,
    title: "Judging Monitor Set",
    description:
      "High-resolution judging and presentation equipment.",
    value: "12",
    label: "available",
    icon: LayoutDashboard,
    percentage: 68,
  },
  {
    id: 6,
    title: "Portable WiFi Router",
    description:
      "Portable connectivity for satellite event locations.",
    value: "28",
    label: "available",
    icon: Wifi,
    percentage: 76,
  },
];

const ACTIVITIES: ActivityItem[] = [
  {
    id: 1,
    title: "Indo-Hack 2026 went live",
    detail: "2,300 participants joined in the first hour.",
    time: "2 min ago",
    icon: Rocket,
    iconClass: "bg-indigo-500/10 text-indigo-300",
  },
  {
    id: 2,
    title: "VIT Vellore partnership approved",
    detail: "A new community node was activated.",
    time: "45 min ago",
    icon: Users,
    iconClass: "bg-emerald-500/10 text-emerald-300",
  },
  {
    id: 3,
    title: "Delhi cluster reached 80%",
    detail: "Infrastructure capacity monitoring was triggered.",
    time: "1 hour ago",
    icon: Server,
    iconClass: "bg-amber-500/10 text-amber-300",
  },
  {
    id: 4,
    title: "156 certificates issued",
    detail: "PyConf India batch generation was completed.",
    time: "3 hours ago",
    icon: Award,
    iconClass: "bg-violet-500/10 text-violet-300",
  },
  {
    id: 5,
    title: "NodeDash reached production",
    detail: "Monitoring project crossed the 95% delivery mark.",
    time: "5 hours ago",
    icon: Activity,
    iconClass: "bg-cyan-500/10 text-cyan-300",
  },
];

const METRICS: MetricItem[] = [
  {
    value: "₹48.2L",
    title: "Total Revenue",
    detail: "Platform activity",
    icon: CircleDollarSign,
  },
  {
    value: "34.7%",
    title: "Conversion",
    detail: "Current cycle",
    icon: LineChart,
  },
  {
    value: "6h 24m",
    title: "Avg Engagement",
    detail: "Member activity",
    icon: Clock3,
  },
  {
    value: "8,342",
    title: "Certificates",
    detail: "Issued outcomes",
    icon: Award,
  },
];

function ClipboardCheckIcon(props: { className?: string }) {
  return <ClipboardCheck {...props} />;
}

const colorMap = {
  indigo: {
    icon: "border-indigo-400/20 bg-indigo-500/10 text-indigo-300",
    line: "from-indigo-500 to-violet-400",
    button:
      "border-indigo-400/20 bg-indigo-500 text-white shadow-[0_12px_35px_rgba(99,102,241,0.25)] hover:bg-indigo-400",
    hover: "hover:border-indigo-400/30",
  },
  cyan: {
    icon: "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
    line: "from-cyan-500 to-sky-400",
    button:
      "border-cyan-400/20 bg-cyan-500 text-slate-950 shadow-[0_12px_35px_rgba(6,182,212,0.20)] hover:bg-cyan-400",
    hover: "hover:border-cyan-400/30",
  },
  violet: {
    icon: "border-violet-400/20 bg-violet-500/10 text-violet-300",
    line: "from-violet-500 to-fuchsia-400",
    button:
      "border-violet-400/20 bg-violet-500 text-white shadow-[0_12px_35px_rgba(139,92,246,0.22)] hover:bg-violet-400",
    hover: "hover:border-violet-400/30",
  },
  emerald: {
    icon: "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
    line: "from-emerald-500 to-teal-400",
    button:
      "border-emerald-400/20 bg-emerald-500 text-slate-950 shadow-[0_12px_35px_rgba(16,185,129,0.20)] hover:bg-emerald-400",
    hover: "hover:border-emerald-400/30",
  },
  orange: {
    icon: "border-orange-400/20 bg-orange-500/10 text-orange-300",
    line: "from-orange-500 to-amber-400",
    button:
      "border-orange-400/20 bg-orange-500 text-white shadow-[0_12px_35px_rgba(249,115,22,0.22)] hover:bg-orange-400",
    hover: "hover:border-orange-400/30",
  },
  amber: {
    icon: "border-amber-400/20 bg-amber-500/10 text-amber-300",
    line: "from-amber-500 to-yellow-400",
    button:
      "border-amber-400/20 bg-amber-500 text-slate-950 shadow-[0_12px_35px_rgba(245,158,11,0.22)] hover:bg-amber-400",
    hover: "hover:border-amber-400/30",
  },
};

function getEventStatusClass(status: EventItem["status"]) {
  if (status === "live") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "pending") {
    return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  }

  return "border-sky-400/20 bg-sky-400/10 text-sky-300";
}

function getEventStatusText(status: EventItem["status"]) {
  if (status === "live") {
    return "LIVE";
  }

  if (status === "pending") {
    return "PENDING";
  }

  return "UPCOMING";
}

function getLevelClass(level: string) {
  if (level === "Platinum") {
    return "border-violet-200 bg-violet-50 text-violet-700";
  }

  if (level === "Gold") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (level === "Silver") {
    return "border-slate-200 bg-slate-100 text-slate-700";
  }

  return "border-orange-200 bg-orange-50 text-orange-700";
}

const Landing = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePlatform, setActivePlatform] = useState(0);
  const [eventFilter, setEventFilter] = useState<
    "all" | "live" | "pending" | "upcoming"
  >("all");

  const filteredEvents = useMemo(() => {
    if (eventFilter === "all") {
      return EVENTS;
    }

    return EVENTS.filter(
      (event) => event.status === eventFilter
    );
  }, [eventFilter]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePlatform((current) => {
        return (current + 1) % PLATFORM_ITEMS.length;
      });
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goTo = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  const goToLogin = () => {
    setMenuOpen(false);
    navigate("/auth");
  };

  const goToDashboard = () => {
    setMenuOpen(false);

    if (user) {
      navigate("/dashboard");
      return;
    }

    navigate("/auth");
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);

    window.setTimeout(() => {
      const target = document.getElementById(id);

      if (!target) {
        return;
      }

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070b16] text-white">
      {/* =====================================================
          DECORATIVE 3D BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(99,102,241,0.18),transparent_25%),radial-gradient(circle_at_85%_20%,rgba(6,182,212,0.12),transparent_24%),radial-gradient(circle_at_50%_85%,rgba(139,92,246,0.09),transparent_27%)]" />

        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:72px_72px]" />

        <motion.div
          className="absolute left-[-10rem] top-[12rem] h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-[110px]"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.08, 0.97, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-[-9rem] top-[30rem] h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-[115px]"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 25, -20, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-[-8rem] left-[35%] h-[24rem] w-[24rem] rounded-full bg-violet-500/10 blur-[105px]"
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -15, 20, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <motion.header
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#070b16]/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-8">
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="group flex items-center gap-3"
          >
            <motion.div
              whileHover={{
                rotate: 5,
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10 shadow-[0_0_32px_rgba(99,102,241,0.18)]"
            >
              <Command className="h-5 w-5 text-indigo-300" />
            </motion.div>

            <div className="text-left">
              <div className="text-lg font-black tracking-tight text-white">
                EventDevX
              </div>

              <div className="text-[9px] font-bold uppercase tracking-[0.23em] text-slate-500">
                Community Infrastructure
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-7 xl:flex">
            <button
              type="button"
              onClick={() => scrollTo("platform")}
              className="text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              Platform
            </button>

            <button
              type="button"
              onClick={() => scrollTo("events-preview")}
              className="text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              Events
            </button>

            <button
              type="button"
              onClick={() => scrollTo("projects-preview")}
              className="text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              Projects
            </button>

            <button
              type="button"
              onClick={() => scrollTo("community-preview")}
              className="text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              Community
            </button>

            <button
              type="button"
              onClick={() => scrollTo("infrastructure-preview")}
              className="text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              Infrastructure
            </button>

            <button
              type="button"
              onClick={() => goTo("/analytics")}
              className="text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              Analytics
            </button>
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <motion.button
              type="button"
              onClick={goToLogin}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-bold text-white transition hover:border-indigo-400/30 hover:bg-white/[0.06]"
            >
              <LockKeyhole className="h-4 w-4" />
              Login
            </motion.button>

            <motion.button
              type="button"
              onClick={goToDashboard}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/20 bg-indigo-500 px-4 py-2.5 text-sm font-black text-white shadow-[0_12px_35px_rgba(99,102,241,0.24)] transition hover:bg-indigo-400"
            >
              {user ? "Open Dashboard" : "Launch Platform"}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Open navigation"
            className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white sm:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            className="border-t border-white/10 bg-[#070b16]/98 px-5 py-5 backdrop-blur-xl sm:hidden"
          >
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => scrollTo("platform")}
                className="text-left text-sm font-bold text-slate-300"
              >
                Platform
              </button>

              <button
                type="button"
                onClick={() => scrollTo("events-preview")}
                className="text-left text-sm font-bold text-slate-300"
              >
                Events
              </button>

              <button
                type="button"
                onClick={() => scrollTo("projects-preview")}
                className="text-left text-sm font-bold text-slate-300"
              >
                Projects
              </button>

              <button
                type="button"
                onClick={() => scrollTo("community-preview")}
                className="text-left text-sm font-bold text-slate-300"
              >
                Community
              </button>

              <button
                type="button"
                onClick={() => goTo("/analytics")}
                className="text-left text-sm font-bold text-slate-300"
              >
                Analytics
              </button>

              <button
                type="button"
                onClick={() => goTo("/certificates")}
                className="text-left text-sm font-bold text-slate-300"
              >
                Certificate Studio
              </button>

              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={goToLogin}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={goToDashboard}
                  className="rounded-xl bg-indigo-500 px-4 py-3 text-sm font-black"
                >
                  Launch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      <main className="relative z-10">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          id="home"
          className="relative min-h-screen overflow-hidden pt-28"
        >
          <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1400px] items-center gap-16 px-5 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-24">
            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.85,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-indigo-200">
                <Sparkles className="h-4 w-4" />
                Premium Community Infrastructure
              </div>

              <h1 className="max-w-5xl text-[3.2rem] font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl xl:text-[5.65rem]">
                Run events.
                <span className="block bg-gradient-to-r from-indigo-300 via-sky-300 to-white bg-clip-text text-transparent">
                  Build the network.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                EventDevX brings events, projects, community, analytics,
                infrastructure and certificates into one connected platform.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <motion.button
                  type="button"
                  onClick={goToDashboard}
                  whileHover={{
                    y: -3,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-indigo-400/20 bg-indigo-500 px-7 py-4 font-black text-white shadow-[0_20px_55px_rgba(99,102,241,0.25)] transition hover:bg-indigo-400"
                >
                  {user ? "Open Dashboard" : "Enter EventDevX"}
                  <ArrowRight className="h-5 w-5" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => scrollTo("platform")}
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-4 font-bold text-white transition hover:bg-white/[0.07]"
                >
                  See the Platform
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="text-3xl font-black text-white">
                    1,284+
                  </div>

                  <div className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-600">
                    Community Members
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <Activity className="h-3.5 w-3.5" />
                    Network active
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="text-3xl font-black text-white">
                    42
                  </div>

                  <div className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-600">
                    Active Events
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-sky-300">
                    <Zap className="h-3.5 w-3.5" />
                    9 live now
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="text-3xl font-black text-white">
                    8,342
                  </div>

                  <div className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-600">
                    Certificates
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Award className="h-3.5 w-3.5" />
                    Issued outcomes
                  </div>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                3D DASHBOARD PREVIEW
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.85,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotateY: [0, -1.2, 0],
                  rotateX: [0, 1, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                className="relative"
              >
                <div className="absolute -inset-3 rounded-[2.5rem] bg-indigo-500/5 blur-2xl" />

                <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.035] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                  <div className="rounded-[1.6rem] border border-white/10 bg-[#0b1020] p-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-600">
                          EventDevX Control
                        </div>

                        <div className="mt-1 text-lg font-black text-white">
                          Operational Overview
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Online
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-600">
                            Members
                          </span>

                          <Users className="h-4 w-4 text-indigo-300" />
                        </div>

                        <div className="mt-3 text-3xl font-black text-white">
                          1,284
                        </div>

                        <div className="mt-1 text-xs font-bold text-emerald-300">
                          +12%
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-600">
                            Live Events
                          </span>

                          <CalendarDays className="h-4 w-4 text-cyan-300" />
                        </div>

                        <div className="mt-3 text-3xl font-black text-white">
                          42
                        </div>

                        <div className="mt-1 text-xs font-bold text-cyan-300">
                          9 live
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-black text-white">
                            Platform Engagement
                          </div>

                          <div className="mt-1 text-xs text-slate-600">
                            Current community activity
                          </div>
                        </div>

                        <Gauge className="h-5 w-5 text-indigo-300" />
                      </div>

                      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{
                            width: "0%",
                          }}
                          animate={{
                            width: "87%",
                          }}
                          transition={{
                            duration: 1.2,
                            delay: 0.65,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-400 to-cyan-400"
                        />
                      </div>

                      <div className="mt-2 flex justify-between text-xs">
                        <span className="font-bold text-slate-600">
                          Engagement
                        </span>

                        <span className="font-black text-white">
                          87%
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4 text-sky-300" />

                          <span className="text-xs font-bold text-slate-600">
                            Uptime
                          </span>
                        </div>

                        <div className="mt-3 text-xl font-black text-white">
                          99.9%
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-amber-300" />

                          <span className="text-xs font-bold text-slate-600">
                            Success
                          </span>
                        </div>

                        <div className="mt-3 text-xl font-black text-white">
                          92%
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-2">
                          <FolderKanban className="h-4 w-4 text-violet-300" />

                          <span className="text-xs font-bold text-slate-600">
                            Projects
                          </span>
                        </div>

                        <div className="mt-3 text-xl font-black text-white">
                          6
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-amber-300" />

                          <span className="text-xs font-bold text-slate-600">
                            Certificates
                          </span>
                        </div>

                        <div className="mt-3 text-xl font-black text-white">
                          8,342
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-indigo-400/10 bg-indigo-500/[0.05] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                          <Activity className="h-5 w-5 text-indigo-300" />
                        </div>

                        <div>
                          <div className="text-sm font-black text-white">
                            Live Infrastructure Feed
                          </div>

                          <div className="mt-1 text-xs text-slate-600">
                            Connected services are healthy
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.75,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 1,
                  duration: 0.55,
                }}
                className="absolute -bottom-8 -left-6 hidden rounded-2xl border border-white/10 bg-[#0c1223]/95 p-4 shadow-2xl backdrop-blur-xl md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  </div>

                  <div>
                    <div className="text-sm font-black text-white">
                      Infrastructure ready
                    </div>

                    <div className="mt-1 text-xs text-slate-600">
                      All core systems operational
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            QUICK MODULE STRIP
        ====================================================== */}

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-[1400px] px-5 py-8 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-between">
              {PLATFORM_ITEMS.map((item, index) => {
                const Icon = item.icon;
                const colors = colorMap[item.accent];

                return (
                  <button
                    type="button"
                    key={item.key}
                    onClick={() => goTo(item.href)}
                    className={`group flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1020] px-4 py-3 transition ${colors.hover}`}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border ${colors.icon}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="text-left">
                      <div className="text-xs font-black text-white">
                        {item.shortTitle}
                      </div>

                      <div className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-600">
                        {index + 1}
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-slate-300" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            PLATFORM
        ====================================================== */}

        <section
          id="platform"
          className="mx-auto max-w-[1400px] px-5 py-28 lg:px-8"
        >
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-indigo-300">
              EventDevX Platform
            </div>

            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
              Everything important,
              <span className="block text-slate-500">
                in one place.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              Each part of the platform has a clear role. Open the one you
              need and work there.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {PLATFORM_ITEMS.map((item, index) => {
              const Icon = item.icon;
              const colors = colorMap[item.accent];
              const active = activePlatform === index;

              return (
                <motion.article
                  key={item.key}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.14,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  onMouseEnter={() => setActivePlatform(index)}
                  onFocus={() => setActivePlatform(index)}
                  whileHover={{
                    y: -8,
                    rotateX: 1.5,
                    rotateY: -1.5,
                  }}
                  style={{
                    transformPerspective: 1200,
                  }}
                  className={`group relative overflow-hidden rounded-[1.8rem] border p-7 transition ${
                    active
                      ? `border-white/15 bg-white/[0.045] ${colors.hover}`
                      : "border-white/10 bg-white/[0.025]"
                  }`}
                >
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${colors.icon}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      <div className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-slate-600">
                        Module {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="mt-7">
                      <div className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-600">
                        {item.shortTitle}
                      </div>

                      <h3 className="mt-2 text-2xl font-black text-white">
                        {item.title}
                      </h3>

                      <p className="mt-3 min-h-[82px] text-sm leading-7 text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-7 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-3xl font-black text-white">
                          {item.count}
                        </div>

                        <div className="mt-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-600">
                          {item.countLabel}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => goTo(item.href)}
                        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-black transition ${colors.button}`}
                      >
                        {item.buttonLabel}
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            EVENT PREVIEW
        ====================================================== */}

        <section
          id="events-preview"
          className="border-y border-white/10 bg-white/[0.02]"
        >
          <div className="mx-auto max-w-[1400px] px-5 py-28 lg:px-8">
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-indigo-300">
                  Events Arena
                </div>

                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  See what is happening.
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-400">
                  Active hackathons, college programs, conferences, summits
                  and workshops from the EventDevX network.
                </p>
              </div>

              <button
                type="button"
                onClick={() => goTo("/events")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-5 py-3 text-sm font-black text-indigo-200 transition hover:bg-indigo-500/20"
              >
                View All Events
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-9 flex flex-wrap gap-2">
              {[
                {
                  label: "All",
                  value: "all" as const,
                },
                {
                  label: "Live",
                  value: "live" as const,
                },
                {
                  label: "Pending",
                  value: "pending" as const,
                },
                {
                  label: "Upcoming",
                  value: "upcoming" as const,
                },
              ].map((item) => (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => setEventFilter(item.value)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.13em] transition ${
                    eventFilter === item.value
                      ? "border-indigo-400/25 bg-indigo-500/10 text-indigo-200"
                      : "border-white/10 bg-white/[0.02] text-slate-600 hover:text-slate-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event, index) => {
                const Icon = event.icon;

                return (
                  <motion.article
                    key={event.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.14,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                    }}
                    whileHover={{
                      y: -7,
                    }}
                    className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0b1020]"
                  >
                    <div
                      className={`relative h-40 overflow-hidden bg-gradient-to-br ${event.gradient} p-5`}
                    >
                      <div className="absolute right-[-1.5rem] top-[-1.5rem] h-32 w-32 rounded-full bg-white/10" />

                      <div className="relative flex h-full flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                            <Icon className="h-5 w-5 text-white" />
                          </div>

                          <span
                            className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] ${getEventStatusClass(
                              event.status
                            )}`}
                          >
                            {getEventStatusText(event.status)}
                          </span>
                        </div>

                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.13em] text-white/70">
                            {event.type}
                          </div>

                          <h3 className="mt-1 text-xl font-black text-white">
                            {event.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="min-h-[72px] text-sm leading-6 text-slate-500">
                        {event.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-slate-600" />

                          <span className="text-xs font-bold text-slate-500">
                            {event.participants.toLocaleString("en-IN")}
                            {" "}participants
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => goTo("/events")}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/10 bg-indigo-500/5 px-3 py-2 text-[10px] font-black text-indigo-300 transition hover:bg-indigo-500/10"
                        >
                          Open
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            PROJECTS
        ====================================================== */}

        <section
          id="projects-preview"
          className="mx-auto max-w-[1400px] px-5 py-28 lg:px-8"
        >
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-cyan-300">
                Live Projects
              </div>

              <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                Build work with visible progress.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-400">
                See what teams are building and where each project stands.
              </p>
            </div>

            <button
              type="button"
              onClick={() => goTo("/projects")}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-5 py-3 text-sm font-black text-cyan-200 transition hover:bg-cyan-500/20"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {PROJECTS.map((project, index) => {
              const Icon = project.icon;

              return (
                <motion.article
                  key={project.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.14,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                  className="rounded-[1.7rem] border border-white/10 bg-[#0b1020] p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-slate-600">
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-6 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-300">
                    {project.type}
                  </div>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    {project.name}
                  </h3>

                  <p className="mt-3 min-h-[74px] text-sm leading-6 text-slate-500">
                    {project.description}
                  </p>

                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600">
                        Progress
                      </span>

                      <span className="text-xs font-black text-white">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{
                          width: "0%",
                        }}
                        whileInView={{
                          width: `${project.progress}%`,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.9,
                          delay: 0.2,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => goTo("/projects")}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-cyan-400/10 bg-cyan-500/5 px-4 py-2.5 text-xs font-black text-cyan-300 transition hover:bg-cyan-500/10"
                  >
                    Open Projects
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            COMMUNITY
        ====================================================== */}

        <section
          id="community-preview"
          className="border-y border-white/10 bg-white/[0.02]"
        >
          <div className="mx-auto max-w-[1400px] px-5 py-28 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div>
                <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-violet-300">
                  Global Collective
                </div>

                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  People are the network.
                </h2>

                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
                  Organizers, campus groups, developers, partners and sponsors
                  build the EventDevX community together.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-5">
                    <div className="text-3xl font-black text-white">
                      1,284+
                    </div>

                    <div className="mt-1 text-[9px] font-black uppercase tracking-[0.13em] text-slate-600">
                      Members
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-5">
                    <div className="text-3xl font-black text-white">
                      4,120
                    </div>

                    <div className="mt-1 text-[9px] font-black uppercase tracking-[0.13em] text-slate-600">
                      Top points
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-5">
                    <div className="text-3xl font-black text-white">
                      42
                    </div>

                    <div className="mt-1 text-[9px] font-black uppercase tracking-[0.13em] text-slate-600">
                      Events
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#0b1020] p-5">
                    <div className="text-3xl font-black text-white">
                      156
                    </div>

                    <div className="mt-1 text-[9px] font-black uppercase tracking-[0.13em] text-slate-600">
                      Project nodes
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => goTo("/community")}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500 px-5 py-3.5 text-sm font-black text-white shadow-[0_12px_35px_rgba(139,92,246,0.18)] transition hover:bg-violet-400"
                >
                  Open Global Collective
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-3">
                {COMMUNITY_MEMBERS.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.12,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.04,
                    }}
                    whileHover={{
                      x: 5,
                    }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0b1020] p-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-sm font-black text-violet-200">
                      {member.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-black text-white">
                          {member.name}
                        </h3>

                        <span
                          className={`rounded-full border px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.1em] ${getLevelClass(
                            member.level
                          )}`}
                        >
                          {member.level}
                        </span>
                      </div>

                      <div className="mt-1 truncate text-xs font-semibold text-slate-600">
                        {member.role}
                      </div>
                    </div>

                    <div className="hidden text-right sm:block">
                      <div className="text-sm font-black text-white">
                        {member.points.toLocaleString("en-IN")}
                      </div>

                      <div className="text-[8px] font-black uppercase tracking-[0.1em] text-slate-700">
                        points
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-700" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ACTIVITY
        ====================================================== */}

        <section className="mx-auto max-w-[1400px] px-5 py-28 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-indigo-300">
              Live Activity
            </div>

            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Know what changed.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              Important event, community, project and infrastructure activity
              stays visible.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-white/10 bg-[#0b1020] p-4 md:p-6">
            {ACTIVITIES.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.id}
                  className={`flex gap-4 p-5 ${
                    index !== ACTIVITIES.length - 1
                      ? "border-b border-white/5"
                      : ""
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${activity.iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-black text-white">
                        {activity.title}
                      </h3>

                      <span className="text-xs font-bold text-slate-700">
                        {activity.time}
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {activity.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            INFRASTRUCTURE
        ====================================================== */}

        <section
          id="infrastructure-preview"
          className="border-y border-white/10 bg-white/[0.02]"
        >
          <div className="mx-auto max-w-[1400px] px-5 py-28 lg:px-8">
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-orange-300">
                  Infrastructure Hub
                </div>

                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  Keep the event technology ready.
                </h2>

                <p className="mt-5 text-lg leading-8 text-slate-400">
                  Connectivity, check-in hardware and event technology
                  resources remain visible from one place.
                </p>
              </div>

              <button
                type="button"
                onClick={() => goTo("/infrastructure")}
                className="inline-flex items-center gap-2 rounded-xl border border-orange-400/20 bg-orange-500/10 px-5 py-3 text-sm font-black text-orange-200 transition hover:bg-orange-500/20"
              >
                Open Infrastructure Hub
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {INFRASTRUCTURE.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.13,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.04,
                    }}
                    whileHover={{
                      y: -7,
                    }}
                    className="rounded-[1.7rem] border border-white/10 bg-[#0b1020] p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">
                        <Icon className="h-6 w-6 text-orange-300" />
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-black text-white">
                          {item.value}
                        </div>

                        <div className="text-[9px] font-black uppercase tracking-[0.12em] text-slate-700">
                          {item.label}
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-6 text-xl font-black text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-6">
                      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.12em]">
                        <span className="text-slate-700">
                          Availability
                        </span>

                        <span className="text-slate-500">
                          {item.percentage}%
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{
                            width: "0%",
                          }}
                          whileInView={{
                            width: `${item.percentage}%`,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 0.1,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => goTo("/infrastructure")}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl border border-orange-400/10 bg-orange-500/5 px-4 py-2.5 text-xs font-black text-orange-300 transition hover:bg-orange-500/10"
                    >
                      Open Hub
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            ANALYTICS
        ====================================================== */}

        <section className="mx-auto max-w-[1400px] px-5 py-28 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-emerald-300">
                Analytics
              </div>

              <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                Measure the platform.
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
                See the numbers behind registrations, engagement, performance
                and event outcomes.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {METRICS.map((metric) => {
                  const Icon = metric.icon;

                  return (
                    <div
                      key={metric.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                    >
                      <Icon className="h-5 w-5 text-emerald-300" />

                      <div className="mt-4 text-2xl font-black text-white">
                        {metric.value}
                      </div>

                      <div className="mt-1 text-xs font-black text-slate-300">
                        {metric.title}
                      </div>

                      <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-700">
                        {metric.detail}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => goTo("/analytics")}
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-3.5 text-sm font-black text-emerald-200 transition hover:bg-emerald-500/20"
              >
                Open Analytics
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#0b1020] p-5 md:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-700">
                    Registration Activity
                  </div>

                  <div className="mt-1 text-xl font-black text-white">
                    2026 Monthly Trend
                  </div>
                </div>

                <BarChart3 className="h-5 w-5 text-emerald-300" />
              </div>

              <div className="mt-10 flex h-[260px] items-end gap-2 sm:gap-3">
                {[
                  1240,
                  1580,
                  1020,
                  1920,
                  1470,
                  2030,
                  1690,
                  2260,
                  1800,
                  1350,
                  1130,
                  900,
                ].map((value, index) => {
                  const height = Math.max(
                    15,
                    Math.round((value / 2260) * 100)
                  );

                  const month = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ][index];

                  return (
                    <div
                      key={month}
                      className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
                    >
                      <motion.div
                        initial={{
                          height: "0%",
                        }}
                        whileInView={{
                          height: `${height}%`,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.04,
                        }}
                        className="w-full rounded-t-xl bg-gradient-to-t from-emerald-500/60 to-cyan-400/80"
                      />

                      <span className="text-[8px] font-bold text-slate-700">
                        {month}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-xl border border-white/5 bg-white/[0.025] p-4">
                  <div className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-700">
                    Retention
                  </div>

                  <div className="mt-2 text-xl font-black text-white">
                    87%
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.025] p-4">
                  <div className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-700">
                    Success
                  </div>

                  <div className="mt-2 text-xl font-black text-white">
                    92%
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.025] p-4">
                  <div className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-700">
                    Uptime
                  </div>

                  <div className="mt-2 text-xl font-black text-white">
                    99.9%
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.025] p-4">
                  <div className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-700">
                    Validity
                  </div>

                  <div className="mt-2 text-xl font-black text-white">
                    100%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CERTIFICATES
        ====================================================== */}

        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-[1400px] px-5 py-28 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-amber-300">
                  Certificate Studio
                </div>

                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  Give every achievement a proper result.
                </h2>

                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
                  Build certificates for participants, winners and community
                  contributors with a clean EventDevX identity.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    "Classic certificate layout",
                    "Gold achievement layout",
                    "Dark technology layout",
                    "Certificate ID generation",
                    "PNG output",
                    "Bulk certificate workflow",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />

                      <span className="text-sm font-bold text-slate-400">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => goTo("/certificates")}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-500 px-5 py-3.5 text-sm font-black text-slate-950 shadow-[0_12px_35px_rgba(245,158,11,0.20)] transition hover:bg-amber-400"
                >
                  Open Certificate Studio
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <motion.div
                  whileHover={{
                    y: -8,
                    rotateX: 2,
                    rotateY: -2,
                  }}
                  style={{
                    transformPerspective: 1000,
                  }}
                  className="rounded-[1.6rem] border border-white/10 bg-[#0b1020] p-4"
                >
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-200 to-white p-4">
                    <div className="flex h-full flex-col justify-between rounded-xl border border-slate-300 p-4 text-slate-800">
                      <div className="flex justify-between">
                        <Award className="h-5 w-5" />

                        <span className="text-[8px] font-black">
                          EVENTDEVX
                        </span>
                      </div>

                      <div className="text-center">
                        <div className="text-[8px] font-black uppercase tracking-[0.15em]">
                          Certificate of Achievement
                        </div>

                        <div className="mt-3 text-sm font-black">
                          Participant Name
                        </div>

                        <div className="mx-auto mt-2 h-px w-20 bg-slate-400" />

                        <div className="mt-2 text-[7px] font-bold">
                          Event / Hackathon
                        </div>
                      </div>

                      <div className="flex justify-between text-[7px] font-black">
                        <span>2026</span>
                        <span>EDVX-ID</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm font-black text-white">
                    Classic
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -8,
                    rotateX: 2,
                    rotateY: 2,
                  }}
                  style={{
                    transformPerspective: 1000,
                  }}
                  className="rounded-[1.6rem] border border-white/10 bg-[#0b1020] p-4"
                >
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-amber-100 via-white to-yellow-50 p-4">
                    <div className="flex h-full flex-col justify-between rounded-xl border border-amber-300 p-4 text-slate-800">
                      <div className="flex justify-between">
                        <Trophy className="h-5 w-5 text-amber-600" />

                        <span className="text-[8px] font-black">
                          EVENTDEVX
                        </span>
                      </div>

                      <div className="text-center">
                        <div className="text-[8px] font-black uppercase tracking-[0.15em]">
                          Gold Achievement
                        </div>

                        <div className="mt-3 text-sm font-black">
                          Winner Name
                        </div>

                        <div className="mx-auto mt-2 h-px w-20 bg-amber-400" />

                        <div className="mt-2 text-[7px] font-bold">
                          Indo-Hack 2026
                        </div>
                      </div>

                      <div className="flex justify-between text-[7px] font-black">
                        <span>1st Place</span>
                        <span>EDVX-ID</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm font-black text-white">
                    Gold
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -8,
                    rotateX: 2,
                    rotateY: -2,
                  }}
                  style={{
                    transformPerspective: 1000,
                  }}
                  className="rounded-[1.6rem] border border-white/10 bg-[#0b1020] p-4"
                >
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-950 to-indigo-950 p-4">
                    <div className="flex h-full flex-col justify-between rounded-xl border border-indigo-400/20 p-4 text-white">
                      <div className="flex justify-between">
                        <ShieldCheck className="h-5 w-5 text-indigo-300" />

                        <span className="text-[8px] font-black">
                          EVENTDEVX
                        </span>
                      </div>

                      <div className="text-center">
                        <div className="text-[8px] font-black uppercase tracking-[0.15em] text-indigo-300">
                          Verified Certificate
                        </div>

                        <div className="mt-3 text-sm font-black">
                          Participant Name
                        </div>

                        <div className="mx-auto mt-2 h-px w-20 bg-indigo-400/40" />

                        <div className="mt-2 text-[7px] font-bold text-slate-400">
                          Technology Event
                        </div>
                      </div>

                      <div className="flex justify-between text-[7px] font-black text-slate-400">
                        <span>2026</span>
                        <span>EDVX-ID</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm font-black text-white">
                    Dark
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SETTINGS / NOTIFICATIONS QUICK ACCESS
        ====================================================== */}

        <section className="mx-auto max-w-[1400px] px-5 py-24 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <motion.button
              type="button"
              onClick={() => goTo("/settings")}
              whileHover={{
                y: -5,
              }}
              className="group rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-7 text-left transition hover:border-slate-500/30 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-400/10 bg-slate-400/5">
                  <Settings className="h-6 w-6 text-slate-300" />
                </div>

                <ArrowUpRight className="h-5 w-5 text-slate-700 transition group-hover:text-slate-300" />
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Settings
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                Manage your EventDevX account, notifications and platform
                preferences.
              </p>

              <div className="mt-6 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Open Settings
              </div>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => goTo("/notifications")}
              whileHover={{
                y: -5,
              }}
              className="group rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-7 text-left transition hover:border-rose-400/25 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-400/10 bg-rose-500/5">
                  <Bell className="h-6 w-6 text-rose-300" />
                </div>

                <ArrowUpRight className="h-5 w-5 text-slate-700 transition group-hover:text-slate-300" />
              </div>

              <h3 className="mt-6 text-2xl font-black text-white">
                Notifications
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                See partner requests, event alerts, infrastructure warnings
                and recent platform activity.
              </p>

              <div className="mt-6 text-xs font-black uppercase tracking-[0.12em] text-rose-300">
                Open Notifications
              </div>
            </motion.button>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-[1400px] px-5 py-28 lg:px-8">
            <div className="relative overflow-hidden rounded-[2.6rem] border border-indigo-400/20 bg-gradient-to-br from-indigo-500/[0.13] via-white/[0.025] to-cyan-500/[0.06] px-7 py-16 md:px-14 md:py-20 lg:px-20">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />

              <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative mx-auto max-w-4xl text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10">
                  <Rocket className="h-6 w-6 text-indigo-300" />
                </div>

                <div className="mt-6 text-xs font-black uppercase tracking-[0.24em] text-indigo-300">
                  EventDevX
                </div>

                <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
                  Your next event starts here.
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                  Run the event. Build the project. Grow the community.
                  Measure the work. Issue the certificate.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <motion.button
                    type="button"
                    onClick={() => goTo("/events")}
                    whileHover={{
                      y: -3,
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-indigo-400/20 bg-indigo-500 px-7 py-4 font-black text-white shadow-[0_18px_50px_rgba(99,102,241,0.24)] transition hover:bg-indigo-400"
                  >
                    Open Events Arena
                    <CalendarDays className="h-5 w-5" />
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => goTo("/certificates")}
                    whileHover={{
                      y: -3,
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/20 bg-amber-500 px-7 py-4 font-black text-slate-950 shadow-[0_18px_50px_rgba(245,158,11,0.18)] transition hover:bg-amber-400"
                  >
                    Open Certificate Studio
                    <Award className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10">
                  <Command className="h-5 w-5 text-indigo-300" />
                </div>

                <div>
                  <div className="text-lg font-black text-white">
                    EventDevX
                  </div>

                  <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-700">
                    Community Infrastructure Platform
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
                Events, projects, community, analytics, infrastructure and
                certificates — connected in one platform.
              </p>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-700">
                Platform
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => goTo("/events")}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Events Arena
                </button>

                <button
                  type="button"
                  onClick={() => goTo("/projects")}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Live Projects
                </button>

                <button
                  type="button"
                  onClick={() => goTo("/community")}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Global Collective
                </button>

                <button
                  type="button"
                  onClick={() => goTo("/analytics")}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Analytics
                </button>
              </div>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-700">
                Tools
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => goTo("/infrastructure")}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Infrastructure Hub
                </button>

                <button
                  type="button"
                  onClick={() => goTo("/certificates")}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Certificate Studio
                </button>

                <button
                  type="button"
                  onClick={() => goTo("/notifications")}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Notifications
                </button>

                <button
                  type="button"
                  onClick={() => goTo("/settings")}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Settings
                </button>
              </div>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-700">
                Access
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={goToLogin}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={goToDashboard}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Dashboard
                </button>

                <button
                  type="button"
                  onClick={() => goTo("/privacy-policy")}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Privacy Policy
                </button>

                <button
                  type="button"
                  onClick={() => goTo("/terms-of-service")}
                  className="text-left text-sm font-semibold text-slate-500 transition hover:text-white"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-6">
            <div className="flex flex-col gap-3 text-xs text-slate-700 sm:flex-row sm:items-center sm:justify-between">
              <span>
                © {new Date().getFullYear()} EventDevX. All rights reserved.
              </span>

              <span>
                Built for the next generation of event infrastructure.
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================
          MOBILE BOTTOM ACTION BAR
      ====================================================== */}

      <div className="fixed bottom-3 left-1/2 z-40 flex w-[calc(100%-1.25rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-[#0b1020]/95 p-2 shadow-2xl backdrop-blur-xl sm:hidden">
        <button
          type="button"
          onClick={() => goTo("/events")}
          className="flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 text-slate-500 transition hover:bg-indigo-500/10 hover:text-indigo-300"
        >
          <CalendarDays className="h-5 w-5" />
          <span className="text-[8px] font-black uppercase tracking-[0.08em]">
            Events
          </span>
        </button>

        <button
          type="button"
          onClick={() => goTo("/projects")}
          className="flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 text-slate-500 transition hover:bg-cyan-500/10 hover:text-cyan-300"
        >
          <FolderKanban className="h-5 w-5" />
          <span className="text-[8px] font-black uppercase tracking-[0.08em]">
            Projects
          </span>
        </button>

        <button
          type="button"
          onClick={() => goTo("/community")}
          className="flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 text-slate-500 transition hover:bg-violet-500/10 hover:text-violet-300"
        >
          <Users className="h-5 w-5" />
          <span className="text-[8px] font-black uppercase tracking-[0.08em]">
            Network
          </span>
        </button>

        <button
          type="button"
          onClick={() => goTo("/certificates")}
          className="flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 text-slate-500 transition hover:bg-amber-500/10 hover:text-amber-300"
        >
          <Award className="h-5 w-5" />
          <span className="text-[8px] font-black uppercase tracking-[0.08em]">
            Certs
          </span>
        </button>

        <button
          type="button"
          onClick={goToLogin}
          className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-indigo-500 px-3 py-2 text-white"
        >
          <LockKeyhole className="h-5 w-5" />
          <span className="text-[8px] font-black uppercase tracking-[0.08em]">
            Login
          </span>
        </button>
      </div>
    </div>
  );
};

export default Landing;