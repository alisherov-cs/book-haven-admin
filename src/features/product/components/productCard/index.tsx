import type { TProduct } from "@/features/product/types";
import { Button, Card, List, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";

type TProductCardProps = {
  product: TProduct;
  onEdit: () => void;
};

export const ProductCard = ({ product, onEdit }: TProductCardProps) => {
  return (
    <Card className="border rounded-2xl shadow-lg">
      <div className="flex justify-between">
        <Typography.Title level={3} className="bold">
          {product.id}
        </Typography.Title>
        <Button onClick={onEdit}>
          <EditOutlined />
        </Button>
      </div>
      <Typography.Title level={4} className="bold">
        {product.name}
      </Typography.Title>
      <List className="border rounded-2xl px-2">
        {product.categories.map((category) => (
          <List.Item key={category.id}>{category.name}</List.Item>
        ))}
      </List>
    </Card>
  );
};
