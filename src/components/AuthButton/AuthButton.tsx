import React, { forwardRef, useState } from "react";
import "./AuthButton.css";

interface AuthButtonProps {
  imgUrl: string;
  label: string;
  isValid?: boolean;
  backgroundColor?: string;
  color?: string;
  hoverBackgroundColor?: string;
}

const AuthButton = forwardRef<HTMLElement, AuthButtonProps>(
  (
    { imgUrl, label, isValid, backgroundColor, color, hoverBackgroundColor },
    ref
  ) => {
    const [isHover, setIsHover] = useState(false);

    const validCond =
      typeof isValid === "boolean" && isValid === true
        ? "valid"
        : typeof isValid === "boolean" && isValid === false
        ? "invalid"
        : undefined;

    const disableCond =
      typeof isValid === "boolean" && isValid === true
        ? false
        : typeof isValid === "boolean" && isValid === false
        ? true
        : undefined;

    const handleMouseEnter = () => {
      setIsHover(true);
    };
    const handleMouseLeave = () => {
      setIsHover(false);
    };

    return (
      <button
        className={`auth-button ${validCond}`}
        style={{
          backgroundColor: isHover ? hoverBackgroundColor : backgroundColor,
          color,
        }}
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
        ref={ref as React.RefObject<HTMLButtonElement>}
        disabled={disableCond}
      >
        {imgUrl && (
          <img
            src={imgUrl}
            alt="사진"
            className="auth-button-image"
            aria-hidden // 불필요하게 이미지에 대해 읽는 것 방지
          />
        )}
        <p className={`auth-button-text ${validCond}`}>{label}</p>
      </button>
    );
  }
);

export default AuthButton;
