import {
  Navigate,
  useLocation,
} from "react-router-dom";

import type {
  ReactNode,
} from "react";

import {
  useAuth,
} from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const {
    user,
    loading,
  } = useAuth();

  const location = useLocation();

  /* ============================================================
     AUTH STATE IS STILL LOADING
     ============================================================ */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div
            className="
              h-10
              w-10
              animate-spin
              rounded-full
              border-2
              border-primary
              border-t-transparent
            "
          />

          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">
              Loading EventDevX
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Checking your session...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     USER IS NOT AUTHENTICATED
     SEND TO AUTH PAGE
     ============================================================ */

  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  /* ============================================================
     USER IS AUTHENTICATED
     RENDER THE ACTUAL PAGE
     ============================================================ */

  return <>{children}</>;
};

export {
  ProtectedRoute,
};

export default ProtectedRoute;