export const endpoints = {
    auth: {
        profile: "/auth/profile",
        login: "/auth/login",
    },
    ganers: {
        list: "/ganers",
        byId: (id: string) => `/ganers/${id}`,
    },
    authors: {
        list: "/authors",
        byId: (id: string) => `/authors/${id}`,
    },
    books: {
        list: "/books",
        byId: (id: string) => `/books/${id}`,
    },
    files: {
        upload: "/files/upload",
    },
    users: {
        list: "/users",
    },
};
