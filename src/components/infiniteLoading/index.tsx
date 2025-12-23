import { Spin } from "antd";

type TInfiniteLoadingProps = { loading?: boolean };

export const InfiniteLoading = ({ loading = false }: TInfiniteLoadingProps) => {
  if (loading)
    return (
      <div className="flex items-center justify-between gap-x-2">
        <span>fetching...</span>
        <Spin size="small" />
      </div>
    );
};
