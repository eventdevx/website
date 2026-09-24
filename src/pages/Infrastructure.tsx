import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cpu,
  Gauge,
  HardDrive,
  Laptop,
  Monitor,
  Package,
  Radio,
  RefreshCw,
  Router,
  Server,
  Shield,
  ShieldCheck,
  Tablet,
  Truck,
  Wifi,
  X,
  Zap,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "@/contexts/AuthContext";

import {
  createEventDevXRequest,
} from "@/lib/requestService";

import RequestModal from "@/components/requests/RequestModal";
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
   EQUIPMENT STATUS
   ============================================================ */

type EquipmentStatus =
  | "available"
  | "limited";


/* ============================================================
   EQUIPMENT TYPE
   ============================================================ */

interface EquipmentItem {

  id: number;

  name: string;

  description: string;

  available: number;

  total: number;

  status: EquipmentStatus;

  icon: typeof Monitor;

  iconClass: string;

  backgroundClass: string;

}


/* ============================================================
   EQUIPMENT DATA
   ============================================================ */

const EQUIPMENT_DATA:
  EquipmentItem[] = [

  {
    id:
      1,

    name:
      "Judging Monitor Set (4K)",

    description:
      "4K monitor set for judges, mentors and event operations.",

    available:
      12,

    total:
      20,

    status:
      "available",

    icon:
      Monitor,

    iconClass:
      "text-blue-600",

    backgroundClass:
      "bg-blue-100",
  },

  {
    id:
      2,

    name:
      "Portable WiFi Router (1Gbps)",

    description:
      "High-speed portable connectivity for temporary event zones.",

    available:
      28,

    total:
      40,

    status:
      "available",

    icon:
      Wifi,

    iconClass:
      "text-cyan-600",

    backgroundClass:
      "bg-cyan-100",
  },

  {
    id:
      3,

    name:
      "Check-in Tablet Kit",

    description:
      "Tablet-based registration and participant check-in setup.",

    available:
      5,

    total:
      12,

    status:
      "limited",

    icon:
      Tablet,

    iconClass:
      "text-amber-600",

    backgroundClass:
      "bg-amber-100",
  },

];


/* ============================================================
   INFRASTRUCTURE SERVICES
   ============================================================ */

const INFRASTRUCTURE_SERVICES = [

  {
    id:
      "bandwidth",

    title:
      "Dedicated Bandwidth",

    value:
      "10Gbps",

    description:
      "High-speed dedicated network bandwidth for event operations.",

    icon:
      Wifi,

    iconClass:
      "text-blue-600",

    backgroundClass:
      "bg-blue-100",
  },

  {
    id:
      "kiosks",

    title:
      "Check-in Kiosks",

    value:
      "48",

    description:
      "Ready-to-deploy event registration and check-in kiosks.",

    icon:
      Monitor,

    iconClass:
      "text-emerald-600",

    backgroundClass:
      "bg-emerald-100",
  },

  {
    id:
      "support",

    title:
      "Tech Support",

    value:
      "24/7",

    description:
      "Operational technical support for active event infrastructure.",

    icon:
      Cpu,

    iconClass:
      "text-amber-600",

    backgroundClass:
      "bg-amber-100",
  },

  {
    id:
      "sla",

    title:
      "SLA Guarantee",

    value:
      "99.9%",

    description:
      "Infrastructure availability target for supported deployments.",

    icon:
      Shield,

    iconClass:
      "text-violet-600",

    backgroundClass:
      "bg-violet-100",
  },

];


/* ============================================================
   INFRASTRUCTURE REQUEST TYPE
   ============================================================ */

interface InfrastructureRequest {

  eventName: string;

  eventType: string;

  location: string;

  eventDate: string;

  expectedParticipants: string;

  requirements: string;

}


/* ============================================================
   DEFAULT REQUEST
   ============================================================ */

const DEFAULT_REQUEST:
  InfrastructureRequest = {

  eventName:
    "",

  eventType:
    "Hackathon",

  location:
    "",

  eventDate:
    "",

  expectedParticipants:
    "",

  requirements:
    "",

};


/* ============================================================
   INFRASTRUCTURE PAGE
   ============================================================ */

