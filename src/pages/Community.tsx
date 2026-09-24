import {
  Award,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Globe2,
  Link2,
  Map,
  MessageCircle,
  MessageSquare,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UserPlus,
  Users,
  X,
  Zap,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import {
  DashboardLayout,
} from "@/components/layout/DashboardLayout";

import MessageModal from "@/components/requests/MessageModal";

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

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";


/* ============================================================
   MEMBER TYPE
   ============================================================ */

interface CommunityMember {

  id: number;

  name: string;

  role: string;

  events: number;

  certs: number;

  points: number;

  avatarId: number;

  organization: string;

  location: string;

  joined: string;

  status: "active" | "online";

}


/* ============================================================
   COMMUNITY MEMBERS
   ============================================================ */

const MEMBERS_DATA: CommunityMember[] = [

  {
    id: 1,

    name:
      "Arjun Sharma",

    role:
      "Hackathon Organizer",

    events:
      12,

    certs:
      8,

    points:
      2340,

    avatarId:
      10,

    organization:
      "Builder Labs India",

    location:
      "New Delhi, India",

    joined:
      "January 2026",

    status:
      "online",
  },

  {
    id: 2,

    name:
      "Priya Nair",

    role:
      "College Tech Society",

    events:
      7,

    certs:
      5,

    points:
      1860,

    avatarId:
      11,

    organization:
      "Campus Technology Society",

    location:
      "Bengaluru, India",

    joined:
      "February 2026",

    status:
      "active",
  },

  {
    id: 3,

    name:
      "Vikram Singh",

    role:
      "Community Partner",

    events:
      21,

    certs:
      14,

    points:
      4120,

    avatarId:
      12,

    organization:
      "Open Innovation Network",

    location:
      "Chandigarh, India",

    joined:
      "December 2025",

    status:
      "online",
  },

  {
    id: 4,

    name:
      "Ananya Patel",

    role:
      "Corporate Sponsor",

    events:
      4,

    certs:
      2,

    points:
      980,

    avatarId:
      13,

    organization:
      "Enterprise Innovation Group",

    location:
      "Mumbai, India",

    joined:
      "March 2026",

    status:
      "active",
  },

  {
    id: 5,

    name:
      "Rohan Mehta",

    role:
      "Hackathon Organizer",

    events:
      9,

    certs:
      11,

    points:
      2670,

    avatarId:
      14,

    organization:
      "Developer League",

    location:
      "Pune, India",

    joined:
      "January 2026",

    status:
      "online",
  },

  {
    id: 6,

    name:
      "Sneha Kapoor",

    role:
      "Individual Developer",

    events:
      3,

    certs:
      3,

    points:
      720,

    avatarId:
      15,

    organization:
      "Independent Builder",

    location:
      "Hyderabad, India",

    joined:
      "April 2026",

    status:
      "active",
  },

];


/* ============================================================
   ROLE FILTERS
   ============================================================ */

const ROLE_FILTERS = [

  {
    label:
      "All Members",

    value:
      "all",
  },

  {
    label:
      "Organizers",

    value:
      "organizer",
  },

  {
    label:
      "Partners",

    value:
      "partner",
  },

  {
    label:
      "Developers",

    value:
      "developer",
  },

];


/* ============================================================
   ROLE MATCHER
   ============================================================ */

function matchesRole(
  member: CommunityMember,
  filter: string
) {

  if (
    filter ===
    "all"
  ) {

    return true;

  }


  if (
    filter ===
    "organizer"
  ) {

    return member.role
      .toLowerCase()
      .includes(
        "organizer"
      );

  }


  if (
    filter ===
    "partner"
  ) {

    return (
      member.role
        .toLowerCase()
        .includes(
          "partner"
        ) ||
      member.role
        .toLowerCase()
        .includes(
          "sponsor"
        )
    );

  }


  if (
    filter ===
    "developer"
  ) {

    return (
      member.role
        .toLowerCase()
        .includes(
          "developer"
        )
    );

  }


  return true;

}


/* ============================================================
   ROLE BADGE
   ============================================================ */

function getRoleBadge(
  role: string
) {

  const normalized =
    role.toLowerCase();


  if (
    normalized.includes(
      "organizer"
    )
  ) {

    return {
      label:
        "Organizer",

      className:
        "border-indigo-200 bg-indigo-50 text-indigo-700",
    };

  }


  if (
    normalized.includes(
      "sponsor"
    )
  ) {

    return {
      label:
        "Sponsor",

      className:
        "border-amber-200 bg-amber-50 text-amber-700",
    };

  }


  if (
    normalized.includes(
      "partner"
    )
  ) {

    return {
      label:
        "Partner",

      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
    };

  }


  return {

    label:
      "Developer",

    className:
      "border-cyan-200 bg-cyan-50 text-cyan-700",

  };

}


/* ============================================================
   MEMBER CARD PROPS
   ============================================================ */

interface MemberCardProps {

  member:
    CommunityMember;

  onOpen:
    (
      member:
        CommunityMember
    ) => void;

}


/* ============================================================
   MEMBER CARD
   ============================================================ */

const MemberCard = ({
  member,
  onOpen,
}: MemberCardProps) => {

  const role =
    getRoleBadge(
      member.role
    );


  return (

    <button
      type="button"
      onClick={() =>
        onOpen(
          member
        )
      }
      className="
        group
        flex
        w-full
        items-center
        gap-3
        rounded-2xl
        border
        border-border/70
        bg-card
        p-4
        text-left
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-lg
      "
    >

      {/* ==================================================
          AVATAR
          ================================================== */}

      <div
        className="
          relative
          shrink-0
        "
      >

        <Avatar
          className="
            h-12
            w-12
            rounded-2xl
          "
        >

          <AvatarImage
            src={
              `https://i.pravatar.cc/120?u=${member.avatarId}`
            }
            alt={
              member.name
            }
          />

          <AvatarFallback>
            {member.name
              .split(" ")
              .map(
                (part) =>
                  part.charAt(0)
              )
              .join("")
              .slice(
                0,
                2
              )}
          </AvatarFallback>

        </Avatar>


        {/* ================================================
            ONLINE DOT
            ================================================ */}

        <span
          className="
            absolute
            bottom-0
            right-0
            h-3
            w-3
            rounded-full
            border-2
            border-white
            bg-emerald-500
          "
        />

      </div>


      {/* ==================================================
          CONTENT
          ================================================== */}

      <div
        className="
          min-w-0
          flex-1
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <h4
            className="
              truncate
              text-sm
              font-black
              text-foreground
            "
          >
            {member.name}
          </h4>

        </div>


        <p
          className="
            mt-1
            truncate
            text-[11px]
            font-medium
            text-muted-foreground
          "
        >
          {member.role}
        </p>


        <div
          className="
            mt-2
            flex
            items-center
            gap-2
          "
        >

          <Badge
            variant="outline"
            className={`
              h-5
              rounded-full
              px-2
              text-[8px]
              font-extrabold
              uppercase
              tracking-wide
              ${role.className}
            `}
          >
            {role.label}
          </Badge>


          <span
            className="
              text-[10px]
              font-extrabold
              text-primary
            "
          >

            {member.points.toLocaleString()}
            {" "}
            pts

          </span>

        </div>

      </div>


      {/* ==================================================
          ARROW
          ================================================== */}

      <ChevronRight
        className="
          h-4
          w-4
          shrink-0
          text-slate-300
          transition
          group-hover:translate-x-0.5
          group-hover:text-primary
        "
      />

    </button>

  );

};


/* ============================================================
   COMMUNITY PAGE
   ============================================================ */

const Community = () => {

  /* ==========================================================
     URL PARAMS
     ========================================================== */

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();


  /* ==========================================================
     SEARCH STATE
     ========================================================== */

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");


  /* ==========================================================
     FILTER STATE
     ========================================================== */

  const [
    activeFilter,
    setActiveFilter,
  ] = useState(
    "all"
  );


  /* ==========================================================
     SELECTED MEMBER
     ========================================================== */

  const [
    selectedMember,
    setSelectedMember,
  ] = useState<
    CommunityMember | null
  >(null);


  /* ==========================================================
     FIREBASE MESSAGE MODAL STATE
     ========================================================== */

  const [
    messageOpen,
    setMessageOpen,
  ] = useState(false);


  const handleOpenMessage = (
    member: CommunityMember
  ) => {

    setSelectedMember(
      member
    );

    setMessageOpen(
      true
    );

  };


  const handleCloseMessage = () => {

    setMessageOpen(
      false
    );

  };


  /* ==========================================================
     SHOW ROLE FILTERS
     ========================================================== */

  const [
    filtersOpen,
    setFiltersOpen,
  ] = useState(false);


  /* ==========================================================
     FILTER MEMBERS
     ========================================================== */

  const filteredMembers =
    useMemo(() => {

      const query =
        searchQuery
          .trim()
          .toLowerCase();


      return MEMBERS_DATA.filter(
        (member) => {

          const matchesSearch =
            !query ||
            member.name
              .toLowerCase()
              .includes(
                query
              ) ||
            member.role
              .toLowerCase()
              .includes(
                query
              ) ||
            member.organization
              .toLowerCase()
              .includes(
                query
              ) ||
            member.location
              .toLowerCase()
              .includes(
                query
              );


          if (
            !matchesSearch
          ) {

            return false;

          }


          return matchesRole(
            member,
            activeFilter
          );

        }
      );

    }, [
      searchQuery,
      activeFilter,
    ]);


  /* ==========================================================
     LEADERBOARD
     ========================================================== */

  const leaderboard =
    useMemo(() => {

      return [
        ...MEMBERS_DATA,
      ]
        .sort(
          (
            first,
            second
          ) =>
            second.points -
            first.points
        )
        .slice(
          0,
          4
        );

    }, []);


  /* ==========================================================
     OPEN MEMBER
     ========================================================== */

  const handleOpenMember = (
    member: CommunityMember
  ) => {

    setSelectedMember(
      member
    );


    setSearchParams({
      member:
        String(member.id),
    });

  };


  /* ==========================================================
     CLOSE MEMBER
     ========================================================== */

  const handleCloseMember = () => {

    setSelectedMember(
      null
    );


    setSearchParams({});

  };


  /* ==========================================================
     JOIN DISCORD
     ========================================================== */

  const handleJoinDiscord = () => {

    /*
     * Replace this URL later with your real
     * EventDevX Discord community URL.
     */

    window.open(
      "https://discord.com",
      "_blank",
      "noopener,noreferrer"
    );

  };


  /* ==========================================================
     VIEW MAP
     ========================================================== */

  const handleViewMap = () => {

    /*
     * This is currently an informational UI action.
     * A real EventDevX network map can be connected
     * later with your organization/member locations.
     */

    window.alert(
      "Community map will be connected to EventDevX network locations."
    );

  };


  /* ==========================================================
     MESSAGE MEMBER
     ========================================================== */

  const handleMessage = (
    member: CommunityMember
  ) => {

    /*
     * The previous version only showed a browser alert.
     * This now opens the real EventDevX Firebase-backed
     * message composer for the selected community member.
     */

    handleOpenMessage(
      member
    );

  };


  /* ==========================================================
     PARTNER WITH MEMBER
     ========================================================== */

  const handlePartner = (
    member: CommunityMember
  ) => {

    window.alert(
      `Partnership request for ${member.name} will be connected to the EventDevX partnership system.`
    );

  };


  /* ==========================================================
     OPEN MEMBER FROM URL
     ========================================================== */

  const requestedMemberId =
    searchParams.get(
      "member"
    );


  if (
    requestedMemberId &&
    !selectedMember
  ) {

    const member =
      MEMBERS_DATA.find(
        (
          item
        ) =>
          String(
            item.id
          ) ===
          requestedMemberId
      );


    if (member) {

      setSelectedMember(
        member
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

        <section>

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

              <Users
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
              EventDevX Collective
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
            Global Network
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
            Connect organizers,
            developers, sponsors,
            community partners and
            builders across the
            EventDevX ecosystem.
          </p>

        </section>


        {/* ==================================================
            HERO COLLECTIVE CARD
            ================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            bg-gradient-to-br
            from-indigo-600
            to-violet-600
            p-6
            text-white
            shadow-xl
            sm:p-8
          "
        >

          {/* ==================================================
              DECORATIVE SHAPES
              ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-56
              w-56
              rounded-full
              border
              border-white/10
              bg-white/5
            "
          />


          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-12
              h-52
              w-52
              rounded-full
              bg-white/10
              blur-3xl
            "
          />


          <div
            className="
              pointer-events-none
              absolute
              right-1/3
              top-1/2
              h-24
              w-24
              rounded-full
              bg-cyan-300/10
              blur-2xl
            "
          />


          {/* ==================================================
              HERO CONTENT
              ================================================== */}

          <div
            className="
              relative
              z-10
              mx-auto
              max-w-3xl
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-white/10
                backdrop-blur-md
              "
            >

              <Network
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
              Connect with 50,000 Builders
            </h3>


            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-sm
                font-medium
                leading-7
                text-white/80
              "
            >
              Our collective spans 200+
              universities and 50+ tech
              communities worldwide.
            </p>


            {/* ==================================================
                HERO ACTIONS
                ================================================== */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                justify-center
                gap-3
              "
            >

              <Button
                type="button"
                className="
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  font-extrabold
                  text-indigo-600
                  hover:bg-white/90
                "
                onClick={
                  handleJoinDiscord
                }
              >

                <MessageSquare
                  className="
                    h-4
                    w-4
                  "
                />

                Join Discord

              </Button>


              <Button
                type="button"
                variant="outline"
                className="
                  gap-2
                  rounded-xl
                  border-white/30
                  bg-white/10
                  px-5
                  font-extrabold
                  text-white
                  hover:bg-white/20
                  hover:text-white
                "
                onClick={
                  handleViewMap
                }
              >

                <Map
                  className="
                    h-4
                    w-4
                  "
                />

                View Map

              </Button>

            </div>


            {/* ==================================================
                NETWORK STATS
                ================================================== */}

            <div
              className="
                mx-auto
                mt-7
                grid
                max-w-xl
                grid-cols-3
                divide-x
                divide-white/15
                rounded-2xl
                border
                border-white/10
                bg-white/5
                py-4
                backdrop-blur-md
              "
            >

              <div
                className="
                  px-3
                  text-center
                "
              >

                <p
                  className="
                    text-xl
                    font-black
                  "
                >
                  50k+
                </p>


                <p
                  className="
                    mt-1
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.1em]
                    text-white/60
                  "
                >
                  Builders
                </p>

              </div>


              <div
                className="
                  px-3
                  text-center
                "
              >

                <p
                  className="
                    text-xl
                    font-black
                  "
                >
                  200+
                </p>


                <p
                  className="
                    mt-1
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.1em]
                    text-white/60
                  "
                >
                  Universities
                </p>

              </div>


              <div
                className="
                  px-3
                  text-center
                "
              >

                <p
                  className="
                    text-xl
                    font-black
                  "
                >
                  50+
                </p>


                <p
                  className="
                    mt-1
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.1em]
                    text-white/60
                  "
                >
                  Communities
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            NETWORK SUMMARY
            ================================================== */}

        <section
          className="
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >


          {/* =================================================
              MEMBERS
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
                    text-muted-foreground
                  "
                >
                  Visible Members
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-foreground
                  "
                >
                  {MEMBERS_DATA.length}
                </p>

              </div>

            </CardContent>

          </Card>


          {/* =================================================
              ORGANIZERS
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

                <Sparkles
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
                    text-muted-foreground
                  "
                >
                  Organizers
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-foreground
                  "
                >
                  {
                    MEMBERS_DATA.filter(
                      (
                        member
                      ) =>
                        member.role
                          .toLowerCase()
                          .includes(
                            "organizer"
                          )
                    ).length
                  }
                </p>

              </div>

            </CardContent>

          </Card>


          {/* =================================================
              TOTAL EVENTS
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

                <Trophy
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
                    text-muted-foreground
                  "
                >
                  Community Events
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-foreground
                  "
                >
                  {
                    MEMBERS_DATA
                      .reduce(
                        (
                          total,
                          member
                        ) =>
                          total +
                          member.events,
                        0
                      )
                  }
                </p>

              </div>

            </CardContent>

          </Card>


          {/* =================================================
              CERTIFICATES
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

                <Award
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
                    text-muted-foreground
                  "
                >
                  Certificates
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-foreground
                  "
                >
                  {
                    MEMBERS_DATA
                      .reduce(
                        (
                          total,
                          member
                        ) =>
                          total +
                          member.certs,
                        0
                      )
                  }
                </p>

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ==================================================
            MEMBER SEARCH
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
                  placeholder="Search members, universities..."
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    pl-11
                    pr-4
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

              </div>


              {/* =============================================
                  FILTER BUTTON
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

                <SlidersIcon />

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
                  DESKTOP FILTER
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

                <Users
                  className="
                    h-4
                    w-4
                  "
                />

                Filter:

              </div>


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

                {ROLE_FILTERS.map(
                  (
                    filter
                  ) => {

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
            TWO COLUMN COMMUNITY
            ================================================== */}

        <section
          className="
            grid
            gap-6
            xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]
          "
        >


          {/* ==================================================
              TOP CONTRIBUTORS
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
                    Top Contributors
                  </CardTitle>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      text-muted-foreground
                    "
                  >
                    Community leaders based on
                    EventDevX contribution points.
                  </p>

                </div>


                <Trophy
                  className="
                    h-5
                    w-5
                    text-amber-500
                  "
                />

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
                  space-y-2
                "
              >

                {leaderboard.map(
                  (
                    member,
                    index
                  ) => {

                    const medals = [
                      "🥇",
                      "🥈",
                      "🥉",
                      "4️⃣",
                    ];


                    return (

                      <button
                        key={
                          member.id
                        }
                        type="button"
                        onClick={() =>
                          handleOpenMember(
                            member
                          )
                        }
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-2xl
                          border
                          border-transparent
                          bg-slate-50
                          p-3
                          text-left
                          transition-all
                          duration-200
                          hover:border-primary/10
                          hover:bg-primary/5
                        "
                      >

                        {/* ====================================
                            RANK
                            ==================================== */}

                        <span
                          className="
                            w-7
                            shrink-0
                            text-center
                            text-lg
                          "
                        >
                          {medals[index]}
                        </span>


                        {/* ====================================
                            AVATAR
                            ==================================== */}

                        <Avatar
                          className="
                            h-10
                            w-10
                            shrink-0
                            rounded-xl
                          "
                        >

                          <AvatarImage
                            src={
                              `https://i.pravatar.cc/100?u=${member.avatarId}`
                            }
                            alt={
                              member.name
                            }
                          />

                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map(
                                (
                                  part
                                ) =>
                                  part.charAt(
                                    0
                                  )
                              )
                              .join("")
                              .slice(
                                0,
                                2
                              )}
                          </AvatarFallback>

                        </Avatar>


                        {/* ====================================
                            INFO
                            ==================================== */}

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
                              font-black
                              text-foreground
                            "
                          >
                            {member.name}
                          </p>


                          <p
                            className="
                              mt-1
                              text-[10px]
                              font-medium
                              text-muted-foreground
                            "
                          >
                            {member.events}
                            {" "}
                            events
                            {" · "}
                            {member.certs}
                            {" "}
                            certs
                          </p>

                        </div>


                        {/* ====================================
                            POINTS
                            ==================================== */}

                        <span
                          className="
                            shrink-0
                            text-sm
                            font-black
                            text-primary
                          "
                        >
                          {member.points.toLocaleString()}
                        </span>

                      </button>

                    );

                  }
                )}

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              COMMUNITY HEALTH
              ================================================== */}

          <div
            className="
              space-y-6
            "
          >

            {/* =================================================
                NETWORK STATUS
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
                  Network Health
                </CardTitle>

              </CardHeader>


              <CardContent
                className="
                  px-5
                  pb-5
                "
              >

                <div
                  className="
                    space-y-5
                  "
                >

                  {/* ========================================
                      ACTIVE CONNECTIONS
                      ======================================== */}

                  <div>

                    <div
                      className="
                        mb-2
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
                            text-xs
                            font-bold
                            text-foreground
                          "
                        >
                          Active Connections
                        </span>

                      </div>


                      <span
                        className="
                          text-xs
                          font-black
                          text-emerald-600
                        "
                      >
                        92%
                      </span>

                    </div>


                    <div
                      className="
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-slate-100
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


                  {/* ========================================
                      ORGANIZER ACTIVITY
                      ======================================== */}

                  <div>

                    <div
                      className="
                        mb-2
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

                        <span
                          className="
                            h-2
                            w-2
                            rounded-full
                            bg-indigo-500
                          "
                        />

                        <span
                          className="
                            text-xs
                            font-bold
                            text-foreground
                          "
                        >
                          Organizer Activity
                        </span>

                      </div>


                      <span
                        className="
                          text-xs
                          font-black
                          text-indigo-600
                        "
                      >
                        84%
                      </span>

                    </div>


                    <div
                      className="
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-slate-100
                      "
                    >

                      <div
                        className="
                          h-full
                          w-[84%]
                          rounded-full
                          bg-indigo-500
                        "
                      />

                    </div>

                  </div>


                  {/* ========================================
                      EVENT COLLABORATION
                      ======================================== */}

                  <div>

                    <div
                      className="
                        mb-2
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

                        <span
                          className="
                            h-2
                            w-2
                            rounded-full
                            bg-violet-500
                          "
                        />

                        <span
                          className="
                            text-xs
                            font-bold
                            text-foreground
                          "
                        >
                          Event Collaboration
                        </span>

                      </div>


                      <span
                        className="
                          text-xs
                          font-black
                          text-violet-600
                        "
                      >
                        78%
                      </span>

                    </div>


                    <div
                      className="
                        h-2
                        overflow-hidden
                        rounded-full
                        bg-slate-100
                      "
                    >

                      <div
                        className="
                          h-full
                          w-[78%]
                          rounded-full
                          bg-violet-500
                        "
                      />

                    </div>

                  </div>

                </div>

              </CardContent>

            </Card>


            {/* =================================================
                COMMUNITY PRINCIPLES
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

                  <Globe2
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
                  One Global Collective
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
                  Events connect people.
                  Projects connect skills.
                  EventDevX brings both
                  together into one network.
                </p>


                <div
                  className="
                    mt-5
                    grid
                    grid-cols-2
                    gap-2
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

                    <Users
                      className="
                        h-4
                        w-4
                        text-cyan-300
                      "
                    />

                    <p
                      className="
                        mt-2
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-wide
                        text-white/70
                      "
                    >
                      Community
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

                    <Network
                      className="
                        h-4
                        w-4
                        text-violet-300
                      "
                    />

                    <p
                      className="
                        mt-2
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-wide
                        text-white/70
                      "
                    >
                      Network
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            COMMUNITY MEMBERS
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
                  Community Members
                </CardTitle>


                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-muted-foreground
                  "
                >
                  Browse the builders and
                  organizations currently
                  represented in the network.
                </p>

              </div>


              <div
                className="
                  hidden
                  items-center
                  gap-2
                  rounded-full
                  bg-emerald-50
                  px-3
                  py-1.5
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-emerald-700
                  sm:flex
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

                Network Active

              </div>

            </div>

          </CardHeader>


          <CardContent
            className="
              px-5
              pb-5
            "
          >

            {filteredMembers.length >
            0 ? (

              <div
                className="
                  grid
                  gap-3
                  sm:grid-cols-2
                  xl:grid-cols-3
                "
              >

                {filteredMembers.map(
                  (
                    member
                  ) => (

                    <MemberCard
                      key={
                        member.id
                      }
                      member={
                        member
                      }
                      onOpen={
                        handleOpenMember
                      }
                    />

                  )
                )}

              </div>

            ) : (

              <div
                className="
                  flex
                  min-h-60
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-muted
                    text-muted-foreground
                  "
                >

                  <Search
                    className="
                      h-6
                      w-6
                    "
                  />

                </div>


                <h3
                  className="
                    mt-4
                    text-base
                    font-black
                    text-foreground
                  "
                >
                  No members found
                </h3>


                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-muted-foreground
                  "
                >
                  Try another member,
                  organization or role.
                </p>

              </div>

            )}

          </CardContent>

        </Card>


        {/* ==================================================
            NETWORK FOOTER
            ================================================== */}

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
                Global collective is active
              </p>


              <p
                className="
                  text-[10px]
                  font-medium
                  text-muted-foreground
                "
              >
                Community nodes are connected
                and exchanging activity.
              </p>

            </div>

          </div>


          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="
                gap-2
                rounded-xl
              "
              onClick={
                handleJoinDiscord
              }
            >

              <MessageCircle
                className="
                  h-4
                  w-4
                "
              />

              Join Community

            </Button>

          </div>

        </section>

      </div>


      {/* ======================================================
          MEMBER DETAIL MODAL
          ====================================================== */}

      {selectedMember && (

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
            handleCloseMember
          }
        >

          <div
            className="
              max-h-[90vh]
              w-full
              max-w-lg
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
                overflow-hidden
                bg-gradient-to-br
                from-indigo-600
                to-violet-600
                px-6
                pb-7
                pt-6
                text-white
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
                  bg-white/10
                "
              />


              <button
                type="button"
                onClick={
                  handleCloseMember
                }
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/10
                  text-white
                  transition
                  hover:bg-white/20
                "
              >

                <X
                  className="
                    h-4
                    w-4
                  "
                />

              </button>


              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  items-center
                  text-center
                "
              >

                <Avatar
                  className="
                    h-20
                    w-20
                    rounded-3xl
                    border-4
                    border-white/20
                  "
                >

                  <AvatarImage
                    src={
                      `https://i.pravatar.cc/180?u=${selectedMember.avatarId}`
                    }
                    alt={
                      selectedMember.name
                    }
                  />

                  <AvatarFallback
                    className="
                      bg-white
                      text-indigo-600
                    "
                  >
                    {selectedMember.name
                      .split(" ")
                      .map(
                        (
                          part
                        ) =>
                          part.charAt(
                            0
                          )
                      )
                      .join("")
                      .slice(
                        0,
                        2
                      )}
                  </AvatarFallback>

                </Avatar>


                <h3
                  className="
                    mt-4
                    text-2xl
                    font-black
                    tracking-tight
                  "
                >
                  {selectedMember.name}
                </h3>


                <p
                  className="
                    mt-1
                    text-sm
                    font-medium
                    text-white/75
                  "
                >
                  {selectedMember.role}
                </p>

              </div>

            </div>


            {/* ==================================================
                MODAL CONTENT
                ================================================== */}

            <div
              className="
                p-6
                sm:p-8
              "
            >

              {/* ==================================================
                  STATS
                  ================================================== */}

              <div
                className="
                  grid
                  grid-cols-3
                  gap-3
                "
              >

                <div
                  className="
                    rounded-2xl
                    bg-slate-50
                    p-4
                    text-center
                  "
                >

                  <p
                    className="
                      text-2xl
                      font-black
                      text-slate-900
                    "
                  >
                    {selectedMember.events}
                  </p>


                  <p
                    className="
                      mt-1
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.1em]
                      text-slate-400
                    "
                  >
                    Events
                  </p>

                </div>


                <div
                  className="
                    rounded-2xl
                    bg-slate-50
                    p-4
                    text-center
                  "
                >

                  <p
                    className="
                      text-2xl
                      font-black
                      text-slate-900
                    "
                  >
                    {selectedMember.certs}
                  </p>


                  <p
                    className="
                      mt-1
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.1em]
                      text-slate-400
                    "
                  >
                    Certs
                  </p>

                </div>


                <div
                  className="
                    rounded-2xl
                    bg-slate-50
                    p-4
                    text-center
                  "
                >

                  <p
                    className="
                      text-2xl
                      font-black
                      text-slate-900
                    "
                  >
                    {selectedMember.points.toLocaleString()}
                  </p>


                  <p
                    className="
                      mt-1
                      text-[9px]
                      font-extrabold
                      uppercase
                      tracking-[0.1em]
                      text-slate-400
                    "
                  >
                    Points
                  </p>

                </div>

              </div>


              {/* ==================================================
                  PROFILE DETAILS
                  ================================================== */}

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
                    gap-3
                    rounded-2xl
                    bg-slate-50
                    p-4
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
                      bg-indigo-100
                      text-indigo-600
                    "
                  >

                    <CircleUserRound
                      className="
                        h-4
                        w-4
                      "
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
                      Organization
                    </p>


                    <p
                      className="
                        mt-1
                        text-xs
                        font-bold
                        text-slate-900
                      "
                    >
                      {selectedMember.organization}
                    </p>

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-slate-50
                    p-4
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
                      bg-cyan-100
                      text-cyan-600
                    "
                  >

                    <Globe2
                      className="
                        h-4
                        w-4
                      "
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
                      Location
                    </p>


                    <p
                      className="
                        mt-1
                        text-xs
                        font-bold
                        text-slate-900
                      "
                    >
                      {selectedMember.location}
                    </p>

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-slate-50
                    p-4
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
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.1em]
                        text-slate-400
                      "
                    >
                      Network Status
                    </p>


                    <p
                      className="
                        mt-1
                        flex
                        items-center
                        gap-2
                        text-xs
                        font-bold
                        text-slate-900
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

                      {selectedMember.status ===
                      "online"
                        ? "Online"
                        : "Active"}

                    </p>

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    bg-slate-50
                    p-4
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
                      bg-amber-100
                      text-amber-600
                    "
                  >

                    <Star
                      className="
                        h-4
                        w-4
                      "
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
                      Joined EventDevX
                    </p>


                    <p
                      className="
                        mt-1
                        text-xs
                        font-bold
                        text-slate-900
                      "
                    >
                      {selectedMember.joined}
                    </p>

                  </div>

                </div>

              </div>


              {/* ==================================================
                  ACTIONS
                  ================================================== */}

              <div
                className="
                  mt-6
                  grid
                  grid-cols-2
                  gap-3
                "
              >

                <Button
                  type="button"
                  className="
                    gap-2
                    rounded-xl
                  "
                  onClick={() =>
                    handleMessage(
                      selectedMember
                    )
                  }
                >

                  <MessageSquare
                    className="
                      h-4
                      w-4
                    "
                  />

                  Message

                </Button>


                <Button
                  type="button"
                  variant="outline"
                  className="
                    gap-2
                    rounded-xl
                  "
                  onClick={() =>
                    handlePartner(
                      selectedMember
                    )
                  }
                >

                  <Link2
                    className="
                      h-4
                      w-4
                    "
                  />

                  Partner

                </Button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* ======================================================
          FIREBASE MESSAGE COMPOSER
          ====================================================== */}

      <MessageModal
        open={
          messageOpen
        }
        recipient={
          selectedMember
            ? {
                id:
                  selectedMember.id,

                name:
                  selectedMember.name,

                role:
                  selectedMember.role,

                avatar:
                  `https://i.pravatar.cc/180?u=${selectedMember.avatarId}`,
              }
            : null
        }
        onClose={
          handleCloseMessage
        }
        onSent={(
          messageId
        ) => {

          console.log(
            "EventDevX message created:",
            messageId
          );

        }}
      />


    </DashboardLayout>

  );

};


/* ============================================================
   FILTER ICON
   ============================================================ */

const SlidersIcon = () => {

  return (

    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >

      <line
        x1="4"
        y1="21"
        x2="4"
        y2="14"
      />

      <line
        x1="4"
        y1="10"
        x2="4"
        y2="3"
      />

      <line
        x1="12"
        y1="21"
        x2="12"
        y2="12"
      />

      <line
        x1="12"
        y1="8"
        x2="12"
        y2="3"
      />

      <line
        x1="20"
        y1="21"
        x2="20"
        y2="16"
      />

      <line
        x1="20"
        y1="12"
        x2="20"
        y2="3"
      />

      <line
        x1="1"
        y1="14"
        x2="7"
        y2="14"
      />

      <line
        x1="9"
        y1="8"
        x2="15"
        y2="8"
      />

      <line
        x1="17"
        y1="16"
        x2="23"
        y2="16"
      />

    </svg>

  );

};


export default Community;