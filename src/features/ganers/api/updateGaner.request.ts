import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";
import type { TCreateGanerRequest } from "./createGaner.request";
import { App } from "antd";
import { AppEvents, eventEmitter } from "@/services";

type TUpdateGanerRequest = {
    id: string;
    data: Partial<TCreateGanerRequest>;
};

export const useUpdateGaner = () => {
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async ({ id, data }: TUpdateGanerRequest) => {
            return await axiosPrivate.patch(endpoints.ganers.byId(id), data);
        },
        onSuccess: () => {
            message.success("ganer updated successfully");
            eventEmitter.emit(AppEvents.GANER_CREATED);
        },
        onError: () => {
            message.error("something went wrong!");
        },
    });
};
