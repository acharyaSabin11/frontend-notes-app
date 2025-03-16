import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../service/categoriesService";

export default function useCategoriesData() {
    const { data, isLoading, isError } = useQuery({ queryKey: ["categories"], queryFn: getCategories });

    return {
        categories: data,
        isGettingCategories: isLoading,
        isError,
    };
}