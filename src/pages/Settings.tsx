import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Bell,
  BriefcaseBusiness,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe2,
  ImagePlus,
  Instagram,
  KeyRound,
  Link2,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Save,
  Settings2,
  Shield,
  ShieldCheck,
  Smartphone,
  Trash2,
  Upload,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "@/contexts/AuthContext";

type NotificationKey =
  | "partnerRequests"
  | "eventAlerts"
  | "serverHealth"
  | "weeklyDigest";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  organization: string;
  city: string;
  website: string;
  github: string;
  linkedin: string;
  bio: string;
  interests: string[];
  avatar: string;
}

interface TeamData {
  teamName: string;
  teamRole: string;
  teamSize: string;
  teamDescription: string;
  teamWebsite: string;
  teamLogo: string;
}

interface NotificationState {
  partnerRequests: boolean;
  eventAlerts: boolean;
  serverHealth: boolean;
  weeklyDigest: boolean;
}

interface ToastState {
  visible: boolean;
  message: string;
}

const PROFILE_STORAGE_PREFIX = "eventdevx-profile-";

const TEAM_STORAGE_PREFIX = "eventdevx-team-";

const NOTIFICATION_STORAGE_PREFIX =
  "eventdevx-notifications-";

const DEFAULT_PROFILE: ProfileData = {
  fullName: "DevX Architect",
  email: "admin@eventdevx.com",
  phone: "",
  role: "Community Member",
  organization: "",
  city: "",
  website: "",
  github: "",
  linkedin: "",
  bio: "",
  interests: [
    "Hackathons",
    "Developer Communities",
  ],
  avatar: "",
};

const DEFAULT_TEAM: TeamData = {
  teamName: "",
  teamRole: "",
  teamSize: "1-5",
  teamDescription: "",
  teamWebsite: "",
  teamLogo: "",
};

const DEFAULT_NOTIFICATIONS: NotificationState = {
  partnerRequests: true,
  eventAlerts: true,
  serverHealth: false,
  weeklyDigest: true,
};

const INTEREST_OPTIONS = [
  "Hackathons",
  "Conferences",
  "Open Source",
  "AI / ML",
  "Web3",
  "Developer Communities",
  "Campus Events",
  "Workshops",
];

function createStorageKey(
  prefix: string,
  userId: string
) {
  return `${prefix}${userId}`;
}

function safeReadStorage<T>(
  key: string,
  fallback: T
): T {
  try {
    const value =
      window.localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function safeWriteStorage<T>(
  key: string,
  value: T
) {
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify(value)
    );

    return true;
  } catch {
    return false;
  }
}

function readFileAsDataUrl(
  file: File
): Promise<string> {
  return new Promise(
    (
      resolve,
      reject
    ) => {
      const reader =
        new FileReader();

      reader.onload = () => {
        resolve(
          String(
            reader.result || ""
          )
        );
      };

      reader.onerror = () => {
        reject(
          new Error(
            "Unable to read image."
          )
        );
      };

      reader.readAsDataURL(file);
    }
  );
}

