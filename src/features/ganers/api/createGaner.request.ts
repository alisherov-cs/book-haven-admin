import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { App } from "antd";
import { AppEvents, eventEmitter } from "@/services";

export type TCreateGanerRequest = {
    name: string;
};

export const useCreateGaner = () => {
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async (data: TCreateGanerRequest) => {
            return await axiosPrivate.post(endpoints.ganers.list, data);
        },
        onSuccess: () => {
            message.success("ganer created successfully");
            eventEmitter.emit(AppEvents.GANER_CREATED);
        },
        onError: () => {
            message.error("something went wrong!");
        },
    });
};
