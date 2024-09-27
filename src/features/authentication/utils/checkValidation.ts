import { AuthRegExList } from "@/data";

export const checkValidation = (
  field: string,
  value: string,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (field === "username") {
  }
  if (field === "email") {
    if (!AuthRegExList.email.test(value)) {
      console.log("유효하지 않은 이메일 형식입니다.");
      setIsError(true);

      return false;
    } else {
      console.log("유효한 이메일 형식입니다.");
      setIsError(false);
      return true;
    }
  }
};
