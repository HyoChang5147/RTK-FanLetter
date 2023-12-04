import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jsonServerAPI from "../../axios/api";

export const __fetchLetters = createAsyncThunk(
  "letters/fetchLetters",
  async (fetchLetters, thunkAPI) => {
    try {
      const response = await jsonServerAPI.get("/letters", fetchLetters);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetter = createAsyncThunk(
  "letters/addLetter",
  async (letterData, thunkAPI) => {
    try {
      const response = await jsonServerAPI.post("/letters", letterData);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("error:", error.response.data.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteLetter = createAsyncThunk(
  "letters/deleteLetter",
  async (letterId, thunkAPI) => {
    try {
      await jsonServerAPI.delete(`/letters/${letterId}`);
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
      const response = await jsonServerAPI.patch(`/letters/${letterId}`, {
        content: updatedContent,
      });
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
  errorMessage: "",
};

const lettersSlice = createSlice({
  name: "letters",
  initialState,
  reducers: {
    initialize: () => {
      return { ...initialState };
    },
  },
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
      state.error = true;

      state.errorMessage =
        action.payload.response.data.message || "데이터 호출 오류";
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
      state.error = true;
      state.errorMessage = action.payload.response.data.message || "등록 오류";
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
      state.error = true;
      state.errorMessage = action.payload.response.data.message || "삭제 오류";
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
      state.error = true;
      state.errorMessage = action.payload.response.data.message || "수정 오류";
    },
  },
});

export const { initialize } = lettersSlice.actions;

export default lettersSlice.reducer;
