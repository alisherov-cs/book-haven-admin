import type { TApiResponseWithPagination } from "@/types/api.types";
import { useSearchParams } from "react-router-dom";

export const useApiPagination = <T>(defaultLimit?: number) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const limit = defaultLimit ?? searchParams.get("limit") ?? 10;

  return {
    page,
    limit,
    infiniteQueryProps: {
      initialPageParam: page,
      getNextPageParam: (lastPage: TApiResponseWithPagination<T>) =>
        lastPage.pagination.totalPages > lastPage.pagination.page
          ? lastPage.pagination.page + 1
          : undefined,
      getPreviousPageParam: (firstPage: TApiResponseWithPagination<T>) =>
        firstPage.pagination.page !== 1
          ? firstPage.pagination.page - 1
          : undefined,
    },
  };
};
