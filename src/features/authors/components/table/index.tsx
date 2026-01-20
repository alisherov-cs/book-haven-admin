import { App, Button, Table, type TableProps } from "antd";
import { useAuthorsTableColumns } from "./columns";
import type { TAuthor } from "@/types/api.types";
import { useEffect, useMemo } from "react";
import { useTablePaginations } from "@/hooks";
import { AppEvents, eventEmitter } from "@/services";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetAllAuthors } from "../../api/getAllAuthors.request";
import { useDeleteAuthor } from "../../api/deleteAuthor.request";

export const AuthorsTable = () => {
    const { data: authorsData, refetch } = useGetAllAuthors();
    const { authorsTableColumns } = useAuthorsTableColumns();
    const { buildPagination } = useTablePaginations();
    const { mutateAsync: deleteAuthor } = useDeleteAuthor();
    const { modal } = App.useApp();

    const authors = useMemo(
        () => authorsData?.pages.flatMap((page) => page.data),
        [authorsData]
    );
    const paginations = useMemo(
        () => authorsData?.pages?.[0].pagination,
        [authorsData]
    );

    useEffect(() => {
        eventEmitter.on(AppEvents.AUTHOR_CREATED, () => refetch());
    }, []);

    const onEdit = (author: TAuthor) => {
        eventEmitter.emit(AppEvents.ON_AUTHOR_EDIT, author);
    };
    const onDelete = (author: TAuthor) => {
        modal.confirm({
            title: `are you sure you want to delete '${author.name}'`,
            onOk: () => deleteAuthor(author.id),
        });
    };

    const columns: TableProps<TAuthor>["columns"] = [
        ...authorsTableColumns,
        {
            key: "actions",
            title: "actions",
            render: (_, author) => (
                <div className="flex items-center gap-x-3">
                    <Button type="primary" onClick={() => onEdit(author)}>
                        <EditOutlined />
                    </Button>
                    <Button
                        danger
                        type="primary"
                        onClick={() => onDelete(author)}
                    >
                        <DeleteOutlined />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={authors}
            columns={columns}
            pagination={{ ...buildPagination(paginations) }}
        />
    );
};
