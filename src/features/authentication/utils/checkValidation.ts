import { AuthRegExList } from "@/data";
import { MessageType } from "@/types";

export const checkValidation = (
  field: string,
  value: string,
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
        console.log("유효하지 않은 이메일 형식입니다.");
        message = {
          status: "error",
          text: "유효하지 않은 이메일 형식입니다.",
        };

        isError = true;
      } else {
        console.log("유효한 이메일 형식입니다.");
        message = {
          status: "success",
          text: "유효한 이메일 형식입니다.",
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
