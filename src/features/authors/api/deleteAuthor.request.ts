import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { App } from "antd";
import { AppEvents, eventEmitter } from "@/services";

export const useDeleteAuthor = () => {
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async (id: string) => {
            return await axiosPrivate.delete(endpoints.authors.byId(id));
        },
        onSuccess: () => {
            message.success("author deleted successfully");
            eventEmitter.emit(AppEvents.AUTHOR_CREATED);
        },
        onError: () => {
            message.error("something went wrong!");
        },
    });
};
