import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type InitialStateType = {
  category: string;
};

const initialState: InitialStateType = {
  category: ''
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    clearCategory: (state) => {
      state.category = '';
    }
  }
});

export const { setFilterCategory, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
