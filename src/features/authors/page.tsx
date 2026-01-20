import { DrawerAddManagmentFooter } from "@/components/drawer";
import { AppEvents, eventEmitter } from "@/services";
import { usePageHeader } from "@/store";
import { useBreadcrumb } from "@/store/breadcrumbStore/context";
import type { TAuthor } from "@/types/api.types";
import { Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { AuthorForm, AuthorsTable } from "./components";

export default function AuthorsPage() {
    const { setRoutes } = useBreadcrumb();
    const { setTitle, setActions } = usePageHeader();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [edit, setEdit] = useState<TAuthor | null>(null);

    const clearForm = () => eventEmitter.emit(AppEvents.AUTHORS_FORM_CLEAR);
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => {
        clearForm();
        setIsDrawerOpen(false);
        setEdit(null);
    };

    useEffect(() => {
        eventEmitter.on(AppEvents.AUTHOR_CREATED, () => setIsDrawerOpen(false));
        eventEmitter.on(AppEvents.ON_AUTHOR_EDIT, (author: TAuthor) => {
            setEdit(author);
            setIsDrawerOpen(true);
        });
    }, []);

    useEffect(() => {
        setRoutes(["authors"]);
    }, []);

    useEffect(() => {
        setTitle("Authors Page");
        setActions(<Button onClick={openDrawer}>Add New Author</Button>);
    }, []);

    return (
        <main className="h-full">
            <AuthorsTable />
            <Drawer
                maskClosable={false}
                open={isDrawerOpen}
                onClose={closeDrawer}
                title={edit ? "Edit Author" : "Add New Author"}
                footer={
                    <DrawerAddManagmentFooter
                        submitFormId="authorsForm"
                        onClear={clearForm}
                        onCancel={closeDrawer}
                    />
                }
            >
                <AuthorForm id="authorsForm" edit={edit} />
            </Drawer>
        </main>
    );
}
