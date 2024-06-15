import { createSlice } from "@reduxjs/toolkit";

const initialState = { produits: [], produit: { value: 1 } };

const produitsSlice = createSlice({
  name: "produits",
  initialState,
  reducers: {
    fetchProduitsInfos: (state, action) => {
      const { produits } = action.payload;
      let newState = { ...state };
      newState.produits = produits;
      return newState;
    },
    updateProduitsInfos: (state, action) => {
      const { produit } = action.payload;
      let newState = { ...state };
      newState.produits = [produit, ...newState.produits];
      return newState;
    },
    deleteProduitsInfos: (state, action) => {
      const { produit } = action.payload;
      let newState = { ...state };
      newState.produits = newState.produits.filter(
        (item) => item.id !== produit.id
      );
      return newState;
    },
    removeProduitsInfos: (state, action) => {
      return initialState;
    },
  },
});

export const { fetchProduitsInfos } = produitsSlice.actions;

export default produitsSlice.reducer;
