import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
  selectedMember: null,
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setSelectedMember: (state, action) => {
      state.selectedMember = action.payload;
    },
  },
});

export const { setSelectedMember } = membersSlice.actions;
export default membersSlice.reducer;
