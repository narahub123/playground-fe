import { changeLanguage } from "@/store/slices/settingsSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SettingButtonsLayout from "./SettingButtonLayout/SettingButtonsLayout";

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.settings.language);

  // 사이트에 접속한 유저의 언어 설정 알아내기
  useEffect(() => {
    // 선호 언어에서 첫 두문자만 추출
    const lang = navigator.language.slice(0, 2);

    if (language === lang) return;

    dispatch(changeLanguage(lang));
  }, []);

  return (
    <>
      <SettingButtonsLayout />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
