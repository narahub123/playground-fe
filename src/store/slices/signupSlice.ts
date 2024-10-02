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
export interface AlarmType {
  message: boolean;
  comment: boolean;
  following: boolean;
  newpost: boolean;
}

export interface SignupState {
  ip: string;
  location: AddressType;
  name: string;
  gender: string;
  email: string;
  birth: BirthType;
  password: string;
  password_confirm: string;
  photo: string;
  id: string;
  alarm: AlarmType;
}

const initialState: SignupState = {
  ip: "",
  location: {
    lat: "",
    lng: "",
  },
  name: "",
  gender: "",
  email: "",
  birth: {
    year: undefined,
    month: undefined,
    date: undefined,
  },
  password: "",
  password_confirm: "",
  photo: "",
  id: "",
  alarm: {
    message: false,
    comment: false,
    following: false,
    newpost: false,
  },
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
        value: string | AddressType | BirthType | AlarmType;
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
      } else if (field === "alarm") {
        if (typeof value === "object" && value !== null) {
          state.alarm = {
            ...state.alarm,
            ...(action.payload.value as AlarmType),
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
