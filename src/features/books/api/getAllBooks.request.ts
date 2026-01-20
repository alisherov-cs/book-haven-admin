import { useInfiniteQuery } from "@tanstack/react-query";
import { endpoints } from "@/api/endpoints";
import { axiosPublic } from "@/api";
import { useApiPagination } from "@/hooks";
import type { TBook } from "@/types/api.types";

export const useGetAllBooks = () => {
    const { page, limit, infiniteQueryProps } = useApiPagination<TBook[]>();

    return useInfiniteQuery({
        queryKey: [endpoints.books.list, { page, limit }],
        queryFn: async () => {
            return (
                await axiosPublic.get(endpoints.books.list, {
                    params: { page, limit },
                })
            ).data;
        },
        ...infiniteQueryProps,
    });
};