function getInitials(
  name: string
) {
  const parts =
    name
      .trim()
      .split(" ")
      .filter(Boolean);

  if (!parts.length) {
    return "ED";
  }

  return parts
    .slice(0, 2)
    .map(
      (
        part
      ) =>
        part.charAt(0)
    )
    .join("")
    .toUpperCase();
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const MotionSection = ({
  children,
  className = "",
}: SectionProps) => {
  const reduceMotion =
    useReducedMotion();

  return (
    <motion.section
      initial={
        reduceMotion
          ? {
              opacity: 1,
            }
          : {
              opacity: 0,
              y: 18,
              rotateX: 2,
            }
      }
      whileInView={
        reduceMotion
          ? {
              opacity: 1,
            }
          : {
              opacity: 1,
              y: 0,
              rotateX: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.5,
        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -3,
              rotateX: 0.6,
              rotateY: -0.35,
            }
      }
      style={{
        transformPerspective:
          1400,
        transformStyle:
          "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

interface ToggleRowProps {
  title: string;
  description: string;
  value: boolean;
  onChange: (
    value: boolean
  ) => void;
  icon: React.ReactNode;
}

const ToggleRow = ({
  title,
  description,
  value,
  onChange,
  icon,
}: ToggleRowProps) => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        border-b
        border-slate-100
        py-5
        last:border-b-0
      "
    >
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
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            text-slate-600
          "
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p
            className="
              text-sm
              font-extrabold
              text-slate-900
            "
          >
            {title}
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-slate-500
            "
          >
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() =>
          onChange(!value)
        }
        className={`
          relative
          h-7
          w-12
          shrink-0
          rounded-full
          p-1
          transition
          duration-200
          ${
            value
              ? "bg-indigo-600"
              : "bg-slate-200"
          }
        `}
      >
        <span
          className={`
            block
            h-5
            w-5
            rounded-full
            bg-white
            shadow
            transition-transform
            duration-200
            ${
              value
                ? "translate-x-5"
                : "translate-x-0"
            }
          `}
        />
      </button>
    </div>
  );
};

interface ImageUploadProps {
  label: string;
  description: string;
  value: string;
  initials: string;
  onChange: (
    value: string
  ) => void;
}

const ImageUpload = ({
  label,
  description,
  value,
  initials,
  onChange,
}: ImageUploadProps) => {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    uploadError,
    setUploadError,
  ] = useState("");

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setUploadError(
        "Please select an image file."
      );

      return;
    }

    if (
      file.size >
      3 * 1024 * 1024
    ) {
      setUploadError(
        "Image should be smaller than 3 MB."
      );

      return;
    }

    try {
      setLoading(true);
      setUploadError("");

      const data =
        await readFileAsDataUrl(
          file
        );

      onChange(data);
    } catch {
      setUploadError(
        "Unable to use this image."
      );
    } finally {
      setLoading(false);

      if (inputRef.current) {
        inputRef.current.value =
          "";
      }
    }
  };

  return (
    <div
      className="
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
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              relative
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
            "
          >
            {value ? (
              <img
                src={value}
                alt={label}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <span
                className="
                  text-lg
                  font-black
                  text-indigo-600
                "
              >
                {initials}
              </span>
            )}

            <div
              className="
                absolute
                bottom-1
                right-1
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                border
                border-white
                bg-indigo-600
                text-white
              "
            >
              <Camera className="h-3 w-3" />
            </div>
          </div>

          <div>
            <p
              className="
                text-sm
                font-black
                text-slate-900
              "
            >
              {label}
            </p>

            <p
              className="
                mt-1
                max-w-md
                text-xs
                leading-5
                text-slate-500
              "
            >
              {description}
            </p>
          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={
              handleFileChange
            }
            className="hidden"
          />

          <button
            type="button"
            onClick={() =>
              inputRef.current?.click()
            }
            disabled={loading}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-indigo-200
              bg-white
              px-4
              py-2.5
              text-xs
              font-black
              text-indigo-600
              transition
              hover:bg-indigo-50
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Upload className="h-4 w-4" />

            {loading
              ? "Loading..."
              : "Upload"}
          </button>

          {value && (
            <button
              type="button"
              onClick={() =>
                onChange("")
              }
              className="
                inline-flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-500
                transition
                hover:border-rose-200
                hover:bg-rose-50
                hover:text-rose-500
              "
              aria-label={`Remove ${label}`}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {uploadError && (
        <p
          className="
            mt-3
            text-xs
            font-semibold
            text-rose-600
          "
        >
          {uploadError}
        </p>
      )}
    </div>
  );
};

const Settings = () => {
  const navigate =
    useNavigate();

  const {
    user,
  } = useAuth();

  const reduceMotion =
    useReducedMotion();

  const userId =
    user?.uid ||
    user?.email ||
    "guest";

  const profileKey =
    createStorageKey(
      PROFILE_STORAGE_PREFIX,
      userId
    );

  const teamKey =
    createStorageKey(
      TEAM_STORAGE_PREFIX,
      userId
    );

  const notificationKey =
    createStorageKey(
      NOTIFICATION_STORAGE_PREFIX,
      userId
    );

  const firebaseName =
    user?.displayName ||
    "";

  const firebaseEmail =
    user?.email ||
    DEFAULT_PROFILE.email;

  const defaultProfile =
    useMemo<ProfileData>(
      () => ({
        ...DEFAULT_PROFILE,
        fullName:
          firebaseName ||
          DEFAULT_PROFILE.fullName,
        email:
          firebaseEmail,
      }),
      [
        firebaseEmail,
        firebaseName,
      ]
    );

  const [
    profile,
    setProfile,
  ] = useState<ProfileData>(
    defaultProfile
  );

  const [
    team,
    setTeam,
  ] = useState<TeamData>(
    DEFAULT_TEAM
  );

  const [
    notifications,
    setNotifications,
  ] =
    useState<NotificationState>(
      DEFAULT_NOTIFICATIONS
    );

  const [
    saveState,
    setSaveState,
  ] = useState<
    "idle" | "saving" | "saved"
  >("idle");

  const [
    toast,
    setToast,
  ] = useState<ToastState>({
    visible: false,
    message: "",
  });

  const [
    activeInterest,
    setActiveInterest,
  ] = useState(
    "Hackathons"
  );

  useEffect(() => {
    const savedProfile =
      safeReadStorage<ProfileData>(
        profileKey,
        defaultProfile
      );

    const savedTeam =
      safeReadStorage<TeamData>(
        teamKey,
        DEFAULT_TEAM
      );

    const savedNotifications =
      safeReadStorage<NotificationState>(
        notificationKey,
        DEFAULT_NOTIFICATIONS
      );

    setProfile({
      ...defaultProfile,
      ...savedProfile,
      email: firebaseEmail,
    });

    setTeam({
      ...DEFAULT_TEAM,
      ...savedTeam,
    });

    setNotifications({
      ...DEFAULT_NOTIFICATIONS,
      ...savedNotifications,
    });
  }, [
    defaultProfile,
    firebaseEmail,
    profileKey,
    teamKey,
    notificationKey,
  ]);

  useEffect(() => {
    if (!toast.visible) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setToast({
          visible: false,
          message: "",
        });
      }, 2600);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toast.visible]);

  const initials =
    getInitials(
      profile.fullName
    );

  const saveEverything =
    () => {
      setSaveState("saving");

      const profileSaved =
        safeWriteStorage(
          profileKey,
          profile
        );

      const teamSaved =
        safeWriteStorage(
          teamKey,
          team
        );

      const notificationsSaved =
        safeWriteStorage(
          notificationKey,
          notifications
        );

      window.setTimeout(() => {
        if (
          profileSaved &&
          teamSaved &&
          notificationsSaved
        ) {
          setSaveState("saved");

          setToast({
            visible: true,
            message:
              "Your EventDevX details were saved.",
          });
        } else {
          setSaveState("idle");

          setToast({
            visible: true,
            message:
              "Could not save all changes.",
          });
        }

        window.setTimeout(() => {
          setSaveState("idle");
        }, 1800);
      }, 650);
    };

  const handleInterestToggle =
    (interest: string) => {
      setProfile(
        (current) => {
          const exists =
            current.interests.includes(
              interest
            );

          return {
            ...current,
            interests: exists
              ? current.interests.filter(
                  (
                    item
                  ) =>
                    item !==
                    interest
                )
              : [
                  ...current.interests,
                  interest,
                ],
          };
        }
      );

      setActiveInterest(
        interest
      );
    };

  const handleAvatarChange =
    (value: string) => {
      setProfile(
        (current) => ({
          ...current,
          avatar: value,
        })
      );
    };

  const handleTeamLogoChange =
    (value: string) => {
      setTeam(
        (current) => ({
          ...current,
          teamLogo: value,
        })
      );
    };

  const handleExport =
    () => {
      const data = {
        profile,
        team,
        notifications,
        exportedAt:
          new Date().toISOString(),
        product:
          "EventDevX",
      };

      const blob =
        new Blob(
          [
            JSON.stringify(
              data,
              null,
              2
            ),
          ],
          {
            type: "application/json",
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

      link.href = url;

      link.download =
        "eventdevx-profile-export.json";

      link.click();

      URL.revokeObjectURL(
        url
      );

      setToast({
        visible: true,
        message:
          "Your EventDevX profile export is ready.",
      });
    };

  const handleDelete =
    () => {
      const confirmed =
        window.confirm(
          "Are you sure you want to remove your saved EventDevX profile data from this browser?"
        );

      if (!confirmed) {
        return;
      }

      try {
        window.localStorage.removeItem(
          profileKey
        );

        window.localStorage.removeItem(
          teamKey
        );

        window.localStorage.removeItem(
          notificationKey
        );
      } catch {
        // Ignore local storage errors.
      }

      setProfile(
        defaultProfile
      );

      setTeam(
        DEFAULT_TEAM
      );

      setNotifications(
        DEFAULT_NOTIFICATIONS
      );

      setToast({
        visible: true,
        message:
          "Saved profile data was removed from this browser.",
      });
    };

  return (
    <div
      className="
        relative
        w-full
        min-w-0
        pb-10
      "
      style={{
        perspective:
          "1500px",
      }}
    >
      {/* =========================================================
          PAGE BACKGROUND
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [
                    0,
                    22,
                    -12,
                    0,
                  ],
                  y: [
                    0,
                    -18,
                    15,
                    0,
                  ],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-24
            top-10
            h-72
            w-72
            rounded-full
            bg-indigo-500/10
            blur-[100px]
          "
        />

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [
                    0,
                    -18,
                    15,
                    0,
                  ],
                  y: [
                    0,
                    16,
                    -10,
                    0,
                  ],
                }
          }
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[-5rem]
            top-[30%]
            h-80
            w-80
            rounded-full
            bg-cyan-500/10
            blur-[110px]
          "
        />
      </div>

      <div
        className="
          relative
          z-10
          w-full
          space-y-6
        "
      >
        {/* =======================================================
            PAGE INTRO
        ======================================================== */}

        <MotionSection>
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              sm:p-7
              lg:p-8
            "
          >
            <div
              className="
                absolute
                right-0
                top-0
                h-40
                w-40
                rounded-bl-full
                bg-indigo-50
              "
            />

            <div
              className="
                relative
                flex
                flex-col
                gap-6
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-start
                  gap-4
                "
              >
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          rotateY: 10,
                          rotateX: -4,
                          scale: 1.03,
                        }
                  }
                  style={{
                    transformPerspective:
                      900,
                    transformStyle:
                      "preserve-3d",
                  }}
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-indigo-600
                    text-white
                    shadow-[0_15px_30px_rgba(79,70,229,0.25)]
                  "
                >
                  <Settings2 className="h-6 w-6" />
                </motion.div>

                <div className="min-w-0">
                  <div
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-indigo-600
                    "
                  >
                    EventDevX Account
                  </div>

                  <h1
                    className="
                      mt-2
                      text-3xl
                      font-black
                      tracking-tight
                      text-slate-950
                      sm:text-4xl
                    "
                  >
                    Settings
                  </h1>

                  <p
                    className="
                      mt-2
                      max-w-2xl
                      text-sm
                      leading-6
                      text-slate-500
                      sm:text-base
                    "
                  >
                    Keep your profile, team
                    details and EventDevX
                    preferences up to date.
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  flex-col
                  gap-2
                  sm:flex-row
                  sm:items-center
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/dashboard"
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    text-xs
                    font-black
                    text-slate-700
                    transition
                    hover:-translate-y-0.5
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:text-indigo-600
                  "
                >
                  <ArrowLeft className="h-4 w-4" />
                  Dashboard
                </button>

                <button
                  type="button"
                  onClick={saveEverything}
                  disabled={
                    saveState ===
                    "saving"
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-indigo-600
                    px-5
                    py-3
                    text-xs
                    font-black
                    text-white
                    shadow-[0_12px_28px_rgba(79,70,229,0.20)]
                    transition
                    hover:-translate-y-0.5
                    hover:bg-indigo-500
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >
                  {saveState ===
                  "saved" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}

                  {saveState ===
                  "saving"
                    ? "Saving..."
                    : saveState ===
                      "saved"
                    ? "Saved"
                    : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* =======================================================
            PROFILE + TEAM SUMMARY
        ======================================================== */}

        <div
          className="
            grid
            gap-6
            xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]
          "
        >
          <MotionSection>
            <div
              className="
                h-full
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
              "
            >
              <div
                className="
                  border-b
                  border-slate-100
                  px-5
                  py-5
                  sm:px-7
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <h2
                      className="
                        text-lg
                        font-black
                        text-slate-950
                      "
                    >
                      Profile
                    </h2>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-slate-500
                      "
                    >
                      Basic information shown across
                      your EventDevX account.
                    </p>
                  </div>

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-emerald-200
                      bg-emerald-50
                      px-3
                      py-1.5
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.12em]
                      text-emerald-700
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Profile Ready
                  </div>
                </div>
              </div>

              <div
                className="
                  space-y-6
                  p-5
                  sm:p-7
                "
              >
                <ImageUpload
                  label="Profile Photo"
                  description="Use a clear square image. PNG, JPG and WEBP are supported."
                  value={profile.avatar}
                  initials={initials}
                  onChange={
                    handleAvatarChange
                  }
                />

                <div
                  className="
                    grid
                    gap-5
                    md:grid-cols-2
                  "
                >
                  <div>
                    <label
                      htmlFor="settings-full-name"
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.13em]
                        text-slate-400
                      "
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        className="
                          absolute
                          left-3
                          top-1/2
                          h-4
                          w-4
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="settings-full-name"
                        type="text"
                        value={
                          profile.fullName
                        }
                        onChange={(event) =>
                          setProfile(
                            (current) => ({
                              ...current,
                              fullName:
                                event.target
                                  .value,
                            })
                          )
                        }
                        placeholder="Your full name"
                        className="
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          pl-10
                          pr-4
                          text-sm
                          font-semibold
                          text-slate-900
                          outline-none
                          transition
                          focus:border-indigo-400
                          focus:ring-2
                          focus:ring-indigo-100
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="settings-role"
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.13em]
                        text-slate-400
                      "
                    >
                      Role
                    </label>

                    <div className="relative">
                      <BriefcaseBusiness
                        className="
                          absolute
                          left-3
                          top-1/2
                          h-4
                          w-4
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="settings-role"
                        type="text"
                        value={
                          profile.role
                        }
                        onChange={(event) =>
                          setProfile(
                            (current) => ({
                              ...current,
                              role:
                                event.target
                                  .value,
                            })
                          )
                        }
                        placeholder="Your role"
                        className="
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          pl-10
                          pr-4
                          text-sm
                          font-semibold
                          text-slate-900
                          outline-none
                          transition
                          focus:border-indigo-400
                          focus:ring-2
                          focus:ring-indigo-100
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="settings-email"
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.13em]
                        text-slate-400
                      "
                    >
                      Email
                    </label>

                    <div className="relative">
                      <Mail
                        className="
                          absolute
                          left-3
                          top-1/2
                          h-4
                          w-4
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="settings-email"
                        type="email"
                        value={
                          profile.email
                        }
                        readOnly
                        className="
                          h-11
                          w-full
                          cursor-not-allowed
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          pl-10
                          pr-4
                          text-sm
                          font-semibold
                          text-slate-600
                          outline-none
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="settings-phone"
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.13em]
                        text-slate-400
                      "
                    >
                      Phone
                    </label>

                    <div className="relative">
                      <Smartphone
                        className="
                          absolute
                          left-3
                          top-1/2
                          h-4
                          w-4
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="settings-phone"
                        type="tel"
                        value={
                          profile.phone
                        }
                        onChange={(event) =>
                          setProfile(
                            (current) => ({
                              ...current,
                              phone:
                                event.target
                                  .value,
                            })
                          )
                        }
                        placeholder="+91 98765 43210"
                        className="
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          pl-10
                          pr-4
                          text-sm
                          font-semibold
                          text-slate-900
                          outline-none
                          transition
                          focus:border-indigo-400
                          focus:ring-2
                          focus:ring-indigo-100
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="settings-organization"
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.13em]
                        text-slate-400
                      "
                    >
                      Organization / College
                    </label>

                    <div className="relative">
                      <Building2
                        className="
                          absolute
                          left-3
                          top-1/2
                          h-4
                          w-4
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="settings-organization"
                        type="text"
                        value={
                          profile.organization
                        }
                        onChange={(event) =>
                          setProfile(
                            (current) => ({
                              ...current,
                              organization:
                                event.target
                                  .value,
                            })
                          )
                        }
                        placeholder="College or company name"
                        className="
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          pl-10
                          pr-4
                          text-sm
                          font-semibold
                          text-slate-900
                          outline-none
                          transition
                          focus:border-indigo-400
                          focus:ring-2
                          focus:ring-indigo-100
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="settings-city"
                      className="
                        mb-2
                        block
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.13em]
                        text-slate-400
                      "
                    >
                      City
                    </label>

                    <div className="relative">
                      <MapPin
                        className="
                          absolute
                          left-3
                          top-1/2
                          h-4
                          w-4
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="settings-city"
                        type="text"
                        value={
                          profile.city
                        }
                        onChange={(event) =>
                          setProfile(
                            (current) => ({
                              ...current,
                              city:
                                event.target
                                  .value,
                            })
                          )
                        }
                        placeholder="City, State"
                        className="
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          pl-10
                          pr-4
                          text-sm
                          font-semibold
                          text-slate-900
                          outline-none
                          transition
                          focus:border-indigo-400
                          focus:ring-2
                          focus:ring-indigo-100
                        "
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="settings-bio"
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.13em]
                      text-slate-400
                    "
                  >
                    About You
                  </label>

                  <textarea
                    id="settings-bio"
                    value={
                      profile.bio
                    }
                    onChange={(event) =>
                      setProfile(
                        (current) => ({
                          ...current,
                          bio:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="Tell the EventDevX network a little about what you build and the events you work with."
                    rows={5}
                    className="
                      w-full
                      resize-y
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-3
                      text-sm
                      font-medium
                      leading-6
                      text-slate-900
                      outline-none
                      transition
                      focus:border-indigo-400
                      focus:ring-2
                      focus:ring-indigo-100
                    "
                  />
                </div>

                <div>
                  <div
                    className="
                      mb-3
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.13em]
                      text-slate-400
                    "
                  >
                    Interests
                  </div>

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {INTEREST_OPTIONS.map(
                      (interest) => {
                        const selected =
                          profile.interests.includes(
                            interest
                          );

                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() =>
                              handleInterestToggle(
                                interest
                              )
                            }
                            className={`
                              rounded-full
                              border
                              px-3.5
                              py-2
                              text-xs
                              font-bold
                              transition
                              ${
                                selected
                                  ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                                  : "border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
                              }
                            `}
                          >
                            {selected && (
                              <Check className="mr-1 inline-block h-3.5 w-3.5" />
                            )}

                            {interest}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <div
                    className="
                      mt-3
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      font-bold
                      text-slate-400
                    "
                  >
                    <Zap
                      className={`
                        h-3.5
                        w-3.5
                        ${
                          activeInterest
                            ? "text-indigo-500"
                            : "text-slate-400"
                        }
                      `}
                    />

                    Choose the areas you work
                    with most.
                  </div>
                </div>
              </div>
            </div>
          </MotionSection>

          <MotionSection>
            <div
              className="
                h-full
                overflow-hidden
                rounded-3xl
                border
                border-indigo-100
                bg-gradient-to-br
                from-indigo-50
                via-white
                to-cyan-50
                p-6
                shadow-sm
                sm:p-7
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
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-indigo-600
                    shadow-sm
                  "
                >
                  <Users className="h-5 w-5" />
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      text-indigo-500
                    "
                  >
                    Your Network
                  </p>

                  <h2
                    className="
                      mt-1
                      text-lg
                      font-black
                      text-slate-950
                    "
                  >
                    Profile Snapshot
                  </h2>
                </div>
              </div>

              <div className="mt-7">
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
                      h-16
                      w-16
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white
                      bg-white
                      text-lg
                      font-black
                      text-indigo-600
                      shadow-sm
                    "
                  >
                    {profile.avatar ? (
                      <img
                        src={
                          profile.avatar
                        }
                        alt={
                          profile.fullName
                        }
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    ) : (
                      initials
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="
                        truncate
                        text-xl
                        font-black
                        text-slate-950
                      "
                    >
                      {profile.fullName ||
                        "Your Name"}
                    </h3>

                    <p
                      className="
                        mt-1
                        truncate
                        text-xs
                        font-semibold
                        text-slate-500
                      "
                    >
                      {profile.role ||
                        "Community Member"}
                    </p>

                    <div
                      className="
                        mt-2
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-indigo-200
                        bg-indigo-50
                        px-2.5
                        py-1
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.1em]
                        text-indigo-700
                      "
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      EventDevX Member
                    </div>
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  <div
                    className="
                      rounded-2xl
                      border
                      border-white
                      bg-white/80
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
                      <Mail className="h-4 w-4 text-indigo-500" />

                      <div>
                        <p
                          className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.12em]
                            text-slate-400
                          "
                        >
                          Email
                        </p>

                        <p
                          className="
                            mt-1
                            text-sm
                            font-bold
                            text-slate-700
                          "
                        >
                          {profile.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white
                      bg-white/80
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
                      <Building2 className="h-4 w-4 text-indigo-500" />

                      <div>
                        <p
                          className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.12em]
                            text-slate-400
                          "
                        >
                          Organization
                        </p>

                        <p
                          className="
                            mt-1
                            text-sm
                            font-bold
                            text-slate-700
                          "
                        >
                          {profile.organization ||
                            "Add your organization"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-white
                      bg-white/80
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
                      <MapPin className="h-4 w-4 text-indigo-500" />

                      <div>
                        <p
                          className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.12em]
                            text-slate-400
                          "
                        >
                          Location
                        </p>

                        <p
                          className="
                            mt-1
                            text-sm
                            font-bold
                            text-slate-700
                          "
                        >
                          {profile.city ||
                            "Add your city"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    mt-7
                    rounded-2xl
                    border
                    border-indigo-100
                    bg-indigo-600
                    p-5
                    text-white
                    shadow-[0_18px_40px_rgba(79,70,229,0.22)]
                  "
                >
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />

                    <div>
                      <p
                        className="
                          text-sm
                          font-black
                        "
                      >
                        Keep your profile complete
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          leading-5
                          text-indigo-100
                        "
                      >
                        A complete profile makes
                        your community identity
                        easier to understand.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionSection>
        </div>

        {/* =======================================================
            TEAM DETAILS
        ======================================================== */}

        <MotionSection>
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <div
              className="
                flex
                flex-col
                gap-5
                border-b
                border-slate-100
                px-5
                py-6
                sm:px-7
                lg:flex-row
                lg:items-center
                lg:justify-between
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
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-50
                    text-cyan-600
                  "
                >
                  <Users className="h-5 w-5" />
                </div>

                <div>
                  <h2
                    className="
                      text-lg
                      font-black
                      text-slate-950
                    "
                  >
                    Team & Organization
                  </h2>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-slate-500
                    "
                  >
                    Add the team details you
                    use for EventDevX events
                    and projects.
                  </p>
                </div>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-cyan-200
                  bg-cyan-50
                  px-3
                  py-1.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-cyan-700
                "
              >
                <BriefcaseBusiness className="h-3.5 w-3.5" />
                Team Profile
              </div>
            </div>

            <div
              className="
                space-y-6
                p-5
                sm:p-7
              "
            >
              <ImageUpload
                label="Team Logo"
                description="Add your team or organization logo for a cleaner event identity."
                value={team.teamLogo}
                initials={
                  getInitials(
                    team.teamName ||
                      "Team"
                  )
                }
                onChange={
                  handleTeamLogoChange
                }
              />

              <div
                className="
                  grid
                  gap-5
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >
                <div>
                  <label
                    htmlFor="team-name"
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.13em]
                      text-slate-400
                    "
                  >
                    Team Name
                  </label>

                  <div className="relative">
                    <Users
                      className="
                        absolute
                        left-3
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      id="team-name"
                      type="text"
                      value={
                        team.teamName
                      }
                      onChange={(event) =>
                        setTeam(
                          (current) => ({
                            ...current,
                            teamName:
                              event.target
                                .value,
                          })
                        )
                      }
                      placeholder="e.g. Team Orion"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        pl-10
                        pr-4
                        text-sm
                        font-semibold
                        text-slate-900
                        outline-none
                        transition
                        focus:border-cyan-400
                        focus:ring-2
                        focus:ring-cyan-100
                      "
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="team-role"
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.13em]
                      text-slate-400
                    "
                  >
                    Your Team Role
                  </label>

                  <div className="relative">
                    <BriefcaseBusiness
                      className="
                        absolute
                        left-3
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      id="team-role"
                      type="text"
                      value={
                        team.teamRole
                      }
                      onChange={(event) =>
                        setTeam(
                          (current) => ({
                            ...current,
                            teamRole:
                              event.target
                                .value,
                          })
                        )
                      }
                      placeholder="e.g. Team Lead"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        pl-10
                        pr-4
                        text-sm
                        font-semibold
                        text-slate-900
                        outline-none
                        transition
                        focus:border-cyan-400
                        focus:ring-2
                        focus:ring-cyan-100
                      "
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="team-size"
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.13em]
                      text-slate-400
                    "
                  >
                    Team Size
                  </label>

                  <div className="relative">
                    <Users
                      className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <select
                      id="team-size"
                      value={
                        team.teamSize
                      }
                      onChange={(event) =>
                        setTeam(
                          (current) => ({
                            ...current,
                            teamSize:
                              event.target
                                .value,
                          })
                        )
                      }
                      className="
                        h-11
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        pl-10
                        pr-10
                        text-sm
                        font-semibold
                        text-slate-900
                        outline-none
                        transition
                        focus:border-cyan-400
                        focus:ring-2
                        focus:ring-cyan-100
                      "
                    >
                      <option value="1-5">
                        1-5 people
                      </option>

                      <option value="6-10">
                        6-10 people
                      </option>

                      <option value="11-25">
                        11-25 people
                      </option>

                      <option value="26-50">
                        26-50 people
                      </option>

                      <option value="50+">
                        50+ people
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

                <div>
                  <label
                    htmlFor="team-website"
                    className="
                      mb-2
                      block
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.13em]
                      text-slate-400
                    "
                  >
                    Team Website
                  </label>

                  <div className="relative">
                    <Globe2
                      className="
                        absolute
                        left-3
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      id="team-website"
                      type="url"
                      value={
                        team.teamWebsite
                      }
                      onChange={(event) =>
                        setTeam(
                          (current) => ({
                            ...current,
                            teamWebsite:
                              event.target
                                .value,
                          })
                        )
                      }
                      placeholder="https://yourteam.dev"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        pl-10
                        pr-4
                        text-sm
                        font-semibold
                        text-slate-900
                        outline-none
                        transition
                        focus:border-cyan-400
                        focus:ring-2
                        focus:ring-cyan-100
                      "
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="team-description"
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.13em]
                    text-slate-400
                  "
                >
                  About Your Team
                </label>

                <textarea
                  id="team-description"
                  value={
                    team.teamDescription
                  }
                  onChange={(event) =>
                    setTeam(
                      (current) => ({
                        ...current,
                        teamDescription:
                          event.target
                            .value,
                      })
                    )
                  }
                  placeholder="What does your team build? What kind of events or projects do you work on?"
                  rows={5}
                  className="
                    w-full
                    resize-y
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    font-medium
                    leading-6
                    text-slate-900
                    outline-none
                    transition
                    focus:border-cyan-400
                    focus:ring-2
                    focus:ring-cyan-100
                  "
                />
              </div>

              <div
                className="
                  grid
                  gap-4
                  sm:grid-cols-2
                "
              >
                <div
                  className="
                    rounded-2xl
                    border
                    border-cyan-100
                    bg-cyan-50
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
                    <Building2 className="h-5 w-5 shrink-0 text-cyan-600" />

                    <div>
                      <p
                        className="
                          text-sm
                          font-black
                          text-slate-900
                        "
                      >
                        Team identity
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          leading-5
                          text-slate-500
                        "
                      >
                        Use the same team name
                        when you join EventDevX
                        events and projects.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-indigo-100
                    bg-indigo-50
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
                    <Link2 className="h-5 w-5 shrink-0 text-indigo-600" />

                    <div>
                      <p
                        className="
                          text-sm
                          font-black
                          text-slate-900
                        "
                      >
                        Team links
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          leading-5
                          text-slate-500
                        "
                      >
                        Add a website so other
                        members can learn more
                        about your team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* =======================================================
            SOCIAL LINKS
        ======================================================== */}

        <MotionSection>
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <div
              className="
                border-b
                border-slate-100
                px-5
                py-6
                sm:px-7
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
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-100
                    text-slate-700
                  "
                >
                  <Globe2 className="h-5 w-5" />
                </div>

                <div>
                  <h2
                    className="
                      text-lg
                      font-black
                      text-slate-950
                    "
                  >
                    Links
                  </h2>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-slate-500
                    "
                  >
                    Add places where people can
                    find your work.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
                grid
                gap-5
                p-5
                sm:p-7
                md:grid-cols-3
              "
            >
              <div>
                <label
                  htmlFor="profile-website"
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.13em]
                    text-slate-400
                  "
                >
                  Website
                </label>

                <div className="relative">
                  <Globe2
                    className="
                      absolute
                      left-3
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    id="profile-website"
                    type="url"
                    value={
                      profile.website
                    }
                    onChange={(event) =>
                      setProfile(
                        (current) => ({
                          ...current,
                          website:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="https://"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      pl-10
                      pr-4
                      text-sm
                      font-semibold
                      text-slate-900
                      outline-none
                      transition
                      focus:border-slate-400
                      focus:ring-2
                      focus:ring-slate-100
                    "
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-github"
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.13em]
                    text-slate-400
                  "
                >
                  GitHub
                </label>

                <div className="relative">
                  <Github
                    className="
                      absolute
                      left-3
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    id="profile-github"
                    type="url"
                    value={
                      profile.github
                    }
                    onChange={(event) =>
                      setProfile(
                        (current) => ({
                          ...current,
                          github:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="https://github.com/"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      pl-10
                      pr-4
                      text-sm
                      font-semibold
                      text-slate-900
                      outline-none
                      transition
                      focus:border-slate-400
                      focus:ring-2
                      focus:ring-slate-100
                    "
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-linkedin"
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.13em]
                    text-slate-400
                  "
                >
                  LinkedIn
                </label>

                <div className="relative">
                  <Linkedin
                    className="
                      absolute
                      left-3
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <input
                    id="profile-linkedin"
                    type="url"
                    value={
                      profile.linkedin
                    }
                    onChange={(event) =>
                      setProfile(
                        (current) => ({
                          ...current,
                          linkedin:
                            event.target
                              .value,
                        })
                      )
                    }
                    placeholder="https://linkedin.com/in/"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      pl-10
                      pr-4
                      text-sm
                      font-semibold
                      text-slate-900
                      outline-none
                      transition
                      focus:border-slate-400
                      focus:ring-2
                      focus:ring-slate-100
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* =======================================================
            NOTIFICATIONS
        ======================================================== */}

        <MotionSection>
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-sm
            "
          >
            <div
              className="
                border-b
                border-slate-100
                px-5
                py-6
                sm:px-7
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
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-indigo-50
                    text-indigo-600
                  "
                >
                  <Bell className="h-5 w-5" />
                </div>

                <div>
                  <h2
                    className="
                      text-lg
                      font-black
                      text-slate-950
                    "
                  >
                    Notifications
                  </h2>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-5
                      text-slate-500
                    "
                  >
                    Choose the EventDevX updates
                    you want to receive.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
                px-5
                sm:px-7
              "
            >
              <ToggleRow
                title="Partner Requests"
                description="Get notified when a new partner or community group sends a request."
                value={
                  notifications.partnerRequests
                }
                onChange={(value) =>
                  setNotifications(
                    (current) => ({
                      ...current,
                      partnerRequests:
                        value,
                    })
                  )
                }
                icon={
                  <MessageCircle className="h-4 w-4" />
                }
              />

              <ToggleRow
                title="Event Alerts"
                description="Receive updates when an event goes live, changes status or needs attention."
                value={
                  notifications.eventAlerts
                }
                onChange={(value) =>
                  setNotifications(
                    (current) => ({
                      ...current,
                      eventAlerts:
                        value,
                    })
                  )
                }
                icon={
                  <Zap className="h-4 w-4" />
                }
              />

              <ToggleRow
                title="Server Health"
                description="Get infrastructure warnings and event technology alerts."
                value={
                  notifications.serverHealth
                }
                onChange={(value) =>
                  setNotifications(
                    (current) => ({
                      ...current,
                      serverHealth:
                        value,
                    })
                  )
                }
                icon={
                  <ShieldCheck className="h-4 w-4" />
                }
              />

              <ToggleRow
                title="Weekly Digest"
                description="Receive a simple summary of your EventDevX activity each week."
                value={
                  notifications.weeklyDigest
                }
                onChange={(value) =>
                  setNotifications(
                    (current) => ({
                      ...current,
                      weeklyDigest:
                        value,
                    })
                  )
                }
                icon={
                  <FileText className="h-4 w-4" />
                }
              />
            </div>
          </div>
        </MotionSection>

        {/* =======================================================
            SECURITY
        ======================================================== */}

        <div
          className="
            grid
            gap-6
            xl:grid-cols-2
          "
        >
          <MotionSection>
            <div
              className="
                h-full
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
              "
            >
              <div
                className="
                  border-b
                  border-slate-100
                  px-5
                  py-6
                  sm:px-7
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
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-50
                      text-emerald-600
                    "
                  >
                    <Shield className="h-5 w-5" />
                  </div>

                  <div>
                    <h2
                      className="
                        text-lg
                        font-black
                        text-slate-950
                      "
                    >
                      Security
                    </h2>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-slate-500
                      "
                    >
                      Keep your EventDevX account
                      protected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-5 sm:p-7">
                <button
                  type="button"
                  onClick={() =>
                    setToast({
                      visible: true,
                      message:
                        "Two-factor setup can be connected to your Firebase security flow.",
                    })
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    text-left
                    transition
                    hover:-translate-y-0.5
                    hover:border-emerald-200
                    hover:bg-emerald-50/40
                  "
                >
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
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-50
                        text-emerald-600
                      "
                    >
                      <KeyRound className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          text-sm
                          font-black
                          text-slate-900
                        "
                      >
                        Two-Factor Authentication
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          leading-5
                          text-slate-500
                        "
                      >
                        Add another sign-in protection layer.
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                </button>

                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-100
                    bg-slate-50
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
                    <Lock className="mt-0.5 h-4 w-4 text-slate-500" />

                    <div>
                      <p
                        className="
                          text-sm
                          font-black
                          text-slate-900
                        "
                      >
                        Signed in with Firebase
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          leading-5
                          text-slate-500
                        "
                      >
                        Your EventDevX login session is handled
                        through the Firebase authentication flow.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleExport}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    text-left
                    transition
                    hover:-translate-y-0.5
                    hover:border-indigo-200
                    hover:bg-indigo-50/40
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
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-50
                        text-indigo-600
                      "
                    >
                      <Download className="h-4 w-4" />
                    </div>

                    <div>
                      <p
                        className="
                          text-sm
                          font-black
                          text-slate-900
                        "
                      >
                        Export Profile Data
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        Download your saved EventDevX profile details.
                      </p>
                    </div>
                  </div>

                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>
          </MotionSection>

          {/* =====================================================
              DANGER ZONE
          ====================================================== */}

          <MotionSection>
            <div
              className="
                h-full
                overflow-hidden
                rounded-3xl
                border
                border-rose-200
                bg-white
                shadow-sm
              "
            >
              <div
                className="
                  border-b
                  border-rose-100
                  bg-rose-50/70
                  px-5
                  py-6
                  sm:px-7
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
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-white
                      text-rose-500
                      shadow-sm
                    "
                  >
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div>
                    <h2
                      className="
                        text-lg
                        font-black
                        text-rose-700
                      "
                    >
                      Danger Zone
                    </h2>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-rose-500
                      "
                    >
                      Account and local data actions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-5 sm:p-7">
                <button
                  type="button"
                  onClick={() =>
                    setToast({
                      visible: true,
                      message:
                        "Security instructions are ready for your Firebase account.",
                    })
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    text-left
                    transition
                    hover:-translate-y-0.5
                    hover:border-rose-200
                    hover:bg-rose-50/40
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
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-rose-50
                        text-rose-500
                      "
                    >
                      <KeyRound className="h-4 w-4" />
                    </div>

                    <div>
                      <p
                        className="
                          text-sm
                          font-black
                          text-slate-900
                        "
                      >
                        Review Security Settings
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        Check your account protection options.
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={handleExport}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    text-left
                    transition
                    hover:-translate-y-0.5
                    hover:border-amber-200
                    hover:bg-amber-50/30
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
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-amber-50
                        text-amber-600
                      "
                    >
                      <Download className="h-4 w-4" />
                    </div>

                    <div>
                      <p
                        className="
                          text-sm
                          font-black
                          text-slate-900
                        "
                      >
                        Export All Saved Data
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-slate-500
                        "
                      >
                        Save a local JSON copy of your EventDevX details.
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    rounded-2xl
                    border
                    border-rose-200
                    bg-rose-50/50
                    p-4
                    text-left
                    transition
                    hover:-translate-y-0.5
                    hover:bg-rose-100
                  "
                >
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
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        text-rose-500
                      "
                    >
                      <Trash2 className="h-4 w-4" />
                    </div>

                    <div>
                      <p
                        className="
                          text-sm
                          font-black
                          text-rose-700
                        "
                      >
                        Remove Saved Profile Data
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          leading-5
                          text-rose-500
                        "
                      >
                        Removes the profile, team and notification
                        data saved in this browser.
                      </p>
                    </div>
                  </div>

                  <Trash2 className="h-4 w-4 shrink-0 text-rose-400" />
                </button>
              </div>
            </div>
          </MotionSection>
        </div>

        {/* =======================================================
            HELP
        ======================================================== */}

        <MotionSection>
          <div
            className="
              grid
              gap-4
              md:grid-cols-3
            "
          >
            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
              "
            >
              <CircleHelp className="h-5 w-5 text-indigo-500" />

              <h3
                className="
                  mt-4
                  text-sm
                  font-black
                  text-slate-950
                "
              >
                Need help?
              </h3>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
                Use the EventDevX dashboard
                and notifications to keep track
                of your platform activity.
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
              "
            >
              <AtSign className="h-5 w-5 text-cyan-500" />

              <h3
                className="
                  mt-4
                  text-sm
                  font-black
                  text-slate-950
                "
              >
                Keep email correct
              </h3>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
                Your login email comes from
                your EventDevX Firebase account.
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
              "
            >
              <Zap className="h-5 w-5 text-amber-500" />

              <h3
                className="
                  mt-4
                  text-sm
                  font-black
                  text-slate-950
                "
              >
                Save after editing
              </h3>

              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
                Use Save Changes after updating
                your profile or team details.
              </p>
            </div>
          </div>
        </MotionSection>

        {/* =======================================================
            FINAL SAVE BAR
        ======================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
            sticky
            bottom-3
            z-20
            rounded-2xl
            border
            border-slate-200
            bg-white/95
            p-3
            shadow-[0_16px_45px_rgba(15,23,42,0.12)]
            backdrop-blur-xl
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
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
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-50
                  text-emerald-600
                "
              >
                {saveState ===
                "saved" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Save className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-sm
                    font-black
                    text-slate-900
                  "
                >
                  {saveState ===
                  "saved"
                    ? "Changes saved"
                    : "Your profile is editable"}
                </p>

                <p
                  className="
                    truncate
                    text-xs
                    text-slate-500
                  "
                >
                  {saveState ===
                  "saved"
                    ? "Your local EventDevX details are up to date."
                    : "Add your team and profile details, then save them."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={saveEverything}
              disabled={
                saveState ===
                "saving"
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-5
                py-3
                text-xs
                font-black
                text-white
                shadow-[0_10px_25px_rgba(79,70,229,0.20)]
                transition
                hover:bg-indigo-500
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {saveState ===
              "saved" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Save className="h-4 w-4" />
              )}

              {saveState ===
              "saving"
                ? "Saving..."
                : saveState ===
                  "saved"
                ? "Saved"
                : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          TOAST
      ========================================================== */}

      {toast.visible && (
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 18,
            scale: 0.96,
          }}
          className="
            fixed
            bottom-24
            left-1/2
            z-[100]
            flex
            w-[calc(100%-2rem)]
            max-w-md
            -translate-x-1/2
            items-start
            gap-3
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-[0_25px_60px_rgba(15,23,42,0.16)]
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
              bg-emerald-50
              text-emerald-600
            "
          >
            <CheckCircle2 className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="
                text-sm
                font-black
                text-slate-900
              "
            >
              EventDevX
            </p>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-slate-500
              "
            >
              {toast.message}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setToast({
                visible: false,
                message: "",
              })
            }
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
            aria-label="Close message"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Settings;