import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './reducers/shopping.reducers';
import * as fromProducts from './reducers/shopping.reducers'
import { state } from '@angular/animations';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  fromProducts.selectAll
)

export const areProductsLoaded = createSelector(
  selectProductsState, 
  state => state.allProductsLoaded
)