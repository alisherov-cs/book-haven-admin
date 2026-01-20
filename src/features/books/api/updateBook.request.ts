import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { AppEvents, eventEmitter } from "@/services";
import type { TCreateBookRequest } from "./createBook.request";

type TUpdateBookRequest = {
    id: string;
    data: Partial<TCreateBookRequest>;
};

export const useUpdateBook = () => {
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async ({ id, data }: TUpdateBookRequest) => {
            return await axiosPrivate.patch(endpoints.books.byId(id), data);
        },
        onSuccess: () => {
            message.success("book updated successfully");
            eventEmitter.emit(AppEvents.BOOK_CREATED);
        },
        onError: () => {
            message.error("something went wrong!");
        },
    });
};
