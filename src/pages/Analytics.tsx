import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Database,
  Download,
  Gauge,
  LineChart,
  Network,
  Percent,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  DashboardLayout,
} from "@/components/layout/DashboardLayout";

import {
  Button,
} from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


/* ============================================================
   MONTHLY REGISTRATION TYPE
   ============================================================ */

interface MonthlyRegistration {

  month: string;

  shortMonth: string;

  registrations: number;

  percentage: number;

}


/* ============================================================
   PLATFORM METRIC TYPE
   ============================================================ */

interface PlatformMetric {

  id: string;

  label: string;

  value: string;

  percentage: number;

  description: string;

  icon: typeof Activity;

  iconClass: string;

  backgroundClass: string;

  progressClass: string;

}


/* ============================================================
   YEAR DATA
   ============================================================ */

const REGISTRATION_DATA_2026:
  MonthlyRegistration[] = [

  {
    month:
      "January",

    shortMonth:
      "JAN",

    registrations:
      1240,

    percentage:
      55,
  },

  {
    month:
      "February",

    shortMonth:
      "FEB",

    registrations:
      1580,

    percentage:
      70,
  },

  {
    month:
      "March",

    shortMonth:
      "MAR",

    registrations:
      1020,

    percentage:
      45,
  },

  {
    month:
      "April",

    shortMonth:
      "APR",

    registrations:
      1920,

    percentage:
      85,
  },

  {
    month:
      "May",

    shortMonth:
      "MAY",

    registrations:
      1470,

    percentage:
      65,
  },

  {
    month:
      "June",

    shortMonth:
      "JUN",

    registrations:
      2030,

    percentage:
      90,
  },

  {
    month:
      "July",

    shortMonth:
      "JUL",

    registrations:
      1690,

    percentage:
      75,
  },

  {
    month:
      "August",

    shortMonth:
      "AUG",

    registrations:
      2260,

    percentage:
      100,
  },

  {
    month:
      "September",

    shortMonth:
      "SEP",

    registrations:
      1800,

    percentage:
      80,
  },

  {
    month:
      "October",

    shortMonth:
      "OCT",

    registrations:
      1350,

    percentage:
      60,
  },

  {
    month:
      "November",

    shortMonth:
      "NOV",

    registrations:
      1130,

    percentage:
      50,
  },

  {
    month:
      "December",

    shortMonth:
      "DEC",

    registrations:
      900,

    percentage:
      40,
  },

];


/* ============================================================
   2025 SAMPLE DATA
   ============================================================ */

const REGISTRATION_DATA_2025:
  MonthlyRegistration[] = [

  {
    month:
      "January",

    shortMonth:
      "JAN",

    registrations:
      880,

    percentage:
      46,
  },

  {
    month:
      "February",

    shortMonth:
      "FEB",

    registrations:
      1060,

    percentage:
      56,
  },

  {
    month:
      "March",

    shortMonth:
      "MAR",

    registrations:
      950,

    percentage:
      50,
  },

  {
    month:
      "April",

    shortMonth:
      "APR",

    registrations:
      1320,

    percentage:
      69,
  },

  {
    month:
      "May",

    shortMonth:
      "MAY",

    registrations:
      1180,

    percentage:
      62,
  },

  {
    month:
      "June",

    shortMonth:
      "JUN",

    registrations:
      1490,

    percentage:
      78,
  },

  {
    month:
      "July",

    shortMonth:
      "JUL",

    registrations:
      1370,

    percentage:
      72,
  },

  {
    month:
      "August",

    shortMonth:
      "AUG",

    registrations:
      1680,

    percentage:
      88,
  },

  {
    month:
      "September",

    shortMonth:
      "SEP",

    registrations:
      1510,

    percentage:
      79,
  },

  {
    month:
      "October",

    shortMonth:
      "OCT",

    registrations:
      1220,

    percentage:
      64,
  },

  {
    month:
      "November",

    shortMonth:
      "NOV",

    registrations:
      1050,

    percentage:
      55,
  },

  {
    month:
      "December",

    shortMonth:
      "DEC",

    registrations:
      940,

    percentage:
      49,
  },

];


/* ============================================================
   PLATFORM METRICS
   ============================================================ */

