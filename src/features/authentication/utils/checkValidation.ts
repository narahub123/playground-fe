import { AuthRegExList } from "@/data";
import { langObj } from "@/data/language/language";
import { MessageType } from "@/types";

export const checkValidation = (
  field: string,
  value: string,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  lang: string
) => {
  let message: MessageType | undefined = undefined;
  let isError = false;
  if (value === "") return;

  switch (field) {
    case "username":
      break;
    case "email":
      if (!AuthRegExList.email.test(value)) {
        message = {
          status: "error",
          text: langObj[lang].message.email_error,
        };

        isError = true;
      } else {
        message = {
          status: "success",
          text: langObj[lang].message.email_success,
        };
      }
      break;

    default:
      console.log("알 수 없는 필드입니다.");
      break;
  }

  setIsError(isError);
  return message;
};
