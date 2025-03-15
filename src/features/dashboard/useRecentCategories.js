import { useQuery } from "@tanstack/react-query";
import { getRecentCategories } from "../../service/categoriesService";

export default function useRecentCategories() {
    const { data: categories = [], isLoading: isFetchingRecentCategories, isError } = useQuery({ queryKey: ['categories', 'recent'], queryFn: getRecentCategories });
    return { categories, isFetchingRecentCategories, isError };
}