import { useEffect } from "react";
import { useBreadcrumb } from "@/store/breadcrumbStore/context";
import { usePageHeader } from "@/store";
import { useGetProfile } from "../auth/guard/api/profile.request";

export default function Home() {
    const { setRoutes } = useBreadcrumb();
    const { setTitle, setActions } = usePageHeader();
    const { data: user } = useGetProfile();

    useEffect(() => {
        setRoutes([]);
    }, []);

    useEffect(() => {
        setTitle(null);
        setActions(null);
    }, []);

    return (
        <div className="flex items-center justify-center h-full">
            <h1 className="text-4xl text-violet-500">
                Welcome! <span className="text-red-500">{user?.username}</span>
            </h1>
        </div>
    );
}
