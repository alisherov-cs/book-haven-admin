import { useSelectAuthors } from "@/features/authors/api/selectAuthor.request";
import { popupRender } from "@/utils";
import { Select, type SelectProps } from "antd";
import { useMemo } from "react";

type TAuthorsSelectProps = Omit<SelectProps, "options" | "loading"> & {
    defaultId?: string;
};

export const AuthorsSelect = ({ defaultId, ...props }: TAuthorsSelectProps) => {
    const {
        data: authorsData,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useSelectAuthors(defaultId);

    const authors = useMemo(
        () => authorsData?.pages.flatMap((page) => page.data),
        [authorsData]
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
            placeholder="Select author..."
            loading={isLoading || isFetchingNextPage}
            options={authors}
            onPopupScroll={handleScroll}
            fieldNames={{ value: "id", label: "name" }}
            popupRender={(menu) => popupRender(menu, isFetchingNextPage)}
            {...props}
        />
    );
};
