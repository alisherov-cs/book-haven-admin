import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import type { RcFile } from "antd/es/upload";

export const useFileUpload = () => {
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async (file: RcFile) => {
            const formData = new FormData();
            formData.set("file", file);
            return (
                await axiosPrivate.post(endpoints.files.upload, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
            ).data;
        },
        onSuccess: () => {
            message.success("file uploaded successfully!");
        },
        onError: () => {
            message.error("something went wrong!");
        },
    });
};
