import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup } from "../../service/authService";
import { useNavigate } from "react-router-dom";

export default function useSignup() {
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: signup,
        onError: (error) => {
            toast.error(error.response.data.message);
        },
        onSuccess: () => {
            toast.success("Signup successful. Please login to continue.");
            navigate('/login');
        },
    });

    return { isSigningUp: isPending, signup: mutate };
}