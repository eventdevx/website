import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

import {
  createPortal,
} from "react-dom";

import {
  Activity,
  Award,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronRight,
  FolderKanban,
  Globe2,
  LayoutDashboard,
  Network,
  Rocket,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

interface PageMotionProps {
  children: ReactNode;
}

interface RouteVisual {
  title: string;
  subtitle: string;
  icon: ElementType;
  accent: string;
  glow: string;
}

const ROUTE_VISUALS: Record<string, RouteVisual> = {
  "/dashboard": {
    title: "Operational Overview",
    subtitle: "EventDevX control center",
    icon: LayoutDashboard,
    accent: "from-indigo-500 via-violet-500 to-blue-500",
    glow: "bg-indigo-500/20",
  },

  "/events": {
    title: "Events Arena",
    subtitle: "Explore active technology events",
    icon: CalendarDays,
    accent: "from-indigo-500 via-blue-500 to-cyan-500",
    glow: "bg-indigo-500/20",
  },

  "/projects": {
    title: "Live Projects",
    subtitle: "Track collaborative engineering",
    icon: FolderKanban,
    accent: "from-cyan-500 via-sky-500 to-blue-500",
    glow: "bg-cyan-500/20",
  },

  "/community": {
    title: "Global Network",
    subtitle: "Connect with the EventDevX collective",
    icon: Users,
    accent: "from-violet-500 via-fuchsia-500 to-purple-500",
    glow: "bg-violet-500/20",
  },

  "/analytics": {
    title: "Analytics",
    subtitle: "Platform metrics and activity",
    icon: BarChart3,
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
    glow: "bg-emerald-500/20",
  },

  "/infrastructure": {
    title: "Infrastructure Hub",
    subtitle: "Event technology and resources",
    icon: Server,
    accent: "from-orange-500 via-amber-500 to-yellow-500",
    glow: "bg-orange-500/20",
  },

  "/certificates": {
    title: "Certificate Studio",
    subtitle: "Create and manage certificates",
    icon: Award,
    accent: "from-amber-500 via-yellow-500 to-orange-500",
    glow: "bg-amber-500/20",
  },

  "/settings": {
    title: "Settings",
    subtitle: "Manage your EventDevX account",
    icon: Settings,
    accent: "from-slate-500 via-slate-400 to-zinc-300",
    glow: "bg-slate-400/15",
  },

  "/notifications": {
    title: "Notifications",
    subtitle: "Recent EventDevX activity",
    icon: Bell,
    accent: "from-rose-500 via-pink-500 to-fuchsia-500",
    glow: "bg-rose-500/20",
  },
};

const DASHBOARD_PATH_PREFIXES = [
  "/dashboard",
  "/events",
  "/projects",
  "/community",
  "/analytics",
  "/infrastructure",
  "/certificates",
  "/settings",
  "/notifications",
];

function getRouteVisual(pathname: string): RouteVisual {
  const exactMatch = ROUTE_VISUALS[pathname];

  if (exactMatch) {
    return exactMatch;
  }

  const matchedPrefix = DASHBOARD_PATH_PREFIXES.find(
    (prefix) =>
      pathname.startsWith(`${prefix}/`) ||
      pathname.startsWith(`${prefix}?`)
  );

  if (matchedPrefix) {
    return (
      ROUTE_VISUALS[matchedPrefix] ||
      ROUTE_VISUALS["/dashboard"]
    );
  }

  return {
    title: "EventDevX",
    subtitle: "Community Infrastructure Platform",
    icon: Sparkles,
    accent: "from-indigo-500 via-violet-500 to-cyan-500",
    glow: "bg-indigo-500/20",
  };
}

function getPathFromHistoryUrl(
  url: string | URL | null
): string | null {
  if (typeof url === "string") {
    try {
      return new URL(
        url,
        window.location.origin
      ).pathname;
    } catch {
      return null;
    }
  }

  if (url instanceof URL) {
    return url.pathname;
  }

  return window.location.pathname;
}

function isDashboardPath(
  pathname: string
): boolean {
  return DASHBOARD_PATH_PREFIXES.some(
    (prefix) =>
      pathname === prefix ||
      pathname.startsWith(`${prefix}/`) ||
      pathname.startsWith(`${prefix}?`)
  );
}

const PageMotion = ({
  children,
}: PageMotionProps) => {
  const reduceMotion = useReducedMotion();

  const activeTransitionTimer =
    useRef<number | null>(null);

  const [transitionVisible, setTransitionVisible] =
    useState(false);

  const [transitionRoute, setTransitionRoute] =
    useState<RouteVisual>(() =>
      getRouteVisual(window.location.pathname)
    );

  const [mounted, setMounted] =
    useState(false);

  const show3DTransition = (
    pathname: string
  ) => {
    if (!pathname || !isDashboardPath(pathname)) {
      return;
    }

    if (pathname === window.location.pathname) {
      return;
    }

    setTransitionRoute(
      getRouteVisual(pathname)
    );

    setTransitionVisible(true);

    if (activeTransitionTimer.current !== null) {
      window.clearTimeout(
        activeTransitionTimer.current
      );
    }

    activeTransitionTimer.current =
      window.setTimeout(
        () => {
          setTransitionVisible(false);
          activeTransitionTimer.current = null;
        },
        reduceMotion ? 260 : 900
      );
  };

  useEffect(() => {
    setMounted(true);

    const originalPushState =
      window.history.pushState;

    const originalReplaceState =
      window.history.replaceState;

    const patchedPushState =
      function (
        this: History,
        data: unknown,
        unused: string,
        url?: string | URL | null
      ) {
        const nextPath =
          getPathFromHistoryUrl(url || null);

        const currentPath =
          window.location.pathname;

        if (
          nextPath &&
          nextPath !== currentPath &&
          isDashboardPath(nextPath) &&
          isDashboardPath(currentPath)
        ) {
          show3DTransition(nextPath);
        }

        return originalPushState.call(
          this,
          data,
          unused,
          url
        );
      };

    const patchedReplaceState =
      function (
        this: History,
        data: unknown,
        unused: string,
        url?: string | URL | null
      ) {
        const nextPath =
          getPathFromHistoryUrl(url || null);

        const currentPath =
          window.location.pathname;

        if (
          nextPath &&
          nextPath !== currentPath &&
          isDashboardPath(nextPath) &&
          isDashboardPath(currentPath)
        ) {
          show3DTransition(nextPath);
        }

        return originalReplaceState.call(
          this,
          data,
          unused,
          url
        );
      };

    window.history.pushState =
      patchedPushState;

    window.history.replaceState =
      patchedReplaceState;

    const handlePopState = () => {
      const nextPath =
        window.location.pathname;

      if (isDashboardPath(nextPath)) {
        setTransitionRoute(
          getRouteVisual(nextPath)
        );

        setTransitionVisible(true);

        if (
          activeTransitionTimer.current !== null
        ) {
          window.clearTimeout(
            activeTransitionTimer.current
          );
        }

        activeTransitionTimer.current =
          window.setTimeout(
            () => {
              setTransitionVisible(false);
              activeTransitionTimer.current =
                null;
            },
            reduceMotion ? 220 : 820
          );
      }
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.history.pushState =
        originalPushState;

      window.history.replaceState =
        originalReplaceState;

      window.removeEventListener(
        "popstate",
        handlePopState
      );

      if (
        activeTransitionTimer.current !== null
      ) {
        window.clearTimeout(
          activeTransitionTimer.current
        );
      }
    };
  }, [reduceMotion]);

  const TransitionIcon =
    transitionRoute.icon;

  // ✅ FIX 1: AnimatePresence is now OUTSIDE the transitionVisible guard.
  // This lets it detect when the child unmounts and play the exit animation
  // before removing the overlay from the DOM. Previously, the whole block
  // (including AnimatePresence) was torn out instantly when transitionVisible
  // became false, so the backdrop-blur never faded — it just snapped away.
  const transitionOverlay = (
    <AnimatePresence>
      {transitionVisible && (
        <motion.div
          key={transitionRoute.title}
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-slate-950/35
            px-4
            backdrop-blur-[3px]
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.16,
          }}
          aria-live="polite"
          aria-label={`Opening ${transitionRoute.title}`}
        >
          <motion.div
            className={`pointer-events-none absolute h-[23rem] w-[23rem] rounded-full ${transitionRoute.glow} blur-[100px]`}
            initial={{
              opacity: 0,
              scale: 0.45,
            }}
            animate={{
              opacity: 0.95,
              scale: [0.75, 1.08, 0.96],
            }}
            exit={{
              opacity: 0,
              scale: 1.25,
            }}
            transition={{
              duration: reduceMotion ? 0.2 : 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          <div
            className="
              relative
              w-full
              max-w-[470px]
            "
            style={{
              perspective: "1500px",
            }}
          >
            <motion.div
              initial={
                reduceMotion
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      scale: 0.36,
                      y: 90,
                      rotateX: -48,
                      rotateY: 34,
                      rotateZ: -3,
                      z: -260,
                    }
              }
              animate={
                reduceMotion
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      rotateX: [22, -6, 0],
                      rotateY: [-24, 9, 0],
                      rotateZ: [3, -1, 0],
                      z: [0, 80, 0],
                    }
              }
              transition={
                reduceMotion
                  ? {
                      duration: 0.18,
                    }
                  : {
                      duration: 0.72,
                      ease: [0.16, 1, 0.3, 1],
                    }
              }
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  x: -30,
                  y: 35,
                  rotateZ: -5,
                }}
                animate={{
                  opacity: 0.55,
                  x: -22,
                  y: 21,
                  rotateZ: -4,
                }}
                exit={{
                  opacity: 0,
                  x: -45,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="
                  absolute
                  inset-x-10
                  bottom-[-25px]
                  top-10
                  rounded-[2rem]
                  border
                  border-white/10
                  bg-white/[0.025]
                  shadow-2xl
                  backdrop-blur-xl
                "
                style={{
                  transform:
                    "translateZ(-70px)",
                }}
              />

              <motion.div
                initial={{
                  opacity: 0,
                  x: 25,
                  y: 23,
                  rotateZ: 5,
                }}
                animate={{
                  opacity: 0.78,
                  x: 15,
                  y: 12,
                  rotateZ: 4,
                }}
                exit={{
                  opacity: 0,
                  x: 40,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.04,
                }}
                className="
                  absolute
                  inset-x-5
                  bottom-[-14px]
                  top-5
                  rounded-[2rem]
                  border
                  border-white/10
                  bg-white/[0.045]
                  shadow-2xl
                  backdrop-blur-xl
                "
                style={{
                  transform:
                    "translateZ(-35px)",
                }}
              />

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  y: 28,
                  rotateX: -12,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  duration: 0.48,
                  delay: 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/15
                  bg-[#0b1020]
                  p-5
                  shadow-[0_35px_100px_rgba(0,0,0,0.52)]
                "
                style={{
                  transform:
                    "translateZ(35px)",
                  transformStyle:
                    "preserve-3d",
                }}
              >
                <motion.div
                  initial={{
                    scaleX: 0,
                  }}
                  animate={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: 0.15,
                  }}
                  className={`absolute left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r ${transitionRoute.accent}`}
                />

                <div
                  className={`absolute -right-14 -top-14 h-40 w-40 rounded-full bg-gradient-to-br ${transitionRoute.accent} opacity-15 blur-3xl`}
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          rotateY: [0, 8, 0],
                          rotateX: [0, -5, 0],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${transitionRoute.accent} shadow-lg`}
                        style={{
                          transformStyle:
                            "preserve-3d",
                        }}
                      >
                        <TransitionIcon className="h-6 w-6 text-white" />
                      </motion.div>

                      <div>
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                          EventDevX
                        </div>

                        <div className="mt-1 text-lg font-black text-white">
                          {transitionRoute.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                      <span className="text-[9px] font-black uppercase tracking-[0.12em] text-emerald-300">
                        Loading
                      </span>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-500">
                    {transitionRoute.subtitle}
                  </p>

                  <div
                    className="
                      relative
                      mt-7
                      h-24
                    "
                    style={{
                      perspective: "1000px",
                    }}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.65,
                        y: 25,
                        rotateX: -25,
                      }}
                      animate={{
                        opacity: 0.35,
                        scale: 1,
                        y: 6,
                        rotateX: 8,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: 0.15,
                      }}
                      className="
                        absolute
                        inset-x-8
                        top-4
                        h-20
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.025]
                      "
                    />

                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.72,
                        y: 24,
                        rotateX: -20,
                      }}
                      animate={{
                        opacity: 0.62,
                        scale: 1,
                        y: 2,
                        rotateX: 5,
                      }}
                      transition={{
                        duration: 0.48,
                        delay: 0.2,
                      }}
                      className="
                        absolute
                        inset-x-4
                        top-2
                        h-20
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.04]
                      "
                    />

                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.55,
                        y: 28,
                        rotateX: -30,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        rotateX: 2,
                      }}
                      transition={{
                        duration: 0.52,
                        delay: 0.24,
                      }}
                      className="
                        absolute
                        inset-x-0
                        top-0
                        h-20
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.055]
                        px-4
                        shadow-[0_20px_55px_rgba(0,0,0,0.25)]
                      "
                    >
                      <div className="flex h-full items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-9 w-1 rounded-full bg-gradient-to-b ${transitionRoute.accent}`}
                          />

                          <div>
                            <div className="text-sm font-black text-white">
                              Opening workspace
                            </div>

                            <div className="mt-1 text-[10px] font-bold text-slate-600">
                              Preparing the next EventDevX view
                            </div>
                          </div>
                        </div>

                        <motion.div
                          animate={{
                            rotate: [0, 90, 180, 270, 360],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
                        >
                          <Activity className="h-4 w-4 text-slate-300" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-white/5 bg-white/[0.025] p-3">
                      <ShieldCheck className="h-4 w-4 text-emerald-300" />

                      <div className="mt-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-600">
                        Secure
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.025] p-3">
                      <Network className="h-4 w-4 text-cyan-300" />

                      <div className="mt-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-600">
                        Connected
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.025] p-3">
                      <Rocket className="h-4 w-4 text-indigo-300" />

                      <div className="mt-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-600">
                        Ready
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-300" />

                      <span className="text-xs font-bold text-slate-500">
                        {transitionRoute.title}
                      </span>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-600" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        className="
          relative
          min-w-0
          w-full
        "
      >
        {/*
          IMPORTANT:
          The real page stays as a normal DOM layer.
          We do not apply perspective, scale, rotateX,
          or preserve-3d to the page itself.
          This keeps text, icons, inputs and cards sharp.
          The 3D effect is shown only in the temporary
          full-screen transition overlay above.
        */}
        {/*
          The dashboard page itself stays untransformed.
          This is important for a clean, readable UI.
          Text should remain on a normal rendering layer.
          Inputs should remain sharp.
          Buttons should remain sharp.
          Tables should remain sharp.
          Charts should remain sharp.
          Icons should remain sharp.
          The 3D effect belongs to the transition layer.
          That layer is rendered with a portal.
          The portal sits above the dashboard.
          It appears for a short moment after navigation.
          It uses depth and perspective only there.
          The destination name is shown on that panel.
          The destination icon is shown on that panel.
          The destination color is shown on that panel.
          This keeps each EventDevX module easy to read.
          It also keeps the dashboard fast on normal screens.
          Mobile devices get the same transition idea.
          Smaller screens do not receive large page transforms.
          Reduced-motion users get a simpler transition.
          Back navigation also uses the same overlay.
          Direct URL navigation still loads normally.
          Refresh does not apply a transition.
          Only dashboard-to-dashboard navigation triggers it.
          The content below remains the real application page.
          No page content is removed by this wrapper.
        */}
        <div className="w-full">
          {children}
        </div>
      </div>

      {/* ✅ FIX 2: Portal is now always rendered when mounted.
          The transitionVisible guard moved INSIDE AnimatePresence above,
          so AnimatePresence can observe the child appearing/disappearing
          and properly play the exit fade before unmounting the overlay.
          Previously transitionVisible here caused the portal (and
          AnimatePresence) to be torn out immediately on false, skipping
          the exit animation entirely — leaving the blur stuck mid-frame. */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          transitionOverlay,
          document.body
        )}
    </>
  );
};

export default PageMotion;