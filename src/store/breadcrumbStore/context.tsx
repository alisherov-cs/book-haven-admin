import { useContext } from "react";
import { BreadcrumbContext } from ".";

export const useBreadcrumb = () => useContext(BreadcrumbContext);
