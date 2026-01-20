import { Navigate, Outlet } from "react-router-dom";
import { useGetProfile } from "./api/profile.request";
import { InfiniteLoading } from "@/components";

export const AuthGuard = () => {
    const { data, isLoading } = useGetProfile();

    if (isLoading) return <InfiniteLoading />;

    if (!data) return <Navigate to="/auth/login" replace />;

    return <Outlet />;
};
