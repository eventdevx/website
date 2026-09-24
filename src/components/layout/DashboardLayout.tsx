import {
  ReactNode,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
} from "lucide-react";

import PageMotion from "@/components/layout/PageMotion";
import {
  Loader2,
  Menu,
  X,
  LayoutDashboard,
  Calendar,
  FolderKanban,
  Users,
  BarChart3,
  Server,
  Award,
  Settings,
  LogOut,
  User,
  Bell,
  Sparkles,
  ChevronDown,
  PlusCircle,
  ShieldCheck,
  Globe2,
  Activity,
  MessageSquare,
  TicketCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  useAuth,
} from "@/contexts/AuthContext";

import {
  Button,
} from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Badge,
} from "@/components/ui/badge";

import {
  NotificationBell,
} from "@/components/notifications/NotificationBell";

import {
  PWAInstallBanner,
} from "@/components/layout/PWAInstallBanner";


/* ============================================================
   EVENTDEVX NAVIGATION TYPES
   ============================================================ */

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: number;
}


/* ============================================================
   EVENTDEVX NAVIGATION ITEMS
   ============================================================ */

const navItems: NavItem[] = [

  {
    label: "Overview",
    href: "/dashboard",
    icon: (
      <LayoutDashboard
        className="h-5 w-5"
      />
    ),
  },

  {
    label: "Events",
    href: "/events",
    icon: (
      <Calendar
        className="h-5 w-5"
      />
    ),
    badge: 42,
  },

  {
    label: "Live Projects",
    href: "/projects",
    icon: (
      <FolderKanban
        className="h-5 w-5"
      />
    ),
  },

  {
    label: "Global Network",
    href: "/community",
    icon: (
      <Users
        className="h-5 w-5"
      />
    ),
  },

  {
    label: "Analytics",
    href: "/analytics",
    icon: (
      <BarChart3
        className="h-5 w-5"
      />
    ),
  },

  {
    label: "Infrastructure",
    href: "/infrastructure",
    icon: (
      <Server
        className="h-5 w-5"
      />
    ),
  },

  {
    label: "Certificates",
    href: "/certificates",
    icon: (
      <Award
        className="h-5 w-5"
      />
    ),
  },

  {
    label: "Settings",
    href: "/settings",
    icon: (
      <Settings
        className="h-5 w-5"
      />
    ),
  },

];


/* ============================================================
   DASHBOARD LAYOUT PROPS
   ============================================================ */

interface DashboardLayoutProps {
  children: ReactNode;
}


