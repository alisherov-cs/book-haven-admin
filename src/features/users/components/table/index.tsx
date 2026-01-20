import { Table } from "antd";
import { useUsersTableColumns } from "./columns";
import { useMemo } from "react";
import { useTablePaginations } from "@/hooks";
import { useGetAllUsers } from "../../api/getAllUsers.request";

export const UsersTable = () => {
    const { data: usersData } = useGetAllUsers();
    const { usersTableColumns } = useUsersTableColumns();
    const { buildPagination } = useTablePaginations();

    const users = useMemo(
        () => usersData?.pages.flatMap((page) => page.data),
        [usersData]
    );
    const paginations = useMemo(
        () => usersData?.pages?.[0].pagination,
        [usersData]
    );

    return (
        <Table
            dataSource={users}
            columns={usersTableColumns}
            pagination={{ ...buildPagination(paginations) }}
        />
    );
};
