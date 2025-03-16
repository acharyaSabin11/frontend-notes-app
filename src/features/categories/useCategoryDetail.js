import { useQuery } from "@tanstack/react-query";
import { getCategoryDetail } from "../../service/categoriesService";

export default function useCategoryDetail({ categoryId }) {
    const { isLoading, isError, data: category } = useQuery({
        queryKey: ["categories", categoryId],
        queryFn: () => getCategoryDetail(categoryId),
    });
    return { isLoadingCategory: isLoading, isError, category };
}