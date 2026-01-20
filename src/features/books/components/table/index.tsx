import { App, Button, Table, type TableProps } from "antd";
import { useBooksTableColumns } from "./columns";
import type { TBook } from "@/types/api.types";
import { useEffect, useMemo } from "react";
import { useTablePaginations } from "@/hooks";
import { AppEvents, eventEmitter } from "@/services";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetAllBooks } from "../../api/getAllBooks.request";
import { useDeleteBook } from "../../api/deleteBook.request";

export const BooksTable = () => {
    const { data: booksData, refetch } = useGetAllBooks();
    const { booksTableColumns } = useBooksTableColumns();
    const { buildPagination } = useTablePaginations();
    const { mutateAsync: deleteBook } = useDeleteBook();
    const { modal } = App.useApp();

    const books = useMemo(
        () => booksData?.pages.flatMap((page) => page.data),
        [booksData]
    );
    const paginations = useMemo(
        () => booksData?.pages?.[0].pagination,
        [booksData]
    );

    useEffect(() => {
        eventEmitter.on(AppEvents.BOOK_CREATED, () => refetch());
    }, []);

    const onEdit = (book: TBook) => {
        eventEmitter.emit(AppEvents.ON_BOOK_EDIT, book);
    };
    const onDelete = (book: TBook) => {
        modal.confirm({
            title: `are you sure you want to delete '${book.name}'`,
            onOk: () => deleteBook(book.id),
        });
    };

    const columns: TableProps<TBook>["columns"] = [
        ...booksTableColumns,
        {
            key: "actions",
            title: "actions",
            render: (_, book) => (
                <div className="flex items-center gap-x-3">
                    <Button type="primary" onClick={() => onEdit(book)}>
                        <EditOutlined />
                    </Button>
                    <Button
                        danger
                        type="primary"
                        onClick={() => onDelete(book)}
                    >
                        <DeleteOutlined />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={books}
            columns={columns}
            pagination={{ ...buildPagination(paginations) }}
        />
    );
};
