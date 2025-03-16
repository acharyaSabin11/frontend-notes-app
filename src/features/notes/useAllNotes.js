import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "../../service/notesService";
import { useSearchParams } from "react-router-dom";

export default function useAllNotes() {
    const [searchParams] = useSearchParams();
    const pageStr = searchParams.get("page");
    const filter = searchParams.get("filter") || "all";
    const page = pageStr ? parseInt(pageStr) : 1;
    const { isLoading, isError, data = [] } = useQuery({ queryKey: ["notes", page, filter], queryFn: () => getAllNotes(page, filter) });
    return { isLoadingNotes: isLoading, isError, notes: data };
}