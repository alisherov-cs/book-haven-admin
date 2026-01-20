import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const BooksPage = lazy(() => import("@/features/books/page"));

export const booksRoutes: RouteObject[] = [
    {
        path: "/books",
        element: (
            <Suspense>
                <BooksPage />
            </Suspense>
        ),
    },
];
