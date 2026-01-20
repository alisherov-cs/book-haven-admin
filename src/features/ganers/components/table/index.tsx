import { App, Button, Table, type TableProps } from "antd";
import { useGanersTableColumns } from "./columns";
import { useGetAllGaners } from "../../api/getAllGaners.request";
import type { TGaner } from "@/types/api.types";
import { useEffect, useMemo } from "react";
import { useTablePaginations } from "@/hooks";
import { AppEvents, eventEmitter } from "@/services";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteGaner } from "../../api/deleteGaner.request";

export const GanersTable = () => {
    const { data: ganersData, refetch } = useGetAllGaners();
    const { ganersTableColumns } = useGanersTableColumns();
    const { buildPagination } = useTablePaginations();
    const { mutateAsync: deleteGaner } = useDeleteGaner();
    const { modal } = App.useApp();

    const ganers = useMemo(
        () => ganersData?.pages.flatMap((page) => page.data),
        [ganersData]
    );
    const paginations = useMemo(
        () => ganersData?.pages?.[0].pagination,
        [ganersData]
    );

    useEffect(() => {
        eventEmitter.on(AppEvents.GANER_CREATED, () => refetch());
    }, []);

    const onEdit = (ganer: TGaner) => {
        eventEmitter.emit(AppEvents.ON_GANER_EDIT, ganer);
    };
    const onDelete = (ganer: TGaner) => {
        modal.confirm({
            title: `are you sure you want to delete '${ganer.name}'`,
            onOk: () => deleteGaner(ganer.id),
        });
    };

    const columns: TableProps<TGaner>["columns"] = [
        ...ganersTableColumns,
        {
            key: "actions",
            title: "actions",
            render: (_, ganer) => (
                <div className="flex items-center gap-x-3">
                    <Button type="primary" onClick={() => onEdit(ganer)}>
                        <EditOutlined />
                    </Button>
                    <Button
                        danger
                        type="primary"
                        onClick={() => onDelete(ganer)}
                    >
                        <DeleteOutlined />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={ganers}
            columns={columns}
            pagination={{ ...buildPagination(paginations) }}
        />
    );
};
