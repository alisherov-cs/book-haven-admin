import { useInfiniteQuery } from "@tanstack/react-query";
import { endpoints } from "@/api/endpoints";
import { axiosPublic } from "@/api";
import { useApiPaginationSelect } from "@/hooks";
import type { TAuthor } from "@/types/api.types";

export const useSelectAuthors = (defaultId?: string) => {
    const { page, limit, infiniteQueryProps } =
        useApiPaginationSelect<TAuthor[]>();

    return useInfiniteQuery({
        queryKey: [
            endpoints.authors.list,
            "select",
            { page, limit, defaultId },
        ],
        queryFn: async ({ pageParam = 1 }) => {
            return (
                await axiosPublic.get(endpoints.authors.list, {
                    params: { page: pageParam, limit, defaultId },
                })
            ).data;
        },
        ...infiniteQueryProps,
    });
};
