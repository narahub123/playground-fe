import styles from "./ProfileImage.module.css";
import { useEffect, useRef, useState } from "react";
import { UserInfoProps } from "../UserInfo/UserInfo";
import { MdAddAPhoto } from "react-icons/md";
import { defaultImage } from "@/assets";
import { useImagePreview } from "@/hooks";
import { useDispatch, useSelector } from "react-redux";
import { SignupState, updateField } from "@/store/slices/signupSlice";
import { RootState } from "@/store/store";
import { langObj } from "@/data/language/language";

const ProfileImage = ({ setIsValid, setLoading }: UserInfoProps) => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.settings.language);
  const inputRef = useRef<HTMLInputElement>(null);
  const { handleImageChange, imgUrl, setImgUrl } = useImagePreview("photo");

  //프로필 사진은 선택 사항이므로 항상 유효성 만족
  useEffect(() => {
    setIsValid(true);
  }, []);

  const handleDefaultImage = () => {
    setImgUrl(null);
    dispatch(updateField({ field: "photo" as keyof SignupState, value: "" }));
  };

  const image = imgUrl ? imgUrl : defaultImage;

  return (
    <div className={styles.container}>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={(e) => handleImageChange(e)}
      />
      <div
        className={styles.wrapper}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            inputRef.current?.click();
          }
        }}
        tabIndex={0}
        aria-label={langObj[lang].profileImage.label}
      >
        <div aria-live="polite">
          <img
            src={image as string}
            alt={langObj[lang].profileImage.alt}
            className={styles.photo}
          />
        </div>
        <MdAddAPhoto className={`icon ${styles.icon}`} />
      </div>
      <button
        role="button"
        className={styles.btn}
        onClick={() => handleDefaultImage()}
      >
        {langObj[lang].profileImage.btn}
      </button>
    </div>
  );
};

export default ProfileImage;