const PLATFORM_METRICS:
  PlatformMetric[] = [

  {
    id:
      "retention",

    label:
      "User Retention",

    value:
      "87%",

    percentage:
      87,

    description:
      "Returning builders and community users.",

    icon:
      Users,

    iconClass:
      "text-indigo-600",

    backgroundClass:
      "bg-indigo-100",

    progressClass:
      "bg-indigo-600",
  },

  {
    id:
      "success",

    label:
      "Event Success Rate",

    value:
      "92%",

    percentage:
      92,

    description:
      "Events reaching completion without major issues.",

    icon:
      CheckCircle2,

    iconClass:
      "text-emerald-600",

    backgroundClass:
      "bg-emerald-100",

    progressClass:
      "bg-emerald-500",
  },

  {
    id:
      "uptime",

    label:
      "Server Uptime",

    value:
      "99.9%",

    percentage:
      99.9,

    description:
      "Availability across EventDevX infrastructure.",

    icon:
      Server,

    iconClass:
      "text-blue-600",

    backgroundClass:
      "bg-blue-100",

    progressClass:
      "bg-blue-500",
  },

  {
    id:
      "certificate",

    label:
      "Certificate Validity",

    value:
      "100%",

    percentage:
      100,

    description:
      "Certificates passing current validation checks.",

    icon:
      Award,

    iconClass:
      "text-amber-600",

    backgroundClass:
      "bg-amber-100",

    progressClass:
      "bg-amber-500",
  },

];


/* ============================================================
   KPI TYPE
   ============================================================ */

interface KPIItem {

  id: string;

  label: string;

  value: string;

  change: string;

  direction: "up" | "down";

  subtitle: string;

  icon: typeof TrendingUp;

  iconClass: string;

  iconBackground: string;

}


/* ============================================================
   KPI DATA
   ============================================================ */

const KPI_DATA:
  KPIItem[] = [

  {
    id:
      "revenue",

    label:
      "Total Revenue",

    value:
      "₹48.2L",

    change:
      "23%",

    direction:
      "up",

    subtitle:
      "this quarter",

    icon:
      TrendingUp,

    iconClass:
      "text-indigo-600",

    iconBackground:
      "bg-indigo-100",
  },

  {
    id:
      "conversion",

    label:
      "Conversion",

    value:
      "34.7%",

    change:
      "5.2%",

    direction:
      "up",

    subtitle:
      "improvement",

    icon:
      Percent,

    iconClass:
      "text-emerald-600",

    iconBackground:
      "bg-emerald-100",
  },

  {
    id:
      "engagement",

    label:
      "Avg. Engagement",

    value:
      "6h 24m",

    change:
      "2%",

    direction:
      "down",

    subtitle:
      "from last week",

    icon:
      Clock3,

    iconClass:
      "text-amber-600",

    iconBackground:
      "bg-amber-100",
  },

  {
    id:
      "certificates",

    label:
      "Certificates",

    value:
      "8,342",

    change:
      "18%",

    direction:
      "up",

    subtitle:
      "issued",

    icon:
      Award,

    iconClass:
      "text-violet-600",

    iconBackground:
      "bg-violet-100",
  },

];


/* ============================================================
   BAR HEIGHT HELPER
   ============================================================ */

function getBarHeight(
  percentage: number
) {

  return `${percentage}%`;

}


/* ============================================================
   NUMBER FORMATTER
   ============================================================ */

function formatNumber(
  value: number
) {

  return value.toLocaleString(
    "en-IN"
  );

}


/* ============================================================
   ANALYTICS PAGE
   ============================================================ */

