import { useInfiniteQuery } from "@tanstack/react-query";
import { endpoints } from "@/api/endpoints";
import { axiosPublic } from "@/api";
import { useApiPagination } from "@/hooks";
import type { TGaner } from "@/types/api.types";

export const useGetAllGaners = () => {
    const { page, limit, infiniteQueryProps } = useApiPagination<TGaner[]>();

    return useInfiniteQuery({
        queryKey: [endpoints.ganers.list, { page, limit }],
        queryFn: async () => {
            return (
                await axiosPublic.get(endpoints.ganers.list, {
                    params: { page, limit },
                })
            ).data;
        },
        ...infiniteQueryProps,
    });
};
