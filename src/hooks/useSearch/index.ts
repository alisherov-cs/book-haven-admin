import { useSearchParams } from "react-router-dom";

export const useSearch = (searchKey: string = "search") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get(searchKey);

  const setSearch = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return { search, setSearch };
};
