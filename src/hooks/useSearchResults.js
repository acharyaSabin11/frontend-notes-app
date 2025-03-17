import { useQuery } from "@tanstack/react-query";
import { searchNotes } from "../service/notesService";

export default function useSearchResults({ searchText }) {
    const { isLoading, isError, data } = useQuery({
        queryKey: ["searchResults", searchText],
        queryFn: ({ signal }) => searchNotes(searchText, signal),
    });
    return { isLoading, isError, searchResults: data };
}