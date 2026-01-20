import { usePageHeader } from "@/store";
import { useBreadcrumb } from "@/store/breadcrumbStore/context";
import { useEffect } from "react";
import { UsersTable } from "./components";

export default function Users() {
    const { setRoutes } = useBreadcrumb();
    const { setTitle } = usePageHeader();

    useEffect(() => {
        setRoutes(["users"]);
    }, []);

    useEffect(() => {
        setTitle("Users Page");
    }, []);

    return (
        <main>
            <UsersTable />
        </main>
    );
}
