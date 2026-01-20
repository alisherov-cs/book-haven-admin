import type { TPagination } from "@/types/api.types";
import { useSearchParams } from "react-router-dom";

export const useTablePaginations = () => {
    const [params, setParams] = useSearchParams();

    const buildPagination = (paginations?: TPagination) => ({
        current: Number(params.get("page") ?? paginations?.page),
        pageSize: paginations?.limit,
        total: paginations?.total,
        showSizeChanger: true,
        showTotal: (total: number) => `Total: ${total}`,
        onChange: (e: number) => {
            params.set("page", e.toFixed());
            setParams(params);
        },
        onShowSizeChange(_: number, size: number) {
            params.set("limit", size.toString());
            setParams(params);
        },
    });

    return { buildPagination };
};
