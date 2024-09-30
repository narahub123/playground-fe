import { checkExistingEmail } from "@/apis/signup";
import { AuthRegExList } from "@/data";
import { langObj } from "@/data/language/language";
import { MessageType } from "@/types";

export const checkValidation = async (
  field: string,
  value: string,
  lang: string,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>
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
        // 기존에 존재하는 이메일인지 확인
        await checkExistingEmail(value)
          .then((res) => {
            console.log(res);
            message = {
              status: "success",
              text: langObj[lang].message.email_success,
            };
          })
          .catch((err) => {
            message = {
              status: "error",
              text: err.message,
            };

            isError = true;
          });
      }
      break;

    default:
      console.log("알 수 없는 필드입니다.");
      break;
  }

  setIsError(isError);
  return message;
};
