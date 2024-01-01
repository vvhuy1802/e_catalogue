import {createSlice} from '@reduxjs/toolkit';
import {
  addNewCategory,
  getStyleByCategory,
  getStyleByStore,
  updateCategory,
} from '../actions/categoryAction';
import {LoadingState} from '~/types';
import {RootState} from '~/app/store';
import {StyleIdeaResponse} from '~/types/styleIdea';

interface CategoryState {
  dataUpdateCategory: any;
  allStyleByStore: StyleIdeaResponse[];
  allStyleByCategory: StyleIdeaResponse[];
  loading: LoadingState;
}

const initialState = {
  dataUpdateCategory: null,
  loading: 'idle',
  allStyleByStore: [],
  allStyleByCategory: [],
} as CategoryState;

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateCategory.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.dataUpdateCategory = action.payload;
      state.loading = 'fulfilled';
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = 'rejected';
    });

    builder.addCase(addNewCategory.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(addNewCategory.fulfilled, (state, action) => {
      state.dataUpdateCategory = action.payload;
      state.loading = 'fulfilled';
    });
    builder.addCase(addNewCategory.rejected, (state, action) => {
      state.loading = 'rejected';
    });

    builder.addCase(getStyleByStore.pending, (state, action) => {});
    builder.addCase(getStyleByStore.fulfilled, (state, action) => {
      state.allStyleByStore = action.payload.data.data;
    });
    builder.addCase(getStyleByStore.rejected, (state, action) => {});

    builder.addCase(getStyleByCategory.pending, (state, action) => {});
    builder.addCase(getStyleByCategory.fulfilled, (state, action) => {
      state.allStyleByCategory = action.payload.data.data;
    });
    builder.addCase(getStyleByCategory.rejected, (state, action) => {});
  },
});

export default categorySlice.reducer;
export const {} = categorySlice.actions;

export const selectDataUpdateCategory = (state: RootState) =>
  state.category.dataUpdateCategory;
export const selectLoadingUpdateCategory = (state: RootState) =>
  state.category.loading;
export const selectAllStyleByStore = (state: RootState) =>
  state.category.allStyleByStore;
export const selectAllStyleByCategory = (state: RootState) =>
  state.category.allStyleByCategory;
