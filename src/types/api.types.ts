import type { TUser } from "@/features/auth/guard/api/profile.request";

export type TApiError = {
    message: string;
    status: number;
};

export type TPagination = {
    page: number;
    total: number;
    limit: number;
    totalPages: number;
};

export type TApiResponseWithPagination<T> = {
    data: T;
    pagination: TPagination;
};

export type TGaner = {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
};

export type TAuthorBook = {
    id: string;
    name: string;
};

export type TAuthor = {
    id: string;
    name: string;
    books: TAuthorBook[];
    createdAt: string;
    updatedAt: string;
};

export type TReview = {
    id: string;
    title: string;
    description: string;
    book: TBook;
    rating: number;
    author: TUser;
    createdAt: string;
    updatedAt: string;
};

export type TBook = {
    id: string;
    name: string;
    description: string;
    image: string;
    ganer: TGaner;
    rating: number;
    price: number;
    discount?: string;
    author: Omit<TAuthor, "books">;
    reviews: TReview[];
    createdAt: string;
    updatedAt: string;
};
