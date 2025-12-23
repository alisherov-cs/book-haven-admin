import { createBrowserRouter } from "react-router-dom";
import { productsRoutes } from "@/features/product/routes";
import { Layout } from "@/features/layout";
import { testRoutes } from "@/features/test/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [productsRoutes, testRoutes].flat(),
  },
]);
