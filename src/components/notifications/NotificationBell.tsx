import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const NotificationBell = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notifications");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="relative"
      aria-label="Open notifications"
    >
      <Bell className="h-5 w-5" />

      <span
        className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"
        aria-hidden="true"
      />
    </Button>
  );
};

export { NotificationBell };
export default NotificationBell;