import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  firebaseAuth,
  firebaseDb,
} from "@/lib/firebase";

/* ============================================================
   EVENTDEVX ROLES
   ============================================================ */

export type EventDevXRole =
  | "community_member"
  | "community_manager"
  | "hr"
  | "admin";

export const DEFAULT_EVENTDEVX_ROLE: EventDevXRole =
  "community_member";

/* ============================================================
   ADMIN DIRECTORY DOCUMENT
   Firestore path:
   admins/{firebaseUserUid}
   ============================================================ */

export interface EventDevXAccessRecord {
  role: EventDevXRole;

  active: boolean;

  email?: string;

  name?: string;

  permissions?: string[];
}

/* ============================================================
   PERMISSIONS
   ============================================================ */

export const ROLE_PERMISSIONS: Record<
  EventDevXRole,
  string[]
> = {
  community_member: [
    "dashboard.view",
    "events.view",
    "projects.view",
    "community.view",
    "analytics.view",
    "infrastructure.view",
    "certificates.view",
    "settings.view",
    "requests.create",
    "requests.view.own",
    "messages.create",
    "messages.view.own",
  ],

  community_manager: [
    "dashboard.view",
    "events.view",
    "events.manage",
    "projects.view",
    "projects.manage",
    "community.view",
    "community.manage",
    "analytics.view",
    "infrastructure.view",
    "infrastructure.manage",
    "certificates.view",
    "certificates.manage",
    "settings.view",
    "requests.create",
    "requests.view.own",
    "requests.manage",
    "messages.create",
    "messages.view.own",
    "messages.manage",
  ],

  hr: [
    "dashboard.view",
    "events.view",
    "events.manage",
    "projects.view",
    "projects.manage",
    "community.view",
    "community.manage",
    "analytics.view",
    "infrastructure.view",
    "infrastructure.manage",
    "certificates.view",
    "certificates.manage",
    "settings.view",
    "requests.create",
    "requests.view.own",
    "requests.manage",
    "messages.create",
    "messages.view.own",
    "messages.manage",
    "admin.view",
  ],

  admin: [
    "*",
  ],
};

/* ============================================================
   ROLE CHECKS
   ============================================================ */

export function hasEventDevXPermission(
  role: EventDevXRole,
  permission: string
) {
  const permissions =
    ROLE_PERMISSIONS[role];

  return (
    permissions.includes("*") ||
    permissions.includes(
      permission
    )
  );
}

export function isPrivilegedEventDevXRole(
  role: EventDevXRole
) {
  return (
    role === "admin" ||
    role === "hr" ||
    role === "community_manager"
  );
}

/* ============================================================
   READ ROLE FOR CURRENT USER
   ============================================================ */

export async function getCurrentEventDevXAccess(): Promise<{
  role: EventDevXRole;
  active: boolean;
  email: string;
  name: string;
  permissions: string[];
}> {
  const user =
    firebaseAuth.currentUser;

  if (!user) {
    return {
      role:
        DEFAULT_EVENTDEVX_ROLE,
      active: false,
      email: "",
      name: "",
      permissions:
        ROLE_PERMISSIONS[
          DEFAULT_EVENTDEVX_ROLE
        ],
    };
  }

  const adminRef =
    doc(
      firebaseDb,
      "admins",
      user.uid
    );

  const snapshot =
    await getDoc(
      adminRef
    );

  if (
    !snapshot.exists()
  ) {
    return {
      role:
        DEFAULT_EVENTDEVX_ROLE,
      active: true,
      email:
        user.email || "",
      name:
        user.displayName ||
        user.email ||
        "EventDevX User",
      permissions:
        ROLE_PERMISSIONS[
          DEFAULT_EVENTDEVX_ROLE
        ],
    };
  }

  const data =
    snapshot.data() as Partial<EventDevXAccessRecord>;

  const role =
    data.role &&
    (
      data.role ===
        "community_member" ||
      data.role ===
        "community_manager" ||
      data.role === "hr" ||
      data.role === "admin"
    )
      ? data.role
      : DEFAULT_EVENTDEVX_ROLE;

  const active =
    data.active !== false;

  return {
    role,
    active,
    email:
      data.email ||
      user.email ||
      "",
    name:
      data.name ||
      user.displayName ||
      user.email ||
      "EventDevX User",
    permissions:
      data.permissions ||
      ROLE_PERMISSIONS[role],
  };
}