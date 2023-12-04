import lettersSlice from "../modules/lettersSlice";
import members from "redux/modules/members";
import authSlice from "redux/modules/authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    lettersSlice,
    members,
    authSlice,
  },
});

export default store;
