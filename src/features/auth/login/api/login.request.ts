import { useMutation } from "@tanstack/react-query";
import { axiosPublic } from "@/api";
import { endpoints } from "@/api/endpoints";
import { App } from "antd";

type TLoginRequest = {
    username: string;
    password: string;
};

type TLoginResponse = {
    access_token: string;
};

export const useLogin = () => {
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async (data: TLoginRequest) => {
            return (
                await axiosPublic.post<TLoginResponse>(
                    endpoints.auth.login,
                    data
                )
            ).data;
        },
        onSuccess: (res) => {
            const access_token = res.access_token;
            localStorage.setItem("access_token", access_token);
            message.success("successfully logged in!");
        },
        onError: (err) => {
            console.log(err.message);
            message.error("wrong username or password!");
        },
    });
};
