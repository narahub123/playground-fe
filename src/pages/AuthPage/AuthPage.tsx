import "./AuthPage.css";
import { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthButton, HorizontalDivider } from "@/components";
import { useDocumentTitle, useFocusTrap } from "@/hooks";
import { RootState } from "@/store/store";
import { setOpenModal } from "@/store/slices/modalSlice";
import { langObj } from "@/data/language/language";
import { google, kakao, naver } from "@/assets";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = useSelector((state: RootState) => state.settings.language);
  const langText = langObj[lang as string].auth;

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

  // 페이지를 열었을 때 포커스가 걸릴 첫 요소 설정하기
  const firstRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!firstRef.current) return;

    firstRef.current.focus();
  }, []);

  return (
    <div className="auth-page">
      <Outlet />

      <div className="auth-page-container">
        <section className="auth-page-item">
          <h2 className="auth-page-item-title">{langText.signupTitle}</h2>
          <div className="auth-page-item-container">
            <AuthButton
              imgUrl={google}
              label={langText.googleSignupLabel}
              ref={firstRef}
            />
            <AuthButton imgUrl={naver} label={langText.naverSignupLabel} />
            <AuthButton imgUrl={kakao} label={langText.kakaoSignupLabel} />

            <HorizontalDivider text={langText.signupDivider} />
            {/* 이메일 회원가입 */}
            <div
              className="auth-page-btn-wrapper"
              onClick={() => {
                dispatch(setOpenModal(true));
                navigate("flow/signup");
              }}
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
