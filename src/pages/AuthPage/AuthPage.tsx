import "./AuthPage.css";

const AuthPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-page-container">
        <section className="auth-page-item">
          <p className="auth-page-item-title">지금 가입하세요.</p>
          <div className="auth-page-item-container">
            <button className="auth-page-btn">
              <img src="" alt="사진" className="auth-page-btn-image" />
              <p className="auth-page-btn-text">구글로 가입하기</p>
            </button>
            <button className="auth-page-btn">
              <img src="" alt="사진" className="auth-page-btn-image" />
              <p className="auth-page-btn-text">네이버로 가입하기</p>
            </button>
            <button className="auth-page-btn">
              <img src="" alt="사진" className="auth-page-btn-image" />
              <p className="auth-page-btn-text">카카오로 가입하기</p>
            </button>
            <p className="auth-page-divider">-- 또는 --</p>
            <button className="auth-page-btn">
              <img src="" alt="사진" className="auth-page-btn-image" />
              <p className="auth-page-btn-text">이메일로 가입하기</p>
            </button>
          </div>
        </section>
        <section className="auth-page-item">
          <p className="auth-page-item-title">이미 가입하셨나요?</p>
          <div className="auth-page-item-container">
            <button className="auth-page-btn">
              <img src="" alt="사진" className="auth-page-btn-image" />
              <p className="auth-page-btn-text">로그인</p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthPage;
