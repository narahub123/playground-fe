interface LangObjType {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

interface AuthInputListType {
  name: string;
  value: string;
}
export type { LangObjType, AuthInputListType };
