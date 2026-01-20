import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const GanersPage = lazy(() => import("@/features/ganers/page"));

export const ganersRoutes: RouteObject[] = [
    {
        path: "/ganers",
        element: (
            <Suspense>
                <GanersPage />
            </Suspense>
        ),
    },
];
