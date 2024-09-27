import { AuthRegExList } from "@/data";
import { MessageType } from "@/types";

export const checkValidation = (
  field: string,
  value: string,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let message: MessageType = { status: undefined, text: undefined };
  let isError = false;
  if (value === "") return;
  if (field === "username") {
  } else if (field === "email") {
    let newMessage: MessageType;

    if (!AuthRegExList.email.test(value)) {
      console.log("유효하지 않은 이메일 형식입니다.");
      newMessage = {
        status: "error",
        text: "유효하지 않은 이메일 형식입니다.",
      };

      message = newMessage;
      isError = true;
    } else {
      console.log("유효한 이메일 형식입니다.");
      message = {
        status: "success",
        text: "유효한 이메일 형식입니다.",
      };
    }
  }

  setIsError(isError);
  return message;
};
