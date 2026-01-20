import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { AppEvents, eventEmitter } from "@/services";
import type { TCreateAuthorRequest } from "./createAuthor.request";

type TUpdateAuthorRequest = {
    id: string;
    data: Partial<TCreateAuthorRequest>;
};

export const useUpdateAuthor = () => {
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async ({ id, data }: TUpdateAuthorRequest) => {
            return await axiosPrivate.patch(endpoints.authors.byId(id), data);
        },
        onSuccess: () => {
            message.success("author updated successfully");
            eventEmitter.emit(AppEvents.AUTHOR_CREATED);
        },
        onError: () => {
            message.error("something went wrong!");
        },
    });
};
