import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/features/layout";
import { AuthGuard } from "@/features/auth/guard";
import { loginRoutes } from "@/features/auth/login/routes";
import { ganersRoutes } from "@/features/ganers/routes";
import { homeRoutes } from "@/features/home/routes";
import { authorsRoutes } from "@/features/authors/routes";
import { booksRoutes } from "@/features/books/routes";
import { usersRoutes } from "@/features/users/routes";

export const router = createBrowserRouter([
    ...loginRoutes,
    {
        path: "/",
        element: <AuthGuard />,
        children: [
            {
                path: "/",
                element: <Layout />,
                children: [
                    homeRoutes,
                    ganersRoutes,
                    authorsRoutes,
                    booksRoutes,
                    usersRoutes,
                ].flat(),
            },
        ],
    },
]);
