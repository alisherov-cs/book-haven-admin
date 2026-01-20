import { useQuery } from "@tanstack/react-query";
import { endpoints } from "@/api/endpoints";
import { axiosPrivate } from "@/api";

export enum Role {
    admin,
    user,
}

export type TUser = {
    id: string;
    username: string;
    role: Role;
    avatar: string;
    createdAt: string;
    updatedAt: string;
};

export const useGetProfile = () => {
    return useQuery({
        queryKey: [endpoints.auth.profile],
        queryFn: async () => {
            return (await axiosPrivate.get<TUser>(endpoints.auth.profile)).data;
        },
        retry: false,
    });
};
