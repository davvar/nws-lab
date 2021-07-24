import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { http } from '../../services/http.service';
import { ICategoriesState, ICategory } from './categories.types';

const initialState: ICategoriesState = {
  categories: [],
  status: 'idle'
};

export const getCategories = createAsyncThunk<ICategory[]>(
  'categories/getCategories',
  () => http.get('/categories')
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.status = 'idle';
      });
  }
});

export default categoriesSlice.reducer;
