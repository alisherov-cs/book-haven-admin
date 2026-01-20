import type { Rule } from "antd/es/form";

type keys = "name";

export const useGanerFormValidations = () => {
    const ganerValidations: Record<keys, Rule[]> = {
        name: [{ type: "string", required: true, message: "name is required" }],
    };

    return { ganerValidations };
};
