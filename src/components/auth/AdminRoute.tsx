import type {
  ReactNode,
} from "react";

import RoleRoute from "@/components/auth/RoleRoute";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({
  children,
}: AdminRouteProps) => {
  return (
    <RoleRoute
      allowedRoles={[
        "admin",
        "hr",
        "community_manager",
      ]}
    >
      {children}
    </RoleRoute>
  );
};

export default AdminRoute;