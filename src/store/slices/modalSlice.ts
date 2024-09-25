import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  openModal: boolean;
}

const initialState: ModalState = {
  openModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // openAuthModal 상태 변경
    setOpenModal: (state, action) => {
      state.openModal = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { setOpenModal } = modalSlice.actions;