/* ============================================================
   DASHBOARD LAYOUT
   ============================================================ */

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {

  const reduceMotion = useReducedMotion();

  /* ==========================================================
     MOBILE SIDEBAR STATE
     ========================================================== */

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);


  /* ==========================================================
     ROUTER
     ========================================================== */

  const location = useLocation();

  const navigate = useNavigate();


  /* ==========================================================
     AUTH
     ========================================================== */

  const {
    user,
    signOut,
    isSigningOut,
  } = useAuth();


  /* ==========================================================
     CLOSE SIDEBAR
     ========================================================== */

  const closeSidebar = () => {

    setSidebarOpen(false);

  };


  /* ==========================================================
     OPEN SIDEBAR
     ========================================================== */

  const openSidebar = () => {

    setSidebarOpen(true);

  };


  /* ==========================================================
     SIGN OUT
     ========================================================== */

  const handleSignOut = async () => {

    try {

      await signOut();

      navigate("/auth");

    } catch (error) {

      console.error(
        "EventDevX logout failed:",
        error
      );

    }

  };


  /* ==========================================================
     USER NAME
     ========================================================== */

  const getUserName = () => {

    return (
      user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      user?.email?.split("@")[0] ||
      "EventDevX User"
    );

  };


  /* ==========================================================
     USER INITIALS
     ========================================================== */

  const getUserInitials = () => {

    const name =
      user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      user?.email ||
      "User";

    return name
      .split(" ")
      .filter(Boolean)
      .map(
        (
          part: string
        ) => part.charAt(0)
      )
      .join("")
      .toUpperCase()
      .slice(0, 2);

  };


  /* ==========================================================
     USER ROLE
     ========================================================== */

  const getUserRole = () => {

    const metadataRole =
      user?.user_metadata?.role;

    if (
      typeof metadataRole === "string" &&
      metadataRole.trim().length > 0
    ) {
      return metadataRole;
    }

    return "Community Member";

  };


  /* ==========================================================
     USER AVATAR
     ========================================================== */

  const getUserAvatar = () => {

    const avatar =
      user?.user_metadata?.avatar_url ||
      user?.user_metadata?.picture;

    if (
      typeof avatar === "string" &&
      avatar.trim().length > 0
    ) {
      return avatar;
    }

    return "";

  };


  /* ==========================================================
     PAGE TITLE
     ========================================================== */

  const getPageTitle = () => {

    if (
      location.pathname === "/dashboard"
    ) {
      return "Operational Overview";
    }

    if (
      location.pathname === "/events"
    ) {
      return "Events Arena";
    }

    if (
      location.pathname === "/projects"
    ) {
      return "Live Projects";
    }

    if (
      location.pathname === "/community"
    ) {
      return "Global Network";
    }

    if (
      location.pathname === "/analytics"
    ) {
      return "Event Analytics";
    }

    if (
      location.pathname === "/infrastructure"
    ) {
      return "Event Infrastructure";
    }

    if (
      location.pathname === "/certificates"
    ) {
      return "Certificates";
    }

    if (
      location.pathname === "/settings"
    ) {
      return "EventDevX Settings";
    }

    return "EventDevX";

  };


  /* ==========================================================
     PAGE SUBTITLE
     ========================================================== */

  const getPageSubtitle = () => {

    if (
      location.pathname === "/dashboard"
    ) {
      return "Monitoring real-time community engagement.";
    }

    if (
      location.pathname === "/events"
    ) {
      return "Create, manage and monitor your events.";
    }

    if (
      location.pathname === "/projects"
    ) {
      return "Track projects, teams and active initiatives.";
    }

    if (
      location.pathname === "/community"
    ) {
      return "Connect organizers, developers and community partners.";
    }

    if (
      location.pathname === "/analytics"
    ) {
      return "Understand event performance and community activity.";
    }

    if (
      location.pathname === "/infrastructure"
    ) {
      return "Manage event infrastructure and operational resources.";
    }

    if (
      location.pathname === "/certificates"
    ) {
      return "Create and manage participant certificates.";
    }

    if (
      location.pathname === "/settings"
    ) {
      return "Manage your EventDevX account and preferences.";
    }

    return "EventDevX community infrastructure.";

  };


  /* ==========================================================
     CURRENT DATE
     ========================================================== */

  const today = new Date();


  /* ==========================================================
     FORMAT WEEKDAY
     ========================================================== */

  const weekday = today.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
    }
  );


  /* ==========================================================
     FORMAT DATE
     ========================================================== */

  const formattedDate = today.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );


  /* ==========================================================
     BACK BUTTON
     ========================================================== */

  const handleBack = () => {

    if (location.key !== "default") {

      navigate(-1);

      return;

    }

    if (location.pathname === "/dashboard") {

      navigate("/");

      return;

    }

    navigate("/dashboard");

  };


  /* ==========================================================
     RETURN
     ========================================================== */

  return (

    <div
      className="
        min-h-screen
        min-w-0
        overflow-x-hidden
        bg-background
      "
    >


      {/* ======================================================
          MOBILE SIDEBAR OVERLAY
          ====================================================== */}

      {sidebarOpen && (

        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/30
            backdrop-blur-sm
            lg:hidden
          "
          onClick={closeSidebar}
        />

      )}


      {/* ======================================================
          SIDEBAR
          ====================================================== */}

      <aside
        className={cn(

          `
            fixed
            left-0
            top-0
            z-50
            h-full
            w-72
            transform
            bg-card
            shadow-xl
            transition-transform
            duration-300
            ease-in-out
            lg:translate-x-0
          `,

          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"

        )}
      >

        <div
          className="
            flex
            h-full
            flex-col
          "
        >


          {/* ==================================================
              SIDEBAR BRAND
              ================================================== */}

          <div
            className="
              flex
              h-20
              items-center
              justify-between
              border-b
              border-border
              px-6
            "
          >

            <Link
              to="/dashboard"
              onClick={closeSidebar}
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary
                  text-primary-foreground
                  shadow-md
                "
              >

                <Sparkles
                  className="
                    h-5
                    w-5
                  "
                />

              </div>


              <div
                className="
                  min-w-0
                "
              >

                <h1
                  className="
                    truncate
                    text-lg
                    font-extrabold
                    tracking-tight
                    text-foreground
                  "
                >
                  EventDevX
                </h1>

                <p
                  className="
                    truncate
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-primary
                  "
                >
                  Community Infrastructure
                </p>

              </div>

            </Link>


            {/* ==================================================
                MOBILE CLOSE
                ================================================== */}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={closeSidebar}
            >

              <X
                className="
                  h-5
                  w-5
                "
              />

            </Button>

          </div>


          {/* ==================================================
              SIDEBAR NAVIGATION
              ================================================== */}

          <nav
            className="
              flex-1
              overflow-y-auto
              px-4
              py-6
            "
          >

            {/* =================================================
                MAIN SECTION
                ================================================= */}

            <div
              className="
                px-3
                pb-3
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.13em]
                text-muted-foreground
              "
            >
              Main
            </div>


            <ul
              className="
                space-y-2
              "
            >

              {navItems.map(
                (item) => {

                  const isActive =
                    location.pathname ===
                    item.href;


                  return (

                    <li
                      key={item.href}
                    >

                      <Link
                        to={item.href}
                        onClick={closeSidebar}
                        className={cn(

                          `
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            text-sm
                            font-semibold
                            transition-all
                            duration-200
                          `,

                          isActive

                            ? `
                              bg-primary
                              text-primary-foreground
                              shadow-md
                            `

                            : `
                              text-muted-foreground
                              hover:bg-muted
                              hover:text-foreground
                            `

                        )}
                      >

                        {/* ==================================================
                            ICON
                            ================================================== */}

                        <span
                          className="
                            shrink-0
                          "
                        >
                          {item.icon}
                        </span>


                        {/* ==================================================
                            LABEL
                            ================================================== */}

                        <span
                          className="
                            min-w-0
                            flex-1
                            truncate
                          "
                        >
                          {item.label}
                        </span>


                        {/* ==================================================
                            BADGE
                            ================================================== */}

                        {typeof item.badge ===
                          "number" && (

                          <Badge
                            variant={
                              isActive
                                ? "secondary"
                                : "default"
                            }
                            className="
                              h-6
                              min-w-6
                              justify-center
                              rounded-full
                              px-2
                              text-[10px]
                            "
                          >
                            {item.badge}
                          </Badge>

                        )}

                      </Link>

                    </li>

                  );

                }
              )}

            </ul>


            {/* ==================================================
                COMMUNITY SECTION
                ================================================== */}

            <div
              className="
                mt-8
                px-3
                pb-3
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.13em]
                text-muted-foreground
              "
            >
              Community
            </div>


            <ul
              className="
                space-y-2
              "
            >

              <li>

                <Link
                  to="/community"
                  onClick={closeSidebar}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-muted-foreground
                    transition-all
                    duration-200
                    hover:bg-muted
                    hover:text-foreground
                  "
                >

                  <Users
                    className="
                      h-5
                      w-5
                      shrink-0
                    "
                  />

                  <span
                    className="
                      flex-1
                    "
                  >
                    Members
                  </span>

                </Link>

              </li>


              <li>

                <Link
                  to="/community"
                  onClick={closeSidebar}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-muted-foreground
                    transition-all
                    duration-200
                    hover:bg-muted
                    hover:text-foreground
                  "
                >

                  <Globe2
                    className="
                      h-5
                      w-5
                      shrink-0
                    "
                  />

                  <span
                    className="
                      flex-1
                    "
                  >
                    Global Nodes
                  </span>

                </Link>

              </li>


              <li>

                <Link
                  to="/community"
                  onClick={closeSidebar}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-muted-foreground
                    transition-all
                    duration-200
                    hover:bg-muted
                    hover:text-foreground
                  "
                >

                  <MessageSquare
                    className="
                      h-5
                      w-5
                      shrink-0
                    "
                  />

                  <span
                    className="
                      flex-1
                    "
                  >
                    Discussions
                  </span>

                </Link>

              </li>

            </ul>


            {/* ==================================================
                TOOLS SECTION
                ================================================== */}

            <div
              className="
                mt-8
                px-3
                pb-3
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.13em]
                text-muted-foreground
              "
            >
              Tools
            </div>


            <ul
              className="
                space-y-2
              "
            >

              <li>

                <Link
                  to="/events"
                  onClick={closeSidebar}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-muted-foreground
                    transition-all
                    duration-200
                    hover:bg-muted
                    hover:text-foreground
                  "
                >

                  <PlusCircle
                    className="
                      h-5
                      w-5
                      shrink-0
                    "
                  />

                  <span
                    className="
                      flex-1
                    "
                  >
                    Create Event
                  </span>

                </Link>

              </li>


              <li>

                <Link
                  to="/analytics"
                  onClick={closeSidebar}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-muted-foreground
                    transition-all
                    duration-200
                    hover:bg-muted
                    hover:text-foreground
                  "
                >

                  <Activity
                    className="
                      h-5
                      w-5
                      shrink-0
                    "
                  />

                  <span
                    className="
                      flex-1
                    "
                  >
                    Activity
                  </span>

                </Link>

              </li>


              <li>

                <Link
                  to="/certificates"
                  onClick={closeSidebar}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-muted-foreground
                    transition-all
                    duration-200
                    hover:bg-muted
                    hover:text-foreground
                  "
                >

                  <TicketCheck
                    className="
                      h-5
                      w-5
                      shrink-0
                    "
                  />

                  <span
                    className="
                      flex-1
                    "
                  >
                    Issue Certificate
                  </span>

                </Link>

              </li>

            </ul>

          </nav>


          {/* ==================================================
              SIDEBAR FOOTER
              ================================================== */}

          <div
            className="
              border-t
              border-border
              p-4
            "
          >

            {/* =================================================
                TRUST STATUS
                ================================================= */}

            <div
              className="
                mb-4
                rounded-2xl
                border
                border-primary/10
                bg-primary/5
                p-4
              "
            >

              <div
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                "
              >

                <ShieldCheck
                  className="
                    h-4
                    w-4
                    text-primary
                  "
                />

                <span
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.1em]
                    text-primary
                  "
                >
                  EventDevX Verified
                </span>

              </div>


              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-sm
                    font-bold
                    text-foreground
                  "
                >
                  Network Active
                </span>


                <span
                  className="
                    inline-flex
                    h-2
                    w-2
                    rounded-full
                    bg-emerald-500
                  "
                />

              </div>


              <p
                className="
                  mt-2
                  text-[11px]
                  leading-relaxed
                  text-muted-foreground
                "
              >
                Your EventDevX community node is
                connected and operational.
              </p>

            </div>


            {/* =================================================
                USER PROFILE
                ================================================= */}

            <Link
              to="/settings"
              onClick={closeSidebar}
              className="
                flex
                items-center
                gap-3
                rounded-xl
                bg-muted/50
                p-3
                transition-colors
                hover:bg-muted
              "
            >

              <Avatar
                className="
                  h-10
                  w-10
                  shrink-0
                "
              >

                <AvatarImage
                  src={getUserAvatar()}
                  alt={getUserName()}
                />

                <AvatarFallback>
                  {getUserInitials()}
                </AvatarFallback>

              </Avatar>


              <div
                className="
                  min-w-0
                  flex-1
                "
              >

                <p
                  className="
                    truncate
                    text-sm
                    font-bold
                    text-foreground
                  "
                >
                  {getUserName()}
                </p>

                <p
                  className="
                    truncate
                    text-xs
                    text-muted-foreground
                  "
                >
                  {getUserRole()}
                </p>

              </div>

            </Link>

          </div>

        </div>

      </aside>


      {/* ======================================================
          MAIN APPLICATION AREA
          ====================================================== */}

      <div
        className="
          min-w-0
          lg:pl-72
        "
      >


        {/* ====================================================
            TOP HEADER
            ==================================================== */}

        <motion.header
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: -12,
                }
          }
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          className="
            sticky
            top-0
            z-30
            flex
            h-20
            items-center
            justify-between
            border-b
            border-border
            bg-card/85
            px-4
            backdrop-blur-lg
            lg:px-8
          "
        >


          {/* ==================================================
              HEADER LEFT
              ================================================== */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-4
            "
          >

            {/* ==================================================
                MOBILE MENU BUTTON
                ================================================== */}

            <Button
              variant="ghost"
              size="icon"
              className="
                shrink-0
                lg:hidden
              "
              onClick={openSidebar}
            >

              <Menu
                className="
                  h-5
                  w-5
                "
              />

            </Button>


            {/* ==================================================
                BACK BUTTON
                ================================================== */}

            <motion.button
              type="button"
              onClick={handleBack}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      x: -1,
                      y: -1,
                      scale: 1.02,
                    }
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.96,
                    }
              }
              className="
                hidden
                h-9
                shrink-0
                items-center
                gap-2
                rounded-xl
                border
                border-border
                bg-background
                px-3
                text-xs
                font-bold
                text-muted-foreground
                shadow-sm
                transition-colors
                hover:border-primary/20
                hover:bg-primary/5
                hover:text-primary
                sm:inline-flex
                lg:h-10
                lg:px-3.5
                lg:text-sm
              "
              aria-label="Go back"
            >

              <ArrowLeft
                className="
                  h-4
                  w-4
                  shrink-0
                "
              />

              <span>
                Back
              </span>

            </motion.button>


            {/* ==================================================
                MOBILE BACK BUTTON
                ================================================== */}

            <motion.button
              type="button"
              onClick={handleBack}
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.92,
                    }
              }
              className="
                inline-flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-border
                bg-background
                text-muted-foreground
                shadow-sm
                transition-colors
                hover:border-primary/20
                hover:bg-primary/5
                hover:text-primary
                sm:hidden
              "
              aria-label="Go back"
            >

              <ArrowLeft
                className="
                  h-4
                  w-4
                "
              />

            </motion.button>


            {/* ==================================================
                PAGE TITLE
                ================================================== */}

            <div
              className="
                min-w-0
              "
            >

              <h1
                className="
                  truncate
                  text-lg
                  font-extrabold
                  tracking-tight
                  text-foreground
                  lg:text-xl
                "
              >
                {getPageTitle()}
              </h1>


              <p
                className="
                  truncate
                  text-xs
                  font-medium
                  text-muted-foreground
                  lg:text-sm
                "
              >
                {getPageSubtitle()}
              </p>

            </div>

          </div>


          {/* ==================================================
              HEADER RIGHT
              ================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
              lg:gap-3
            "
          >


            {/* ==================================================
                DATE DISPLAY
                ================================================== */}

            <div
              className="
                hidden
                rounded-xl
                border
                border-border
                bg-muted/50
                px-4
                py-2
                text-right
                md:block
              "
            >

              <p
                className="
                  text-xs
                  font-bold
                  text-foreground
                "
              >
                {weekday}
              </p>

              <p
                className="
                  text-[10px]
                  font-medium
                  text-muted-foreground
                "
              >
                {formattedDate}
              </p>

            </div>


            {/* ==================================================
                LIVE STATUS
                ================================================== */}

            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-emerald-200
                bg-emerald-50
                px-3
                py-2
                lg:flex
              "
            >

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-500
                "
              />

              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.08em]
                  text-emerald-700
                "
              >
                Network Live
              </span>

            </div>


            {/* ==================================================
                NOTIFICATIONS
                ================================================== */}

            <NotificationBell />


            {/* ==================================================
                SETTINGS BUTTON
                ================================================== */}

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="
                hidden
                lg:flex
              "
            >

              <Link
                to="/settings"
                title="Settings"
              >

                <Settings
                  className="
                    h-5
                    w-5
                  "
                />

              </Link>

            </Button>


            {/* ==================================================
                USER DROPDOWN
                ================================================== */}

            <DropdownMenu>

              <DropdownMenuTrigger
                asChild
              >

                <Button
                  variant="ghost"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    px-2
                    py-2
                    lg:px-3
                  "
                >

                  <Avatar
                    className="
                      h-8
                      w-8
                    "
                  >

                    <AvatarImage
                      src={getUserAvatar()}
                      alt={getUserName()}
                    />

                    <AvatarFallback>
                      {getUserInitials()}
                    </AvatarFallback>

                  </Avatar>


                  <div
                    className="
                      hidden
                      text-left
                      lg:block
                    "
                  >

                    <p
                      className="
                        max-w-24
                        truncate
                        text-xs
                        font-bold
                        text-foreground
                      "
                    >
                      {getUserName()}
                    </p>

                    <p
                      className="
                        max-w-24
                        truncate
                        text-[10px]
                        text-muted-foreground
                      "
                    >
                      {getUserRole()}
                    </p>

                  </div>


                  <ChevronDown
                    className="
                      hidden
                      h-4
                      w-4
                      text-muted-foreground
                      lg:block
                    "
                  />

                </Button>

              </DropdownMenuTrigger>


              {/* ==================================================
                  DROPDOWN CONTENT
                  ================================================== */}

              <DropdownMenuContent
                align="end"
                className="
                  w-64
                "
              >

                <DropdownMenuLabel>
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <Avatar
                      className="
                        h-9
                        w-9
                      "
                    >

                      <AvatarImage
                        src={getUserAvatar()}
                        alt={getUserName()}
                      />

                      <AvatarFallback>
                        {getUserInitials()}
                      </AvatarFallback>

                    </Avatar>


                    <div
                      className="
                        min-w-0
                      "
                    >

                      <p
                        className="
                          truncate
                          text-sm
                          font-bold
                        "
                      >
                        {getUserName()}
                      </p>

                      <p
                        className="
                          truncate
                          text-xs
                          font-normal
                          text-muted-foreground
                        "
                      >
                        {user?.email || ""}
                      </p>

                    </div>

                  </div>
                </DropdownMenuLabel>


                <DropdownMenuSeparator />


                {/* ==================================================
                    PROFILE
                    ================================================== */}

                <DropdownMenuItem
                  asChild
                >

                  <Link
                    to="/settings"
                  >

                    <User
                      className="
                        mr-2
                        h-4
                        w-4
                      "
                    />

                    Profile

                  </Link>

                </DropdownMenuItem>


                {/* ==================================================
                    NOTIFICATIONS
                    ================================================== */}

                <DropdownMenuItem
                  asChild
                >

                  <Link
                    to="/settings"
                  >

                    <Bell
                      className="
                        mr-2
                        h-4
                        w-4
                      "
                    />

                    Notifications

                  </Link>

                </DropdownMenuItem>


                {/* ==================================================
                    COMMUNITY
                    ================================================== */}

                <DropdownMenuItem
                  asChild
                >

                  <Link
                    to="/community"
                  >

                    <Users
                      className="
                        mr-2
                        h-4
                        w-4
                      "
                    />

                    Global Network

                  </Link>

                </DropdownMenuItem>


                {/* ==================================================
                    SETTINGS
                    ================================================== */}

                <DropdownMenuItem
                  asChild
                >

                  <Link
                    to="/settings"
                  >

                    <Settings
                      className="
                        mr-2
                        h-4
                        w-4
                      "
                    />

                    Account Settings

                  </Link>

                </DropdownMenuItem>


                {/* ==================================================
                    WHATS NEW
                    ================================================== */}

                <DropdownMenuItem
                  asChild
                >

                  <Link
                    to="/dashboard"
                  >

                    <Sparkles
                      className="
                        mr-2
                        h-4
                        w-4
                      "
                    />

                    What's New

                  </Link>

                </DropdownMenuItem>


                <DropdownMenuSeparator />


                {/* ==================================================
                    LOGOUT
                    ================================================== */}

                <DropdownMenuItem
                  className="
                    text-destructive
                    focus:text-destructive
                  "
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >

                  {isSigningOut ? (

                    <Loader2
                      className="
                        mr-2
                        h-4
                        w-4
                        animate-spin
                      "
                    />

                  ) : (

                    <LogOut
                      className="
                        mr-2
                        h-4
                        w-4
                      "
                    />

                  )}


                  {isSigningOut
                    ? "Logging out..."
                    : "Log out"}

                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          </div>

        </motion.header>


        {/* ======================================================
            PAGE CONTENT
            ====================================================== */}

        <main
          className="
            relative
            min-w-0
            overflow-x-hidden
            p-3
            sm:p-4
            lg:p-8
          "
        >

          <div
            className="
              relative
              min-h-full
              w-full
            "
          >

            {/* ==================================================
                EVENTDEVX 3D AMBIENT LAYER
                ================================================== */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                z-0
                overflow-hidden
                rounded-[28px]
              "
            >

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: [0, 18, -10, 0],
                        y: [0, -12, 10, 0],
                        scale: [1, 1.05, 0.98, 1],
                      }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="
                  absolute
                  -left-20
                  top-10
                  h-56
                  w-56
                  rounded-full
                  bg-indigo-500/5
                  blur-3xl
                "
              />

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: [0, -16, 12, 0],
                        y: [0, 14, -12, 0],
                        scale: [1, 0.96, 1.04, 1],
                      }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 19,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                className="
                  absolute
                  -right-16
                  bottom-20
                  h-64
                  w-64
                  rounded-full
                  bg-cyan-500/5
                  blur-3xl
                "
              />

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotateZ: [0, 360],
                      }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 38,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[26rem]
                  w-[26rem]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-indigo-500/5
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  opacity-[0.035]
                  [background-image:linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)]
                  [background-size:48px_48px]
                "
              />

            </div>


            {/* ==================================================
                PAGE CONTENT STAGE
                ================================================== */}

            {/*
              ✅ FIX: Removed transformStyle "preserve-3d",
              [perspective:1400px] on the outer wrapper,
              and transform: "translateZ(12px)" on the inner div.

              These three together were the root cause of the blur
              appearing on EVERY page across the entire dashboard.

              Here is why:
              - preserve-3d on a parent forces the browser to create
                a new GPU compositing layer for that element and all
                its children.
              - Any backdrop-blur or filter used inside a child
                (template selectors, dropdowns, popovers, overlays)
                gets visually corrupted or clipped at that compositing
                layer boundary — producing a stuck or wrong blur.
              - willChange: "transform" pre-promoted every page wrapper
                to its own layer even before hover, making the issue
                permanent rather than transient.
              - translateZ(12px) on the inner div only has meaning
                when preserve-3d is active, so it is also removed.

              The gentle page entrance animation (opacity + y + scale)
              and the subtle whileHover tilt are fully preserved.
              transformPerspective alone handles the tilt depth without
              needing preserve-3d.
            */}

            <motion.div
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 12,
                      scale: 0.995,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      rotateX: 0.35,
                      rotateY: -0.35,
                    }
              }
              transformPerspective={1400}
              className="
                relative
                z-10
                min-w-0
                rounded-[28px]
              "
            >

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-8
                  -top-2
                  h-8
                  rounded-full
                  bg-indigo-500/10
                  blur-2xl
                "
              />

              <div
                className="
                  relative
                  min-w-0
                "
              >

                <PageMotion>
                  {children}
                </PageMotion>

              </div>

            </motion.div>

          </div>

        </main>

      </div>


      {/* ======================================================
          PWA INSTALL BANNER
          ====================================================== */}

      <PWAInstallBanner />


    </div>

  );

}