import { axiosPublic } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useApiPagination } from "@/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { TApiResponseWithPagination } from "@/types/api.types";
import type { TCategory } from "@/features/category/types";

export const useGetAllCategories = (search: string, selectedIds?: number[]) => {
  const { page, limit, infiniteQueryProps } = useApiPagination<TCategory[]>();

  return useInfiniteQuery({
    queryKey: [
      endpoints.category.list,
      { search, page, limit, selectedIds: selectedIds?.toLocaleString() },
    ],
    queryFn: async ({ pageParam }) => {
      return (
        await axiosPublic.get<TApiResponseWithPagination<TCategory[]>>(
          endpoints.category.list,
          {
            params: {
              search,
              page: pageParam ?? page,
              limit,
              selectedIds: selectedIds?.toLocaleString(),
            },
          }
        )
      ).data;
    },
    ...infiniteQueryProps,
  });
};
