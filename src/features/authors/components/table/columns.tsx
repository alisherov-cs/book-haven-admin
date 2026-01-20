import type { TAuthor } from "@/types/api.types";
import { useHelpers } from "@/utils";
import { formatDate } from "@/utils/formatDate";
import type { TableProps } from "antd";

export const useAuthorsTableColumns = () => {
    const { calculateIndex } = useHelpers();

    const authorsTableColumns: TableProps<TAuthor>["columns"] = [
        {
            key: "#",
            title: "#",
            width: 100,
            render: (_, __, i) => calculateIndex(i),
        },
        {
            key: "fullname",
            title: "fullname",
            width: 350,
            dataIndex: "name",
        },
        {
            key: "books",
            title: "books",
            width: 350,
            render: (_, author) =>
                author.books?.length ? (
                    <div className="flex items-center gap-x-3">
                        {author.books.slice(0, 4).map((book) => (
                            <div
                                key={book.id}
                                className="py-1 px-3 rounded-full bg-violet-500 inline-block font-semibold text-white"
                            >
                                {book.name}
                            </div>
                        ))}
                        {author.books.length > 4 && (
                            <div className="p-1 rounded-md bg-gray-500 inline-block font-semibold text-white">
                                +{author.books.length - 4} more
                            </div>
                        )}
                    </div>
                ) : (
                    <span className="block w-5 h-px bg-primary" />
                ),
        },
        {
            key: "createdAt",
            title: "createdAt",
            width: 300,
            render: (_, author) => <span>{formatDate(author.createdAt)}</span>,
        },
        {
            key: "updatedAt",
            title: "updatedAt",
            width: 300,
            render: (_, author) => <span>{formatDate(author.updatedAt)}</span>,
        },
    ];

    return { authorsTableColumns };
};
