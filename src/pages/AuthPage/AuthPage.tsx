import { AuthButton, HorizontalDivider } from "@/components";
import "./AuthPage.css";
import { google, kakao, naver } from "@/assets";
import { useDocumentTitle, useFocusTrap } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { langObj } from "@/data/language/language";
import { AuthModal } from "@/features/authentication/components";
import { useEffect, useRef, useState } from "react";

const AuthPage = () => {
  const lang = useSelector((state: RootState) => state.settings.language);
  const langText = langObj[lang as string].auth;
  const [openModal, setOpenModal] = useState(false);

  useDocumentTitle(langText.htmlTitle);

  // 마지막 포커스 요소 설정
  const { setLastFocusable, isContainerFocusTrap } = useFocusTrap();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isContainerFocusTrap) return;
    setLastFocusable(buttonRef.current);

    return () => {
      setLastFocusable(null);
    };
  }, [setLastFocusable, isContainerFocusTrap]);

  return (
    <div className="auth-page">
      <AuthModal openModal={openModal} setOpenModal={setOpenModal} />

      <div className="auth-page-container">
        <section className="auth-page-item">
          <h2 className="auth-page-item-title">{langText.signupTitle}</h2>
          <div className="auth-page-item-container">
            <AuthButton imgUrl={google} label={langText.googleSignupLabel} />
            <AuthButton imgUrl={naver} label={langText.naverSignupLabel} />
            <AuthButton imgUrl={kakao} label={langText.kakaoSignupLabel} />

            <HorizontalDivider text={langText.signupDivider} />
            {/* 이메일 회원가입 */}
            <div
              className="auth-page-btn-wrapper"
              onClick={() => setOpenModal(true)}
            >
              <AuthButton
                imgUrl={""}
                label={langText.emailSignupLabel}
                backgroundColor="cornflowerblue"
                color="white"
                hoverBackgroundColor="#6394ede6"
              />
            </div>
          </div>
        </section>
        <section className="auth-page-item">
          <h2 className="auth-page-item-title">{langText.loginTitle}</h2>
          <div className="auth-page-item-container">
            <AuthButton
              imgUrl={""}
              label={langText.loginLabel}
              color="cornflowerblue"
              ref={buttonRef}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthPage;
