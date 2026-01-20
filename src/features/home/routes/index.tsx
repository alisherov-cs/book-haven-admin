import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("@/features/home/page"));

export const homeRoutes: RouteObject[] = [
    {
        path: "/",
        element: (
            <Suspense>
                <HomePage />
            </Suspense>
        ),
    },
];
