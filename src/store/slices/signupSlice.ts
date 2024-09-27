import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignupState {
  ip: string;
  address: {
    lat: number | string;
    lng: number | string;
  };
  username: string;
  gender: string;
  email: string;
  birth: string;
}

const initialState: SignupState = {
  ip: "",
  address: {
    lat: "",
    lng: "",
  },
  username: "",
  gender: "",
  email: "",
  birth: "",
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    // 초기화
    reset: () => initialState,

    // 필드 값 추가하기
    updateField: (
      state,
      action: PayloadAction<{
        field: keyof SignupState;
        value: string | { lat: number | string; lng: number | string };
      }>
    ) => {
      const { field, value } = action.payload;

      if (field === "address") {
        if (typeof value === "object" && value !== null) {
          const { lat, lng } = value;
          state.address.lat = lat;
          state.address.lng = lng;
        }
      } else {
        state[field] = value as string;
      }
    },
  },
});

export default signupSlice.reducer;
export const { reset, updateField } = signupSlice.actions;