const Infrastructure = () => {

  const navigate =
    useNavigate();

  const reduceMotion =
    useReducedMotion();

  const {
    user,
  } = useAuth();

  /* ==========================================================
     REQUEST MODAL
     ========================================================== */

  const [
    requestOpen,
    setRequestOpen,
  ] = useState(false);


  /* ==========================================================
     REQUEST FORM
     ========================================================== */

  const [
    request,
    setRequest,
  ] = useState<InfrastructureRequest>(
    DEFAULT_REQUEST
  );


  /* ==========================================================
     SUBMISSION STATE
     ========================================================== */

  const [
    submitting,
    setSubmitting,
  ] = useState(false);


  /* ==========================================================
     BOOKING STATE
     ========================================================== */

  const [
    bookedEquipment,
    setBookedEquipment,
  ] = useState<number[]>(
    []
  );


  /* ==========================================================
     BOOKING MESSAGE
     ========================================================== */

  const [
    bookingMessage,
    setBookingMessage,
  ] = useState("");

  /* ==========================================================
     FIREBASE REQUEST RESULT
     ========================================================== */

  const [
    submittedRequestId,
    setSubmittedRequestId,
  ] = useState("");


  /* ==========================================================
     REFRESH STATE
     ========================================================== */

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);


  /* ==========================================================
     SUMMARY VALUES
     ========================================================== */

  const totalEquipment =
    useMemo(() => {

      return EQUIPMENT_DATA.reduce(
        (
          total,
          equipment
        ) =>
          total +
          equipment.total,
        0
      );

    }, []);


  const availableEquipment =
    useMemo(() => {

      return EQUIPMENT_DATA.reduce(
        (
          total,
          equipment
        ) =>
          total +
          equipment.available,
        0
      );

    }, []);


  const availabilityPercentage =
    useMemo(() => {

      if (
        totalEquipment ===
        0
      ) {

        return 0;

      }


      return Math.round(
        (
          availableEquipment /
          totalEquipment
        ) *
        100
      );

    }, [
      totalEquipment,
      availableEquipment,
    ]);


  /* ==========================================================
     HANDLE EQUIPMENT BOOKING
     ========================================================== */

  const handleBookEquipment = (
    equipment:
      EquipmentItem
  ) => {

    if (
      bookedEquipment.includes(
        equipment.id
      )
    ) {

      setBookingMessage(
        `${equipment.name} is already in your request.`
      );

      return;

    }


    if (
      equipment.available <=
      0
    ) {

      setBookingMessage(
        `${equipment.name} is currently unavailable.`
      );

      return;

    }


    setBookedEquipment(
      (
        current
      ) => [
        ...current,
        equipment.id,
      ]
    );


    setBookingMessage(
      `${equipment.name} added to your infrastructure request.`
    );

  };


  /* ==========================================================
     CLEAR BOOKING MESSAGE
     ========================================================== */

  const clearBookingMessage =
    () => {

      setBookingMessage("");

    };


  /* ==========================================================
     SUBMIT REQUEST TO FIREBASE
     ========================================================== */

  const handleSubmitRequest =
    async () => {

      setBookingMessage("");

      setSubmittedRequestId("");


      if (
        !user
      ) {

        setBookingMessage(
          "Please sign in before submitting an infrastructure request."
        );

        return;

      }


      if (
        !request.eventName.trim()
      ) {

        setBookingMessage(
          "Please enter the event name."
        );

        return;

      }


      if (
        !request.location.trim()
      ) {

        setBookingMessage(
          "Please enter the event location."
        );

        return;

      }


      if (
        !request.eventDate.trim()
      ) {

        setBookingMessage(
          "Please select the event date."
        );

        return;

      }


      if (
        !request.expectedParticipants.trim()
      ) {

        setBookingMessage(
          "Please enter the expected participant count."
        );

        return;

      }


      if (
        Number(
          request.expectedParticipants
        ) < 1
      ) {

        setBookingMessage(
          "Expected participants must be at least 1."
        );

        return;

      }


      setSubmitting(
        true
      );


      try {

        const selectedEquipment =
          EQUIPMENT_DATA
            .filter(
              (
                equipment
              ) =>
                bookedEquipment.includes(
                  equipment.id
                )
            )
            .map(
              (
                equipment
              ) =>
                equipment.name
            );


        const equipmentList =
          selectedEquipment.length >
          0
            ? selectedEquipment.join(
                ", "
              )
            : "No individual equipment selected";


        const requestDescription =
          [
            `Event type: ${request.eventType}`,
            `Event location: ${request.location}`,
            `Event date: ${request.eventDate}`,
            `Expected participants: ${request.expectedParticipants}`,
            `Selected equipment: ${equipmentList}`,
          ].join(
            " | "
          );


        const result =
          await createEventDevXRequest(
            {
              type:
                "infrastructure",

              title:
                `Infrastructure Request - ${request.eventName}`,

              item:
                equipmentList,

              description:
                requestDescription,

              quantity:
                Math.max(
                  1,
                  selectedEquipment.length
                ),

              eventName:
                request.eventName,

              preferredDate:
                request.eventDate,

              note:
                [
                  `Location: ${request.location}`,
                  `Requirements: ${request.requirements}`,
                ].join(
                  " | "
                ),
            }
          );


        setSubmittedRequestId(
          result.id
        );


        setSubmitting(
          false
        );


        setRequestOpen(
          false
        );


        setBookingMessage(
          `Infrastructure request submitted successfully. Request ID: ${result.id}`
        );


        setRequest(
          DEFAULT_REQUEST
        );


        setBookedEquipment(
          []
        );

      } catch (
        error
      ) {

        console.error(
          "EventDevX infrastructure request failed:",
          error
        );


        setSubmitting(
          false
        );


        setBookingMessage(
          error instanceof
            Error
            ? error.message
            : "Infrastructure request could not be submitted. Please try again."
        );

      }

    };


  /* ==========================================================
     REFRESH INFRASTRUCTURE
     ========================================================== */

  const handleRefresh =
    () => {

      setRefreshing(
        true
      );

      setBookingMessage("");

      setSubmittedRequestId("");


      window.setTimeout(
        () => {

          setRefreshing(
            false
          );

          setBookingMessage(
            "Infrastructure inventory view refreshed."
          );

        },
        850
      );

    };


  /* ==========================================================
     SELECTED EQUIPMENT NAMES
     ========================================================== */

  const selectedEquipmentNames =
    useMemo(() => {

      return EQUIPMENT_DATA
        .filter(
          (
            equipment
          ) =>
            bookedEquipment.includes(
              equipment.id
            )
        )
        .map(
          (
            equipment
          ) =>
            equipment.name
        );

    }, [
      bookedEquipment,
    ]);


  /* ==========================================================
     OPEN REQUEST HISTORY
     ========================================================== */

  const handleOpenRequestHistory =
    () => {

      navigate(
        "/requests"
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
                  bg-violet-100
                  text-violet-600
                "
              >

                <Server
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
                  text-violet-600
                "
              >
                EventDevX Operations
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
              Infrastructure Hub
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
              Hardware kits,
              server instances
              and on-ground
              operational resources
              for your events.
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
              variant="outline"
              className="
                gap-2
                rounded-xl
              "
              onClick={
                handleOpenRequestHistory
              }
            >

              <Package
                className="
                  h-4
                  w-4
                "
              />

              My Requests

            </Button>


            <Button
              type="button"
              className="
                gap-2
                rounded-xl
              "
              onClick={() =>
                setRequestOpen(
                  true
                )
              }
            >

              <Truck
                className="
                  h-4
                  w-4
                "
              />

              Request Infrastructure

            </Button>

          </div>

        </section>


        {/* ====================================================
            MAIN INFRASTRUCTURE HERO
            ==================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            bg-gradient-to-br
            from-slate-950
            to-slate-800
            p-7
            text-white
            shadow-xl
            sm:p-9
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-indigo-500/15
              blur-3xl
            "
          />


          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              left-1/3
              h-56
              w-56
              rounded-full
              bg-cyan-400/10
              blur-3xl
            "
          />


          <div
            className="
              relative
              z-10
              grid
              gap-8
              lg:grid-cols-[minmax(0,1fr)_340px]
              lg:items-center
            "
          >

            <div>

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-indigo-500/20
                  text-indigo-300
                "
              >

                <Server
                  className="
                    h-7
                    w-7
                  "
                />

              </div>


              <h3
                className="
                  mt-5
                  text-3xl
                  font-black
                  tracking-tight
                  sm:text-4xl
                "
              >
                Infrastructure that
                keeps your event moving.
              </h3>


              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  font-medium
                  leading-7
                  text-slate-300
                "
              >
                Access network connectivity,
                check-in equipment,
                operational hardware
                and technical support
                through the EventDevX
                infrastructure layer.
              </p>


              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-3
                "
              >

                <Button
                  type="button"
                  className="
                    gap-2
                    rounded-xl
                    bg-white
                    text-slate-900
                    hover:bg-primary
                    hover:text-white
                  "
                  onClick={() =>
                    setRequestOpen(
                      true
                    )
                  }
                >

                  <Package
                    className="
                      h-4
                      w-4
                    "
                  />

                  Request an Event Kit

                </Button>


                <Badge
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-2
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-slate-200
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

                  Infrastructure Live

                </Badge>


                <Badge
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-2
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-slate-200
                  "
                >

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-cyan-300
                    "
                  />

                  Firebase Requests

                </Badge>

              </div>

            </div>


            {/* ==================================================
                HEALTH SCORE
                ================================================== */}

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6
                backdrop-blur-md
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
                    items-center
                    gap-2
                  "
                >

                  <Gauge
                    className="
                      h-4
                      w-4
                      text-cyan-300
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.12em]
                      text-slate-300
                    "
                  >
                    Infrastructure Health
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

                  Operational

                </span>

              </div>


              <div
                className="
                  mt-6
                  flex
                  items-end
                  gap-2
                "
              >

                <span
                  className="
                    text-5xl
                    font-black
                    tracking-tight
                  "
                >
                  99.9%
                </span>


                <span
                  className="
                    mb-1
                    text-xs
                    font-semibold
                    text-slate-400
                  "
                >
                  SLA
                </span>

              </div>


              <div
                className="
                  mt-5
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-white/10
                "
              >

                <div
                  className="
                    h-full
                    w-[99.9%]
                    rounded-full
                    bg-emerald-400
                  "
                />

              </div>


              <p
                className="
                  mt-3
                  text-[10px]
                  font-medium
                  leading-5
                  text-slate-400
                "
              >
                Event infrastructure is currently
                operating within the configured
                availability target.
              </p>

            </div>

          </div>

        </section>


        {/* ====================================================
            SERVICE CARDS
            ==================================================== */}

        <section
          className="
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          {INFRASTRUCTURE_SERVICES.map(
            (
              service
            ) => {

              const Icon =
                service.icon;


              return (

                <motion.div
                  key={
                    service.id
                  }
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -5,
                          rotateX: 1.2,
                          rotateY: -1,
                        }
                  }
                  transition={{
                    duration: 0.24,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  style={{
                    transformPerspective:
                      1200,
                    transformStyle:
                      "preserve-3d",
                  }}
                >

                <Card
                  className="
                    rounded-2xl
                    border
                    border-border/70
                    bg-card
                    shadow-sm
                    transition-all
                    duration-300
                    hover:shadow-lg
                  "
                >

                  <CardContent
                    className="
                      p-5
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
                        ${service.backgroundClass}
                      `}
                    >

                      <Icon
                        className={`
                          h-5
                          w-5
                          ${service.iconClass}
                        `}
                      />

                    </div>


                    <p
                      className="
                        mt-5
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.1em]
                        text-muted-foreground
                      "
                    >
                      {service.title}
                    </p>


                    <p
                      className="
                        mt-1
                        text-2xl
                        font-black
                        text-foreground
                      "
                    >
                      {service.value}
                    </p>


                    <p
                      className="
                        mt-2
                        text-xs
                        font-medium
                        leading-5
                        text-muted-foreground
                      "
                    >
                      {service.description}
                    </p>

                  </CardContent>

                </Card>

                </motion.div>

              );

            }
          )}

        </section>


        {/* ====================================================
            EQUIPMENT SECTION
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
              gap-3
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

                <HardDrive
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
                  Available Equipment
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
                Current equipment availability
                across EventDevX operations.
              </p>

            </div>


            <Badge
              variant="outline"
              className="
                w-fit
                rounded-full
                text-[9px]
                font-extrabold
                uppercase
                tracking-wide
              "
            >

              {availableEquipment}
              {" / "}
              {totalEquipment}
              {" "}
              available

            </Badge>

          </CardHeader>


          <CardContent
            className="
              px-5
              pb-6
            "
          >

            {/* ==================================================
                AVAILABILITY BAR
                ================================================== */}

            <div
              className="
                mb-5
                rounded-2xl
                bg-muted/40
                p-4
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

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Gauge
                    className="
                      h-4
                      w-4
                      text-primary
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-bold
                      text-foreground
                    "
                  >
                    Overall availability
                  </span>

                </div>


                <span
                  className="
                    text-xs
                    font-black
                    text-primary
                  "
                >
                  {availabilityPercentage}%
                </span>

              </div>


              <div
                className="
                  mt-3
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-white
                "
              >

                <div
                  className="
                    h-full
                    rounded-full
                    bg-primary
                  "
                  style={{
                    width:
                      `${availabilityPercentage}%`,
                  }}
                />

              </div>

            </div>


            {/* ==================================================
                EQUIPMENT LIST
                ================================================== */}

            <div
              className="
                space-y-3
              "
            >

              {EQUIPMENT_DATA.map(
                (
                  equipment
                ) => {

                  const Icon =
                    equipment.icon;


                  const booked =
                    bookedEquipment.includes(
                      equipment.id
                    );


                  const percent =
                    Math.round(
                      (
                        equipment.available /
                        equipment.total
                      ) *
                      100
                    );


                  return (

                    <motion.div
                      key={
                        equipment.id
                      }
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -3,
                              rotateX: 0.8,
                              rotateY: -0.6,
                            }
                      }
                      transition={{
                        duration: 0.2,
                        ease: [
                          0.16,
                          1,
                          0.3,
                          1,
                        ],
                      }}
                      style={{
                        transformPerspective:
                          1100,
                        transformStyle:
                          "preserve-3d",
                      }}
                    >

                    <div
                      className="
                        flex
                        flex-col
                        gap-4
                        rounded-2xl
                        border
                        border-border/60
                        bg-background
                        p-4
                        transition
                        hover:border-primary/20
                        hover:shadow-sm
                        sm:flex-row
                        sm:items-center
                      "
                    >

                      {/* =========================================
                          ICON
                          ========================================= */}

                      <div
                        className={`
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          ${equipment.backgroundClass}
                        `}
                      >

                        <Icon
                          className={`
                            h-5
                            w-5
                            ${equipment.iconClass}
                          `}
                        />

                      </div>


                      {/* =========================================
                          DETAILS
                          ========================================= */}

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
                            gap-2
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                          "
                        >

                          <div>

                            <p
                              className="
                                text-sm
                                font-black
                                text-foreground
                              "
                            >
                              {equipment.name}
                            </p>


                            <p
                              className="
                                mt-1
                                text-xs
                                font-medium
                                leading-5
                                text-muted-foreground
                              "
                            >
                              {equipment.description}
                            </p>

                          </div>


                          <Badge
                            className={`
                              w-fit
                              rounded-full
                              border
                              text-[9px]
                              font-extrabold
                              uppercase
                              tracking-wide
                              ${
                                equipment.status ===
                                "available"
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                  : "border-amber-200 bg-amber-50 text-amber-700"
                              }
                            `}
                          >

                            {equipment.status ===
                            "available"
                              ? `${equipment.available} Available`
                              : `${equipment.available} Left`}

                          </Badge>

                        </div>


                        {/* =========================================
                            AVAILABILITY PROGRESS
                            ========================================= */}

                        <div
                          className="
                            mt-4
                          "
                        >

                          <div
                            className="
                              h-1.5
                              overflow-hidden
                              rounded-full
                              bg-slate-100
                            "
                          >

                            <div
                              className={`
                                h-full
                                rounded-full
                                ${
                                  equipment.status ===
                                  "available"
                                    ? "bg-emerald-500"
                                    : "bg-amber-500"
                                }
                              `}
                              style={{
                                width:
                                  `${percent}%`,
                              }}
                            />

                          </div>

                        </div>

                      </div>


                      {/* =========================================
                          BOOK ACTION
                          ========================================= */}

                      <Button
                        type="button"
                        variant={
                          booked
                            ? "secondary"
                            : "outline"
                        }
                        className="
                          shrink-0
                          gap-2
                          rounded-xl
                        "
                        disabled={
                          booked
                        }
                        onClick={() =>
                          handleBookEquipment(
                            equipment
                          )
                        }
                      >

                        {booked ? (

                          <>
                            <CheckCircle2
                              className="
                                h-4
                                w-4
                              "
                            />

                            Added

                          </>

                        ) : (

                          <>
                            <Package
                              className="
                                h-4
                                w-4
                              "
                            />

                            Book

                          </>

                        )}

                      </Button>

                    </div>

                    </motion.div>

                  );

                }
              )}

            </div>


            {/* ==================================================
                BOOKING MESSAGE
                ================================================== */}

            {bookingMessage && (

              <div
                className="
                  mt-4
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-primary/10
                  bg-primary/5
                  p-4
                "
              >

                <CheckCircle2
                  className="
                    mt-0.5
                    h-4
                    w-4
                    shrink-0
                    text-primary
                  "
                />


                <p
                  className="
                    flex-1
                    text-xs
                    font-semibold
                    leading-5
                    text-primary
                  "
                >
                  {bookingMessage}
                </p>


                <button
                  type="button"
                  onClick={
                    clearBookingMessage
                  }
                  className="
                    text-primary/60
                    transition
                    hover:text-primary
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

            )}


            {submittedRequestId && (

              <div
                className="
                  mt-3
                  rounded-2xl
                  border
                  border-emerald-200
                  bg-emerald-50
                  p-4
                "
              >

                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  <CheckCircle2
                    className="
                      mt-0.5
                      h-4
                      w-4
                      shrink-0
                      text-emerald-600
                    "
                  />

                  <div
                    className="
                      min-w-0
                    "
                  >

                    <p
                      className="
                        text-xs
                        font-extrabold
                        text-emerald-800
                      "
                    >
                      Firebase request created
                    </p>

                    <p
                      className="
                        mt-1
                        break-all
                        font-mono
                        text-[10px]
                        font-semibold
                        text-emerald-700
                      "
                    >
                      Request ID: {
                        submittedRequestId
                      }
                    </p>

                  </div>

                </div>

              </div>

            )}

          </CardContent>

        </Card>


        {/* ====================================================
            OPERATIONS SNAPSHOT
            ==================================================== */}

        <section
          className="
            grid
            gap-6
            lg:grid-cols-2
          "
        >


          {/* ==================================================
              EVENT OPERATIONS
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
                    Operations Snapshot
                  </CardTitle>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      text-muted-foreground
                    "
                  >
                    Current operational state.
                  </p>

                </div>


                <ActivityIcon />

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
                  space-y-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    bg-muted/40
                    p-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <Radio
                      className="
                        h-4
                        w-4
                        text-emerald-600
                      "
                    />

                    <div>

                      <p
                        className="
                          text-xs
                          font-bold
                          text-foreground
                        "
                      >
                        Network Connectivity
                      </p>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          font-medium
                          text-muted-foreground
                        "
                      >
                        Event connectivity layer
                      </p>

                    </div>

                  </div>


                  <span
                    className="
                      text-xs
                      font-black
                      text-emerald-600
                    "
                  >
                    99.9%
                  </span>

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    bg-muted/40
                    p-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <Monitor
                      className="
                        h-4
                        w-4
                        text-blue-600
                      "
                    />

                    <div>

                      <p
                        className="
                          text-xs
                          font-bold
                          text-foreground
                        "
                      >
                        Check-in Capacity
                      </p>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          font-medium
                          text-muted-foreground
                        "
                      >
                        Kiosk fleet readiness
                      </p>

                    </div>

                  </div>


                  <span
                    className="
                      text-xs
                      font-black
                      text-blue-600
                    "
                  >
                    48 units
                  </span>

                </div>


                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    bg-muted/40
                    p-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <Cpu
                      className="
                        h-4
                        w-4
                        text-amber-600
                      "
                    />

                    <div>

                      <p
                        className="
                          text-xs
                          font-bold
                          text-foreground
                        "
                      >
                        Technical Support
                      </p>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          font-medium
                          text-muted-foreground
                        "
                      >
                        Operational support window
                      </p>

                    </div>

                  </div>


                  <span
                    className="
                      text-xs
                      font-black
                      text-amber-600
                    "
                  >
                    24 / 7
                  </span>

                </div>

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              REQUESTED EQUIPMENT
              ================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              bg-gradient-to-br
              from-indigo-950
              to-slate-900
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
                relative
                z-10
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
                  bg-white/10
                "
              >

                <Truck
                  className="
                    h-5
                    w-5
                  "
                />

              </div>


              <h3
                className="
                  mt-5
                  text-lg
                  font-black
                "
              >
                Need an event kit?
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
                Submit your event requirements
                and the EventDevX operations layer
                can prepare the required
                infrastructure package.
              </p>


              <div
                className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-3
                "
              >

                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-3
                  "
                >

                  <Router
                    className="
                      h-4
                      w-4
                      text-cyan-300
                    "
                  />


                  <p
                    className="
                      mt-2
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-wide
                      text-white/60
                    "
                  >
                    Networking
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-bold
                    "
                  >
                    10Gbps
                  </p>

                </div>


                <div
                  className="
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    p-3
                  "
                >

                  <Laptop
                    className="
                      h-4
                      w-4
                      text-violet-300
                    "
                  />


                  <p
                    className="
                      mt-2
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-wide
                      text-white/60
                    "
                  >
                    Hardware
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-bold
                    "
                  >
                    Event Kits
                  </p>

                </div>

              </div>


              <Button
                type="button"
                className="
                  mt-5
                  w-full
                  gap-2
                  rounded-xl
                  bg-white
                  text-slate-900
                  hover:bg-primary
                  hover:text-white
                "
                onClick={() =>
                  setRequestOpen(
                    true
                  )
                }
              >

                Start Infrastructure Request

                <ArrowRight
                  className="
                    h-4
                    w-4
                  "
                />

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

              <ShieldCheck
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
                Infrastructure operations are active
              </p>


              <p
                className="
                  text-[10px]
                  font-medium
                  text-muted-foreground
                "
              >
                Equipment inventory and operational
                services are available.
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

            <Clock3
              className="
                h-3.5
                w-3.5
                text-primary
              "
            />

            Last checked just now

          </div>

        </section>

      </div>


      {/* ======================================================
          REQUEST INFRASTRUCTURE MODAL
          ====================================================== */}

      {requestOpen && (

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
            setRequestOpen(
              false
            )
          }
        >

          <div
            className="
              max-h-[90vh]
              w-full
              max-w-xl
              overflow-y-auto
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

            {/* ==================================================
                MODAL HEADER
                ================================================== */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >

              <div>

                <div
                  className="
                    mb-3
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                  "
                >

                  <Truck
                    className="
                      h-5
                      w-5
                    "
                  />

                </div>


                <h3
                  className="
                    text-2xl
                    font-black
                    tracking-tight
                    text-slate-950
                  "
                >
                  Request Infrastructure
                </h3>


                <p
                  className="
                    mt-1
                    text-sm
                    font-medium
                    leading-6
                    text-slate-500
                  "
                >
                  Tell the EventDevX operations
                  team what your event needs.
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setRequestOpen(
                    false
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


            {/* ==================================================
                FORM
                ================================================== */}

            <div
              className="
                mt-7
                space-y-5
              "
            >

              {/* ==============================================
                  EVENT NAME
                  ============================================== */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >
                  Event Name
                </label>


                <input
                  type="text"
                  value={
                    request.eventName
                  }
                  onChange={(
                    event
                  ) =>
                    setRequest({
                      ...request,
                      eventName:
                        event.target.value,
                    })
                  }
                  placeholder="e.g. Indo-Hack 2026"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    font-medium
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-primary
                    focus:bg-white
                    focus:ring-4
                    focus:ring-primary/10
                  "
                />

              </div>


              {/* ==============================================
                  EVENT TYPE
                  ============================================== */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >
                  Event Type
                </label>


                <select
                  value={
                    request.eventType
                  }
                  onChange={(
                    event
                  ) =>
                    setRequest({
                      ...request,
                      eventType:
                        event.target.value,
                    })
                  }
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    font-medium
                    outline-none
                    transition
                    focus:border-primary
                    focus:bg-white
                    focus:ring-4
                    focus:ring-primary/10
                  "
                >

                  <option>
                    Hackathon
                  </option>

                  <option>
                    Conference
                  </option>

                  <option>
                    Workshop
                  </option>

                  <option>
                    Summit
                  </option>

                  <option>
                    College Event
                  </option>

                  <option>
                    Community Event
                  </option>

                </select>

              </div>


              {/* ==============================================
                  LOCATION + DATE
                  ============================================== */}

              <div
                className="
                  grid
                  gap-4
                  sm:grid-cols-2
                "
              >

                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    Location
                  </label>


                  <input
                    type="text"
                    value={
                      request.location
                    }
                    onChange={(
                      event
                    ) =>
                      setRequest({
                        ...request,
                        location:
                          event.target.value,
                      })
                    }
                    placeholder="City / Venue / Remote"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      font-medium
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-primary
                      focus:bg-white
                      focus:ring-4
                      focus:ring-primary/10
                    "
                  />

                </div>


                <div>

                  <label
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    Event Date
                  </label>


                  <input
                    type="date"
                    value={
                      request.eventDate
                    }
                    onChange={(
                      event
                    ) =>
                      setRequest({
                        ...request,
                        eventDate:
                          event.target.value,
                      })
                    }
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      text-sm
                      font-medium
                      outline-none
                      transition
                      focus:border-primary
                      focus:bg-white
                      focus:ring-4
                      focus:ring-primary/10
                    "
                  />

                </div>

              </div>


              {/* ==============================================
                  PARTICIPANTS
                  ============================================== */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >
                  Expected Participants
                </label>


                <input
                  type="number"
                  min="1"
                  value={
                    request.expectedParticipants
                  }
                  onChange={(
                    event
                  ) =>
                    setRequest({
                      ...request,
                      expectedParticipants:
                        event.target.value,
                    })
                  }
                  placeholder="e.g. 500"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    text-sm
                    font-medium
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-primary
                    focus:bg-white
                    focus:ring-4
                    focus:ring-primary/10
                  "
                />

              </div>


              {/* ==============================================
                  REQUIREMENTS
                  ============================================== */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >
                  Infrastructure Requirements
                </label>


                <textarea
                  value={
                    request.requirements
                  }
                  onChange={(
                    event
                  ) =>
                    setRequest({
                      ...request,
                      requirements:
                        event.target.value,
                    })
                  }
                  placeholder="Tell us about network, kiosks, monitors, support or other requirements..."
                  className="
                    min-h-32
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    font-medium
                    leading-6
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-primary
                    focus:bg-white
                    focus:ring-4
                    focus:ring-primary/10
                  "
                />

              </div>


              {/* ==============================================
                  BOOKED EQUIPMENT
                  ============================================== */}

              {bookedEquipment.length >
                0 && (

                <div
                  className="
                    rounded-2xl
                    border
                    border-primary/10
                    bg-primary/5
                    p-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Package
                      className="
                        h-4
                        w-4
                        text-primary
                      "
                    />


                    <p
                      className="
                        text-xs
                        font-extrabold
                        text-primary
                      "
                    >
                      Selected equipment
                    </p>

                  </div>


                  <div
                    className="
                      mt-3
                      space-y-2
                    "
                  >

                    {EQUIPMENT_DATA
                      .filter(
                        (
                          item
                        ) =>
                          bookedEquipment.includes(
                            item.id
                          )
                      )
                      .map(
                        (
                          item
                        ) => (

                          <div
                            key={
                              item.id
                            }
                            className="
                              flex
                              items-center
                              gap-2
                              text-xs
                              font-semibold
                              text-slate-600
                            "
                          >

                            <CheckCircle2
                              className="
                                h-3.5
                                w-3.5
                                text-emerald-500
                              "
                            />

                            {item.name}

                          </div>

                        )
                      )}

                  </div>

                </div>

              )}


              {/* ==============================================
                  ERROR / STATUS
                  ============================================== */}

              {bookingMessage && (

                <div
                  className="
                    rounded-2xl
                    border
                    border-primary/10
                    bg-primary/5
                    p-4
                    text-xs
                    font-semibold
                    leading-5
                    text-primary
                  "
                >
                  {bookingMessage}
                </div>

              )}


              {/* ==============================================
                  ACTIONS
                  ============================================== */}

              <div
                className="
                  flex
                  flex-col-reverse
                  gap-3
                  pt-2
                  sm:flex-row
                  sm:justify-end
                "
              >

                <Button
                  type="button"
                  variant="outline"
                  className="
                    rounded-xl
                  "
                  onClick={
                    handleOpenRequestHistory
                  }
                >
                  My Requests
                </Button>


                <Button
                  type="button"
                  variant="outline"
                  className="
                    rounded-xl
                  "
                  onClick={() =>
                    setRequestOpen(
                      false
                    )
                  }
                >
                  Cancel
                </Button>


                <Button
                  type="button"
                  className="
                    gap-2
                    rounded-xl
                  "
                  onClick={() =>
                    void handleSubmitRequest()
                  }
                  disabled={
                    submitting
                  }
                >

                  {submitting ? (

                    <>
                      <RefreshCw
                        className="
                          h-4
                          w-4
                          animate-spin
                        "
                      />

                      Submitting...

                    </>

                  ) : (

                    <>
                      Submit Request

                      <ArrowRight
                        className="
                          h-4
                          w-4
                        "
                      />

                    </>

                  )}

                </Button>

              </div>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>

  );

};


/* ============================================================
   ACTIVITY ICON
   ============================================================ */

const ActivityIcon = () => {

  return (

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

      <Zap
        className="
          h-4
          w-4
        "
      />

    </div>

  );

};


export default Infrastructure;