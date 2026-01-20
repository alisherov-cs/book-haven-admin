import type { TGaner } from "@/types/api.types";
import { useHelpers } from "@/utils";
import { formatDate } from "@/utils/formatDate";
import type { TableProps } from "antd";

export const useGanersTableColumns = () => {
    const { calculateIndex } = useHelpers();

    const ganersTableColumns: TableProps<TGaner>["columns"] = [
        {
            key: "#",
            title: "#",
            width: 100,
            render: (_, __, i) => calculateIndex(i),
        },
        {
            key: "name",
            title: "name",
            width: 300,
            dataIndex: "name",
        },
        {
            key: "slug",
            title: "slug",
            width: 300,
            dataIndex: "slug",
        },
        {
            key: "createdAt",
            title: "createdAt",
            width: 300,
            render: (_, ganer) => <span>{formatDate(ganer.createdAt)}</span>,
        },
        {
            key: "updatedAt",
            title: "updatedAt",
            width: 300,
            render: (_, ganer) => <span>{formatDate(ganer.updatedAt)}</span>,
        },
    ];

    return { ganersTableColumns };
};
