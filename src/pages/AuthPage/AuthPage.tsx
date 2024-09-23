import { AuthButton, HorizontalDivider } from "@/components";
import "./AuthPage.css";
import { google, kakao, naver } from "@/assets";
import { useDocumentTitle } from "@/hooks";

const AuthPage = () => {
  useDocumentTitle("안녕하세요 PlayGround입니다.");

  return (
    <div className="auth-page">
      <div className="auth-page-container">
        <section className="auth-page-item">
          <p className="auth-page-item-title">지금 가입하세요.</p>
          <div className="auth-page-item-container">
            <AuthButton imgUrl={google} label="구글로 가입하기" />
            <AuthButton imgUrl={naver} label="네이버로 가입하기" />
            <AuthButton imgUrl={kakao} label="카카오로 가입하기" />

            <HorizontalDivider text="또는" />
            <AuthButton
              imgUrl={""}
              label="이메일로 가입하기"
              backgroundColor="cornflowerblue"
              color="white"
              hoverBackgroundColor="#6394ede6"
            />
          </div>
        </section>
        <section className="auth-page-item">
          <p className="auth-page-item-title">이미 가입하셨나요?</p>
          <div className="auth-page-item-container">
            <AuthButton imgUrl={""} label="로그인" color="cornflowerblue" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthPage;
