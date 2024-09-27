import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageType } from "@/types";
import { CONSTANT } from "@/constants";

interface MessageState {
  messages: MessageType[];
}

const initialState: MessageState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    reset: () => initialState,
    addMessage: (state, action: PayloadAction<MessageType>) => {
      const { status, text } = action.payload;
      let newMessage: MessageType;

      if (!status && !text) {
        newMessage = {
          status: "error",
          text: "상태 정보와 내용이 부족합니다.",
        };
      } else if (!status) {
        // 상태 정보가 부족해서 에러 발생 메시지
        newMessage = {
          status: "error",
          text: "상태 정보가 부족합니다.",
        };
      } else if (!text) {
        // 내용이 없어서 에러 발생 메시지
        newMessage = {
          status: "error",
          text: "내용이 부족합니다.",
        };
      } else {
        // 추가될 새로운 메시지
        newMessage = { status, text };
      }

      // 현재 메시지 개수가 메시지 최대 개수와 일치한 경우
      if (state.messages.length >= CONSTANT.MAX_MESSAGES) {
        // 가장 나중 메시지 삭제
        state.messages.pop();
      }

      // 새 배열로 덮어씌움
      state.messages = [newMessage, ...state.messages];
    },
  },
});

export default messageSlice.reducer;
export const { reset, addMessage } = messageSlice.actions;
