import { CategoriesSelect } from "@/components/select";
import { Drawer, Form, Input } from "antd";
import type { TProduct } from "@/features/product/types";
import { useEffect } from "react";
import { DrawerAddManagmentFooter } from "@/components/drawer";

type TAddProductDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  editProduct: TProduct | null;
};

export const AddProduct = ({
  isOpen,
  onClose,
  editProduct,
}: TAddProductDrawerProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editProduct?.categories?.length) {
      form.setFieldValue(
        "categories",
        editProduct.categories.map((category) => category.id)
      );
    }
  }, [editProduct, form]);

  const handleSubmit = (value: typeof form) => {
    console.log(value);
  };

  return (
    <Drawer
      maskClosable={false}
      open={isOpen}
      onClose={onClose}
      title="Add Product"
      footer={
        <DrawerAddManagmentFooter
          submitFormId="products-form"
          onCancel={onClose}
          onClear={onClose}
        />
      }
    >
      <Form form={form} onFinish={handleSubmit} id="products-form">
        <Form.Item
          required
          hasFeedback
          name="categories"
          label="category"
          rules={[{ required: true, message: "select category!" }]}
        >
          <CategoriesSelect
            defaultIds={editProduct?.categories.map((category) => category.id)}
          />
        </Form.Item>
        <Form.Item
          required
          hasFeedback
          name="firstName"
          label="first name"
          rules={[{ required: true, message: "enter your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          required
          hasFeedback
          name="username"
          label="username"
          rules={[
            { required: true, message: "enter your username!" },
            { min: 3, message: "username should be at least 3 characters!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          required
          hasFeedback
          name="email"
          label="email"
          rules={[
            { required: true, message: "enter your email!" },
            { type: "email", message: "please enter a valid email!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          required
          hasFeedback
          name="password"
          label="password"
          rules={[
            { required: true, message: "create a password!" },
            {
              min: 8,
              message: "password should be at least 8 characters long!",
            },
            {
              pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[_@\-!$#]).{8,}$/,
              message:
                "please enter a strong password! (password should contains uppercase, numbers and special characters @,_,...)",
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
