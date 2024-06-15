import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: "",
  theme: "green",
  mode: "light",
};

const persistSlice = createSlice({
  name: "persistInfos",
  initialState,
  reducers: {
    updatePersistInfos: (state, action) => {
      const { authToken, theme, mode } = action.payload;
      let newState = { ...state };
      if (typeof authToken !== "undefined") {
        newState.authToken = authToken;
      }
      if (theme) {
        newState.theme = theme;
      }
      if (mode) {
        newState.mode = mode;
      }
      return newState;
    },
  },
});

export const { updatePersistInfos } = persistSlice.actions;
export default persistSlice.reducer;
