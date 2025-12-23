import { DrawerAddManagmentFooter } from "@/components/drawer";
import { usePageHeader } from "@/store";
import { Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import { useBreadcrumb } from "@/store/breadcrumbStore/context";
import map from "lodash/map";

export default function TestPage() {
  const { setRoutes } = useBreadcrumb();
  const { setTitle, setActions } = usePageHeader();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    setRoutes(["products"]);
  }, [setRoutes]);

  useEffect(() => {
    setTitle("Test page");
    setActions(<Button onClick={openDrawer}>Add Test</Button>);
  }, [setTitle, setActions]);

  const numbers = [1, 2, 3, 4, 5];

  return (
    <main>
      <Drawer
        maskClosable={false}
        open={isDrawerOpen}
        onClose={closeDrawer}
        title="Add Test"
        footer={
          <DrawerAddManagmentFooter
            submitFormId="testForm"
            onClear={() => {}}
            onCancel={closeDrawer}
          />
        }
      >
        <h1>test</h1>
      </Drawer>

      {map(numbers, (number) => (
        <div>{number}</div>
      ))}
    </main>
  );
}
