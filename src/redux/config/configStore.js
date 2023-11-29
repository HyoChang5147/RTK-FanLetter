import letters from "../modules/letters";
import members from "redux/modules/members";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    letters,
    members,
  },
});

export default store;
