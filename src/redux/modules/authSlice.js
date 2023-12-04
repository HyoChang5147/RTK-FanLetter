import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authServerAPI } from "../../axios/api";

export const __loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ id, password }, { rejectWithValue }) => {
    try {
      const data = { id, password };
      const response = await authServerAPI.post("/login?expiresIn=10s", data);
      // /login?expiresIn=10m
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      authServerAPI.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      localStorage.setItem("userData", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const __logoutUser = createAsyncThunk("auth/logoutUser", () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userData");
  delete authServerAPI.defaults.headers.common["Authorization"];
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(__loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(__logoutUser.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export default authSlice.reducer;
