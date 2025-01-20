import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
  };
  loading: boolean;
}

const initialState: UserState = {
  user: {
    id: "",
    name: "",
    email: "",
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
    logOut: (state) => {
      state.user = {
        id: "",
        name: "",
        email: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { authStart, authSuccess, logOut } = userSlice.actions;

export default userSlice.reducer;
