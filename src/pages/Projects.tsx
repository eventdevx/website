import {
  Activity,
  ArrowLeft,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  FolderKanban,
  Globe,
  Layers3,
  Plus,
  Search,
  Shield,
  Sparkles,
  Target,
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
   PROJECT STATUS
   ============================================================ */

type ProjectStatus =
  | "active"
  | "planning"
  | "completed";


/* ============================================================
   PROJECT DATA TYPE
   ============================================================ */

interface ProjectItem {

  id: number;

  name: string;

  description: string;

  type: string;

  progress: number;

  color: string;

  icon:
    | "code"
    | "globe"
    | "shield"
    | "cpu"
    | "bot"
    | "chart";

  status: ProjectStatus;

  contributors: number;

  modules: number;

  updated: string;

}


/* ============================================================
   PROJECT DATA
   ============================================================ */

const PROJECTS_DATA: ProjectItem[] = [

  {
    id: 1,

    name:
      "Project Orion",

    description:
      "Web3 Framework for event management and ticketing.",

    type:
      "Web3 Framework",

    progress:
      75,

    color:
      "#4f46e5",

    icon:
      "code",

    status:
      "active",

    contributors:
      18,

    modules:
      12,

    updated:
      "12 min ago",
  },

  {
    id: 2,

    name:
      "Atlas Network",

    description:
      "Decentralized identity system for event participants.",

    type:
      "Identity Protocol",

    progress:
      42,

    color:
      "#10b981",

    icon:
      "globe",

    status:
      "active",

    contributors:
      26,

    modules:
      8,

    updated:
      "38 min ago",
  },

  {
    id: 3,

    name:
      "CertChain",

    description:
      "Blockchain-verified certificate issuance and validation.",

    type:
      "Blockchain",

    progress:
      88,

    color:
      "#d97706",

    icon:
      "shield",

    status:
      "active",

    contributors:
      14,

    modules:
      15,

    updated:
      "1 hour ago",
  },

  {
    id: 4,

    name:
      "EventOS",

    description:
      "Real-time operating system for large-scale event management.",

    type:
      "Infrastructure",

    progress:
      31,

    color:
      "#8b5cf6",

    icon:
      "cpu",

    status:
      "planning",

    contributors:
      31,

    modules:
      21,

    updated:
      "2 hours ago",
  },

  {
    id: 5,

    name:
      "HackBot AI",

    description:
      "AI assistant for hackathon participants and organizers.",

    type:
      "AI / ML",

    progress:
      60,

    color:
      "#ef4444",

    icon:
      "bot",

    status:
      "active",

    contributors:
      22,

    modules:
      10,

    updated:
      "3 hours ago",
  },

  {
    id: 6,

    name:
      "NodeDash",

    description:
      "Live dashboard for multi-city event monitoring.",

    type:
      "Analytics",

    progress:
      95,

    color:
      "#06b6d4",

    icon:
      "chart",

    status:
      "completed",

    contributors:
      9,

    modules:
      17,

    updated:
      "5 hours ago",
  },

];


/* ============================================================
   PROJECT FILTERS
   ============================================================ */

const PROJECT_FILTERS = [

  {
    label:
      "All Projects",

    value:
      "all",
  },

  {
    label:
      "Active",

    value:
      "active",
  },

  {
    label:
      "Planning",

    value:
      "planning",
  },

  {
    label:
      "Completed",

    value:
      "completed",
  },

];


/* ============================================================
   GET PROJECT ICON
   ============================================================ */

function getProjectIcon(
  icon: ProjectItem["icon"]
) {

  if (icon === "code") {

    return Code2;

  }


  if (icon === "globe") {

    return Globe;

  }


  if (icon === "shield") {

    return Shield;

  }


  if (icon === "cpu") {

    return Cpu;

  }


  if (icon === "bot") {

    return Bot;

  }


  return BarChart3;

}


/* ============================================================
   GET STATUS LABEL
   ============================================================ */

function getStatusLabel(
  status: ProjectStatus
) {

  if (
    status ===
    "active"
  ) {

    return "ACTIVE";

  }


  if (
    status ===
    "planning"
  ) {

    return "PLANNING";

  }


  return "COMPLETED";

}


/* ============================================================
   STATUS CLASSES
   ============================================================ */

function getStatusClasses(
  status: ProjectStatus
) {

  if (
    status ===
    "active"
  ) {

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


  if (
    status ===
    "planning"
  ) {

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
   PROJECT CARD PROPS
   ============================================================ */

interface ProjectCardProps {

  project:
    ProjectItem;

  onOpen:
    (
      project:
        ProjectItem
    ) => void;

}


/* ============================================================
   PROJECT CARD
   ============================================================ */

const ProjectCard = ({
  project,
  onOpen,
}: ProjectCardProps) => {

  const ProjectIcon =
    getProjectIcon(
      project.icon
    );


  const status =
    getStatusClasses(
      project.status
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
          PROJECT HEADER
          ==================================================== */}

      <CardHeader
        className="
          p-5
          pb-3
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

          {/* ==================================================
              ICON + NAME
              ================================================== */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
              "
              style={{
                backgroundColor:
                  `${project.color}18`,
              }}
            >

              <ProjectIcon
                className="
                  h-6
                  w-6
                "
                style={{
                  color:
                    project.color,
                }}
              />

            </div>


            <div
              className="
                min-w-0
              "
            >

              <CardTitle
                className="
                  truncate
                  text-base
                  font-black
                  tracking-tight
                "
              >
                {project.name}
              </CardTitle>


              <p
                className="
                  mt-1
                  truncate
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.1em]
                  text-muted-foreground
                "
              >
                {project.type}
              </p>

            </div>

          </div>


          {/* ==================================================
              STATUS
              ================================================== */}

          <span
            className={`
              inline-flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              border
              px-2.5
              py-1
              text-[9px]
              font-extrabold
              uppercase
              tracking-wide
              ${status.background}
              ${status.border}
              ${status.text}
            `}
          >

            <span
              className={`
                h-1.5
                w-1.5
                rounded-full
                ${status.dot}
              `}
            />

            {getStatusLabel(
              project.status
            )}

          </span>

        </div>

      </CardHeader>


      {/* ====================================================
          PROJECT BODY
          ==================================================== */}

      <CardContent
        className="
          px-5
          pb-5
        "
      >

        {/* ==================================================
            DESCRIPTION
            ================================================== */}

        <p
          className="
            min-h-[48px]
            text-xs
            font-medium
            leading-relaxed
            text-muted-foreground
          "
        >
          {project.description}
        </p>


        {/* ==================================================
            PROJECT META
            ================================================== */}

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
              bg-muted/50
              p-3
            "
          >

            <div
              className="
                flex
                items-center
                gap-1.5
                text-muted-foreground
              "
            >

              <Users
                className="
                  h-3.5
                  w-3.5
                "
              />

              <span
                className="
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.08em]
                "
              >
                Contributors
              </span>

            </div>


            <p
              className="
                mt-1
                text-lg
                font-black
                text-foreground
              "
            >
              {project.contributors}
            </p>

          </div>


          <div
            className="
              rounded-xl
              bg-muted/50
              p-3
            "
          >

            <div
              className="
                flex
                items-center
                gap-1.5
                text-muted-foreground
              "
            >

              <Layers3
                className="
                  h-3.5
                  w-3.5
                "
              />

              <span
                className="
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.08em]
                "
              >
                Modules
              </span>

            </div>


            <p
              className="
                mt-1
                text-lg
                font-black
                text-foreground
              "
            >
              {project.modules}
            </p>

          </div>

        </div>


        {/* ==================================================
            PROGRESS
            ================================================== */}

        <div
          className="
            mt-5
          "
        >

          <div
            className="
              mb-2
              flex
              items-center
              justify-between
            "
          >

            <span
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.08em]
                text-muted-foreground
              "
            >
              Progress
            </span>


            <span
              className="
                text-xs
                font-black
              "
              style={{
                color:
                  project.color,
              }}
            >
              {project.progress}%
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
                rounded-full
                transition-all
                duration-500
              "
              style={{
                width:
                  `${project.progress}%`,

                backgroundColor:
                  project.color,
              }}
            />

          </div>

        </div>


        {/* ==================================================
            LAST UPDATED
            ================================================== */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              text-[9px]
              font-medium
              text-muted-foreground
            "
          >
            Updated {project.updated}
          </span>


          <span
            className="
              flex
              items-center
              gap-1
              text-[9px]
              font-extrabold
              text-primary
            "
          >

            <Activity
              className="
                h-3
                w-3
              "
            />

            Live

          </span>

        </div>


        {/* ==================================================
            REVIEW BUTTON
            ================================================== */}

        <Button
          type="button"
          variant="outline"
          className="
            mt-5
            h-10
            w-full
            rounded-xl
            gap-2
            text-xs
            font-extrabold
          "
          onClick={() =>
            onOpen(
              project
            )
          }
        >

          Review Modules

          <ChevronRight
            className="
              h-4
              w-4
            "
          />

        </Button>

      </CardContent>

    </Card>

  );

};


/* ============================================================
   PROJECTS PAGE
   ============================================================ */

const Projects = () => {

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
     SELECTED PROJECT
     ========================================================== */

  const [
    selectedProject,
    setSelectedProject,
  ] = useState<
    ProjectItem | null
  >(null);


  /* ==========================================================
     CREATE PROJECT MODAL
     ========================================================== */

  const [
    createProjectOpen,
    setCreateProjectOpen,
  ] = useState(false);


  /* ==========================================================
     NEW PROJECT FORM
     ========================================================== */

  const [
    newProjectName,
    setNewProjectName,
  ] = useState("");


  const [
    newProjectType,
    setNewProjectType,
  ] = useState(
    "Web3 Framework"
  );


  const [
    newProjectDescription,
    setNewProjectDescription,
  ] = useState("");


  /* ==========================================================
     FILTERED PROJECTS
     ========================================================== */

  const filteredProjects =
    useMemo(() => {

      return PROJECTS_DATA.filter(
        (project) => {

          const query =
            searchQuery
              .trim()
              .toLowerCase();


          const matchesSearch =
            !query ||
            project.name
              .toLowerCase()
              .includes(query) ||
            project.type
              .toLowerCase()
              .includes(query) ||
            project.description
              .toLowerCase()
              .includes(query);


          if (
            !matchesSearch
          ) {

            return false;

          }


          if (
            activeFilter ===
            "all"
          ) {

            return true;

          }


          return (
            project.status ===
            activeFilter
          );

        }
      );

    }, [
      searchQuery,
      activeFilter,
    ]);


  /* ==========================================================
     OPEN PROJECT
     ========================================================== */

  const handleOpenProject = (
    project: ProjectItem
  ) => {

    setSelectedProject(
      project
    );


    setSearchParams({
      project:
        String(project.id),
    });

  };


  /* ==========================================================
     CLOSE PROJECT
     ========================================================== */

  const handleCloseProject =
    () => {

      setSelectedProject(
        null
      );


      setSearchParams({});

    };


  /* ==========================================================
     CREATE PROJECT
     ========================================================== */

  const handleCreateProject =
    () => {

      if (
        !newProjectName.trim()
      ) {

        return;

      }


      const temporaryProject:
        ProjectItem = {

        id:
          Date.now(),

        name:
          newProjectName.trim(),

        description:
          newProjectDescription.trim() ||
          "New EventDevX project awaiting configuration.",

        type:
          newProjectType,

        progress:
          0,

        color:
          "#6366f1",

        icon:
          "code",

        status:
          "planning",

        contributors:
          1,

        modules:
          0,

        updated:
          "just now",

      };


      setCreateProjectOpen(
        false
      );


      setSelectedProject(
        temporaryProject
      );


      setNewProjectName("");

      setNewProjectDescription("");

      setNewProjectType(
        "Web3 Framework"
      );

    };


  /* ==========================================================
     PROJECT URL PARAMETER
     ========================================================== */

  const requestedProjectId =
    searchParams.get(
      "project"
    );


  if (
    requestedProjectId &&
    !selectedProject
  ) {

    const project =
      PROJECTS_DATA.find(
        (item) =>
          String(item.id) ===
          requestedProjectId
      );


    if (project) {

      setSelectedProject(
        project
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

                <FolderKanban
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
                EventDevX Projects
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
              Live Projects
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
              Explore collaborative engineering,
              infrastructure, identity,
              analytics and AI projects
              across the EventDevX network.
            </p>

          </div>


          {/* ==================================================
              CREATE PROJECT
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
              setCreateProjectOpen(
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

            New Project

          </Button>

        </section>


        {/* ====================================================
            SUMMARY CARDS
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
              TOTAL
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
                  Total Projects
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-foreground
                  "
                >
                  {PROJECTS_DATA.length}
                </p>

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              ACTIVE
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-emerald-100
              bg-emerald-50/60
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

                <Activity
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
                    text-emerald-700
                  "
                >
                  Active
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
                    PROJECTS_DATA.filter(
                      (
                        project
                      ) =>
                        project.status ===
                        "active"
                    ).length
                  }
                </p>

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              CONTRIBUTORS
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-blue-100
              bg-blue-50/60
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
                    text-blue-700
                  "
                >
                  Contributors
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
                    PROJECTS_DATA
                      .reduce(
                        (
                          total,
                          project
                        ) =>
                          total +
                          project.contributors,
                        0
                      )
                  }
                </p>

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              PROJECT COMPLETION
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-amber-100
              bg-amber-50/60
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

                <Target
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
                    text-amber-700
                  "
                >
                  Avg. Progress
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
                    Math.round(
                      PROJECTS_DATA
                        .reduce(
                          (
                            total,
                            project
                          ) =>
                            total +
                            project.progress,
                          0
                        ) /
                        PROJECTS_DATA.length
                    )
                  }%
                </p>

              </div>

            </CardContent>

          </Card>

        </section>


        {/* ====================================================
            SEARCH + FILTER
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

              {/* ==============================================
                  SEARCH
                  ============================================== */}

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
                  placeholder="Search projects, technologies..."
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


              {/* ==============================================
                  FILTERS
                  ============================================== */}

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >

                {PROJECT_FILTERS.map(
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


        {/* ====================================================
            RESULTS
            ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >

          <p
            className="
              text-sm
              font-bold
              text-foreground
            "
          >

            {filteredProjects.length}

            {" "}

            {filteredProjects.length ===
            1
              ? "project"
              : "projects"}

            {" "}
            found

          </p>


          {(searchQuery ||
            activeFilter !==
              "all") && (

            <button
              type="button"
              onClick={() => {

                setSearchQuery(
                  ""
                );

                setActiveFilter(
                  "all"
                );

              }}
              className="
                text-xs
                font-extrabold
                text-primary
                hover:underline
              "
            >
              Clear filters
            </button>

          )}

        </div>


        {/* ====================================================
            PROJECT GRID
            ==================================================== */}

        {filteredProjects.length >
        0 ? (

          <section
            className="
              grid
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {filteredProjects.map(
              (
                project
              ) => (

                <ProjectCard
                  key={
                    project.id
                  }
                  project={
                    project
                  }
                  onOpen={
                    handleOpenProject
                  }
                />

              )
            )}

          </section>

        ) : (

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

                <FolderKanban
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
                "
              >
                No projects found
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
                Try another search term
                or change the project
                status filter.
              </p>

            </CardContent>

          </Card>

        )}


        {/* ====================================================
            BOTTOM INFORMATION
            ==================================================== */}

        <section
          className="
            grid
            gap-5
            lg:grid-cols-3
          "
        >


          {/* ==================================================
              DEVELOPMENT STATUS
              ================================================== */}

          <Card
            className="
              rounded-2xl
              border
              border-border/70
              bg-card
              shadow-sm
              lg:col-span-2
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
                    Development Status
                  </CardTitle>


                  <p
                    className="
                      mt-1
                      text-xs
                      font-medium
                      text-muted-foreground
                    "
                  >
                    Current progress across
                    the EventDevX project network.
                  </p>

                </div>


                <Sparkles
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
                pb-5
              "
            >

              <div
                className="
                  space-y-5
                "
              >

                {PROJECTS_DATA
                  .slice(
                    0,
                    4
                  )
                  .map(
                    (
                      project
                    ) => (

                      <div
                        key={
                          project.id
                        }
                      >

                        <div
                          className="
                            mb-2
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >

                          <div
                            className="
                              flex
                              min-w-0
                              items-center
                              gap-2
                            "
                          >

                            <span
                              className="
                                h-2
                                w-2
                                shrink-0
                                rounded-full
                              "
                              style={{
                                backgroundColor:
                                  project.color,
                              }}
                            />


                            <span
                              className="
                                truncate
                                text-xs
                                font-bold
                                text-foreground
                              "
                            >
                              {project.name}
                            </span>

                          </div>


                          <span
                            className="
                              shrink-0
                              text-xs
                              font-black
                            "
                            style={{
                              color:
                                project.color,
                            }}
                          >
                            {project.progress}%
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
                              rounded-full
                            "
                            style={{
                              width:
                                `${project.progress}%`,

                              backgroundColor:
                                project.color,
                            }}
                          />

                        </div>

                      </div>

                    )
                  )}

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              PROJECT PRINCIPLES
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
                h-36
                w-36
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

                <Zap
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
                Build Together
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
                EventDevX projects are
                designed around collaboration,
                reusable infrastructure and
                open innovation.
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
                  setCreateProjectOpen(
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

                Start a Project

              </Button>

            </div>

          </div>

        </section>

      </div>


      {/* ======================================================
          PROJECT DETAILS MODAL
          ====================================================== */}

      {selectedProject && (

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
            handleCloseProject
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
                MODAL HERO
                ================================================== */}

            <div
              className="
                relative
                h-44
                overflow-hidden
              "
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    ${selectedProject.color},
                    ${selectedProject.color}cc
                  )
                `,
              }}
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


              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-10
                  left-8
                  h-28
                  w-28
                  rounded-full
                  bg-white/10
                  blur-2xl
                "
              />


              <button
                type="button"
                onClick={
                  handleCloseProject
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
                  bottom-5
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
                    "
                  >
                    {selectedProject.type}
                  </Badge>


                  <Badge
                    className="
                      border-0
                      bg-white/95
                      text-slate-800
                    "
                  >
                    {getStatusLabel(
                      selectedProject.status
                    )}
                  </Badge>

                </div>


                <h3
                  className="
                    text-2xl
                    font-black
                    tracking-tight
                    text-white
                  "
                >
                  {selectedProject.name}
                </h3>

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

              <p
                className="
                  text-sm
                  font-medium
                  leading-7
                  text-slate-600
                "
              >
                {selectedProject.description}
              </p>


              {/* ==================================================
                  PROJECT STATS
                  ================================================== */}

              <div
                className="
                  mt-6
                  grid
                  gap-3
                  sm:grid-cols-3
                "
              >

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

                    <Activity
                      className="
                        h-4
                        w-4
                        text-primary
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.1em]
                        text-slate-400
                      "
                    >
                      Progress
                    </span>

                  </div>


                  <p
                    className="
                      mt-2
                      text-2xl
                      font-black
                      text-slate-900
                    "
                  >
                    {selectedProject.progress}%
                  </p>

                </div>


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
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.1em]
                        text-slate-400
                      "
                    >
                      Contributors
                    </span>

                  </div>


                  <p
                    className="
                      mt-2
                      text-2xl
                      font-black
                      text-slate-900
                    "
                  >
                    {selectedProject.contributors}
                  </p>

                </div>


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

                    <Layers3
                      className="
                        h-4
                        w-4
                        text-primary
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.1em]
                        text-slate-400
                      "
                    >
                      Modules
                    </span>

                  </div>


                  <p
                    className="
                      mt-2
                      text-2xl
                      font-black
                      text-slate-900
                    "
                  >
                    {selectedProject.modules}
                  </p>

                </div>

              </div>


              {/* ==================================================
                  PROGRESS
                  ================================================== */}

              <div
                className="
                  mt-6
                "
              >

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      text-xs
                      font-extrabold
                      text-slate-500
                    "
                  >
                    Project Completion
                  </span>


                  <span
                    className="
                      text-xs
                      font-black
                    "
                    style={{
                      color:
                        selectedProject.color,
                    }}
                  >
                    {selectedProject.progress}%
                  </span>

                </div>


                <div
                  className="
                    h-3
                    overflow-hidden
                    rounded-full
                    bg-slate-100
                  "
                >

                  <div
                    className="
                      h-full
                      rounded-full
                    "
                    style={{
                      width:
                        `${selectedProject.progress}%`,

                      backgroundColor:
                        selectedProject.color,
                    }}
                  />

                </div>

              </div>


              {/* ==================================================
                  MODULE ACTIONS
                  ================================================== */}

              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
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

                    <Layers3
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
                        font-extrabold
                        text-slate-900
                      "
                    >
                      Project Modules
                    </p>


                    <p
                      className="
                        mt-1
                        text-[10px]
                        font-medium
                        text-slate-500
                      "
                    >
                      {selectedProject.modules}
                      {" "}
                      modules configured
                      for this project.
                    </p>

                  </div>

                </div>


                <div
                  className="
                    mt-4
                    grid
                    gap-2
                    sm:grid-cols-2
                  "
                >

                  <div
                    className="
                      rounded-xl
                      bg-white
                      px-3
                      py-3
                    "
                  >

                    <p
                      className="
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.08em]
                        text-slate-400
                      "
                    >
                      Core
                    </p>


                    <p
                      className="
                        mt-1
                        text-xs
                        font-bold
                        text-slate-800
                      "
                    >
                      Architecture
                    </p>

                  </div>


                  <div
                    className="
                      rounded-xl
                      bg-white
                      px-3
                      py-3
                    "
                  >

                    <p
                      className="
                        text-[9px]
                        font-extrabold
                        uppercase
                        tracking-[0.08em]
                        text-slate-400
                      "
                    >
                      Current
                    </p>


                    <p
                      className="
                        mt-1
                        text-xs
                        font-bold
                        text-slate-800
                      "
                    >
                      Development
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
                    navigate(
                      "/community"
                    )
                  }
                >

                  <Users
                    className="
                      h-4
                      w-4
                    "
                  />

                  View Contributors

                </Button>


                <Button
                  type="button"
                  variant="outline"
                  className="
                    flex-1
                    gap-2
                    rounded-xl
                  "
                  onClick={
                    handleCloseProject
                  }
                >

                  <ArrowLeft
                    className="
                      h-4
                      w-4
                    "
                  />

                  Back to Projects

                </Button>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          CREATE PROJECT MODAL
          ====================================================== */}

      {createProjectOpen && (

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
            setCreateProjectOpen(
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
                CREATE HEADER
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
                  Create New Project
                </h3>


                <p
                  className="
                    mt-1
                    text-sm
                    font-medium
                    text-slate-500
                  "
                >
                  Start a new engineering initiative
                  inside EventDevX.
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setCreateProjectOpen(
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
                  PROJECT NAME
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
                  Project Name
                </label>


                <input
                  type="text"
                  value={
                    newProjectName
                  }
                  onChange={(
                    event
                  ) =>
                    setNewProjectName(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Event Intelligence Engine"
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
                  TYPE
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
                  Project Type
                </label>


                <select
                  value={
                    newProjectType
                  }
                  onChange={(
                    event
                  ) =>
                    setNewProjectType(
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
                    Web3 Framework
                  </option>

                  <option>
                    Identity Protocol
                  </option>

                  <option>
                    Blockchain
                  </option>

                  <option>
                    Infrastructure
                  </option>

                  <option>
                    AI / ML
                  </option>

                  <option>
                    Analytics
                  </option>

                </select>

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
                    newProjectDescription
                  }
                  onChange={(
                    event
                  ) =>
                    setNewProjectDescription(
                      event.target.value
                    )
                  }
                  placeholder="Describe what this project is building..."
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
                  BUTTONS
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
                    setCreateProjectOpen(
                      false
                    )
                  }
                >
                  Cancel
                </Button>


                <Button
                  type="button"
                  disabled={
                    !newProjectName.trim()
                  }
                  className="
                    gap-2
                    rounded-xl
                  "
                  onClick={
                    handleCreateProject
                  }
                >

                  <Sparkles
                    className="
                      h-4
                      w-4
                    "
                  />

                  Initialize Project

                </Button>

              </div>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>

  );

};


export default Projects;