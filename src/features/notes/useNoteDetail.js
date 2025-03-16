import { useQuery } from "@tanstack/react-query";
import { getNoteDetail } from "../../service/notesService";

export default function useNoteDetail({ noteId }) {
    const { isLoading: isGettingNote, data: noteData, isError } = useQuery({
        queryKey: ["note", noteId],
        queryFn: () => getNoteDetail(noteId),
    });

    return {
        noteData,
        isGettingNote,
        isError,
    };
}