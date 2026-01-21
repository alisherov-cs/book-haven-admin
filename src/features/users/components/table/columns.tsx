import type { TUser } from "@/features/auth/guard/api/profile.request";
import { useHelpers } from "@/utils";
import { formatDate } from "@/utils/formatDate";
import { Avatar, Image, type TableProps } from "antd";

export const useUsersTableColumns = () => {
    const { calculateIndex } = useHelpers();

    const usersTableColumns: TableProps<TUser>["columns"] = [
        {
            key: "#",
            title: "#",
            width: 100,
            render: (_, __, i) => calculateIndex(i),
        },
        {
            key: "avatar",
            title: "avatar",
            width: 200,
            render: (_, user) =>
                user.avatar ? (
                    <div>
                        <Image
                            width={40}
                            height={40}
                            className="rounded-full"
                            src={user.avatar}
                        />
                    </div>
                ) : (
                    <div>
                        <Avatar className="w-10! h-10! uppercase">
                            {user.username.slice(0, 1)}
                        </Avatar>
                    </div>
                ),
        },
        {
            key: "username",
            title: "username",
            width: 350,
            dataIndex: "username",
        },
        {
            key: "role",
            title: "role",
            width: 200,
            dataIndex: "role",
        },
        {
            key: "createdAt",
            title: "createdAt",
            width: 300,
            render: (_, user) => <span>{formatDate(user.createdAt)}</span>,
        },
        {
            key: "updatedAt",
            title: "updatedAt",
            width: 300,
            render: (_, user) => <span>{formatDate(user.updatedAt)}</span>,
        },
    ];

    return { usersTableColumns };
};
