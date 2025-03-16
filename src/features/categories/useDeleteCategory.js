import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCategory } from "../../service/categoriesService";

export default function useDeleteCategory() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            toast.success("Category deleted successfully");
            queryClient.invalidateQueries(["categories"]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { deleteCategory: mutate, isDeleting: isPending };
}