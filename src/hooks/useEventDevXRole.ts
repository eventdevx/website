import {
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  firebaseAuth,
} from "@/lib/firebase";

import {
  getCurrentEventDevXAccess,
  hasEventDevXPermission,
  isPrivilegedEventDevXRole,
  type EventDevXRole,
} from "@/lib/accessControl";

interface EventDevXAccessState {
  role: EventDevXRole;
  active: boolean;
  email: string;
  name: string;
  permissions: string[];
  loading: boolean;
}

const DEFAULT_ACCESS: EventDevXAccessState = {
  role: "community_member",
  active: false,
  email: "",
  name: "",
  permissions: [],
  loading: true,
};

export function useEventDevXRole() {
  const [
    access,
    setAccess,
  ] = useState<EventDevXAccessState>(
    DEFAULT_ACCESS
  );

  useEffect(() => {
    let active = true;

    const loadRole = async () => {
      try {
        const next =
          await getCurrentEventDevXAccess();

        if (!active) {
          return;
        }

        setAccess({
          ...next,
          loading: false,
        });
      } catch (error) {
        console.error(
          "EventDevX role lookup failed:",
          error
        );

        if (!active) {
          return;
        }

        setAccess({
          role: "community_member",
          active: true,
          email:
            firebaseAuth.currentUser?.email ||
            "",
          name:
            firebaseAuth.currentUser?.displayName ||
            firebaseAuth.currentUser?.email ||
            "EventDevX User",
          permissions: [],
          loading: false,
        });
      }
    };

    const unsubscribe =
      onAuthStateChanged(
        firebaseAuth,
        (user) => {
          if (!user) {
            setAccess(
              DEFAULT_ACCESS
            );

            return;
          }

          void loadRole();
        }
      );

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const can =
    (
      permission: string
    ) =>
      hasEventDevXPermission(
        access.role,
        permission
      );

  const isPrivileged =
    isPrivilegedEventDevXRole(
      access.role
    );

  return {
    ...access,
    can,
    isPrivileged,
  };
}