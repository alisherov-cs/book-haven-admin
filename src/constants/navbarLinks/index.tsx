import {
    BookOutlined,
    HomeOutlined,
    OrderedListOutlined,
    UsergroupAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number] & {
    url?: string;
    children?: MenuItem[];
};

export const navbarLinks: MenuItem[] = [
    {
        key: "home",
        label: "Home",
        icon: <HomeOutlined />,
        url: "/",
    },
    {
        key: "users",
        label: "Users",
        icon: <UserOutlined />,
        url: "/users",
    },
    {
        key: "authors",
        label: "Authors",
        icon: <UsergroupAddOutlined />,
        url: "/authors",
    },
    {
        key: "ganers",
        label: "Ganers",
        icon: <OrderedListOutlined />,
        url: "/ganers",
    },
    {
        key: "books",
        label: "Books",
        icon: <BookOutlined />,
        url: "/books",
    },
];

export const navbarActionLinks: MenuItem[] = [];
