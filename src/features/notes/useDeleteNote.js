import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../service/notesService";
import toast from "react-hot-toast";

export default function useDeleteNote() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            toast.success("Note deleted successfully");
            queryClient.invalidateQueries(["notes"]);
            queryClient.invalidateQueries(["notes", "recent"]);
        },
        onError: (error) => {
            toast.error(error.message);
        },

    });
    return { deleteNote: mutate, isDeleting: isPending };
}