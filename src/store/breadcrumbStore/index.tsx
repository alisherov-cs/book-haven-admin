import {
    breadcrumbRoutes,
    type TBreadcrumbRouteKeys,
} from "@/constants/breadcrumbRoutes";
import type { TProvider } from "@/types/provider.types";
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { createContext, useState } from "react";
import map from "lodash/map";
import includes from "lodash/includes";
import last from "lodash/last";
import set from "lodash/set";
import isObject from "lodash/isObject";

export type TBreadcrumbContext = {
    routes: ItemType[];
    setRoutes: (routes: TBreadcrumbRouteKeys[]) => void;
};

const defaultState: TBreadcrumbContext = {
    routes: [breadcrumbRoutes.home],
    setRoutes: () => {},
};

const BreadcrumbContext = createContext(defaultState);

const BreadcrumbProvider = ({ children }: TProvider) => {
    const [routes, setRoutes] = useState<ItemType[]>([breadcrumbRoutes.home]);

    const setBreadcrumbRoutes = (routes: TBreadcrumbRouteKeys[]) => {
        const newBreadcrumbRoutes = map(
            routes,
            (route) => breadcrumbRoutes[route]
        );

        const currentPage = last(newBreadcrumbRoutes);
        if (isObject(currentPage)) set(currentPage, "href", undefined);

        if (includes(routes, "home")) setRoutes(newBreadcrumbRoutes);
        else setRoutes([breadcrumbRoutes.home, newBreadcrumbRoutes].flat());
    };

    return (
        <BreadcrumbContext.Provider
            value={{ routes, setRoutes: setBreadcrumbRoutes }}
        >
            {children}
        </BreadcrumbContext.Provider>
    );
};

export { BreadcrumbContext, BreadcrumbProvider };
