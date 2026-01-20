import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { App } from "antd";
import { AppEvents, eventEmitter } from "@/services";

export type TCreateBookRequest = {
    name: string;
    description: string;
    image: string;
    price: number;
    discount?: number;
    ganerId: string;
    authorId: string;
};

export const useCreateBook = () => {
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async (data: TCreateBookRequest) => {
            return await axiosPrivate.post(endpoints.books.list, data);
        },
        onSuccess: () => {
            message.success("book created successfully");
            eventEmitter.emit(AppEvents.BOOK_CREATED);
        },
        onError: () => {
            message.error("something went wrong!");
        },
    });
};
