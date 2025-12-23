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
