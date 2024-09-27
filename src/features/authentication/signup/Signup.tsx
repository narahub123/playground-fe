import { useEffect, useRef, useState } from "react";
import { ModalLayout } from "@/layouts";
import { AuthButton } from "@/components";
import { useFocusTrap } from "@/hooks";
import UserInfo from "./EmailSignup/UserInfo/UserInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Signup = () => {
  const [step, setStep] = useState(0);
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

  return (
    <ModalLayout
      title="계정을 생성하세요"
      button={
        <AuthButton
          imgUrl={""}
          label={"다음"}
          color="cornflowerblue"
          ref={buttonRef}
        />
      }
    >
      <UserInfo />
    </ModalLayout>
  );
};

export default Signup;
