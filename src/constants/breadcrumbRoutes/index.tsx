import { HomeOutlined, ProductOutlined } from "@ant-design/icons";

export const breadcrumbRoutes = {
  home: {
    href: "/",
    title: (
      <span>
        <HomeOutlined /> Dashboard
      </span>
    ),
  },
  products: {
    href: "products",
    title: (
      <span>
        <ProductOutlined /> Products
      </span>
    ),
  },
};

export type TBreadcrumbRouteKeys = keyof typeof breadcrumbRoutes;
