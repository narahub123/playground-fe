import { checkExistingEmail } from "@/apis/signup";
import { CONSTANT } from "@/constants";
import { AuthRegExList } from "@/data";
import { langObj } from "@/data/language/language";
import { MessageType } from "@/types";

export const checkValidation = async (
  field: string,
  value: string,
  lang: string,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let message: MessageType | undefined = undefined;
  let isError = false;
  if (value === "") return;

  switch (field) {
    case "name":
      break;
    case "email":
      if (!AuthRegExList.email.test(value)) {
        message = {
          status: "error",
          text: langObj[lang].message.email_error,
        };

        isError = true;
      } else {
        setLoading(true);
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
          })
          .finally(() => {
            setLoading(false);
          });
      }
      break;
    case "password":
    case "password_confirm":
      if (
        value.length > 30 ||
        value.length < 8 ||
        !AuthRegExList.password.alphabet.test(value) ||
        !AuthRegExList.password.number.test(value) ||
        !AuthRegExList.password.char.test(value)
      ) {
        if (!AuthRegExList.password.alphabet.test(value)) {
          message = {
            status: "error",
            text: "적어도 하나 이상의 영문자가 필요합니다.",
          };

          isError = true;
        }
        if (!AuthRegExList.password.number.test(value)) {
          message = {
            status: "error",
            text: "적어도 하나 이상의 숫자가 필요합니다.",
          };
          isError = true;
        }
        if (!AuthRegExList.password.char.test(value)) {
          message = {
            status: "error",
            text: "적어도 하나 이상의 특수문자가 필요합니다.",
          };
          isError = true;
        }
        if (
          value.length > CONSTANT.PASSWORD_MAX ||
          value.length < CONSTANT.PASSWORD_MIN
        ) {
          message = {
            status: "error",
            text: `${CONSTANT.PASSWORD_MIN}자 이상 ${CONSTANT.PASSWORD_MAX}자 이하만 가능합니다.`,
          };
          isError = true;
        }
      } else {
        message = {
          status: "success",
          text: "사용 가능한 비밀번호입니다.",
        };

        isError = false;
      }

      break;
    case "id":
      if (
        value.length < CONSTANT.MIN_USERID ||
        value.length > CONSTANT.MAX_USERID ||
        !AuthRegExList.userId.letter.test(value) ||
        !AuthRegExList.userId.required.test(value)
      ) {
        if (
          value.length < CONSTANT.MIN_USERID ||
          value.length > CONSTANT.MAX_USERID
        ) {
          message = {
            status: "error",
            text: "아이디는 4자 이상 20자 이하로 작성해주세요",
          };

          isError = true;
          break;
        }

        if (!AuthRegExList.userId.letter.test(value)) {
          message = {
            status: "error",
            text: "아이디는 영어와 숫자 조합만 가능합니다.",
          };
          isError = true;
          break;
        }
        if (!AuthRegExList.userId.required.test(value)) {
          message = {
            status: "error",
            text: "영어와 숫자가 각각 하나 이상 필요합니다.",
          };
          isError = true;
          break;
        }
      } else {
        message = {
          status: "success",
          text: "사용가능한 아이디입니다.",
        };

        isError = false;
      }

      break;
    default:
      console.log("알 수 없는 필드입니다.");
      break;
  }

  setIsError(isError);
  return message;
};
