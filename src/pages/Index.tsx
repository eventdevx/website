import {
  Activity,
  AlertTriangle,
  Award,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cpu,
  ExternalLink,
  FolderKanban,
  Globe2,
  Layers3,
  MessageSquare,
  Plus,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  TrendingUp,
  Users,
  UserPlus,
  Zap,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  DashboardLayout,
} from "@/components/layout/DashboardLayout";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";


/* ============================================================
   EVENT STATUS
   ============================================================ */

type EventStatus =
  | "LIVE"
  | "PENDING"
  | "UPCOMING"
  | "COMPLETED";


/* ============================================================
   FEATURED EVENT TYPE
   ============================================================ */

interface FeaturedEvent {
  id: string;
  title: string;
  description: string;
  type: string;
  status: EventStatus;
  participants: string;
  accent: string;
  icon: typeof Calendar;
}


/* ============================================================
   ACTIVITY TYPE
   ============================================================ */

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: typeof Rocket;
  iconClass: string;
  iconBackground: string;
}


/* ============================================================
   ALERT TYPE
   ============================================================ */

interface AlertItem {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: typeof Bell;
  iconClass: string;
  background: string;
  unread?: boolean;
}


/* ============================================================
   FEATURED EVENTS
   ============================================================ */

const featuredEvents: FeaturedEvent[] = [

  {
    id: "event-1",

    title: "Indo-Hack 2026",

    description:
      "India's largest decentralized hackathon focused on ZK-Proof technologies.",

    type: "Hackathon",

    status: "LIVE",

    participants: "2k+",

    accent:
      "from-indigo-600 to-violet-600",

    icon: Rocket,
  },

  {
    id: "event-2",

    title: "TechSummit Alpha",

    description:
      "Building regional innovation ecosystems across North India.",

    type: "College Level",

    status: "PENDING",

    participants: "500+",

    accent:
      "from-amber-600 to-orange-500",

    icon: Layers3,
  },

  {
    id: "event-3",

    title: "Open Source India",

    description:
      "A collaborative developer event connecting maintainers and contributors.",

    type: "Community",

    status: "UPCOMING",

    participants: "1.2k+",

    accent:
      "from-cyan-600 to-blue-600",

    icon: Globe2,
  },

  {
    id: "event-4",

    title: "Campus Dev League",

    description:
      "Inter-college engineering challenges and project showcases.",

    type: "Competition",

    status: "UPCOMING",

    participants: "800+",

    accent:
      "from-emerald-600 to-teal-500",

    icon: TicketCheck,
  },

];


/* ============================================================
   RECENT ACTIVITY
   ============================================================ */

const recentActivity: ActivityItem[] = [

  {
    id: "activity-1",

    title: "Indo-Hack 2026 went live",

    description:
      "2,300 participants joined in the first hour.",

    time: "2 min ago",

    icon: Rocket,

    iconClass:
      "text-blue-600",

    iconBackground:
      "bg-blue-100",
  },

  {
    id: "activity-2",

    title:
      "VIT Vellore partnership approved",

    description:
      "New community node activated.",

    time: "45 min ago",

    icon: CheckCircle2,

    iconClass:
      "text-emerald-600",

    iconBackground:
      "bg-emerald-100",
  },

  {
    id: "activity-3",

    title:
      "Delhi server cluster at 80%",

    description:
      "Auto-scaling triggered, monitoring capacity.",

    time: "1 hour ago",

    icon: AlertTriangle,

    iconClass:
      "text-amber-600",

    iconBackground:
      "bg-amber-100",
  },

  {
    id: "activity-4",

    title:
      "156 certificates issued",

    description:
      "PyConf India batch export completed.",

    time: "3 hours ago",

    icon: Award,

    iconClass:
      "text-violet-600",

    iconBackground:
      "bg-violet-100",
  },

  {
    id: "activity-5",

    title:
      "New organizer joined the network",

    description:
      "Community organizer profile is now active.",

    time: "5 hours ago",

    icon: UserPlus,

    iconClass:
      "text-cyan-600",

    iconBackground:
      "bg-cyan-100",
  },

];


