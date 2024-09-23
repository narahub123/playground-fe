import { configureStore } from "@reduxjs/toolkit";
import { settingsReducer } from "./slices";

export const store = configureStore({
  reducer: { settings: settingsReducer },
  // serializableCheck 옵션을 false로 설정하여,
  // 직렬화 불가능한 데이터(예: 함수, class 인스턴스 등)의 상태 저장 검사를 비활성화
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// RootState 타입 정의: store의 상태 트리 전체의 타입을 반환
// 컴포넌트에서 useSelector 훅 등을 사용할 때 유용
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch 타입 정의: Redux의 dispatch 함수 타입을 반환
// 컴포넌트에서 useDispatch 훅 등을 사용할 때 유용
export type AppDispatch = typeof store.dispatch;
