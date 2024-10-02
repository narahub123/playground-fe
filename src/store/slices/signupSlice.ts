import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddressType {
  lat: number | string;
  lng: number | string;
}

export interface BirthType {
  year?: number;
  month?: number;
  date?: number;
}

export interface SignupState {
  ip: string;
  location: AddressType;
  username: string;
  gender: string;
  email: string;
  birth: BirthType;
  password: string;
  password_confirm: string;
}

const initialState: SignupState = {
  ip: "",
  location: {
    lat: "",
    lng: "",
  },
  username: "",
  gender: "",
  email: "",
  birth: {
    year: undefined,
    month: undefined,
    date: undefined,
  },
  password: "",
  password_confirm: "",
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
        value: string | AddressType | BirthType;
      }>
    ) => {
      const { field, value } = action.payload;

      if (field === "location") {
        if (typeof value === "object" && value !== null) {
          const { lat, lng } = value as AddressType;
          state.location.lat = lat;
          state.location.lng = lng;
        }
      } else if (field === "birth") {
        if (typeof value === "object" && value !== null) {
          state.birth = {
            ...state.birth,
            ...(action.payload.value as BirthType),
          };
        }
      } else {
        state[field] = value as string;
      }
    },
  },
});

export default signupSlice.reducer;
export const { reset, updateField } = signupSlice.actions;
