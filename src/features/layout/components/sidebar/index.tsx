import { Logo, Profile } from "@/components";
import { navbarActionLinks, navbarLinks } from "@/constants";
import { Layout, Menu, type MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

type TSidebar = {
  collapsed: boolean;
};

export const Sidebar = ({ collapsed }: TSidebar) => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    const activeNavbarItem =
      navbarLinks.find((i) => i.key == key) ||
      navbarActionLinks.find((i) => i.key === key);
    if (activeNavbarItem?.url) {
      navigate(activeNavbarItem.url);
    }
  };

  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
      className="m-4 rounded-2xl pt-4 pb-2 h-[calc(100vh-2rem)] sticky! top-4! border border-border"
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-center gap-y-4">
          <Logo />
          <Menu
            items={navbarLinks}
            onClick={handleMenuClick}
            mode="inline"
            className="bg-transparent! border-0!"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Menu
            items={navbarActionLinks}
            onClick={handleMenuClick}
            mode="inline"
            className="bg-transparent! border-0!"
          />
          <div className="px-2">
            <Profile collapsed={collapsed} />
          </div>
        </div>
      </div>
    </Sider>
  );
};
