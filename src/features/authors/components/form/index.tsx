import { Form, Input, type FormProps } from "antd";
import { useAuthorFormValidations } from "./validations";
import { useEffect } from "react";
import { AppEvents, eventEmitter } from "@/services";
import type { TAuthor } from "@/types/api.types";
import { useCreateAuthor } from "../../api/createAuthor.request";
import { useUpdateAuthor } from "../../api/updateAuthor.request";

type FieldTypes = {
    name: string;
};

type Props = {
    id: string;
    edit: TAuthor | null;
};

export const AuthorForm = ({ id, edit }: Props) => {
    const [form] = Form.useForm();
    const { authorValidations } = useAuthorFormValidations();
    const { mutateAsync: createAuthor } = useCreateAuthor();
    const { mutateAsync: updateAuthor } = useUpdateAuthor();

    useEffect(() => {
        eventEmitter.on(AppEvents.AUTHORS_FORM_CLEAR, () => form.resetFields());
    }, []);

    useEffect(() => {
        if (edit) {
            form.setFieldValue("name", edit.name);
        }
    }, [edit, form]);

    const submit: FormProps<FieldTypes>["onFinish"] = (values) => {
        if (edit) {
            updateAuthor({ id: edit.id, data: values }).then(() =>
                form.resetFields()
            );
        } else {
            createAuthor(values).then(() => form.resetFields());
        }
    };

    return (
        <Form form={form} onFinish={submit} id={id}>
            <Form.Item
                required
                label="Fullname"
                name="name"
                rules={authorValidations.name}
            >
                <Input placeholder="William Shakespeare" />
            </Form.Item>
        </Form>
    );
};
