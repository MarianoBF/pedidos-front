import { createReducer, on } from '@ngrx/store';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from '../actions/products.actions';
import { Product } from '../common/models/product.model';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: any;
}

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, state => ({ ...state, loading: true })),
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false, error: null })),
  on(loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
