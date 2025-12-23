import { useEffect, useMemo, useState } from "react";
import { useGetAllProducts } from "@/features/product/api/getAllProducts";
import { ProductCard } from "./components";
import { Button } from "antd";
import { AddProduct } from "./components/addProduct";
import type { TProduct } from "./types";
import { usePageHeader } from "@/store";
import { useBreadcrumb } from "@/store/breadcrumbStore/context";
import map from "lodash/map";

const Products = () => {
  const { data: productsData, isFetching: isProductsFetching } =
    useGetAllProducts();
  const { setRoutes } = useBreadcrumb();
  const { setTitle, setActions } = usePageHeader();
  const [isOpen, setIsOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<TProduct | null>(null);

  const products = useMemo(
    () => productsData?.pages[0].data,
    [productsData?.pages]
  );

  useEffect(() => {
    setRoutes(["products"]);
  }, [setRoutes]);

  useEffect(() => {
    setTitle("Products");
    setActions(<Button onClick={handleAddProductOpen}>Add Product</Button>);
  }, [setTitle, setActions]);

  const handleAddProductOpen = () => setIsOpen(true);
  const handleAddProductClose = () => {
    setIsOpen(false);
    setEditProduct(null);
  };

  if (isProductsFetching) return <div>Products fetching...</div>;

  return (
    <div className="p-2 flex flex-col items-end gap-y-4">
      <ul className="flex flex-col gap-y-2 px-3 w-full">
        {map(products, (product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => {
              setEditProduct(product);
              handleAddProductOpen();
            }}
          />
        ))}
      </ul>
      <AddProduct
        isOpen={isOpen}
        onClose={handleAddProductClose}
        editProduct={editProduct}
      />
    </div>
  );
};

export default Products;
