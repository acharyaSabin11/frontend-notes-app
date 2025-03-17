import { useMutation } from "@tanstack/react-query";
import { login } from "../../service/authService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isPending, mutate } = useMutation({
        mutationFn: login,
        onError: () => {
            toast.error("Invalid Credentials");
        },
        onSuccess: (data) => {
            dispatch(handleLogin(data));
            toast.success("Login successful");
            navigate("/dashboard");
        },
    });
    return { isLoggingIn: isPending, login: mutate };
}