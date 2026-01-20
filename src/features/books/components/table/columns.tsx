import type { TBook } from "@/types/api.types";
import { formatCurrency, useHelpers } from "@/utils";
import { formatDate } from "@/utils/formatDate";
import { Image, Tooltip, type TableProps } from "antd";

export const useBooksTableColumns = () => {
    const { calculateIndex } = useHelpers();

    const booksTableColumns: TableProps<TBook>["columns"] = [
        {
            key: "#",
            title: "#",
            width: 100,
            render: (_, __, i) => calculateIndex(i),
        },
        {
            key: "image",
            title: "image",
            width: 150,
            render: (_, book) => (
                <div className="w-14 h-14 overflow-hidden">
                    <Image className="object-cover" src={book.image} />
                </div>
            ),
        },
        {
            key: "name",
            title: "name",
            width: 300,
            dataIndex: "name",
        },
        {
            key: "author",
            title: "author",
            width: 300,
            dataIndex: ["author", "name"],
        },
        {
            key: "genre",
            title: "genre",
            width: 300,
            render: (_, book) => (
                <div className="px-3 py-1 bg-violet-500 inline-block rounded-full text-white">
                    <span className="font-semibold">{book.ganer.name}</span>
                </div>
            ),
        },
        {
            key: "price",
            title: "price",
            width: 200,
            render: (_, book) => formatCurrency(book.price),
        },
        {
            key: "discount",
            title: "discount",
            width: 200,
            render: (_, book) =>
                book.discount ? (
                    <span>{book.discount}%</span>
                ) : (
                    <span className="block w-5 h-px bg-primary" />
                ),
        },
        {
            key: "description",
            title: "description",
            width: 300,
            render: (_, book) => (
                <Tooltip title={book.description}>
                    <span className="line-clamp-1">{book.description}</span>
                </Tooltip>
            ),
        },
        {
            key: "createdAt",
            title: "createdAt",
            width: 300,
            render: (_, book) => <span>{formatDate(book.createdAt)}</span>,
        },
        {
            key: "updatedAt",
            title: "updatedAt",
            width: 300,
            render: (_, book) => <span>{formatDate(book.updatedAt)}</span>,
        },
    ];

    return { booksTableColumns };
};
