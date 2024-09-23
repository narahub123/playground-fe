import { AuthButton, HorizontalDivider } from "@/components";
import "./AuthPage.css";
import { google, kakao, naver } from "@/assets";
import { useDocumentTitle } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { langObj } from "@/data/language/language.data";

const AuthPage = () => {
  const lang = useSelector((state: RootState) => state.settings.language);
  const langText = langObj[lang as string].auth;

  useDocumentTitle(langText.htmlTitle);

  return (
    <div className="auth-page">
      <div className="auth-page-container">
        <section className="auth-page-item">
          <p className="auth-page-item-title">{langText.signupTitle}</p>
          <div className="auth-page-item-container">
            <AuthButton imgUrl={google} label={langText.googleSignupLabel} />
            <AuthButton imgUrl={naver} label={langText.naverSignupLabel} />
            <AuthButton imgUrl={kakao} label={langText.kakaoSignupLabel} />

            <HorizontalDivider text={langText.signupDivider} />
            <AuthButton
              imgUrl={""}
              label={langText.emailSignupLabel}
              backgroundColor="cornflowerblue"
              color="white"
              hoverBackgroundColor="#6394ede6"
            />
          </div>
        </section>
        <section className="auth-page-item">
          <p className="auth-page-item-title">{langText.loginTitle}</p>
          <div className="auth-page-item-container">
            <AuthButton
              imgUrl={""}
              label={langText.loginLabel}
              color="cornflowerblue"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthPage;
