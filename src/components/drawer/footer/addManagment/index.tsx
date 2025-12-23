import { Button, Tooltip } from "antd";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";

type TDrawerAddManagmentFooterProps = {
  submitFormId: string;
  onClear: () => void;
  onCancel: () => void;
};

export const DrawerAddManagmentFooter = ({
  submitFormId,
  onClear,
  onCancel,
}: TDrawerAddManagmentFooterProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 mb-2">
      <Tooltip title="Clear">
        <Button
          onClick={onClear}
          className="rounded-full! w-8! h-8! border-amber-600! bg-transparent!"
          type="dashed"
          variant="outlined"
          danger
        >
          <DeleteOutlined className="w-4! text-amber-600!" />
        </Button>
      </Tooltip>
      <Tooltip title="Confirm">
        <Button
          htmlType="submit"
          form={submitFormId}
          className="flex-1 rounded-full!"
          type="primary"
        >
          Submit
        </Button>
      </Tooltip>
      <Tooltip title="Cancel">
        <Button
          onClick={onCancel}
          className="rounded-full! w-8! h-8! bg-transparent!"
          variant="outlined"
          danger
        >
          <CloseOutlined className="w-4!" />
        </Button>
      </Tooltip>
    </div>
  );
};
