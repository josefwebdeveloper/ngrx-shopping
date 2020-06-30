import { createAction, props } from '@ngrx/store';
import { Product } from './models/product';

export const loadAllProducts = createAction(
  '[Products Resolver] Load All Products'
);

export const allProductsLoaded = createAction(
  '[Load Products Effect] All Products Loaded',
  props<{ products: Product[] }>()
);
