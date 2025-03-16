import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../service/categoriesService";
import toast from "react-hot-toast";

export default function useCreateCategory() {
    const queryClient = useQueryClient();
    const { isPending, mutate } = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            queryClient.invalidateQueries("categories");
            queryClient.invalidateQueries(["categories", "recent"]);
            toast.success("Category added successfully");
        }, onError: (error) => {
            console.error(error);
            toast.error(error.response.data.message);
        }
    });

    return { isCreatingCategory: isPending, createCategory: mutate };
}