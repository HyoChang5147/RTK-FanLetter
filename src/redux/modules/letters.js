import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  letters: [],
  selectedMember: null,
};

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      state.letters.push(action.payload);
    },
    removeLetter: (state, action) => {
      state.letters = state.letters.filter(
        (letter) => letter.id !== action.payload
      );
    },
    updateLetterContent: (state, action) => {
      const { id, newContent } = action.payload;
      const letterToUpdate = state.letters.find((letter) => letter.id === id);
      if (letterToUpdate) {
        letterToUpdate.contents = newContent;
      }
    },
  },
});

export const { addLetter, removeLetter, updateLetterContent } =
  lettersSlice.actions;
export default lettersSlice.reducer;
