import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { App } from "antd";
import { AppEvents, eventEmitter } from "@/services";

export const useDeleteBook = () => {
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async (id: string) => {
            return await axiosPrivate.delete(endpoints.books.byId(id));
        },
        onSuccess: () => {
            message.success("book deleted successfully");
            eventEmitter.emit(AppEvents.BOOK_CREATED);
        },
        onError: () => {
            message.error("something went wrong!");
        },
    });
};
