import { InfiniteLoading } from "@/components";

export const popupRender = (
  menu: React.ReactElement,
  isFetchingNextPage: boolean
) => {
  return (
    <>
      {menu}
      <InfiniteLoading loading={isFetchingNextPage} />
    </>
  );
};
