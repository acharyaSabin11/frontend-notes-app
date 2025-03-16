import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateNote } from "../../service/notesService";

export default function useUpdateNote() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            toast.success("Note updated successfully");
            queryClient.invalidateQueries(["notes"]);
            queryClient.invalidateQueries(["notes", "recent"]);
        },
        onError: (error) => {
            toast.error(error.message);
        },

    });
    return { updateNote: mutate, isUpdating: isPending };
}