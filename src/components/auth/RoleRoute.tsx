import {
  Navigate,
} from "react-router-dom";

import type {
  ReactNode,
} from "react";

import {
  useEventDevXRole,
} from "@/hooks/useEventDevXRole";

import type {
  EventDevXRole,
} from "@/lib/accessControl";

interface RoleRouteProps {
  children: ReactNode;

  allowedRoles: EventDevXRole[];
}

const RoleRoute = ({
  children,
  allowedRoles,
}: RoleRouteProps) => {
  const {
    role,
    active,
    loading,
  } = useEventDevXRole();

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-background
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            gap-3
          "
        >
          <div
            className="
              h-9
              w-9
              animate-spin
              rounded-full
              border-2
              border-primary
              border-t-transparent
            "
          />

          <p
            className="
              text-sm
              font-semibold
              text-muted-foreground
            "
          >
            Checking EventDevX access...
          </p>
        </div>
      </div>
    );
  }

  if (!active) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  if (
    !allowedRoles.includes(
      role
    )
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return (
    <>
      {children}
    </>
  );
};

export default RoleRoute;