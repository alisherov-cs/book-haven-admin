import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const TestPage = lazy(() => import("@/features/test/page"));

export const testRoutes: RouteObject[] = [
  {
    path: "/test",
    element: <TestPage />,
  },
];
