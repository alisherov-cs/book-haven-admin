import { useTheme } from "@/store/themeStore/context";
import type { TProvider } from "@/types/provider.types";
import { Theme } from "@/types/theme.types";
import { CloseOutlined } from "@ant-design/icons";
import { App, ConfigProvider, theme as antTheme } from "antd";
import { useEffect, useMemo } from "react";

export const AntConfigProvider = ({ children }: TProvider) => {
    const { theme } = useTheme();

    const lightTheme = {
        algorithm: antTheme.defaultAlgorithm,
        token: {
            colorPrimary: "#1677ff",
            colorBgBase: "#ffffff",
            colorBgContainer: "#ffffff",
            colorBgLayout: "#f5f5f5",
            colorText: "rgba(0, 0, 0, 0.88)",
            colorBorder: "#d9d9d9",
        },
        components: {
            Layout: {
                siderBg: "#ffffff",
            },
            Menu: {
                itemBg: "#ffffff",
            },
        },
    };

    const darkTheme = {
        algorithm: antTheme.darkAlgorithm,
        token: {
            colorPrimary: "#1677ff",
            colorBgBase: "#0a0a0a",
            colorBgContainer: "#141414",
            colorBgLayout: "#000000",
            colorText: "rgba(255, 255, 255, 0.85)",
            colorBorder: "#424242",
        },
        components: {
            Layout: {
                siderBg: "#141414",
            },
            Menu: {
                itemBg: "#141414",
            },
        },
    };

    const currentTheme = useMemo(
        () => (theme === Theme.light ? lightTheme : darkTheme),
        [theme]
    );

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty(
            "--color-bg-base",
            currentTheme.token.colorBgBase
        );
        root.style.setProperty(
            "--color-bg-container",
            currentTheme.token.colorBgContainer
        );
        root.style.setProperty(
            "--color-bg-layout",
            currentTheme.token.colorBgLayout
        );
        root.style.setProperty("--color-text", currentTheme.token.colorText);
        root.style.setProperty(
            "--color-border",
            currentTheme.token.colorBorder
        );
    }, [currentTheme]);

    return (
        <ConfigProvider
            drawer={{
                closeIcon: <CloseOutlined />,
            }}
            button={{ style: { borderRadius: 24 } }}
            modal={{ centered: true }}
            theme={{
                ...(theme === Theme.light ? lightTheme : darkTheme),
                cssVar: true,
                hashed: false,
            }}
        >
            <App className="min-h-screen">{children}</App>
        </ConfigProvider>
    );
};
