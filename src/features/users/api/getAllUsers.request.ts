import { useInfiniteQuery } from "@tanstack/react-query";
import { endpoints } from "@/api/endpoints";
import { axiosPublic } from "@/api";
import { useApiPagination } from "@/hooks";
import type { TUser } from "@/features/auth/guard/api/profile.request";

export const useGetAllUsers = () => {
    const { page, limit, infiniteQueryProps } = useApiPagination<TUser[]>();

    return useInfiniteQuery({
        queryKey: [endpoints.users.list, { page, limit }],
        queryFn: async () => {
            return (
                await axiosPublic.get(endpoints.users.list, {
                    params: { page, limit },
                })
            ).data;
        },
        ...infiniteQueryProps,
    });
};
