import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { App } from "antd";
import { AppEvents, eventEmitter } from "@/services";

export const useDeleteGaner = () => {
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async (id: string) => {
            return await axiosPrivate.delete(endpoints.ganers.byId(id));
        },
        onSuccess: () => {
            message.success("ganer deleted successfully");
            eventEmitter.emit(AppEvents.GANER_CREATED);
        },
        onError: () => {
            message.error("something went wrong!");
        },
    });
};
