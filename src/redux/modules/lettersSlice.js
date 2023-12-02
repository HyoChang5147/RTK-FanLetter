import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __fetchLetters = createAsyncThunk(
  "letters/fetchLetters",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/letters");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetter = createAsyncThunk(
  "letters/addLetter",
  async (letterData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/letters",
        letterData
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteLetter = createAsyncThunk(
  "letters/deleteLetter",
  async (letterId, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:4000/letters/${letterId}`);
      return thunkAPI.fulfillWithValue(letterId);
    } catch (error) {
      console.log("error:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateLetterContent = createAsyncThunk(
  "letters/updateLetterContent",
  async ({ letterId, updatedContent }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/letters/${letterId}`,
        {
          content: updatedContent,
        }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  letters: [],
  loading: false,
  error: null,
};

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {},
  extraReducers: {
    [__fetchLetters.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [__fetchLetters.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.letters = action.payload;
    },
    [__fetchLetters.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [__addLetter.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [__addLetter.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.letters.push(action.payload);
    },
    [__addLetter.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [__deleteLetter.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [__deleteLetter.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.letters = state.letters.filter(
        (letter) => letter.id !== action.payload
      );
    },
    [__deleteLetter.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [__updateLetterContent.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [__updateLetterContent.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      const updatedLetter = state.letters.find(
        (letter) => letter.id === action.payload.id
      );
      if (updatedLetter) {
        updatedLetter.content = action.payload.content;
      }
    },
    [__updateLetterContent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default lettersSlice.reducer;
