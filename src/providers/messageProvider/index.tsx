import type { TProvider } from "@/types/provider.types";
import { message } from "antd";

export const MessageProvider = ({ children }: TProvider) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            {children}
        </>
    );
};
