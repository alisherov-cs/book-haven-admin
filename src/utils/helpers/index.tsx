import { useSearchParams } from "react-router-dom";

export const useHelpers = () => {
    const [params] = useSearchParams();

    const calculateIndex = (index: number) => {
        const page = Number(params.get("page") ?? "1");
        const limit = Number(params.get("limit") ?? "10");

        const offset = (page - 1) * limit;

        return index + offset + 1;
    };

    return { calculateIndex };
};
