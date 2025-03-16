import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCategory } from "../../service/categoriesService";

export default function useUpdateCategory() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            toast.success("Category updated successfully");
            queryClient.invalidateQueries(["categories"]);
            queryClient.invalidateQueries(["categories", "recent"]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { updateCategory: mutate, isUpdating: isPending };
}