import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  MessageSquare,
  UserPlus,
  Zap,
} from "lucide-react";

type NotificationItem = {
  id: number;
  icon: "message" | "zap" | "alert" | "award" | "user" | "check";
  bg: string;
  color: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    icon: "message",
    bg: "#dbeafe",
    color: "#3b82f6",
    title: "New Partner Request",
    desc: "VIT Vellore sent a collab invite",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    icon: "zap",
    bg: "#d1fae5",
    color: "#10b981",
    title: "Indo-Hack 2026 Live",
    desc: "Event went live — 2,300 registrations",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    icon: "alert",
    bg: "#fef3c7",
    color: "#d97706",
    title: "Node Latency Warning",
    desc: "Delhi cluster at 80% capacity",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 4,
    icon: "award",
    bg: "#ede9fe",
    color: "#8b5cf6",
    title: "156 Certs Issued",
    desc: "PyConf India batch completed",
    time: "3 hours ago",
    unread: false,
  },
  {
    id: 5,
    icon: "user",
    bg: "#fce7f3",
    color: "#ec4899",
    title: "12 New Members",
    desc: "Joined the network today",
    time: "5 hours ago",
    unread: false,
  },
  {
    id: 6,
    icon: "check",
    bg: "#d1fae5",
    color: "#10b981",
    title: "Backup Complete",
    desc: "All data nodes synced",
    time: "8 hours ago",
    unread: false,
  },
];

function NotificationIcon({
  type,
  color,
}: {
  type: NotificationItem["icon"];
  color: string;
}) {
  const iconProps = {
    size: 18,
    strokeWidth: 2.2,
    color,
  };

  switch (type) {
    case "message":
      return <MessageSquare {...iconProps} />;

    case "zap":
      return <Zap {...iconProps} />;

    case "alert":
      return <AlertTriangle {...iconProps} />;

    case "award":
      return <Award {...iconProps} />;

    case "user":
      return <UserPlus {...iconProps} />;

    case "check":
      return <CheckCircle2 {...iconProps} />;

    default:
      return <MessageSquare {...iconProps} />;
  }
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );

  const unreadCount = useMemo(() => {
    return notifications.filter((notification) => notification.unread).length;
  }, [notifications]);

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100%",
        paddingBottom: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        {/* =========================================================
            PAGE HEADER
        ========================================================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "18px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "5px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                  lineHeight: 1.2,
                  fontWeight: 900,
                  color: "#0f172a",
                }}
              >
                All Notifications
              </h3>

              {unreadCount > 0 && (
                <span
                  style={{
                    minWidth: "24px",
                    height: "24px",
                    padding: "0 8px",
                    borderRadius: "999px",
                    background: "#eef2ff",
                    color: "#4f46e5",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 800,
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#64748b",
                fontWeight: 500,
              }}
            >
              Stay updated with activity across your EventDevX network.
            </p>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            style={{
              border: "none",
              background: "transparent",
              color: "#4f46e5",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              padding: "8px 4px",
              whiteSpace: "nowrap",
            }}
          >
            Mark all read
          </button>
        </div>

        {/* =========================================================
            NOTIFICATION CARD
        ========================================================= */}
        <div
          style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              background: "#f8fafc",
            }}
          >
            {notifications.map((notification, index) => {
              const isLast = index === notifications.length - 1;

              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => markAsRead(notification.id)}
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: isLast
                      ? "none"
                      : "1px solid #f1f5f9",
                    textAlign: "left",
                    padding: "14px",
                    background: notification.unread
                      ? "#fafbff"
                      : "white",
                    cursor: "pointer",
                    transition:
                      "background 0.2s ease, transform 0.2s ease",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = "#eef2ff";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background =
                      notification.unread ? "#fafbff" : "white";
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      minWidth: "40px",
                      background: notification.bg,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <NotificationIcon
                      type={notification.icon}
                      color={notification.color}
                    />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "2px",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: "13px",
                          lineHeight: 1.4,
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {notification.title}
                      </p>

                      {notification.unread && (
                        <span
                          aria-label="Unread"
                          style={{
                            width: "7px",
                            height: "7px",
                            minWidth: "7px",
                            borderRadius: "50%",
                            background: "#4f46e5",
                            display: "inline-block",
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        lineHeight: 1.55,
                        color: "#64748b",
                      }}
                    >
                      {notification.desc}
                    </p>

                    <span
                      style={{
                        fontSize: "10px",
                        lineHeight: 1.2,
                        fontWeight: 700,
                        color: "#4f46e5",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        display: "block",
                        marginTop: "5px",
                      }}
                    >
                      {notification.time}
                    </span>
                  </div>

                  {/* Unread label */}
                  {notification.unread && (
                    <div
                      style={{
                        alignSelf: "center",
                        padding: "5px 8px",
                        borderRadius: "8px",
                        background: "#eef2ff",
                        color: "#4f46e5",
                        fontSize: "9px",
                        lineHeight: 1,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        flexShrink: 0,
                      }}
                    >
                      New
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            EMPTY / ALL READ STATE
        ========================================================= */}
        {unreadCount === 0 && (
          <div
            style={{
              marginTop: "14px",
              padding: "12px 16px",
              borderRadius: "14px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              All notifications are marked as read.
            </p>
          </div>
        )}

        {/* =========================================================
            MOBILE SPACING
        ========================================================= */}
        <div
          style={{
            height: "20px",
          }}
        />
      </div>
    </div>
  );
}