/* ============================================================
   RECENT ALERTS
   ============================================================ */

const recentAlerts: AlertItem[] = [

  {
    id: "alert-1",

    title:
      "New Partner Request",

    description:
      "VIT Vellore sent a collaboration invite.",

    time: "2 min ago",

    icon: MessageSquare,

    iconClass:
      "text-blue-600",

    background:
      "bg-blue-100",

    unread: true,
  },

  {
    id: "alert-2",

    title:
      "Node Latency",

    description:
      "Delhi server cluster is currently at 80%.",

    time: "1 hour ago",

    icon: AlertTriangle,

    iconClass:
      "text-amber-600",

    background:
      "bg-amber-100",
  },

  {
    id: "alert-3",

    title:
      "Backup Complete",

    description:
      "All data nodes synced successfully.",

    time: "4 hours ago",

    icon: CheckCircle2,

    iconClass:
      "text-emerald-600",

    background:
      "bg-emerald-100",
  },

  {
    id: "alert-4",

    title:
      "Certificate Queue Ready",

    description:
      "42 certificates are ready for issuance.",

    time: "6 hours ago",

    icon: Award,

    iconClass:
      "text-violet-600",

    background:
      "bg-violet-100",
  },

];


/* ============================================================
   EVENT STATUS CLASSES
   ============================================================ */

const getStatusClasses = (
  status: EventStatus
) => {

  if (status === "LIVE") {

    return {
      badge:
        "bg-emerald-100 text-emerald-700 border-emerald-200",

      dot:
        "bg-emerald-500",
    };

  }


  if (status === "PENDING") {

    return {
      badge:
        "bg-amber-100 text-amber-700 border-amber-200",

      dot:
        "bg-amber-500",
    };

  }


  if (status === "COMPLETED") {

    return {
      badge:
        "bg-slate-100 text-slate-700 border-slate-200",

      dot:
        "bg-slate-500",
    };

  }


  return {

    badge:
      "bg-blue-100 text-blue-700 border-blue-200",

    dot:
      "bg-blue-500",

  };

};


/* ============================================================
   GREETING
   ============================================================ */

const getGreeting = () => {

  const hour =
    new Date().getHours();

  if (hour < 12) {

    return "Good morning";

  }

  if (hour < 17) {

    return "Good afternoon";

  }

  return "Good evening";

};


/* ============================================================
   DASHBOARD
   ============================================================ */

