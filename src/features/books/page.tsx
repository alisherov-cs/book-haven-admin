import { DrawerAddManagmentFooter } from "@/components/drawer";
import { AppEvents, eventEmitter } from "@/services";
import { usePageHeader } from "@/store";
import { useBreadcrumb } from "@/store/breadcrumbStore/context";
import type { TBook } from "@/types/api.types";
import { Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { BookForm, BooksTable } from "./components";

export default function BooksPage() {
    const { setRoutes } = useBreadcrumb();
    const { setTitle, setActions } = usePageHeader();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [edit, setEdit] = useState<TBook | null>(null);

    const clearForm = () => eventEmitter.emit(AppEvents.BOOKS_FORM_CLEAR);
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => {
        clearForm();
        setIsDrawerOpen(false);
        setEdit(null);
    };

    useEffect(() => {
        eventEmitter.on(AppEvents.BOOK_CREATED, () => setIsDrawerOpen(false));
        eventEmitter.on(AppEvents.ON_BOOK_EDIT, (ganer: TBook) => {
            setEdit(ganer);
            setIsDrawerOpen(true);
        });
    }, []);

    useEffect(() => {
        setRoutes(["books"]);
    }, []);

    useEffect(() => {
        setTitle("Books Page");
        setActions(<Button onClick={openDrawer}>Add New Book</Button>);
    }, []);

    return (
        <main className="h-full">
            <BooksTable />
            <Drawer
                maskClosable={false}
                open={isDrawerOpen}
                onClose={closeDrawer}
                title={edit ? "Edit Book" : "Add New Book"}
                footer={
                    <DrawerAddManagmentFooter
                        submitFormId="booksForm"
                        onClear={clearForm}
                        onCancel={closeDrawer}
                    />
                }
            >
                <BookForm id="booksForm" edit={edit} />
            </Drawer>
        </main>
    );
}
