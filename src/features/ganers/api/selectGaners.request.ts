import { useInfiniteQuery } from "@tanstack/react-query";
import { endpoints } from "@/api/endpoints";
import { axiosPublic } from "@/api";
import type { TGaner } from "@/types/api.types";
import { useApiPaginationSelect } from "@/hooks";

export const useSelectGaners = (defaultId?: string) => {
    const { page, limit, infiniteQueryProps } =
        useApiPaginationSelect<TGaner[]>();

    return useInfiniteQuery({
        queryKey: [endpoints.ganers.list, "select", { page, limit, defaultId }],
        queryFn: async ({ pageParam = 1 }) => {
            return (
                await axiosPublic.get(endpoints.ganers.list, {
                    params: { page: pageParam, limit, defaultId },
                })
            ).data;
        },
        ...infiniteQueryProps,
    });
};
