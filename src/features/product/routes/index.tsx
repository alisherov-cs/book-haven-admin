import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const ProductsPage = lazy(() => import("@/features/product/page"));

export const productsRoutes: RouteObject[] = [
  {
    path: "/products",
    element: <ProductsPage />,
  },
];
