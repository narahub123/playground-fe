import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  ip: string;
  address: string;
  username: string;
  gender: string;
  email: string;
  birth: string;
}

const initialState: SignupState = {
  ip: "",
  address: "",
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
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      const { field, value } = action.payload;

      state[field as keyof SignupState] = value;
    },
  },
});

export default signupSlice.reducer;
export const { reset, updateField } = signupSlice.actions;
