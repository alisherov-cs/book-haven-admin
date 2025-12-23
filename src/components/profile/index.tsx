import { ArrowsAltOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

type TProfile = {
  collapsed?: boolean;
};

export const Profile = ({ collapsed }: TProfile) => {
  return (
    <Link to="/profile">
      <Tooltip title={collapsed ? "profile" : null} placement="right">
        <div
          className={clsx(
            "flex items-center justify-center gap-x-2 rounded-xl p-2 border-border",
            collapsed ? "border-0" : "border"
          )}
        >
          <Avatar icon={<UserOutlined />} />
          {!collapsed && (
            <>
              <div className="text-primary">
                <h1>Frankie Sullivan</h1>
                <p>@frankie</p>
              </div>
              <ArrowsAltOutlined className="text-primary" />
            </>
          )}
        </div>
      </Tooltip>
    </Link>
  );
};
