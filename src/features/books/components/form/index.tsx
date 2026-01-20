import { App, Form, Input, InputNumber, type FormProps } from "antd";
import { useBooksFormValidations } from "./validations";
import { useEffect, useState } from "react";
import { AppEvents, eventEmitter } from "@/services";
import type { TBook } from "@/types/api.types";
import { useCreateBook } from "../../api/createBook.request";
import { useUpdateBook } from "../../api/updateBook.request";
import { AuthorsSelect, GanersSelect } from "@/components/select";
import { FileUpload, type TUploadedFile } from "@/features/upload";

type FieldTypes = {
    name: string;
    description: string;
    image: string;
    price: number;
    discount?: number;
    ganerId: string;
    authorId: string;
};

type Props = {
    id: string;
    edit: TBook | null;
};

export const BookForm = ({ id, edit }: Props) => {
    const [form] = Form.useForm();
    const { message } = App.useApp();
    const { bookValidations } = useBooksFormValidations();
    const { mutateAsync: createBook } = useCreateBook();
    const { mutateAsync: updateBook } = useUpdateBook();
    const [uploadedFile, setUploadedFile] = useState<TUploadedFile | null>(
        null
    );

    useEffect(() => {
        eventEmitter.on(AppEvents.BOOKS_FORM_CLEAR, () => form.resetFields());
    }, []);

    useEffect(() => {
        if (edit) {
            setUploadedFile({
                url: edit.image,
                filename: `${edit.name}.${edit.image.split(".").at(-1)}`,
            });
            form.setFieldsValue({
                name: edit.name,
                price: edit.price,
                discount: edit?.discount,
                ganerId: edit.ganer.id,
                authorId: edit.author.id,
                description: edit.description,
                image: edit.image,
            });
        }
    }, [edit, form]);

    const submit: FormProps<FieldTypes>["onFinish"] = (values) => {
        if (!values.image) {
            message.error("please upload image");
            return;
        }

        if (edit) {
            updateBook({ id: edit.id, data: values }).then(() =>
                form.resetFields()
            );
        } else {
            createBook(values).then(() => form.resetFields());
        }
    };

    return (
        <Form form={form} onFinish={submit} id={id}>
            <Form.Item
                required
                label="Name"
                name="name"
                rules={bookValidations.name}
            >
                <Input placeholder="Fantasy" />
            </Form.Item>
            <Form.Item
                required
                label="Price"
                name="price"
                rules={bookValidations.price}
            >
                <InputNumber
                    min={0}
                    step={0.1}
                    controls={false}
                    placeholder="$10.0"
                    className="w-full!"
                    formatter={(value) =>
                        value ? `$${Number(value).toFixed(2)}` : ""
                    }
                />
            </Form.Item>
            <Form.Item label="Discount" name="discount">
                <InputNumber
                    min={0}
                    max={100}
                    controls={false}
                    placeholder="10%"
                    className="w-full!"
                    formatter={(value) => (value ? `${value}%` : "")}
                />
            </Form.Item>
            <Form.Item
                required
                label="Genre"
                name="ganerId"
                rules={bookValidations.ganerId}
            >
                <GanersSelect defaultId={edit?.ganer.id} />
            </Form.Item>
            <Form.Item
                required
                label="Author"
                name="authorId"
                rules={bookValidations.authorId}
            >
                <AuthorsSelect defaultId={edit?.ganer.id} />
            </Form.Item>
            <Form.Item required label="Image" name="image">
                <FileUpload
                    defaultFile={
                        edit
                            ? {
                                  url: edit.image,
                                  filename: `${edit.name}.${edit.image.split(".").at(-1)}`,
                              }
                            : undefined
                    }
                    onChange={(file) => form.setFieldValue("image", file?.url)}
                />
            </Form.Item>
            <Form.Item
                required
                label="Description"
                name="description"
                rules={bookValidations.description}
            >
                <Input.TextArea
                    placeholder="About this book..."
                    className="min-h-30!"
                />
            </Form.Item>
        </Form>
    );
};
