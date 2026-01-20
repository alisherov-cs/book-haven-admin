import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const LoginPage = lazy(() => import("@/features/auth/login/page"));

export const loginRoutes: RouteObject[] = [
    {
        path: "/auth/login",
        element: (
            <Suspense>
                <LoginPage />
            </Suspense>
        ),
    },
];
