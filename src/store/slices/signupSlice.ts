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
  address: AddressType;
  username: string;
  gender: string;
  email: string;
  birth: BirthType;
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
  birth: {
    year: undefined,
    month: undefined,
    date: undefined,
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
        value: string | AddressType | BirthType;
      }>
    ) => {
      const { field, value } = action.payload;

      if (field === "address") {
        if (typeof value === "object" && value !== null) {
          const { lat, lng } = value as AddressType;
          state.address.lat = lat;
          state.address.lng = lng;
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
