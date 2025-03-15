import { useQuery } from "@tanstack/react-query";
import { getRecentNotes } from "../../service/notesService";

export default function useRecentNotes() {
    const { data: notes = [], isLoading: isFetchingRecentNotes, isError } = useQuery({ queryKey: ['notes', 'recent'], queryFn: getRecentNotes });
    return { notes, isFetchingRecentNotes, isError };
}