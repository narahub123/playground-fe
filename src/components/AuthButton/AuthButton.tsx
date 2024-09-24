import { useState } from "react";
import "./AuthButton.css";

interface AuthButtonProps {
  imgUrl: string;
  label: string;
  backgroundColor?: string;
  color?: string;
  hoverBackgroundColor?: string;
}

const AuthButton = ({
  imgUrl,
  label,
  backgroundColor, // 배경색 변경
  color, // 글씨색 변경
  hoverBackgroundColor, // hover시 색
}: AuthButtonProps) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <button
      className="auth-button"
      style={{
        backgroundColor: isHover ? hoverBackgroundColor : backgroundColor,
        color,
      }}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      {imgUrl && (
        <img
          src={imgUrl}
          alt="사진"
          className="auth-button-image"
          aria-hidden // 불필요하게 이미지에 대해 읽는 것 방지
        />
      )}
      <p className="auth-button-text">{label}</p>
    </button>
  );
};

export default AuthButton;
