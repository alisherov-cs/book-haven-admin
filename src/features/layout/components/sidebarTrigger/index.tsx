import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";

type TSidebarTrigger = {
  onClick: () => void;
};

export const SidebarTrigger = ({ onClick }: TSidebarTrigger) => {
  return (
    <Button size="small" className="rounded-full! w-8! h-8!" onClick={onClick}>
      <MenuOutlined />
    </Button>
  );
};
