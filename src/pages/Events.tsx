import {
  ArrowLeft,
  Bookmark,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  Filter,
  MapPin,
  Plus,
  Rocket,
  Search,
  SlidersHorizontal,
  Sparkles,
  Ticket,
  Users,
  X,
  Zap,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
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
   EVENT TYPES
   ============================================================ */

type EventStatus =
  | "live"
  | "pending"
  | "upcoming"
  | "completed";


type EventFilter =
  | "all"
  | "live"
  | "hackathon"
  | "college"
  | "upcoming";


/* ============================================================
   EVENT DATA TYPE
   ============================================================ */

interface EventItem {
  id: number;

  name: string;

  type: string;

  status: EventStatus;

  color: string;

  participants: number;

  desc: string;

  location: string;

  date: string;

  time: string;

  duration: string;

  organizer: string;

  featured?: boolean;
}


/* ============================================================
   EVENTS DATA
   ============================================================ */

const EVENTS_DATA: EventItem[] = [

  {
    id: 1,

    name: "Indo-Hack 2026",

    type: "Hackathon",

    status: "live",

    color: "#4f46e5",

    participants: 2300,

    desc:
      "India's largest decentralized hackathon on ZK-Proof technologies.",

    location:
      "New Delhi, India",

    date:
      "September 24, 2026",

    time:
      "09:00 AM",

    duration:
      "48 Hours",

    organizer:
      "EventDevX Core",

    featured: true,
  },

  {
    id: 2,

    name: "TechSummit Alpha",

    type: "College Level",

    status: "pending",

    color: "#d97706",

    participants: 500,

    desc:
      "Building regional innovation ecosystems across North India.",

    location:
      "Chandigarh, India",

    date:
      "October 04, 2026",

    time:
      "10:00 AM",

    duration:
      "2 Days",

    organizer:
      "Campus Innovation Network",
  },

  {
    id: 3,

    name: "PyConf India",

    type: "Conference",

    status: "upcoming",

    color: "#10b981",

    participants: 1200,

    desc:
      "Pythonistas unite for two days of talks, workshops and sprints.",

    location:
      "Bengaluru, India",

    date:
      "October 18, 2026",

    time:
      "09:30 AM",

    duration:
      "2 Days",

    organizer:
      "Python Community India",
  },

  {
    id: 4,

    name: "WebDev Sprint",

    type: "Hackathon",

    status: "live",

    color: "#8b5cf6",

    participants: 780,

    desc:
      "48-hour frontend and fullstack challenge for the community.",

    location:
      "Remote",

    date:
      "September 25, 2026",

    time:
      "06:00 PM",

    duration:
      "48 Hours",

    organizer:
      "EventDevX Web Guild",
  },

  {
    id: 5,

    name: "AI Olympiad 2026",

    type: "Summit",

    status: "upcoming",

    color: "#ef4444",

    participants: 3000,

    desc:
      "National-level AI competition across 50+ colleges.",

    location:
      "Mumbai, India",

    date:
      "November 08, 2026",

    time:
      "09:00 AM",

    duration:
      "3 Days",

    organizer:
      "AI Builders Collective",
  },

  {
    id: 6,

    name: "Open Source Day",

    type: "Workshop",

    status: "upcoming",

    color: "#06b6d4",

    participants: 400,

    desc:
      "Learn to contribute to open source in a guided hackathon setting.",

    location:
      "Pune, India",

    date:
      "November 21, 2026",

    time:
      "11:00 AM",

    duration:
      "1 Day",

    organizer:
      "Open Source India",
  },

];


/* ============================================================
   FILTER LIST
   ============================================================ */

const FILTERS: {
  label: string;
  value: EventFilter;
}[] = [

  {
    label: "All Events",
    value: "all",
  },

  {
    label: "Live",
    value: "live",
  },

  {
    label: "Hackathon",
    value: "hackathon",
  },

  {
    label: "College",
    value: "college",
  },

  {
    label: "Upcoming",
    value: "upcoming",
  },

];


/* ============================================================
   STATUS LABEL
   ============================================================ */

function getStatusLabel(
  status: EventStatus
) {

  if (status === "live") {
    return "LIVE";
  }

  if (status === "pending") {
    return "PENDING";
  }

  if (status === "completed") {
    return "COMPLETED";
  }

  return "UPCOMING";

}


/* ============================================================
   STATUS COLOR
   ============================================================ */

function getStatusColor(
  status: EventStatus
) {

  if (status === "live") {

    return {
      text:
        "text-emerald-700",

      background:
        "bg-emerald-50",

      border:
        "border-emerald-200",

      dot:
        "bg-emerald-500",
    };

  }


  if (status === "pending") {

    return {
      text:
        "text-amber-700",

      background:
        "bg-amber-50",

      border:
        "border-amber-200",

      dot:
        "bg-amber-500",
    };

  }


  if (status === "completed") {

    return {
      text:
        "text-slate-700",

      background:
        "bg-slate-50",

      border:
        "border-slate-200",

      dot:
        "bg-slate-500",
    };

  }


  return {
    text:
      "text-blue-700",

    background:
      "bg-blue-50",

    border:
      "border-blue-200",

    dot:
      "bg-blue-500",
  };

}


/* ============================================================
   EVENT CARD
   ============================================================ */

interface EventCardProps {
  event: EventItem;

  bookmarked: boolean;

  onBookmark: (
    event: EventItem
  ) => void;

  onOpen: (
    event: EventItem
  ) => void;
}


/* ============================================================
   EVENT CARD COMPONENT
   ============================================================ */

const EventCard = ({
  event,
  bookmarked,
  onBookmark,
  onOpen,
}: EventCardProps) => {

  const status =
    getStatusColor(
      event.status
    );

  const statusLabel =
    getStatusLabel(
      event.status
    );


  return (

    <Card
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-border/70
        bg-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >


      {/* ====================================================
          EVENT BANNER
          ==================================================== */}

      <div
        className="
          relative
          h-40
          overflow-hidden
        "
        style={{
          background: `
            linear-gradient(
              135deg,
              ${event.color},
              ${event.color}cc
            )
          `,
        }}
      >

        {/* ==================================================
            DECORATIVE SHAPE
            ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -right-8
            -top-8
            h-28
            w-28
            rounded-full
            border
            border-white/20
            bg-white/5
          "
        />


        <div
          className="
            pointer-events-none
            absolute
            -bottom-12
            left-10
            h-32
            w-32
            rounded-full
            bg-white/10
            blur-2xl
          "
        />


        {/* ==================================================
            EVENT ICON
            ================================================== */}

        <div
          className="
            absolute
            left-4
            top-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-white/15
            text-white
            backdrop-blur-md
          "
        >

          {event.type
            .toLowerCase()
            .includes("hackathon") ? (

            <Rocket
              className="
                h-5
                w-5
              "
            />

          ) : event.type
            .toLowerCase()
            .includes("conference") ? (

            <Calendar
              className="
                h-5
                w-5
              "
            />

          ) : (

            <Sparkles
              className="
                h-5
                w-5
              "
            />

          )}

        </div>


        {/* ==================================================
            STATUS
            ================================================== */}

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
              px-3
              py-1.5
              text-[10px]
              font-extrabold
              uppercase
              tracking-wide
              shadow-sm
            "
          >

            <span
              className={`
                h-1.5
                w-1.5
                rounded-full
                ${status.dot}
              `}
            />

            <span
              className="
                text-slate-800
              "
            >
              {statusLabel}
            </span>

          </span>

        </div>


        {/* ==================================================
            EVENT NAME
            ================================================== */}

        <div
          className="
            absolute
            bottom-4
            left-4
            right-4
          "
        >

          <span
            className="
              mb-1
              inline-flex
              rounded-full
              bg-white/15
              px-2.5
              py-1
              text-[9px]
              font-extrabold
              uppercase
              tracking-[0.08em]
              text-white
              backdrop-blur-md
            "
          >
            {event.type}
          </span>


          <h3
            className="
              mt-1
              text-xl
              font-black
              tracking-tight
              text-white
            "
          >
            {event.name}
          </h3>

        </div>

      </div>


      {/* ====================================================
          EVENT BODY
          ==================================================== */}

      <CardContent
        className="
          p-5
        "
      >

        {/* ==================================================
            DESCRIPTION
            ================================================== */}

        <p
          className="
            min-h-[42px]
            text-xs
            font-medium
            leading-relaxed
            text-muted-foreground
          "
        >
          {event.desc}
        </p>


        {/* ==================================================
            DETAILS
            ================================================== */}

        <div
          className="
            mt-4
            space-y-2.5
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              text-[11px]
              font-semibold
              text-muted-foreground
            "
          >

            <MapPin
              className="
                h-3.5
                w-3.5
                shrink-0
                text-primary
              "
            />

            <span
              className="
                truncate
              "
            >
              {event.location}
            </span>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              text-[11px]
              font-semibold
              text-muted-foreground
            "
          >

            <Calendar
              className="
                h-3.5
                w-3.5
                shrink-0
                text-primary
              "
            />

            <span>
              {event.date}
            </span>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              text-[11px]
              font-semibold
              text-muted-foreground
            "
          >

            <Clock3
              className="
                h-3.5
                w-3.5
                shrink-0
                text-primary
              "
            />

            <span>
              {event.time}
              {" · "}
              {event.duration}
            </span>

          </div>

        </div>


        {/* ==================================================
            ORGANIZER
            ================================================== */}

        <div
          className="
            mt-4
            rounded-xl
            bg-muted/50
            px-3
            py-2.5
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
            Organizer
          </p>


          <p
            className="
              mt-0.5
              truncate
              text-xs
              font-bold
              text-foreground
            "
          >
            {event.organizer}
          </p>

        </div>


        {/* ==================================================
            FOOTER
            ================================================== */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            gap-3
          "
        >

          {/* =================================================
              PARTICIPANTS
              ================================================= */}

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
                  bg-indigo-500
                  text-[8px]
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
                  text-[8px]
                  font-black
                  text-white
                "
              >
                P
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
                +
              </div>

            </div>


            <div
              className="
                flex
                items-center
                gap-1
                text-[10px]
                font-bold
                text-muted-foreground
              "
            >

              <Users
                className="
                  h-3
                  w-3
                "
              />

              {event.participants.toLocaleString()}

            </div>

          </div>


          {/* =================================================
              ACTIONS
              ================================================= */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="
                h-9
                w-9
                rounded-xl
              "
              onClick={() =>
                onBookmark(
                  event
                )
              }
              title={
                bookmarked
                  ? "Remove bookmark"
                  : "Bookmark event"
              }
            >

              <Bookmark
                className={`
                  h-4
                  w-4
                  ${
                    bookmarked
                      ? "fill-current text-primary"
                      : "text-muted-foreground"
                  }
                `}
              />

            </Button>


            <Button
              type="button"
              size="icon"
              className="
                h-9
                w-9
                rounded-xl
              "
              onClick={() =>
                onOpen(
                  event
                )
              }
              title="Open event"
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

      </CardContent>

    </Card>

  );

};


/* ============================================================
   EVENTS PAGE
   ============================================================ */

const Events = () => {

  /* ==========================================================
     ROUTER
     ========================================================== */

  const navigate =
    useNavigate();


  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();


  /* ==========================================================
     SEARCH
     ========================================================== */

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");


  /* ==========================================================
     FILTER
     ========================================================== */

  const [
    activeFilter,
    setActiveFilter,
  ] = useState<EventFilter>(
    "all"
  );


  /* ==========================================================
     BOOKMARKS
     ========================================================== */

  const [
    bookmarkedEvents,
    setBookmarkedEvents,
  ] = useState<number[]>(
    []
  );


  /* ==========================================================
     SELECTED EVENT
     ========================================================== */

  const [
    selectedEvent,
    setSelectedEvent,
  ] = useState<EventItem | null>(
    null
  );


  /* ==========================================================
     MOBILE FILTER
     ========================================================== */

  const [
    filtersOpen,
    setFiltersOpen,
  ] = useState(false);


  /* ==========================================================
     CREATE EVENT MODAL
     ========================================================== */

  const [
    createEventOpen,
    setCreateEventOpen,
  ] = useState(false);


  /* ==========================================================
     CREATE EVENT FORM
     ========================================================== */

  const [
    newEventName,
    setNewEventName,
  ] = useState("");


  const [
    newEventType,
    setNewEventType,
  ] = useState("Hackathon");


  const [
    newEventLocation,
    setNewEventLocation,
  ] = useState("");


  const [
    newEventDescription,
    setNewEventDescription,
  ] = useState("");


  /* ==========================================================
     EVENT SEARCH + FILTER
     ========================================================== */

  const filteredEvents =
    useMemo(() => {

      return EVENTS_DATA.filter(
        (event) => {

          /* ================================================
             SEARCH
             ================================================ */

          const query =
            searchQuery
              .trim()
              .toLowerCase();


          const matchesSearch =
            !query ||
            event.name
              .toLowerCase()
              .includes(query) ||
            event.type
              .toLowerCase()
              .includes(query) ||
            event.desc
              .toLowerCase()
              .includes(query) ||
            event.location
              .toLowerCase()
              .includes(query);


          if (!matchesSearch) {
            return false;
          }


          /* ================================================
             FILTER
             ================================================ */

          if (
            activeFilter ===
            "all"
          ) {
            return true;
          }


          if (
            activeFilter ===
            "live"
          ) {
            return (
              event.status ===
              "live"
            );
          }


          if (
            activeFilter ===
            "upcoming"
          ) {
            return (
              event.status ===
              "upcoming"
            );
          }


          if (
            activeFilter ===
            "hackathon"
          ) {
            return event.type
              .toLowerCase()
              .includes(
                "hackathon"
              );
          }


          if (
            activeFilter ===
            "college"
          ) {
            return event.type
              .toLowerCase()
              .includes(
                "college"
              );
          }


          return true;

        }
      );

    }, [
      searchQuery,
      activeFilter,
    ]);


  /* ==========================================================
     BOOKMARK HANDLER
     ========================================================== */

  const handleBookmark = (
    event: EventItem
  ) => {

    setBookmarkedEvents(
      (current) => {

        if (
          current.includes(
            event.id
          )
        ) {

          return current.filter(
            (id) =>
              id !== event.id
          );

        }


        return [
          ...current,
          event.id,
        ];

      }
    );

  };


  /* ==========================================================
     OPEN EVENT
     ========================================================== */

  const handleOpenEvent = (
    event: EventItem
  ) => {

    setSelectedEvent(
      event
    );

    setSearchParams({
      event:
        String(event.id),
    });

  };


  /* ==========================================================
     CLOSE EVENT
     ========================================================== */

  const handleCloseEvent = () => {

    setSelectedEvent(
      null
    );

    setSearchParams({});

  };


  /* ==========================================================
     CREATE EVENT
     ========================================================== */

  const handleCreateEvent = () => {

    if (
      !newEventName.trim()
    ) {
      return;
    }


    /*
     * This first version only creates the local UI object.
     *
     * We will connect this action to Supabase later.
     */

    const temporaryEvent: EventItem = {

      id:
        Date.now(),

      name:
        newEventName.trim(),

      type:
        newEventType,

      status:
        "pending",

      color:
        "#6366f1",

      participants:
        0,

      desc:
        newEventDescription.trim() ||
        "New EventDevX event awaiting configuration.",

      location:
        newEventLocation.trim() ||
        "Location to be announced",

      date:
        "To be scheduled",

      time:
        "To be announced",

      duration:
        "To be confirmed",

      organizer:
        "EventDevX",

    };


    /*
     * We don't push into EVENTS_DATA because it is
     * intentionally treated as the current mock source.
     *
     * The modal closes here and Supabase will become the
     * source of truth in the database phase.
     */

    setCreateEventOpen(
      false
    );


    setSelectedEvent(
      temporaryEvent
    );


    setNewEventName("");

    setNewEventLocation("");

    setNewEventDescription("");

    setNewEventType(
      "Hackathon"
    );

  };


  /* ==========================================================
     AUTO OPEN EVENT FROM URL
     ========================================================== */

  const requestedEventId =
    searchParams.get(
      "event"
    );


  if (
    requestedEventId &&
    !selectedEvent
  ) {

    const event =
      EVENTS_DATA.find(
        (item) =>
          String(item.id) ===
          requestedEventId
      );


    if (event) {

      setSelectedEvent(
        event
      );

    }

  }


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


        {/* ==================================================
            PAGE HEADER
            ================================================== */}

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

              <span
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

                <Calendar
                  className="
                    h-4
                    w-4
                  "
                />

              </span>


              <span
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.15em]
                  text-primary
                "
              >
                EventDevX Arena
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
              Explore Events
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
              Discover active hackathons,
              campus events, conferences,
              workshops and community
              experiences across the
              EventDevX network.
            </p>

          </div>


          {/* ==================================================
              CREATE EVENT
              ================================================== */}

          <Button
            type="button"
            className="
              gap-2
              rounded-xl
              self-start
              lg:self-auto
            "
            onClick={() =>
              setCreateEventOpen(
                true
              )
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

        </section>


        {/* ==================================================
            SEARCH + FILTERS
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
              p-4
            "
          >

            <div
              className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-center
              "
            >


              {/* =============================================
                  SEARCH
                  ============================================= */}

              <div
                className="
                  relative
                  min-w-0
                  flex-1
                "
              >

                <Search
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-slate-400
                  "
                />


                <input
                  type="text"
                  value={
                    searchQuery
                  }
                  onChange={(
                    event
                  ) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Search events, hackathons..."
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    pl-11
                    pr-11
                    text-sm
                    font-medium
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-primary
                    focus:bg-white
                    focus:ring-4
                    focus:ring-primary/10
                  "
                />


                {searchQuery && (

                  <button
                    type="button"
                    onClick={() =>
                      setSearchQuery(
                        ""
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      h-8
                      w-8
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-lg
                      text-slate-400
                      transition
                      hover:bg-slate-200
                      hover:text-slate-700
                    "
                  >

                    <X
                      className="
                        h-4
                        w-4
                      "
                    />

                  </button>

                )}

              </div>


              {/* =============================================
                  MOBILE FILTER TOGGLE
                  ============================================= */}

              <Button
                type="button"
                variant="outline"
                className="
                  gap-2
                  rounded-xl
                  lg:hidden
                "
                onClick={() =>
                  setFiltersOpen(
                    (
                      current
                    ) =>
                      !current
                  )
                }
              >

                <SlidersHorizontal
                  className="
                    h-4
                    w-4
                  "
                />

                Filters

                <ChevronDown
                  className={`
                    h-4
                    w-4
                    transition-transform
                    ${
                      filtersOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />

              </Button>


              {/* =============================================
                  DESKTOP FILTER ICON
                  ============================================= */}

              <div
                className="
                  hidden
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  text-muted-foreground
                  lg:flex
                "
              >

                <Filter
                  className="
                    h-4
                    w-4
                  "
                />

                Filter:

              </div>


              {/* =============================================
                  FILTER CHIPS
                  ============================================= */}

              <div
                className={`
                  ${
                    filtersOpen
                      ? "flex"
                      : "hidden"
                  }
                  flex-wrap
                  gap-2
                  lg:flex
                `}
              >

                {FILTERS.map(
                  (filter) => {

                    const active =
                      activeFilter ===
                      filter.value;


                    return (

                      <button
                        key={
                          filter.value
                        }
                        type="button"
                        onClick={() =>
                          setActiveFilter(
                            filter.value
                          )
                        }
                        className={`
                          rounded-full
                          border
                          px-4
                          py-2
                          text-xs
                          font-extrabold
                          transition-all
                          duration-200
                          ${
                            active
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : "border-slate-200 bg-white text-slate-500 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                          }
                        `}
                      >
                        {filter.label}
                      </button>

                    );

                  }
                )}

              </div>

            </div>

          </CardContent>

        </Card>


        {/* ==================================================
            RESULTS INFO
            ================================================== */}

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
                font-bold
                text-foreground
              "
            >

              {filteredEvents.length}

              {" "}

              {filteredEvents.length ===
              1
                ? "event"
                : "events"}

              {" "}
              found

            </p>


            {(searchQuery ||
              activeFilter !==
                "all") && (

              <p
                className="
                  mt-1
                  text-xs
                  font-medium
                  text-muted-foreground
                "
              >
                Showing filtered results
              </p>

            )}

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.1em]
              text-muted-foreground
            "
          >

            <Zap
              className="
                h-3.5
                w-3.5
                text-primary
              "
            />

            Live network data

          </div>

        </div>


        {/* ==================================================
            EVENTS GRID
            ================================================== */}

        {filteredEvents.length > 0 ? (

          <section
            className="
              grid
              gap-5
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >

            {filteredEvents.map(
              (event) => (

                <EventCard
                  key={
                    event.id
                  }
                  event={
                    event
                  }
                  bookmarked={
                    bookmarkedEvents.includes(
                      event.id
                    )
                  }
                  onBookmark={
                    handleBookmark
                  }
                  onOpen={
                    handleOpenEvent
                  }
                />

              )
            )}

          </section>

        ) : (

          /* ================================================
             EMPTY STATE
             ================================================ */

          <Card
            className="
              rounded-2xl
              border
              border-dashed
              border-border
              bg-card
              shadow-sm
            "
          >

            <CardContent
              className="
                flex
                min-h-80
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-muted
                  text-muted-foreground
                "
              >

                <Search
                  className="
                    h-7
                    w-7
                  "
                />

              </div>


              <h3
                className="
                  mt-5
                  text-lg
                  font-black
                  text-foreground
                "
              >
                No events found
              </h3>


              <p
                className="
                  mt-2
                  max-w-md
                  text-sm
                  font-medium
                  leading-6
                  text-muted-foreground
                "
              >
                Try a different search term
                or change the event filters
                to discover more EventDevX
                activities.
              </p>


              <Button
                type="button"
                variant="outline"
                className="
                  mt-5
                  rounded-xl
                "
                onClick={() => {

                  setSearchQuery(
                    ""
                  );

                  setActiveFilter(
                    "all"
                  );

                }}
              >
                Clear Filters
              </Button>

            </CardContent>

          </Card>

        )}


        {/* ==================================================
            EVENT NETWORK SUMMARY
            ================================================== */}

        <section
          className="
            grid
            gap-4
            md:grid-cols-3
          "
        >


          {/* =================================================
              LIVE
              ================================================= */}

          <Card
            className="
              rounded-2xl
              border
              border-emerald-100
              bg-emerald-50/70
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
                  bg-emerald-100
                  text-emerald-600
                "
              >

                <Rocket
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
                    tracking-[0.12em]
                    text-emerald-700
                  "
                >
                  Live Events
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-slate-900
                  "
                >
                  {
                    EVENTS_DATA.filter(
                      (event) =>
                        event.status ===
                        "live"
                    ).length
                  }
                </p>

              </div>

            </CardContent>

          </Card>


          {/* =================================================
              UPCOMING
              ================================================= */}

          <Card
            className="
              rounded-2xl
              border
              border-blue-100
              bg-blue-50/70
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
                  bg-blue-100
                  text-blue-600
                "
              >

                <Calendar
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
                    tracking-[0.12em]
                    text-blue-700
                  "
                >
                  Upcoming
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-slate-900
                  "
                >
                  {
                    EVENTS_DATA.filter(
                      (event) =>
                        event.status ===
                        "upcoming"
                    ).length
                  }
                </p>

              </div>

            </CardContent>

          </Card>


          {/* =================================================
              TOTAL PARTICIPANTS
              ================================================= */}

          <Card
            className="
              rounded-2xl
              border
              border-violet-100
              bg-violet-50/70
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
                    tracking-[0.12em]
                    text-violet-700
                  "
                >
                  Registrations
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-slate-900
                  "
                >
                  {
                    EVENTS_DATA
                      .reduce(
                        (
                          total,
                          event
                        ) =>
                          total +
                          event.participants,
                        0
                      )
                      .toLocaleString()
                  }
                </p>

              </div>

            </CardContent>

          </Card>

        </section>

      </div>


      {/* ======================================================
          EVENT DETAILS MODAL
          ====================================================== */}

      {selectedEvent && (

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
          onClick={
            handleCloseEvent
          }
        >

          <div
            className="
              max-h-[90vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-3xl
              bg-white
              shadow-2xl
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
                relative
                h-52
                overflow-hidden
              "
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    ${selectedEvent.color},
                    ${selectedEvent.color}cc
                  )
                `,
              }}
            >

              <div
                className="
                  absolute
                  right-[-30px]
                  top-[-30px]
                  h-40
                  w-40
                  rounded-full
                  bg-white/10
                "
              />


              <div
                className="
                  absolute
                  bottom-[-50px]
                  left-[-20px]
                  h-44
                  w-44
                  rounded-full
                  bg-white/10
                  blur-2xl
                "
              />


              <button
                type="button"
                onClick={
                  handleCloseEvent
                }
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/15
                  text-white
                  backdrop-blur-md
                  transition
                  hover:bg-white/25
                "
              >

                <X
                  className="
                    h-5
                    w-5
                  "
                />

              </button>


              <div
                className="
                  absolute
                  bottom-6
                  left-6
                  right-6
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

                  <Badge
                    className="
                      border-0
                      bg-white/20
                      text-white
                      backdrop-blur-md
                    "
                  >
                    {selectedEvent.type}
                  </Badge>


                  <Badge
                    className="
                      border-0
                      bg-white/95
                      text-slate-800
                    "
                  >
                    {getStatusLabel(
                      selectedEvent.status
                    )}
                  </Badge>

                </div>


                <h3
                  className="
                    text-3xl
                    font-black
                    tracking-tight
                    text-white
                  "
                >
                  {selectedEvent.name}
                </h3>

              </div>

            </div>


            {/* ==================================================
                MODAL BODY
                ================================================== */}

            <div
              className="
                p-6
                sm:p-8
              "
            >

              <div
                className="
                  grid
                  gap-5
                  sm:grid-cols-2
                "
              >


                {/* ==========================================
                    DESCRIPTION
                    ========================================== */}

                <div
                  className="
                    sm:col-span-2
                  "
                >

                  <p
                    className="
                      text-sm
                      font-medium
                      leading-7
                      text-slate-600
                    "
                  >
                    {selectedEvent.desc}
                  </p>

                </div>


                {/* ==========================================
                    LOCATION
                    ========================================== */}

                <div
                  className="
                    rounded-2xl
                    bg-slate-50
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

                    <MapPin
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
                        text-slate-400
                      "
                    >
                      Location
                    </span>

                  </div>


                  <p
                    className="
                      mt-2
                      text-sm
                      font-bold
                      text-slate-900
                    "
                  >
                    {selectedEvent.location}
                  </p>

                </div>


                {/* ==========================================
                    DATE
                    ========================================== */}

                <div
                  className="
                    rounded-2xl
                    bg-slate-50
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

                    <Calendar
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
                        text-slate-400
                      "
                    >
                      Schedule
                    </span>

                  </div>


                  <p
                    className="
                      mt-2
                      text-sm
                      font-bold
                      text-slate-900
                    "
                  >
                    {selectedEvent.date}
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      text-slate-500
                    "
                  >
                    {selectedEvent.time}
                    {" · "}
                    {selectedEvent.duration}
                  </p>

                </div>


                {/* ==========================================
                    PARTICIPANTS
                    ========================================== */}

                <div
                  className="
                    rounded-2xl
                    bg-slate-50
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

                    <Users
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
                        text-slate-400
                      "
                    >
                      Participants
                    </span>

                  </div>


                  <p
                    className="
                      mt-2
                      text-sm
                      font-bold
                      text-slate-900
                    "
                  >
                    {selectedEvent.participants.toLocaleString()}
                    {" "}
                    registered
                  </p>

                </div>


                {/* ==========================================
                    ORGANIZER
                    ========================================== */}

                <div
                  className="
                    rounded-2xl
                    bg-slate-50
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

                    <Sparkles
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
                        text-slate-400
                      "
                    >
                      Organizer
                    </span>

                  </div>


                  <p
                    className="
                      mt-2
                      text-sm
                      font-bold
                      text-slate-900
                    "
                  >
                    {selectedEvent.organizer}
                  </p>

                </div>

              </div>


              {/* ==================================================
                  MODAL ACTIONS
                  ================================================== */}

              <div
                className="
                  mt-7
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                "
              >

                <Button
                  type="button"
                  className="
                    flex-1
                    gap-2
                    rounded-xl
                  "
                  onClick={() =>
                    handleBookmark(
                      selectedEvent
                    )
                  }
                >

                  <Bookmark
                    className="
                      h-4
                      w-4
                    "
                  />

                  {bookmarkedEvents.includes(
                    selectedEvent.id
                  )
                    ? "Bookmarked"
                    : "Bookmark Event"}

                </Button>


                <Button
                  type="button"
                  variant="outline"
                  className="
                    flex-1
                    gap-2
                    rounded-xl
                  "
                  onClick={() => {

                    handleCloseEvent();

                    navigate(
                      "/community"
                    );

                  }}
                >

                  <Users
                    className="
                      h-4
                      w-4
                    "
                  />

                  View Community

                </Button>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          NEW EVENT MODAL
          ====================================================== */}

      {createEventOpen && (

        <div
          className="
            fixed
            inset-0
            z-[110]
            flex
            items-center
            justify-center
            bg-slate-950/50
            p-4
            backdrop-blur-sm
          "
          onClick={() =>
            setCreateEventOpen(
              false
            )
          }
        >

          <div
            className="
              w-full
              max-w-xl
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
                    mb-2
                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                  "
                >

                  <Plus
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
                  Create New Event
                </h3>


                <p
                  className="
                    mt-1
                    text-sm
                    font-medium
                    text-slate-500
                  "
                >
                  Start a new event in the EventDevX network.
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setCreateEventOpen(
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
                CREATE EVENT FORM
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
                    newEventName
                  }
                  onChange={(
                    event
                  ) =>
                    setNewEventName(
                      event.target.value
                    )
                  }
                  placeholder="e.g. React India Hackathon"
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
                    newEventType
                  }
                  onChange={(
                    event
                  ) =>
                    setNewEventType(
                      event.target.value
                    )
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
                    College Level
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
                    Community
                  </option>

                </select>

              </div>


              {/* ==============================================
                  LOCATION
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
                  Location
                </label>


                <input
                  type="text"
                  value={
                    newEventLocation
                  }
                  onChange={(
                    event
                  ) =>
                    setNewEventLocation(
                      event.target.value
                    )
                  }
                  placeholder="City, venue or Remote"
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
                  DESCRIPTION
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
                  Description
                </label>


                <textarea
                  value={
                    newEventDescription
                  }
                  onChange={(
                    event
                  ) =>
                    setNewEventDescription(
                      event.target.value
                    )
                  }
                  placeholder="Describe your event..."
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
                  MODAL BUTTONS
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
                  onClick={() =>
                    setCreateEventOpen(
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
                  onClick={
                    handleCreateEvent
                  }
                  disabled={
                    !newEventName.trim()
                  }
                >

                  <Rocket
                    className="
                      h-4
                      w-4
                    "
                  />

                  Create Event

                </Button>

              </div>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>

  );

};


export default Events;