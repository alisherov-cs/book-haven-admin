import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { App } from "antd";
import { AppEvents, eventEmitter } from "@/services";

export type TCreateAuthorRequest = {
    name: string;
};

export const useCreateAuthor = () => {
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async (data: TCreateAuthorRequest) => {
            return await axiosPrivate.post(endpoints.authors.list, data);
        },
        onSuccess: () => {
            message.success("author created successfully");
            eventEmitter.emit(AppEvents.AUTHOR_CREATED);
        },
        onError: () => {
            message.error("something went wrong!");
        },
    });
};
