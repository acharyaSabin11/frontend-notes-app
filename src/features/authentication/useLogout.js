import { useMutation } from "@tanstack/react-query";
import { logout } from "../../service/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to logout");
    },
  });
  return { isLoggingOut: isPending, logout: mutate };
}
