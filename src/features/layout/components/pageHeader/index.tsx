import { usePageHeader } from "@/store";
import type { ReactNode } from "react";

type TPageHeader = {
  sidebarTrigger?: ReactNode;
};

export const PageHeader = ({ sidebarTrigger }: TPageHeader) => {
  const { title, actions } = usePageHeader();

  return (
    <div className="sticky! top-4! z-50! bg-base p-4 min-h-16 rounded-2xl border border-border flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        {sidebarTrigger && sidebarTrigger}
        {title && <h1>{title}</h1>}
      </div>
      {actions && actions}
    </div>
  );
};
