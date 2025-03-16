import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNote } from "../../service/notesService";
import toast from "react-hot-toast";

export default function useCreateNote() {
    const queryClient = useQueryClient();
    const { isPending, mutate } = useMutation({
        mutationFn: addNote,
        onSuccess: () => {
            queryClient.invalidateQueries(["notes"]);
            queryClient.invalidateQueries(["notes", "recent"]);
            toast.success("Note added successfully");
        }, onError: (error) => {
            console.error(error);
            toast.error("Failed to add note");
        }
    });
    return { isCreatingNote: isPending, createNote: mutate };
}