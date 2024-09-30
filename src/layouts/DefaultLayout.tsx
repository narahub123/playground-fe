import { changeLanguage } from "@/store/slices/settingsSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingButtonsLayout from "./SettingButtonLayout/SettingButtonsLayout";
import { FocusTrapProvider } from "@/contexts";
import { AuthPage } from "@/pages";
import { updateField } from "@/store/slices/signupSlice";
import { MessageContainer } from "@/features/message";

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

  // ip 주소 알아내기
  useEffect(() => {
    const url = "https://api.ipify.org?format=json";
    const getIp = async () => {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) return;

      const data = await response.json();

      dispatch(updateField({ field: "ip", value: data.ip }));
    };

    getIp();
  }, []);

  // 주소 알아내기: 정확도가 떨어지는데 어떻게 정확히 알아내는지 모르겠음
  useEffect(() => {
    const getLocation = (position: { coords: GeolocationCoordinates }) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      dispatch(updateField({ field: "location", value: { lat, lng } }));
    };

    // 에러 모달이 완성되면 적용할 것
    const handleError = (error: any) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log(
            "이 문장은 사용자가 Geolocation API의 사용 요청을 거부했을 때 나타납니다!"
          );
          break;

        case error.POSITION_UNAVAILABLE:
          console.log(
            "이 문장은 가져온 위치 정보를 사용할 수 없을 때 나타납니다!"
          );
          break;

        case error.TIMEOUT:
          console.log(
            "이 문장은 위치 정보를 가져오기 위한 요청이 허용 시간을 초과했을 때 나타납니다!"
          );
          break;

        case error.UNKNOWN_ERROR:
          console.log("이 문장은 알 수 없는 오류가 발생했을 때 나타납니다!");
          break;
      }
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(getLocation, handleError, options);
  }, []);

  const isLogin = false;
  return (
    // 포커스 트랩 적용
    <FocusTrapProvider>
      {/* 전역 컴포넌트 */}
      <SettingButtonsLayout />
      <MessageContainer />
      {/* 로그인 여부 확인해서 페이지 결정 */}
      {isLogin ? "" : <AuthPage />}
    </FocusTrapProvider>
  );
};

export default DefaultLayout;
