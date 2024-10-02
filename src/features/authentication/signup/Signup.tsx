import { useEffect, useRef, useState } from "react";
import { ModalLayout } from "@/layouts";
import { AuthButton } from "@/components";
import { useFocusTrap } from "@/hooks";
import UserInfo from "./EmailSignup/UserInfo/UserInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Signup = () => {
  const [step, setStep] = useState("userInfo");
  const [loading, setLoading] = useState(false);
  const { setLastFocusable } = useFocusTrap();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 값 확인 위한 변수 삭제 예정
  const signup = useSelector((state: RootState) => state.signup);

  console.log(signup);

  // 포커스 트랩 설정
  useEffect(() => {
    setLastFocusable(buttonRef.current);

    return () => {
      setLastFocusable(null);
    };
  }, [setLastFocusable]);

  console.log(step);

  return (
    <>
      {step === "userInfo" ? (
        <ModalLayout
          title="계정을 생성하세요"
          button={(isValid) => (
            <AuthButton
              imgUrl={""}
              label={"다음"}
              color="cornflowerblue"
              ref={buttonRef}
              isValid={isValid}
              next="password"
              setStep={setStep}
            />
          )}
        >
          {(setIsValid) => (
            <UserInfo setIsValid={setIsValid} setLoading={setLoading} />
          )}
        </ModalLayout>
      ) : step === "password" ? (
        <ModalLayout
          title="비밀번호를 작성해주세요."
          button={(isValid) => (
            <AuthButton
              imgUrl={""}
              label={"다음"}
              color="cornflowerblue"
              ref={buttonRef}
              isValid={isValid}
              next="password"
              setStep={setStep}
            />
          )}
        >
          {(setIsValid) => (
            <UserInfo setIsValid={setIsValid} setLoading={setLoading} />
          )}
        </ModalLayout>
      ) : undefined}
    </>
  );
};

export default Signup;
