import { Form, Input, type FormProps } from "antd";
import { useGanerFormValidations } from "./validations";
import { useEffect } from "react";
import { AppEvents, eventEmitter } from "@/services";
import { useCreateGaner } from "../../api/createGaner.request";
import type { TGaner } from "@/types/api.types";
import { useUpdateGaner } from "../../api/updateGaner.request";

type FieldTypes = {
    name: string;
};

type Props = {
    id: string;
    edit: TGaner | null;
};

export const GanerForm = ({ id, edit }: Props) => {
    const [form] = Form.useForm();
    const { ganerValidations } = useGanerFormValidations();
    const { mutateAsync: createGaner } = useCreateGaner();
    const { mutateAsync: updateGaner } = useUpdateGaner();

    useEffect(() => {
        eventEmitter.on(AppEvents.GANER_FORM_CLEAR, () => form.resetFields());
    }, []);

    useEffect(() => {
        if (edit) {
            form.setFieldValue("name", edit.name);
        }
    }, [edit, form]);

    const submit: FormProps<FieldTypes>["onFinish"] = (values) => {
        if (edit) {
            updateGaner({ id: edit.id, data: values }).then(() =>
                form.resetFields()
            );
        } else {
            createGaner(values).then(() => form.resetFields());
        }
    };

    return (
        <Form form={form} onFinish={submit} id={id}>
            <Form.Item
                required
                label="Name"
                name="name"
                rules={ganerValidations.name}
            >
                <Input placeholder="Fantasy" />
            </Form.Item>
        </Form>
    );
};
