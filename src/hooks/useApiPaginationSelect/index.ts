import type { TApiResponseWithPagination } from "@/types/api.types";

export const useApiPaginationSelect = <T>() => {
    const page = 1;
    const limit = 10;

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
