import { axiosPublic } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useSearch, useApiPagination } from "@/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { TApiResponseWithPagination } from "@/types/api.types";
import type { TProduct } from "@/features/product/types";

export const useGetAllProducts = () => {
  const { search } = useSearch();
  const { page, limit, infiniteQueryProps } = useApiPagination<TProduct[]>();

  return useInfiniteQuery({
    queryKey: [endpoints.product.list, { search, page, limit }],
    queryFn: async () => {
      return (
        await axiosPublic.get<TApiResponseWithPagination<TProduct[]>>(
          endpoints.product.list,
          { params: { search, page, limit } }
        )
      ).data;
    },
    ...infiniteQueryProps,
  });
};
