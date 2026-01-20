import { useGetProfile } from "@/features/auth/guard/api/profile.request";
import { ArrowsAltOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, type MenuProps } from "antd";
import { clsx } from "clsx";
import { InfiniteLoading } from "../infiniteLoading";
import { useNavigate } from "react-router-dom";

type TProfile = {
    collapsed?: boolean;
};

export const Profile = ({ collapsed }: TProfile) => {
    const { data: user, isLoading } = useGetProfile();
    const navigate = useNavigate();

    if (isLoading) return <InfiniteLoading />;

    const logout = () => {
        localStorage.clear();
        navigate("/auth/login", { replace: true });
    };

    const items: MenuProps["items"] = [
        {
            key: "logout",
            onClick: logout,
            label: (
                <Button danger type="primary" className="w-full">
                    logout
                </Button>
            ),
        },
    ];

    return (
        <Dropdown trigger={["click"]} placement="topRight" menu={{ items }}>
            <div
                className={clsx(
                    "cursor-pointer flex items-center justify-center gap-x-2 rounded-xl p-2 border-border",
                    collapsed ? "border-0" : "border"
                )}
            >
                <Avatar
                    icon={
                        user?.avatar ? (
                            <img src={user.avatar} />
                        ) : (
                            <UserOutlined />
                        )
                    }
                />
                {!collapsed && (
                    <>
                        <div className="text-primary">
                            <h1>@{user?.username}</h1>
                            <p>{user?.role}</p>
                        </div>
                        <ArrowsAltOutlined className="text-primary" />
                    </>
                )}
            </div>
        </Dropdown>
    );
};
