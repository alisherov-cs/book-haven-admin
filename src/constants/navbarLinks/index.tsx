import {
  BellOutlined,
  HomeOutlined,
  MessageOutlined,
  OrderedListOutlined,
  ProductOutlined,
  SettingOutlined,
  TableOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number] & {
  url?: string;
  children?: MenuItem[];
};

export const navbarLinks: MenuItem[] = [
  {
    key: "link-1",
    label: "Page 1",
    icon: <HomeOutlined />,
    url: "/",
  },
  {
    key: "link-2",
    label: "Page 2",
    icon: <ProductOutlined />,
    url: "/test",
  },
  {
    key: "link-3",
    label: "Page 3",
    icon: <OrderedListOutlined />,
    children: [
      {
        key: "link-3.1",
        label: "Page 3.1",
        icon: <TableOutlined />,
        url: "/page/page",
      },
    ],
  },
];

export const navbarActionLinks: MenuItem[] = [
  {
    key: "action-1",
    label: "notifications",
    icon: <BellOutlined />,
    url: "/notifications",
  },
  {
    key: "action-2",
    label: "support",
    icon: <MessageOutlined />,
    url: "/support",
  },
  {
    key: "action-3",
    label: "settings",
    icon: <SettingOutlined />,
    url: "/settings",
  },
];
