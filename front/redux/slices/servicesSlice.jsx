import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  services: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    fetchServicesInfos: (state, action) => {
      const { services } = action.payload;
      let newState = { ...state };
      newState.services = services;
      return newState;
    },
    updateServicesInfos: (state, action) => {
      const { service } = action.payload;
      let newState = { ...state };
      newState.services = [service, ...newState.services];
      return newState;
    },
    removeServicesInfos: () => {
      return initialState;
    },
  },
});

export const { fetchServicesInfos, updateServicesInfos, removeServicesInfos } =
  servicesSlice.actions;

export default servicesSlice.reducer;
