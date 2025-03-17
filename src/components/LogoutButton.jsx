import { LogOut } from "lucide-react";
import useLogout from "../features/authentication/useLogout";

export default function LogoutButton() {
  const { isLoggingOut, logout } = useLogout();
  return (
    <button
      onClick={logout}
      className="bg-transparent border-2 size-10 border-primary rounded-full text-primary hover:bg-primary hover:text-white disabled:text-white p-2 disabled:bg-gray-500 cursor-pointer"
      disabled={isLoggingOut}
    >
      <LogOut size={16} />
    </button>
  );
}
