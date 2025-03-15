import toast from "react-hot-toast";
import { refreshTokens } from "../service/authService";
import { useMutation } from "@tanstack/react-query";
import { handleLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useRefreshToken() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isPending, mutate } = useMutation({
        mutationFn: refreshTokens,
        onError: () => {
            toast.error("Session Expired. Please login to continue.");
            navigate("/login");
        },
        onSuccess: (data) => {
            dispatch(handleLogin(data));
        },
    });
    return { isRefreshing: isPending, refresh: mutate };
}