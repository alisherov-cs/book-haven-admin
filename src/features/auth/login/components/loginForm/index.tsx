import { Button, Form, Input, type FormProps } from "antd";
import { useLogin } from "../../api/login.request";
import { useNavigate } from "react-router-dom";

type FieldTypes = {
    username: string;
    password: string;
};

export const LoginForm = () => {
    const [form] = Form.useForm();
    const { mutateAsync: login } = useLogin();
    const navigate = useNavigate();

    const submit: FormProps<FieldTypes>["onFinish"] = (values) => {
        login(values).then(() => navigate("/", { replace: true }));
    };

    return (
        <div className="flex flex-col items-center gap-y-4 bg-layout px-8 py-4 rounded-lg border border-border">
            <h1 className="text-xl">Login</h1>
            <Form form={form} onFinish={submit} className="w-[400px]">
                <Form.Item label="Username" required name="username">
                    <Input placeholder="@your_username" />
                </Form.Item>
                <Form.Item label="Password" required name="password">
                    <Input.Password placeholder="************" />
                </Form.Item>
                <div className="w-full flex items-center justify-center">
                    <Button
                        className="self-center w-40"
                        htmlType="submit"
                        type="primary"
                    >
                        submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};
