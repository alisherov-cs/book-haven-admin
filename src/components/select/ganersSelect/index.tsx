import { popupRender } from "@/utils";
import { Select, type SelectProps } from "antd";
import { useMemo } from "react";
import { useSelectGaners } from "@/features/ganers/api/selectGaners.request.ts";

type TGanersSelectProps = Omit<SelectProps, "options" | "loading"> & {
    defaultId?: string;
};

export const GanersSelect = ({ defaultId, ...props }: TGanersSelectProps) => {
    const {
        data: ganersData,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useSelectGaners(defaultId);

    const ganers = useMemo(
        () => ganersData?.pages.flatMap((page) => page.data),
        [ganersData]
    );

    const handleScroll: SelectProps["onPopupScroll"] = (e) => {
        const target = e.target as HTMLDivElement;
        if (
            target.scrollTop + target.offsetHeight === target.scrollHeight &&
            hasNextPage
        ) {
            fetchNextPage();
        }
    };

    return (
        <Select
            allowClear
            filterOption={false}
            placeholder="Select genre..."
            loading={isLoading || isFetchingNextPage}
            options={ganers}
            onPopupScroll={handleScroll}
            fieldNames={{ value: "id", label: "name" }}
            popupRender={(menu) => popupRender(menu, isFetchingNextPage)}
            {...props}
        />
    );
};
