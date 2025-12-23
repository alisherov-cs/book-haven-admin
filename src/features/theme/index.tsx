import { FloatButton } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "@/store/themeStore/context";
import { Theme } from "@/types/theme.types";

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <FloatButton
      icon={theme === Theme.light ? <MoonOutlined /> : <SunOutlined />}
      onClick={toggleTheme}
      className="bottom-4! right-4!"
    />
  );
};
