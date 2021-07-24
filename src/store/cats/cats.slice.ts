import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../services/http.service';
import { ICat, ICatsQueryParams, ICatsState } from './cats.types';

const initialState: ICatsState = {
  cats: [],
  status: 'idle',
  loadingMore: false
};

const getCatsApi = (params: ICatsQueryParams) => http.get('/images/search', { params });
export const getCats = createAsyncThunk<ICat[], ICatsQueryParams>('cats/getCats', getCatsApi);
export const loadMoreCats = createAsyncThunk<any, ICatsQueryParams>('cats/loadMoreCats', getCatsApi);

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCats.fulfilled, (state, action) => {
        state.cats = action.payload;
        state.status = 'idle';

      })
      .addCase(loadMoreCats.pending, (state) => { state.loadingMore = true; })
      .addCase(loadMoreCats.fulfilled, (state, { payload }) => {
        state.cats = state.cats.concat(payload);
        state.loadingMore = false;
      })
      .addCase(loadMoreCats.rejected, (state) => { state.loadingMore = true; });
  }
});

export default catsSlice.reducer;