const Analytics = () => {

  /* ==========================================================
     YEAR SELECTION
     ========================================================== */

  const [
    selectedYear,
    setSelectedYear,
  ] = useState<
    "2026" | "2025"
  >(
    "2026"
  );


  /* ==========================================================
     ACTIVE MONTH
     ========================================================== */

  const [
    activeMonth,
    setActiveMonth,
  ] = useState(
    "AUG"
  );


  /* ==========================================================
     REFRESH STATE
     ========================================================== */

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);


  /* ==========================================================
     EXPORT STATE
     ========================================================== */

  const [
    exporting,
    setExporting,
  ] = useState(false);


  /* ==========================================================
     INFO MODAL
     ========================================================== */

  const [
    infoMetric,
    setInfoMetric,
  ] = useState<
    PlatformMetric | null
  >(null);


  /* ==========================================================
     CURRENT REGISTRATION DATA
     ========================================================== */

  const registrationData =
    selectedYear ===
    "2026"
      ? REGISTRATION_DATA_2026
      : REGISTRATION_DATA_2025;


  /* ==========================================================
     TOTAL REGISTRATIONS
     ========================================================== */

  const totalRegistrations =
    useMemo(() => {

      return registrationData.reduce(
        (
          total,
          month
        ) =>
          total +
          month.registrations,
        0
      );

    }, [
      registrationData,
    ]);


  /* ==========================================================
     AVERAGE REGISTRATIONS
     ========================================================== */

  const averageRegistrations =
    useMemo(() => {

      if (
        registrationData.length ===
        0
      ) {

        return 0;

      }


      return Math.round(
        totalRegistrations /
        registrationData.length
      );

    }, [
      registrationData,
      totalRegistrations,
    ]);


  /* ==========================================================
     PEAK MONTH
     ========================================================== */

  const peakMonth =
    useMemo(() => {

      return registrationData.reduce(
        (
          highest,
          current
        ) =>
          current.registrations >
          highest.registrations
            ? current
            : highest,
        registrationData[0]
      );

    }, [
      registrationData,
    ]);


  /* ==========================================================
     REFRESH ANALYTICS
     ========================================================== */

  const handleRefresh =
    () => {

      setRefreshing(
        true
      );


      window.setTimeout(
        () => {

          setRefreshing(
            false
          );

        },
        900
      );

    };


  /* ==========================================================
     EXPORT ANALYTICS
     ========================================================== */

  const handleExport =
    () => {

      setExporting(
        true
      );


      const rows = [
        [
          "Month",
          "Registrations",
        ],

        ...registrationData.map(
          (
            item
          ) => [
            item.month,
            item.registrations,
          ]
        ),

      ];


      const csv =
        rows
          .map(
            (
              row
            ) =>
              row.join(",")
          )
          .join(
            "\n"
          );


      const blob =
        new Blob(
          [csv],
          {
            type:
              "text/csv;charset=utf-8;",
          }
        );


      const url =
        URL.createObjectURL(
          blob
        );


      const link =
        document.createElement(
          "a"
        );


      link.href =
        url;


      link.download =
        `EventDevX_Analytics_${selectedYear}.csv`;


      document.body.appendChild(
        link
      );


      link.click();


      document.body.removeChild(
        link
      );


      URL.revokeObjectURL(
        url
      );


      window.setTimeout(
        () => {

          setExporting(
            false
          );

        },
        700
      );

    };


  /* ==========================================================
     SELECT MONTH
     ========================================================== */

  const handleMonthClick =
    (
      month: MonthlyRegistration
    ) => {

      setActiveMonth(
        month.shortMonth
      );

    };


  /* ==========================================================
     RETURN
     ========================================================== */

  return (

    <DashboardLayout>

      <div
        className="
          space-y-6
          pb-8
        "
      >


        {/* ====================================================
            PAGE HEADER
            ==================================================== */}

        <section
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-end
            lg:justify-between
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

              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary/10
                  text-primary
                "
              >

                <BarChart3
                  className="
                    h-4
                    w-4
                  "
                />

              </div>


              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.15em]
                  text-primary
                "
              >
                EventDevX Intelligence
              </span>

            </div>


            <h2
              className="
                text-3xl
                font-black
                tracking-tight
                text-foreground
                md:text-4xl
              "
            >
              Analytics
            </h2>


            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                font-medium
                leading-6
                text-muted-foreground
              "
            >
              Platform metrics,
              registration trends
              and operational
              performance across
              the EventDevX network.
            </p>

          </div>


          {/* ==================================================
              HEADER ACTIONS
              ================================================== */}

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            <Button
              type="button"
              variant="outline"
              className="
                gap-2
                rounded-xl
              "
              onClick={
                handleRefresh
              }
              disabled={
                refreshing
              }
            >

              <RefreshCw
                className={`
                  h-4
                  w-4
                  ${
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                `}
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh"}

            </Button>


            <Button
              type="button"
              className="
                gap-2
                rounded-xl
              "
              onClick={
                handleExport
              }
              disabled={
                exporting
              }
            >

              <Download
                className="
                  h-4
                  w-4
                "
              />

              {exporting
                ? "Exporting..."
                : "Export Data"}

            </Button>

          </div>

        </section>


        {/* ====================================================
            KPI GRID
            ==================================================== */}

        <section
          className="
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          {KPI_DATA.map(
            (
              item
            ) => {

              const Icon =
                item.icon;


              const isPositive =
                item.direction ===
                "up";


              return (

                <Card
                  key={
                    item.id
                  }
                  className="
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
                        flex
                        items-start
                        justify-between
                        gap-3
                      "
                    >

                      <div
                        className={`
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          ${item.iconBackground}
                        `}
                      >

                        <Icon
                          className={`
                            h-5
                            w-5
                            ${item.iconClass}
                          `}
                        />

                      </div>


                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1
                          rounded-full
                          px-2
                          py-1
                          text-[10px]
                          font-extrabold
                          ${
                            isPositive
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-600"
                          }
                        `}
                      >

                        {isPositive ? (

                          <ArrowUpRight
                            className="
                              h-3
                              w-3
                            "
                          />

                        ) : (

                          <ArrowDownRight
                            className="
                              h-3
                              w-3
                            "
                          />

                        )}

                        {item.change}

                      </span>

                    </div>


                    <p
                      className="
                        mt-5
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.12em]
                        text-muted-foreground
                      "
                    >
                      {item.label}
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
                      {item.value}
                    </h3>


                    <p
                      className={`
                        mt-2
                        text-xs
                        font-semibold
                        ${
                          isPositive
                            ? "text-emerald-600"
                            : "text-red-600"
                        }
                      `}
                    >

                      {isPositive
                        ? "↑ "
                        : "↓ "}

                      {item.change}

                      {" "}

                      {item.subtitle}

                    </p>

                  </CardContent>

                </Card>

              );

            }
          )}

        </section>


        {/* ====================================================
            YEAR OVERVIEW STRIP
            ==================================================== */}

        <section
          className="
            grid
            gap-4
            md:grid-cols-3
          "
        >

          {/* ==================================================
              TOTAL REGISTRATIONS
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-indigo-100
              bg-indigo-50/60
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
                  bg-indigo-100
                  text-indigo-600
                "
              >

                <Users
                  className="
                    h-5
                    w-5
                  "
                />

              </div>


              <div>

                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.1em]
                    text-indigo-700
                  "
                >
                  Annual Registrations
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-slate-900
                  "
                >
                  {formatNumber(
                    totalRegistrations
                  )}
                </p>

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              MONTHLY AVERAGE
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-cyan-100
              bg-cyan-50/60
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

                <Gauge
                  className="
                    h-5
                    w-5
                  "
                />

              </div>


              <div>

                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.1em]
                    text-cyan-700
                  "
                >
                  Monthly Average
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-slate-900
                  "
                >
                  {formatNumber(
                    averageRegistrations
                  )}
                </p>

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              PEAK MONTH
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-violet-100
              bg-violet-50/60
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

                <TrendingUp
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

                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.1em]
                    text-violet-700
                  "
                >
                  Peak Month
                </p>


                <p
                  className="
                    mt-1
                    text-xl
                    font-black
                    text-slate-900
                  "
                >
                  {peakMonth.month}
                </p>


                <p
                  className="
                    text-xs
                    font-semibold
                    text-violet-600
                  "
                >
                  {formatNumber(
                    peakMonth.registrations
                  )}
                  {" "}
                  registrations
                </p>

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ====================================================
            REGISTRATION CHART
            ==================================================== */}

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
              flex-col
              gap-4
              px-5
              pb-3
              pt-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <LineChart
                  className="
                    h-5
                    w-5
                    text-primary
                  "
                />


                <CardTitle
                  className="
                    text-base
                    font-black
                  "
                >
                  Event Registrations — Monthly
                </CardTitle>

              </div>


              <p
                className="
                  mt-1
                  text-xs
                  font-medium
                  text-muted-foreground
                "
              >
                Registration activity across
                the selected year.
              </p>

            </div>


            {/* ==================================================
                YEAR SELECTOR
                ================================================== */}

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.1em]
                  text-muted-foreground
                "
              >
                Year
              </span>


              <div
                className="
                  relative
                "
              >

                <select
                  value={
                    selectedYear
                  }
                  onChange={(
                    event
                  ) =>
                    setSelectedYear(
                      event.target
                        .value as
                        | "2026"
                        | "2025"
                    )
                  }
                  className="
                    h-10
                    appearance-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-3
                    pr-9
                    text-xs
                    font-extrabold
                    text-slate-700
                    outline-none
                    transition
                    focus:border-primary
                    focus:ring-4
                    focus:ring-primary/10
                  "
                >

                  <option
                    value="2026"
                  >
                    2026
                  </option>

                  <option
                    value="2025"
                  >
                    2025
                  </option>

                </select>


                <ChevronDown
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-slate-400
                  "
                />

              </div>

            </div>

          </CardHeader>


          <CardContent
            className="
              px-5
              pb-7
            "
          >

            {/* ==================================================
                CHART
                ================================================== */}

            <div
              className="
                overflow-x-auto
                pt-4
              "
            >

              <div
                className="
                  min-w-[760px]
                "
              >

                {/* ==============================================
                    TOOLTIP / ACTIVE MONTH
                    ============================================== */}

                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-primary
                      "
                    />


                    <span
                      className="
                        text-xs
                        font-bold
                        text-muted-foreground
                      "
                    >
                      Selected:
                    </span>


                    <span
                      className="
                        text-xs
                        font-black
                        text-foreground
                      "
                    >
                      {activeMonth}
                    </span>

                  </div>


                  <Badge
                    variant="outline"
                    className="
                      rounded-full
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-wide
                    "
                  >

                    {selectedYear}
                    {" "}
                    registration trend

                  </Badge>

                </div>


                {/* ==============================================
                    GRID + BARS
                    ============================================== */}

                <div
                  className="
                    relative
                    h-80
                  "
                >

                  {/* ==========================================
                      HORIZONTAL GUIDE LINES
                      ========================================== */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      bottom-10
                      top-0
                      flex
                      flex-col
                      justify-between
                    "
                  >

                    <div
                      className="
                        border-t
                        border-dashed
                        border-slate-200
                      "
                    />

                    <div
                      className="
                        border-t
                        border-dashed
                        border-slate-200
                      "
                    />

                    <div
                      className="
                        border-t
                        border-dashed
                        border-slate-200
                      "
                    />

                    <div
                      className="
                        border-t
                        border-dashed
                        border-slate-200
                      "
                    />

                    <div
                      className="
                        border-t
                        border-slate-200
                      "
                    />

                  </div>


                  {/* ==========================================
                      BAR GRID
                      ========================================== */}

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-10
                      top-0
                      grid
                      grid-cols-12
                      items-end
                      gap-2
                      px-2
                    "
                  >

                    {registrationData.map(
                      (
                        month
                      ) => {

                        const active =
                          month.shortMonth ===
                          activeMonth;


                        return (

                          <button
                            key={
                              month.shortMonth
                            }
                            type="button"
                            onClick={() =>
                              handleMonthClick(
                                month
                              )
                            }
                            className="
                              group
                              relative
                              flex
                              h-full
                              items-end
                              justify-center
                              rounded-xl
                              outline-none
                            "
                            title={
                              `${month.month}: ${formatNumber(month.registrations)} registrations`
                            }
                          >

                            {/* ====================================
                                BAR
                                ==================================== */}

                            <div
                              className={`
                                relative
                                w-full
                                max-w-12
                                rounded-t-xl
                                transition-all
                                duration-300
                                ${
                                  active
                                    ? "bg-primary shadow-lg shadow-primary/20"
                                    : "bg-primary/25 group-hover:bg-primary/50"
                                }
                              `}
                              style={{
                                height:
                                  getBarHeight(
                                    month.percentage
                                  ),
                              }}
                            >

                              {/* ==================================
                                  VALUE LABEL
                                  ================================== */}

                              <div
                                className={`
                                  absolute
                                  -top-7
                                  left-1/2
                                  -translate-x-1/2
                                  whitespace-nowrap
                                  rounded-lg
                                  px-2
                                  py-1
                                  text-[9px]
                                  font-black
                                  transition
                                  ${
                                    active
                                      ? "bg-primary text-white opacity-100"
                                      : "bg-slate-900 text-white opacity-0 group-hover:opacity-100"
                                  }
                                `}
                              >
                                {formatNumber(
                                  month.registrations
                                )}
                              </div>

                            </div>

                          </button>

                        );

                      }
                    )}

                  </div>


                  {/* ==========================================
                      MONTH LABELS
                      ========================================== */}

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      grid
                      grid-cols-12
                      gap-2
                      px-2
                    "
                  >

                    {registrationData.map(
                      (
                        month
                      ) => (

                        <button
                          key={
                            month.shortMonth
                          }
                          type="button"
                          onClick={() =>
                            handleMonthClick(
                              month
                            )
                          }
                          className="
                            text-center
                            text-[9px]
                            font-extrabold
                            uppercase
                            tracking-[0.05em]
                            text-muted-foreground
                            transition-colors
                            hover:text-primary
                          "
                        >

                          {month.shortMonth}

                        </button>

                      )
                    )}

                  </div>

                </div>

              </div>

            </div>


            {/* ==================================================
                ACTIVE MONTH DETAILS
                ================================================== */}

            <div
              className="
                mt-5
                grid
                gap-3
                sm:grid-cols-3
              "
            >

              {(() => {

                const selected =
                  registrationData.find(
                    (
                      item
                    ) =>
                      item.shortMonth ===
                      activeMonth
                  ) ||
                  registrationData[0];


                return (

                  <>

                    <div
                      className="
                        rounded-2xl
                        bg-muted/40
                        p-4
                      "
                    >

                      <p
                        className="
                          text-[9px]
                          font-extrabold
                          uppercase
                          tracking-[0.1em]
                          text-muted-foreground
                        "
                      >
                        Selected Month
                      </p>


                      <p
                        className="
                          mt-1
                          text-lg
                          font-black
                          text-foreground
                        "
                      >
                        {selected.month}
                      </p>

                    </div>


                    <div
                      className="
                        rounded-2xl
                        bg-muted/40
                        p-4
                      "
                    >

                      <p
                        className="
                          text-[9px]
                          font-extrabold
                          uppercase
                          tracking-[0.1em]
                          text-muted-foreground
                        "
                      >
                        Registrations
                      </p>


                      <p
                        className="
                          mt-1
                          text-lg
                          font-black
                          text-foreground
                        "
                      >
                        {formatNumber(
                          selected.registrations
                        )}
                      </p>

                    </div>


                    <div
                      className="
                        rounded-2xl
                        bg-muted/40
                        p-4
                      "
                    >

                      <p
                        className="
                          text-[9px]
                          font-extrabold
                          uppercase
                          tracking-[0.1em]
                          text-muted-foreground
                        "
                      >
                        Relative Activity
                      </p>


                      <p
                        className="
                          mt-1
                          text-lg
                          font-black
                          text-primary
                        "
                      >
                        {selected.percentage}%
                      </p>

                    </div>

                  </>

                );

              })()}

            </div>

          </CardContent>

        </Card>


        {/* ====================================================
            PLATFORM METRICS
            ==================================================== */}

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

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Gauge
                    className="
                      h-5
                      w-5
                      text-primary
                    "
                  />


                  <CardTitle
                    className="
                      text-base
                      font-black
                    "
                  >
                    Platform Metrics
                  </CardTitle>

                </div>


                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-muted-foreground
                  "
                >
                  Operational health and community
                  performance indicators.
                </p>

              </div>


              <Badge
                className="
                  hidden
                  rounded-full
                  bg-emerald-50
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-emerald-700
                  sm:inline-flex
                "
              >

                Live Metrics

              </Badge>

            </div>

          </CardHeader>


          <CardContent
            className="
              px-5
              pb-6
            "
          >

            <div
              className="
                grid
                gap-6
                lg:grid-cols-2
              "
            >

              {PLATFORM_METRICS.map(
                (
                  metric
                ) => {

                  const MetricIcon =
                    metric.icon;


                  return (

                    <button
                      key={
                        metric.id
                      }
                      type="button"
                      onClick={() =>
                        setInfoMetric(
                          metric
                        )
                      }
                      className="
                        group
                        rounded-2xl
                        border
                        border-border/60
                        bg-background
                        p-5
                        text-left
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:border-primary/20
                        hover:shadow-md
                      "
                    >

                      {/* ========================================
                          TOP
                          ======================================== */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
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
                            className={`
                              flex
                              h-11
                              w-11
                              items-center
                              justify-center
                              rounded-xl
                              ${metric.backgroundClass}
                            `}
                          >

                            <MetricIcon
                              className={`
                                h-5
                                w-5
                                ${metric.iconClass}
                              `}
                            />

                          </div>


                          <div>

                            <p
                              className="
                                text-sm
                                font-extrabold
                                text-foreground
                              "
                            >
                              {metric.label}
                            </p>


                            <p
                              className="
                                mt-1
                                text-[10px]
                                font-medium
                                text-muted-foreground
                              "
                            >
                              {metric.description}
                            </p>

                          </div>

                        </div>


                        <div
                          className="
                            text-right
                          "
                        >

                          <p
                            className="
                              text-xl
                              font-black
                              text-foreground
                            "
                          >
                            {metric.value}
                          </p>

                        </div>

                      </div>


                      {/* ========================================
                          PROGRESS
                          ======================================== */}

                      <div
                        className="
                          mt-5
                        "
                      >

                        <div
                          className="
                            h-2.5
                            overflow-hidden
                            rounded-full
                            bg-slate-100
                          "
                        >

                          <div
                            className={`
                              h-full
                              rounded-full
                              transition-all
                              duration-500
                              ${metric.progressClass}
                            `}
                            style={{
                              width:
                                `${metric.percentage}%`,
                            }}
                          />

                        </div>


                        <div
                          className="
                            mt-2
                            flex
                            items-center
                            justify-between
                          "
                        >

                          <span
                            className="
                              text-[9px]
                              font-extrabold
                              uppercase
                              tracking-[0.08em]
                              text-muted-foreground
                            "
                          >
                            Operational Level
                          </span>


                          <span
                            className="
                              text-[9px]
                              font-extrabold
                              text-primary
                            "
                          >
                            Click for details
                          </span>

                        </div>

                      </div>

                    </button>

                  );

                }
              )}

            </div>

          </CardContent>

        </Card>


        {/* ====================================================
            PERFORMANCE SNAPSHOT
            ==================================================== */}

        <section
          className="
            grid
            gap-6
            xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]
          "
        >


          {/* ==================================================
              EVENT PERFORMANCE
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
                    Event Performance
                  </CardTitle>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      text-muted-foreground
                    "
                  >
                    Core operational signals
                    across the EventDevX platform.
                  </p>

                </div>


                <Activity
                  className="
                    h-5
                    w-5
                    text-primary
                  "
                />

              </div>

            </CardHeader>


            <CardContent
              className="
                px-5
                pb-6
              "
            >

              <div
                className="
                  grid
                  gap-4
                  sm:grid-cols-2
                "
              >


                {/* ==========================================
                    EVENT SUCCESS
                    ========================================== */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-emerald-100
                    bg-emerald-50/60
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-100
                        text-emerald-600
                      "
                    >

                      <CheckCircle2
                        className="
                          h-5
                          w-5
                        "
                      />

                    </div>


                    <span
                      className="
                        text-2xl
                        font-black
                        text-emerald-700
                      "
                    >
                      92%
                    </span>

                  </div>


                  <p
                    className="
                      mt-5
                      text-sm
                      font-black
                      text-slate-900
                    "
                  >
                    Event Success Rate
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      leading-5
                      text-slate-500
                    "
                  >
                    Events completing their
                    intended operational lifecycle.
                  </p>


                  <div
                    className="
                      mt-4
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-white
                    "
                  >

                    <div
                      className="
                        h-full
                        w-[92%]
                        rounded-full
                        bg-emerald-500
                      "
                    />

                  </div>

                </div>


                {/* ==========================================
                    SERVER UPTIME
                    ========================================== */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-blue-100
                    bg-blue-50/60
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-100
                        text-blue-600
                      "
                    >

                      <Server
                        className="
                          h-5
                          w-5
                        "
                      />

                    </div>


                    <span
                      className="
                        text-2xl
                        font-black
                        text-blue-700
                      "
                    >
                      99.9%
                    </span>

                  </div>


                  <p
                    className="
                      mt-5
                      text-sm
                      font-black
                      text-slate-900
                    "
                  >
                    Server Uptime
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      leading-5
                      text-slate-500
                    "
                  >
                    Availability across
                    connected EventDevX infrastructure.
                  </p>


                  <div
                    className="
                      mt-4
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-white
                    "
                  >

                    <div
                      className="
                        h-full
                        w-[99.9%]
                        rounded-full
                        bg-blue-500
                      "
                    />

                  </div>

                </div>


                {/* ==========================================
                    CERTIFICATE VALIDITY
                    ========================================== */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-amber-100
                    bg-amber-50/60
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
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


                    <span
                      className="
                        text-2xl
                        font-black
                        text-amber-700
                      "
                    >
                      100%
                    </span>

                  </div>


                  <p
                    className="
                      mt-5
                      text-sm
                      font-black
                      text-slate-900
                    "
                  >
                    Certificate Validity
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      leading-5
                      text-slate-500
                    "
                  >
                    Current certificates passing
                    platform validation checks.
                  </p>


                  <div
                    className="
                      mt-4
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-white
                    "
                  >

                    <div
                      className="
                        h-full
                        w-full
                        rounded-full
                        bg-amber-500
                      "
                    />

                  </div>

                </div>


                {/* ==========================================
                    RETENTION
                    ========================================== */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-indigo-100
                    bg-indigo-50/60
                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-100
                        text-indigo-600
                      "
                    >

                      <Users
                        className="
                          h-5
                          w-5
                        "
                      />

                    </div>


                    <span
                      className="
                        text-2xl
                        font-black
                        text-indigo-700
                      "
                    >
                      87%
                    </span>

                  </div>


                  <p
                    className="
                      mt-5
                      text-sm
                      font-black
                      text-slate-900
                    "
                  >
                    User Retention
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      leading-5
                      text-slate-500
                    "
                  >
                    Returning community members
                    continuing to use the platform.
                  </p>


                  <div
                    className="
                      mt-4
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-white
                    "
                  >

                    <div
                      className="
                        h-full
                        w-[87%]
                        rounded-full
                        bg-indigo-600
                      "
                    />

                  </div>

                </div>

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              LIVE ANALYTICS SNAPSHOT
              ================================================== */}

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
                -right-10
                -top-10
                h-40
                w-40
                rounded-full
                bg-indigo-500/20
                blur-3xl
              "
            />


            <div
              className="
                pointer-events-none
                absolute
                -bottom-10
                -left-8
                h-32
                w-32
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
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/10
                  text-white
                "
              >

                <Network
                  className="
                    h-5
                    w-5
                  "
                />

              </div>


              <h3
                className="
                  mt-5
                  text-xl
                  font-black
                  tracking-tight
                "
              >
                Analytics Pulse
              </h3>


              <p
                className="
                  mt-2
                  text-xs
                  font-medium
                  leading-6
                  text-slate-300
                "
              >
                Your current analytics layer
                is tracking registrations,
                event performance, infrastructure
                health and certificate activity.
              </p>


              <div
                className="
                  mt-6
                  space-y-3
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Zap
                      className="
                        h-4
                        w-4
                        text-cyan-300
                      "
                    />

                    <span
                      className="
                        text-xs
                        font-bold
                        text-white/80
                      "
                    >
                      Network status
                    </span>

                  </div>


                  <span
                    className="
                      flex
                      items-center
                      gap-1.5
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-wide
                      text-emerald-300
                    "
                  >

                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-emerald-400
                      "
                    />

                    LIVE

                  </span>

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Database
                      className="
                        h-4
                        w-4
                        text-violet-300
                      "
                    />

                    <span
                      className="
                        text-xs
                        font-bold
                        text-white/80
                      "
                    >
                      Data sync
                    </span>

                  </div>


                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-wide
                      text-white/60
                    "
                  >
                    Just now
                  </span>

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-3
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <ShieldCheck
                      className="
                        h-4
                        w-4
                        text-emerald-300
                      "
                    />

                    <span
                      className="
                        text-xs
                        font-bold
                        text-white/80
                      "
                    >
                      Data integrity
                    </span>

                  </div>


                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-wide
                      text-emerald-300
                    "
                  >
                    Verified
                  </span>

                </div>

              </div>


              <Button
                type="button"
                className="
                  mt-6
                  w-full
                  gap-2
                  rounded-xl
                  bg-white
                  font-extrabold
                  text-slate-900
                  hover:bg-primary
                  hover:text-white
                "
                onClick={
                  handleRefresh
                }
              >

                <RefreshCw
                  className="
                    h-4
                    w-4
                  "
                />

                Sync Analytics

              </Button>

            </div>

          </div>

        </section>


        {/* ====================================================
            FOOTER STATUS
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
                Analytics services operational
              </p>


              <p
                className="
                  text-[10px]
                  font-medium
                  text-muted-foreground
                "
              >
                Current dashboard values are
                ready for database integration.
              </p>

            </div>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.08em]
              text-muted-foreground
            "
          >

            <Activity
              className="
                h-3.5
                w-3.5
                text-primary
              "
            />

            EventDevX Analytics

          </div>

        </section>

      </div>


      {/* ======================================================
          METRIC DETAILS MODAL
          ====================================================== */}

      {infoMetric && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/50
            p-4
            backdrop-blur-sm
          "
          onClick={() =>
            setInfoMetric(
              null
            )
          }
        >

          <div
            className="
              w-full
              max-w-lg
              rounded-3xl
              bg-white
              p-6
              shadow-2xl
              sm:p-8
            "
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
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
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    ${infoMetric.backgroundClass}
                  `}
                >

                  <infoMetric.icon
                    className={`
                      h-5
                      w-5
                      ${infoMetric.iconClass}
                    `}
                  />

                </div>


                <div>

                  <p
                    className="
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.1em]
                      text-slate-400
                    "
                  >
                    Platform Metric
                  </p>


                  <h3
                    className="
                      mt-1
                      text-xl
                      font-black
                      text-slate-950
                    "
                  >
                    {infoMetric.label}
                  </h3>

                </div>

              </div>


              <button
                type="button"
                onClick={() =>
                  setInfoMetric(
                    null
                  )
                }
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-slate-100
                  text-slate-500
                  transition
                  hover:bg-slate-200
                "
              >

                <X
                  className="
                    h-4
                    w-4
                  "
                />

              </button>

            </div>


            <div
              className="
                mt-7
                rounded-2xl
                bg-slate-50
                p-5
              "
            >

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
                    text-slate-600
                  "
                >
                  Current Value
                </span>


                <span
                  className="
                    text-3xl
                    font-black
                    text-slate-950
                  "
                >
                  {infoMetric.value}
                </span>

              </div>


              <div
                className="
                  mt-5
                  h-3
                  overflow-hidden
                  rounded-full
                  bg-white
                "
              >

                <div
                  className={`
                    h-full
                    rounded-full
                    ${infoMetric.progressClass}
                  `}
                  style={{
                    width:
                      `${infoMetric.percentage}%`,
                  }}
                />

              </div>


              <div
                className="
                  mt-2
                  flex
                  justify-between
                  text-[10px]
                  font-bold
                  text-slate-400
                "
              >

                <span>
                  0%
                </span>

                <span>
                  {infoMetric.percentage}%
                </span>

                <span>
                  100%
                </span>

              </div>

            </div>


            <p
              className="
                mt-5
                text-sm
                font-medium
                leading-7
                text-slate-600
              "
            >
              {infoMetric.description}
            </p>


            <div
              className="
                mt-5
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-emerald-100
                bg-emerald-50
                p-4
              "
            >

              <ShieldCheck
                className="
                  h-5
                  w-5
                  shrink-0
                  text-emerald-600
                "
              />


              <p
                className="
                  text-xs
                  font-bold
                  leading-5
                  text-emerald-700
                "
              >
                This metric is currently represented
                as a frontend analytics value and
                will be connected to live EventDevX
                data during the Supabase integration phase.
              </p>

            </div>


            <Button
              type="button"
              className="
                mt-6
                w-full
                rounded-xl
              "
              onClick={() =>
                setInfoMetric(
                  null
                )
              }
            >
              Close
            </Button>

          </div>

        </div>

      )}

    </DashboardLayout>

  );

};


export default Analytics;