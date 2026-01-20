import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const UsersPage = lazy(() => import("@/features/users/page"));

export const usersRoutes: RouteObject[] = [
    {
        path: "/users",
        element: (
            <Suspense>
                <UsersPage />
            </Suspense>
        ),
    },
];
