import { useGetAllCategories } from "@/features/category/api/getAllCategories";
import { debounce, popupRender } from "@/utils";
import { Select, type SelectProps } from "antd";
import { useMemo, useState } from "react";

type TCategoriesSelectProps = Omit<SelectProps, "options" | "loading"> & {
  defaultIds?: number[];
};

export const CategoriesSelect = ({
  defaultIds,
  ...props
}: TCategoriesSelectProps) => {
  const [search, setSearch] = useState<string>("");
  const {
    data: categories,
    isLoading: isFetchingCategories,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetAllCategories(search, defaultIds);

  const categoriesData = useMemo(
    () => categories?.pages.flatMap((page) => page.data),
    [categories]
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

  const handleCategorySearch = (value: string) => {
    setSearch(value);
  };

  const debounceSearch = useMemo(
    () => debounce<string, void>(handleCategorySearch, 300),
    []
  );

  return (
    <Select
      showSearch
      allowClear
      maxTagCount={3}
      mode="multiple"
      filterOption={false}
      onSearch={debounceSearch}
      placeholder="Select category..."
      loading={isFetchingCategories || isFetchingNextPage}
      options={categoriesData}
      onPopupScroll={handleScroll}
      fieldNames={{ value: "id", label: "name" }}
      popupRender={(menu) => popupRender(menu, isFetchingNextPage)}
      {...props}
    />
  );
};
