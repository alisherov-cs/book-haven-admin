import { useInfiniteQuery } from "@tanstack/react-query";
import { endpoints } from "@/api/endpoints";
import { axiosPublic } from "@/api";
import { useApiPagination } from "@/hooks";
import type { TAuthor } from "@/types/api.types";

export const useGetAllAuthors = () => {
    const { page, limit, infiniteQueryProps } = useApiPagination<TAuthor[]>();

    return useInfiniteQuery({
        queryKey: [endpoints.authors.list, { page, limit }],
        queryFn: async () => {
            return (
                await axiosPublic.get(endpoints.authors.list, {
                    params: { page, limit },
                })
            ).data;
        },
        ...infiniteQueryProps,
    });
};
