interface LangObjType {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

interface AuthInputListType {
  name: string | number;
  value: string | number;
}
export type { LangObjType, AuthInputListType };