const Index = () => {

  const navigate =
    useNavigate();


  /* ==========================================================
     TEMPORARY EVENTDEVX DASHBOARD DATA
     ========================================================== */

  const stats = {

    newMembers: 1284,

    liveEvents: 42,

    projectNodes: 156,

    trustScore: "99.2%",

    activeProjects: 32,

    eventGrowth: 12,

    networkNodes: 84,

    certificatesIssued: 156,

  };


  /* ==========================================================
     USER DISPLAY
     ========================================================== */

  const firstName =
    "Partner";


  /* ==========================================================
     RETURN
     ========================================================== */

  return (

    <DashboardLayout>

      <div
        className="
          eventdevx-dashboard-page
          space-y-6
          pb-8
        "
      >


        {/* ====================================================
            PAGE INTRO
            ==================================================== */}

        <section
          className="
            flex
            flex-col
            justify-between
            gap-4
            md:flex-row
            md:items-center
          "
        >

          <div>

            <div
              className="
                mb-2
                flex
                items-center
                gap-2
              "
            >

              <span
                className="
                  inline-flex
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
                  tracking-[0.15em]
                  text-emerald-600
                "
              >
                Network Operational
              </span>

            </div>


            <h2
              className="
                text-2xl
                font-black
                tracking-tight
                text-foreground
                md:text-3xl
              "
            >

              {getGreeting()}, {firstName}.

            </h2>


            <p
              className="
                mt-1
                max-w-2xl
                text-sm
                font-medium
                leading-relaxed
                text-muted-foreground
              "
            >

              Your EventDevX community
              infrastructure is connected
              and ready.

            </p>

          </div>


          {/* ==================================================
              QUICK ACTIONS
              ================================================== */}

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            <Button
              variant="outline"
              className="
                gap-2
                rounded-xl
              "
              onClick={() =>
                navigate("/analytics")
              }
            >

              <BarChart3
                className="
                  h-4
                  w-4
                "
              />

              Analytics

            </Button>


            <Button
              className="
                gap-2
                rounded-xl
              "
              onClick={() =>
                navigate("/events")
              }
            >

              <Plus
                className="
                  h-4
                  w-4
                "
              />

              New Event

            </Button>

          </div>

        </section>


        {/* ====================================================
            STAT CARDS
            ==================================================== */}

        <section
          className="
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >


          {/* ==================================================
              NEW MEMBERS
              ================================================== */}

          <Card
            className="
              overflow-hidden
              rounded-2xl
              border
              border-border/70
              bg-card
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            <CardContent
              className="
                p-5
              "
            >

              <div
                className="
                  mb-5
                  flex
                  items-start
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-100
                    text-blue-600
                  "
                >

                  <UserPlus
                    className="
                      h-5
                      w-5
                    "
                  />

                </div>


                <span
                  className="
                    flex
                    items-center
                    gap-1
                    rounded-full
                    bg-emerald-50
                    px-2
                    py-1
                    text-[10px]
                    font-extrabold
                    text-emerald-600
                  "
                >

                  <TrendingUp
                    className="
                      h-3
                      w-3
                    "
                  />

                  +{stats.eventGrowth}%

                </span>

              </div>


              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.12em]
                  text-muted-foreground
                "
              >
                New Members
              </p>


              <h3
                className="
                  mt-1
                  text-3xl
                  font-black
                  tracking-tight
                  text-foreground
                "
              >
                {stats.newMembers.toLocaleString()}
              </h3>


              <p
                className="
                  mt-2
                  text-xs
                  font-semibold
                  text-emerald-600
                "
              >
                ↑ 12% increase
              </p>

            </CardContent>

          </Card>


          {/* ==================================================
              LIVE EVENTS
              ================================================== */}

          <Card
            className="
              overflow-hidden
              rounded-2xl
              border
              border-border/70
              bg-card
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            <CardContent
              className="
                p-5
              "
            >

              <div
                className="
                  mb-5
                  flex
                  items-start
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-100
                    text-violet-600
                  "
                >

                  <Zap
                    className="
                      h-5
                      w-5
                    "
                  />

                </div>


                <span
                  className="
                    rounded-full
                    bg-violet-50
                    px-2
                    py-1
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-violet-600
                  "
                >
                  Live
                </span>

              </div>


              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.12em]
                  text-muted-foreground
                "
              >
                Live Events
              </p>


              <h3
                className="
                  mt-1
                  text-3xl
                  font-black
                  tracking-tight
                  text-foreground
                "
              >
                {stats.liveEvents}
              </h3>


              <p
                className="
                  mt-2
                  text-xs
                  font-semibold
                  text-muted-foreground
                "
              >
                Active in the last 30 days
              </p>

            </CardContent>

          </Card>


          {/* ==================================================
              PROJECT NODES
              ================================================== */}

          <Card
            className="
              overflow-hidden
              rounded-2xl
              border
              border-border/70
              bg-card
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            <CardContent
              className="
                p-5
              "
            >

              <div
                className="
                  mb-5
                  flex
                  items-start
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-amber-100
                    text-amber-600
                  "
                >

                  <FolderKanban
                    className="
                      h-5
                      w-5
                    "
                  />

                </div>


                <span
                  className="
                    rounded-full
                    bg-amber-50
                    px-2
                    py-1
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-amber-600
                  "
                >
                  Active
                </span>

              </div>


              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.12em]
                  text-muted-foreground
                "
              >
                Project Nodes
              </p>


              <h3
                className="
                  mt-1
                  text-3xl
                  font-black
                  tracking-tight
                  text-foreground
                "
              >
                {stats.projectNodes}
              </h3>


              <p
                className="
                  mt-2
                  text-xs
                  font-semibold
                  text-emerald-600
                "
              >
                {stats.activeProjects} active today
              </p>

            </CardContent>

          </Card>


          {/* ==================================================
              TRUST SCORE
              ================================================== */}

          <Card
            className="
              overflow-hidden
              rounded-2xl
              border
              border-border/70
              bg-card
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >

            <CardContent
              className="
                p-5
              "
            >

              <div
                className="
                  mb-5
                  flex
                  items-start
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-100
                    text-emerald-600
                  "
                >

                  <ShieldCheck
                    className="
                      h-5
                      w-5
                    "
                  />

                </div>


                <span
                  className="
                    rounded-full
                    bg-emerald-50
                    px-2
                    py-1
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-emerald-600
                  "
                >
                  Secure
                </span>

              </div>


              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.12em]
                  text-muted-foreground
                "
              >
                Trust Score
              </p>


              <h3
                className="
                  mt-1
                  text-3xl
                  font-black
                  tracking-tight
                  text-foreground
                "
              >
                {stats.trustScore}
              </h3>


              <p
                className="
                  mt-2
                  text-xs
                  font-semibold
                  text-blue-600
                "
              >
                Enterprise Grade
              </p>

            </CardContent>

          </Card>

        </section>


        {/* ====================================================
            FEATURED EVENTS + ALERTS
            ==================================================== */}

        <section
          className="
            grid
            gap-6
            xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]
          "
        >


          {/* ==================================================
              FEATURED EVENTS
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-border/70
              bg-card
              shadow-sm
            "
          >

            <CardHeader
              className="
                flex
                flex-row
                items-center
                justify-between
                gap-4
                px-5
                pb-3
                pt-5
              "
            >

              <div>

                <CardTitle
                  className="
                    text-base
                    font-black
                  "
                >
                  Featured Arena Ops
                </CardTitle>

                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-muted-foreground
                  "
                >
                  Current activity across
                  your event network.
                </p>

              </div>


              <Button
                variant="ghost"
                size="sm"
                className="
                  gap-1
                  rounded-lg
                  text-primary
                "
                asChild
              >

                <Link
                  to="/events"
                >

                  View All

                  <ChevronRight
                    className="
                      h-4
                      w-4
                    "
                  />

                </Link>

              </Button>

            </CardHeader>


            <CardContent
              className="
                px-5
                pb-5
              "
            >

              <div
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                "
              >

                {featuredEvents.map(
                  (event) => {

                    const statusClasses =
                      getStatusClasses(
                        event.status
                      );


                    const EventIcon =
                      event.icon;


                    return (

                      <div
                        key={event.id}
                        className="
                          group
                          overflow-hidden
                          rounded-2xl
                          border
                          border-border/70
                          bg-background
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:shadow-lg
                        "
                      >


                        {/* ==========================================
                            EVENT HEADER
                            ========================================== */}

                        <div
                          className={`
                            relative
                            h-36
                            overflow-hidden
                            bg-gradient-to-br
                            ${event.accent}
                          `}
                        >

                          <div
                            className="
                              absolute
                              -right-6
                              -top-6
                              h-28
                              w-28
                              rounded-full
                              border
                              border-white/20
                            "
                          />


                          <div
                            className="
                              absolute
                              -bottom-12
                              -left-8
                              h-32
                              w-32
                              rounded-full
                              bg-white/10
                              blur-2xl
                            "
                          />


                          <div
                            className="
                              absolute
                              left-4
                              top-4
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-xl
                              bg-white/20
                              text-white
                              backdrop-blur-md
                            "
                          >

                            <EventIcon
                              className="
                                h-4
                                w-4
                              "
                            />

                          </div>


                          <div
                            className="
                              absolute
                              right-4
                              top-4
                            "
                          >

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                bg-white/95
                                px-2.5
                                py-1
                                text-[10px]
                                font-extrabold
                                uppercase
                                tracking-wide
                              "
                            >

                              <span
                                className={`
                                  h-1.5
                                  w-1.5
                                  rounded-full
                                  ${statusClasses.dot}
                                `}
                              />

                              <span
                                className="
                                  text-slate-800
                                "
                              >
                                {event.status}
                              </span>

                            </span>

                          </div>


                          <div
                            className="
                              absolute
                              bottom-4
                              left-4
                              right-4
                            "
                          >

                            <p
                              className="
                                mb-1
                                text-[9px]
                                font-extrabold
                                uppercase
                                tracking-[0.12em]
                                text-white/70
                              "
                            >
                              {event.type}
                            </p>


                            <h4
                              className="
                                text-lg
                                font-black
                                tracking-tight
                                text-white
                              "
                            >
                              {event.title}
                            </h4>

                          </div>

                        </div>


                        {/* ==========================================
                            EVENT BODY
                            ========================================== */}

                        <div
                          className="
                            p-4
                          "
                        >

                          <p
                            className="
                              min-h-10
                              text-xs
                              font-medium
                              leading-relaxed
                              text-muted-foreground
                            "
                          >
                            {event.description}
                          </p>


                          <div
                            className="
                              mt-4
                              flex
                              items-center
                              justify-between
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >

                              <div
                                className="
                                  flex
                                  -space-x-2
                                "
                              >

                                <div
                                  className="
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    border-2
                                    border-white
                                    bg-blue-500
                                    text-[9px]
                                    font-black
                                    text-white
                                  "
                                >
                                  A
                                </div>


                                <div
                                  className="
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    border-2
                                    border-white
                                    bg-violet-500
                                    text-[9px]
                                    font-black
                                    text-white
                                  "
                                >
                                  R
                                </div>


                                <div
                                  className="
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    border-2
                                    border-white
                                    bg-slate-100
                                    text-[8px]
                                    font-black
                                    text-slate-600
                                  "
                                >
                                  +{event.participants}
                                </div>

                              </div>

                            </div>


                            <Button
                              variant="outline"
                              size="icon"
                              className="
                                h-9
                                w-9
                                rounded-xl
                              "
                              onClick={() =>
                                navigate(
                                  `/events?event=${event.id}`
                                )
                              }
                            >

                              <ExternalLink
                                className="
                                  h-4
                                  w-4
                                "
                              />

                            </Button>

                          </div>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              RECENT ALERTS
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-border/70
              bg-card
              shadow-sm
            "
          >

            <CardHeader
              className="
                px-5
                pb-3
                pt-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >

                <div>

                  <CardTitle
                    className="
                      text-base
                      font-black
                    "
                  >
                    Recent Alerts
                  </CardTitle>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      text-muted-foreground
                    "
                  >
                    Important updates from
                    your network.
                  </p>

                </div>


                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    h-9
                    w-9
                    rounded-xl
                  "
                >

                  <Bell
                    className="
                      h-4
                      w-4
                    "
                  />

                </Button>

              </div>

            </CardHeader>


            <CardContent
              className="
                px-5
                pb-5
              "
            >

              <div
                className="
                  space-y-3
                "
              >

                {recentAlerts.map(
                  (alert) => {

                    const AlertIcon =
                      alert.icon;


                    return (

                      <div
                        key={alert.id}
                        className={`
                          flex
                          gap-3
                          rounded-2xl
                          border
                          p-3.5
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:shadow-sm
                          ${
                            alert.unread
                              ? "border-primary/20 bg-primary/5"
                              : "border-border/60 bg-muted/20"
                          }
                        `}
                      >

                        <div
                          className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            ${alert.background}
                          `}
                        >

                          <AlertIcon
                            className={`
                              h-4
                              w-4
                              ${alert.iconClass}
                            `}
                          />

                        </div>


                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >

                          <div
                            className="
                              flex
                              items-start
                              justify-between
                              gap-3
                            "
                          >

                            <p
                              className="
                                text-xs
                                font-bold
                                text-foreground
                              "
                            >
                              {alert.title}
                            </p>


                            {alert.unread && (

                              <span
                                className="
                                  mt-1
                                  h-1.5
                                  w-1.5
                                  shrink-0
                                  rounded-full
                                  bg-primary
                                "
                              />

                            )}

                          </div>


                          <p
                            className="
                              mt-1
                              text-[11px]
                              font-medium
                              leading-relaxed
                              text-muted-foreground
                            "
                          >
                            {alert.description}
                          </p>


                          <p
                            className="
                              mt-2
                              text-[9px]
                              font-extrabold
                              uppercase
                              tracking-[0.08em]
                              text-primary
                            "
                          >
                            {alert.time}
                          </p>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ====================================================
            ACTIVITY + ACTIONS
            ==================================================== */}

        <section
          className="
            grid
            gap-6
            lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]
          "
        >


          {/* ==================================================
              RECENT ACTIVITY
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-border/70
              bg-card
              shadow-sm
            "
          >

            <CardHeader
              className="
                px-5
                pb-3
                pt-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <CardTitle
                    className="
                      text-base
                      font-black
                    "
                  >
                    Recent Activity
                  </CardTitle>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      text-muted-foreground
                    "
                  >
                    Latest updates across
                    your ecosystem.
                  </p>

                </div>


                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                  "
                >

                  <Activity
                    className="
                      h-4
                      w-4
                    "
                  />

                </div>

              </div>

            </CardHeader>


            <CardContent
              className="
                px-5
                pb-5
              "
            >

              <div
                className="
                  space-y-0
                "
              >

                {recentActivity.map(
                  (
                    activity,
                    index
                  ) => {

                    const ActivityIcon =
                      activity.icon;


                    const isLast =
                      index ===
                      recentActivity.length - 1;


                    return (

                      <div
                        key={activity.id}
                        className="
                          relative
                          flex
                          gap-4
                          pb-6
                        "
                      >

                        {!isLast && (

                          <div
                            className="
                              absolute
                              bottom-0
                              left-[17px]
                              top-10
                              w-px
                              bg-border
                            "
                          />

                        )}


                        <div
                          className={`
                            relative
                            z-10
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            ${activity.iconBackground}
                          `}
                        >

                          <ActivityIcon
                            className={`
                              h-4
                              w-4
                              ${activity.iconClass}
                            `}
                          />

                        </div>


                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >

                          <div
                            className="
                              flex
                              flex-col
                              gap-1
                              sm:flex-row
                              sm:items-center
                              sm:justify-between
                            "
                          >

                            <p
                              className="
                                text-sm
                                font-bold
                                text-foreground
                              "
                            >
                              {activity.title}
                            </p>


                            <span
                              className="
                                shrink-0
                                text-[10px]
                                font-bold
                                text-primary
                              "
                            >
                              {activity.time}
                            </span>

                          </div>


                          <p
                            className="
                              mt-1
                              text-xs
                              font-medium
                              leading-relaxed
                              text-muted-foreground
                            "
                          >
                            {activity.description}
                          </p>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              RIGHT SIDE
              ================================================== */}

          <div
            className="
              space-y-6
            "
          >


            {/* =================================================
                QUICK ACTIONS
                ================================================= */}

            <Card
              className="
                rounded-2xl
                border
                border-border/70
                bg-card
                shadow-sm
              "
            >

              <CardHeader
                className="
                  px-5
                  pb-3
                  pt-5
                "
              >

                <CardTitle
                  className="
                    text-base
                    font-black
                  "
                >
                  Quick Actions
                </CardTitle>


                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-muted-foreground
                  "
                >
                  Jump directly into common
                  EventDevX workflows.
                </p>

              </CardHeader>


              <CardContent
                className="
                  px-5
                  pb-5
                "
              >

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                  "
                >


                  {/* ==========================================
                      NEW CERTIFICATE
                      ========================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/certificates"
                      )
                    }
                    className="
                      group
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border
                      border-primary/10
                      bg-primary/5
                      p-4
                      text-center
                      transition-all
                      duration-200
                      hover:-translate-y-1
                      hover:bg-primary
                      hover:text-white
                    "
                  >

                    <Award
                      className="
                        h-5
                        w-5
                        text-primary
                        transition-colors
                        group-hover:text-white
                      "
                    />


                    <span
                      className="
                        text-[11px]
                        font-extrabold
                        text-primary
                        group-hover:text-white
                      "
                    >
                      New Cert
                    </span>

                  </button>


                  {/* ==========================================
                      ADD EVENT
                      ========================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/events"
                      )
                    }
                    className="
                      group
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border
                      border-emerald-100
                      bg-emerald-50
                      p-4
                      text-center
                      transition-all
                      duration-200
                      hover:-translate-y-1
                      hover:bg-emerald-500
                      hover:text-white
                    "
                  >

                    <Plus
                      className="
                        h-5
                        w-5
                        text-emerald-600
                        transition-colors
                        group-hover:text-white
                      "
                    />


                    <span
                      className="
                        text-[11px]
                        font-extrabold
                        text-emerald-700
                        group-hover:text-white
                      "
                    >
                      Add Event
                    </span>

                  </button>


                  {/* ==========================================
                      NETWORK
                      ========================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/community"
                      )
                    }
                    className="
                      group
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border
                      border-violet-100
                      bg-violet-50
                      p-4
                      text-center
                      transition-all
                      duration-200
                      hover:-translate-y-1
                      hover:bg-violet-500
                      hover:text-white
                    "
                  >

                    <Users
                      className="
                        h-5
                        w-5
                        text-violet-600
                        transition-colors
                        group-hover:text-white
                      "
                    />


                    <span
                      className="
                        text-[11px]
                        font-extrabold
                        text-violet-700
                        group-hover:text-white
                      "
                    >
                      Network
                    </span>

                  </button>


                  {/* ==========================================
                      ANALYTICS
                      ========================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/analytics"
                      )
                    }
                    className="
                      group
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border
                      border-amber-100
                      bg-amber-50
                      p-4
                      text-center
                      transition-all
                      duration-200
                      hover:-translate-y-1
                      hover:bg-amber-500
                      hover:text-white
                    "
                  >

                    <BarChart3
                      className="
                        h-5
                        w-5
                        text-amber-600
                        transition-colors
                        group-hover:text-white
                      "
                    />


                    <span
                      className="
                        text-[11px]
                        font-extrabold
                        text-amber-700
                        group-hover:text-white
                      "
                    >
                      Analytics
                    </span>

                  </button>

                </div>

              </CardContent>

            </Card>


            {/* =================================================
                INFRASTRUCTURE CTA
                ================================================= */}

            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                bg-gradient-to-br
                from-slate-950
                to-slate-800
                p-6
                text-white
                shadow-lg
              "
            >

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-8
                  h-32
                  w-32
                  rounded-full
                  bg-primary/20
                  blur-3xl
                "
              />


              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-10
                  -left-10
                  h-28
                  w-28
                  rounded-full
                  bg-cyan-400/10
                  blur-3xl
                "
              />


              <div
                className="
                  relative
                  z-10
                "
              >

                <div
                  className="
                    mb-4
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    text-white
                  "
                >

                  <Server
                    className="
                      h-5
                      w-5
                    "
                  />

                </div>


                <h3
                  className="
                    text-lg
                    font-black
                    tracking-tight
                  "
                >
                  Need Infrastructure?
                </h3>


                <p
                  className="
                    mt-2
                    text-xs
                    font-medium
                    leading-relaxed
                    text-slate-300
                  "
                >
                  Access dedicated event servers,
                  check-in kiosks and operational
                  resources for your next event.
                </p>


                <Button
                  className="
                    mt-5
                    gap-2
                    rounded-xl
                    bg-white
                    text-slate-900
                    hover:bg-primary
                    hover:text-white
                  "
                  onClick={() =>
                    navigate(
                      "/infrastructure"
                    )
                  }
                >

                  <Cpu
                    className="
                      h-4
                      w-4
                    "
                  />

                  Request Kit

                </Button>

              </div>

            </div>

          </div>

        </section>


        {/* ====================================================
            NETWORK SNAPSHOT
            ==================================================== */}

        <section
          className="
            grid
            gap-4
            md:grid-cols-3
          "
        >


          {/* ==================================================
              NETWORK NODES
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-border/70
              bg-card
              shadow-sm
            "
          >

            <CardContent
              className="
                flex
                items-center
                gap-4
                p-5
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-100
                  text-cyan-600
                "
              >

                <Globe2
                  className="
                    h-5
                    w-5
                  "
                />

              </div>


              <div
                className="
                  min-w-0
                  flex-1
                "
              >

                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.12em]
                    text-muted-foreground
                  "
                >
                  Network Nodes
                </p>


                <p
                  className="
                    mt-1
                    text-xl
                    font-black
                    text-foreground
                  "
                >
                  {stats.networkNodes}
                </p>

              </div>


              <span
                className="
                  flex
                  items-center
                  gap-1
                  rounded-full
                  bg-emerald-50
                  px-2
                  py-1
                  text-[9px]
                  font-extrabold
                  text-emerald-600
                "
              >

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-500
                  "
                />

                Online

              </span>

            </CardContent>

          </Card>


          {/* ==================================================
              ACTIVE PROJECTS
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-border/70
              bg-card
              shadow-sm
            "
          >

            <CardContent
              className="
                flex
                items-center
                gap-4
                p-5
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-100
                  text-violet-600
                "
              >

                <FolderKanban
                  className="
                    h-5
                    w-5
                  "
                />

              </div>


              <div
                className="
                  min-w-0
                  flex-1
                "
              >

                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.12em]
                    text-muted-foreground
                  "
                >
                  Active Projects
                </p>


                <p
                  className="
                    mt-1
                    text-xl
                    font-black
                    text-foreground
                  "
                >
                  {stats.activeProjects}
                </p>

              </div>


              <span
                className="
                  rounded-full
                  bg-violet-50
                  px-2
                  py-1
                  text-[9px]
                  font-extrabold
                  text-violet-600
                "
              >
                Active
              </span>

            </CardContent>

          </Card>


          {/* ==================================================
              CERTIFICATES
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-border/70
              bg-card
              shadow-sm
            "
          >

            <CardContent
              className="
                flex
                items-center
                gap-4
                p-5
              "
            >

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-amber-100
                  text-amber-600
                "
              >

                <Award
                  className="
                    h-5
                    w-5
                  "
                />

              </div>


              <div
                className="
                  min-w-0
                  flex-1
                "
              >

                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.12em]
                    text-muted-foreground
                  "
                >
                  Certificates Issued
                </p>


                <p
                  className="
                    mt-1
                    text-xl
                    font-black
                    text-foreground
                  "
                >
                  {stats.certificatesIssued}
                </p>

              </div>


              <span
                className="
                  rounded-full
                  bg-amber-50
                  px-2
                  py-1
                  text-[9px]
                  font-extrabold
                  text-amber-600
                "
              >
                This Month
              </span>

            </CardContent>

          </Card>

        </section>


        {/* ====================================================
            SYSTEM STATUS
            ==================================================== */}

        <section
          className="
            flex
            flex-col
            gap-3
            rounded-2xl
            border
            border-border/60
            bg-card
            px-5
            py-4
            shadow-sm
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-emerald-100
                text-emerald-600
              "
            >

              <CheckCircle2
                className="
                  h-4
                  w-4
                "
              />

            </div>


            <div>

              <p
                className="
                  text-xs
                  font-bold
                  text-foreground
                "
              >
                All systems operational
              </p>


              <p
                className="
                  text-[10px]
                  font-medium
                  text-muted-foreground
                "
              >
                EventDevX services are responding normally.
              </p>

            </div>

          </div>


          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                font-bold
                text-muted-foreground
              "
            >

              <Clock3
                className="
                  h-3.5
                  w-3.5
                "
              />

              Last synced just now

            </div>


            <Link
              to="/analytics"
              className="
                inline-flex
                items-center
                gap-1
                text-[10px]
                font-extrabold
                text-primary
                hover:underline
              "
            >

              View Analytics

              <ChevronRight
                className="
                  h-3.5
                  w-3.5
                "
              />

            </Link>

          </div>

        </section>

      </div>

    </DashboardLayout>

  );

};


export default Index;