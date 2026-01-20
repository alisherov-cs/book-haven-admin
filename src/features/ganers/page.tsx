import { DrawerAddManagmentFooter } from "@/components/drawer";
import { usePageHeader } from "@/store";
import { useBreadcrumb } from "@/store/breadcrumbStore/context";
import { Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { GanerForm, GanersTable } from "./components";
import { AppEvents, eventEmitter } from "@/services";
import type { TGaner } from "@/types/api.types";

export default function GanersPage() {
    const { setRoutes } = useBreadcrumb();
    const { setTitle, setActions } = usePageHeader();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [edit, setEdit] = useState<TGaner | null>(null);

    const clearForm = () => eventEmitter.emit(AppEvents.GANER_FORM_CLEAR);
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => {
        clearForm();
        setIsDrawerOpen(false);
        setEdit(null);
    };

    useEffect(() => {
        eventEmitter.on(AppEvents.GANER_CREATED, () => setIsDrawerOpen(false));
        eventEmitter.on(AppEvents.ON_GANER_EDIT, (ganer: TGaner) => {
            setEdit(ganer);
            setIsDrawerOpen(true);
        });
    }, []);

    useEffect(() => {
        setRoutes(["ganers"]);
    }, []);

    useEffect(() => {
        setTitle("Ganers Page");
        setActions(<Button onClick={openDrawer}>Add New Ganer</Button>);
    }, []);

    return (
        <main className="h-full">
            <GanersTable />
            <Drawer
                maskClosable={false}
                open={isDrawerOpen}
                onClose={closeDrawer}
                title={edit ? "Edit Ganer" : "Add New Ganer"}
                footer={
                    <DrawerAddManagmentFooter
                        submitFormId="ganersForm"
                        onClear={clearForm}
                        onCancel={closeDrawer}
                    />
                }
            >
                <GanerForm id="ganersForm" edit={edit} />
            </Drawer>
        </main>
    );
}
