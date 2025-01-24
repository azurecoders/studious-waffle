import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    userType: "worker" | "contractor" | "";
  };
  loading: boolean;
}

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    email: "",
    userType: "",
  },
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    authFailure: (state) => {
      state.loading = false;
    },
    logOut: (state) => {
      state.user = {
        id: "",
        name: "",
        email: "",
        userType: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { authStart, authSuccess, authFailure, logOut } =
  userSlice.actions;

export default userSlice.reducer;
