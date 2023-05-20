import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectProductState = createFeatureSelector<any>('products');

export const selectProducts = createSelector(
  selectProductState,
  (state: any) => state.products
);

export const selectLoading = createSelector(
  selectProductState,
  (state: any) => state.loading
);