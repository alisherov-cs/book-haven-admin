import {
    BookOutlined,
    HomeOutlined,
    OrderedListOutlined,
    UsergroupAddOutlined,
    UserOutlined,
} from "@ant-design/icons";

export const breadcrumbRoutes = {
    home: {
        href: "/",
        title: (
            <span>
                <HomeOutlined /> Home
            </span>
        ),
    },
    ganers: {
        href: "ganers",
        title: (
            <span>
                <OrderedListOutlined /> Ganers
            </span>
        ),
    },
    authors: {
        href: "authors",
        title: (
            <span>
                <UsergroupAddOutlined /> Authors
            </span>
        ),
    },
    books: {
        href: "books",
        title: (
            <span>
                <BookOutlined /> Books
            </span>
        ),
    },
    users: {
        href: "users",
        title: (
            <span>
                <UserOutlined /> Users
            </span>
        ),
    },
};

export type TBreadcrumbRouteKeys = keyof typeof breadcrumbRoutes;
