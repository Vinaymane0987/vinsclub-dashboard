import { createFeature, createReducer, on } from '@ngrx/store';
import { Product, Response } from '../../../../types';
import { ProductActions } from './actions';

export interface ProductState {
  products: Response<Product[]>;
  error: string | null;
}

export const initialState: ProductState = {
  products: {
    statusCode: 200,
    message: '',
    data: [],
  },
  error: null,
};

export const ProductFeature = createFeature({
  name: 'Product',
  reducer: createReducer(
    initialState,
    on(ProductActions.loadProducts, (state) => ({ ...state, error: null })),
    on(ProductActions.loadProductSuccess, (state, { products }) => ({
      ...state,
      products,
    })),
    on(ProductActions.loadProductFailure, (state, { error }) => ({
      ...state,
      error,
    }))
  ),
});

export const {
  name: ProductFeatureKey,
  reducer: ProductReducer,
  selectError,
  selectProductState,
  selectProducts,
} = ProductFeature;
