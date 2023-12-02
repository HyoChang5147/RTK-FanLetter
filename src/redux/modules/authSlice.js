import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isLoggedIn: false,
  userId: null,
  loginSuccessData: null,
};

export const notify = (message) => toast(message);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
      state.loginSuccessData = null;
      localStorage.removeItem("userData");
      notify("로그아웃 성공!"); // Notify on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
