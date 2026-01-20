import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const AuthorsPage = lazy(() => import("@/features/authors/page"));

export const authorsRoutes: RouteObject[] = [
    {
        path: "/authors",
        element: (
            <Suspense>
                <AuthorsPage />
            </Suspense>
        ),
    },
];
