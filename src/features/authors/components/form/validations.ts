import type { Rule } from "antd/es/form";

type keys = "name";

export const useAuthorFormValidations = () => {
    const authorValidations: Record<keys, Rule[]> = {
        name: [{ type: "string", required: true, message: "name is required" }],
    };

    return { authorValidations };
};
