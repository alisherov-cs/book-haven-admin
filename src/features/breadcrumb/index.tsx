import { useBreadcrumb } from "@/store/breadcrumbStore/context";
import { Breadcrumb } from "antd";

export const LayoutBreadcrumb = () => {
  const { routes } = useBreadcrumb();

  return <Breadcrumb items={routes} className="p-2!" />;
};
