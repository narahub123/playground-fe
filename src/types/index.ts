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

interface MessageType {
  status: "success" | "error" | "warning" | "info" | "help" | undefined;
  text: string | undefined;
}

export type { LangObjType, AuthInputListType, MessageType };
