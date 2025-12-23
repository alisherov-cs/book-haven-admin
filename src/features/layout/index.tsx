import { Layout as AntLayout } from "antd";
import { useState } from "react";
import {
  PageHeader,
  Sidebar,
  SidebarTrigger,
} from "@/features/layout/components";
import { Outlet } from "react-router-dom";
import { ToggleTheme } from "@/features/theme";
import { LayoutBreadcrumb } from "@/features/breadcrumb";

const { Content } = AntLayout;

export const Layout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <AntLayout className="min-h-screen!">
      <Sidebar collapsed={collapsed} />
      <Content className="m-4 ml-0">
        <PageHeader
          sidebarTrigger={<SidebarTrigger onClick={toggleSidebar} />}
        />
        <LayoutBreadcrumb />
        <Outlet />
        <ToggleTheme />
      </Content>
    </AntLayout>
  );
};
