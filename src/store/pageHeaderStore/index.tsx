import type { TProvider } from "@/types/provider.types";
import { createContext, useState, type ReactNode } from "react";

export type TPageHeaderContext = {
  title: string | null;
  actions: ReactNode | null;
  setTitle: (title: string | null) => void;
  setActions: (actions: ReactNode | null) => void;
};

const defaultState: TPageHeaderContext = {
  title: null,
  actions: null,
  setTitle: () => {},
  setActions: () => {},
};

const PageHeaderContext = createContext(defaultState);

const PageHeaderProvider = ({ children }: TProvider) => {
  const [title, setTitle] = useState<string | null>(null);
  const [actions, setActions] = useState<ReactNode | null>(null);

  return (
    <PageHeaderContext.Provider
      value={{ title, actions, setTitle, setActions }}
    >
      {children}
    </PageHeaderContext.Provider>
  );
};

export { PageHeaderContext, PageHeaderProvider };
