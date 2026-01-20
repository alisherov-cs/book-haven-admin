import type { Rule } from "antd/es/form";

type keys = "name" | "description" | "price" | "authorId" | "ganerId";

export const useBooksFormValidations = () => {
    const bookValidations: Record<keys, Rule[]> = {
        name: [{ type: "string", required: true, message: "name is required" }],
        description: [
            {
                type: "string",
                required: true,
                message: "description is required",
            },
        ],
        price: [
            { type: "number", required: true, message: "price is required" },
        ],
        authorId: [
            { type: "string", required: true, message: "select author" },
        ],
        ganerId: [{ type: "string", required: true, message: "select ganer" }],
    };

    return { bookValidations };
};
