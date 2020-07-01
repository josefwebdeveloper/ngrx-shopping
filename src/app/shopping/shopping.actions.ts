import { createAction, props } from '@ngrx/store';
import { Product } from './models/product';
import { Update } from '@ngrx/entity';

export const loadAllProducts = createAction(
  '[Products Resolver] Load All Products'
);

export const allProductsLoaded = createAction(
  '[Load Products Effect] All Products Loaded',
  props<{ products: Product[] }>()
);

export const productReceived = createAction(
  '[Products List] Product Received',
  props<{ update: Update<Product> }>()
);

export const productDeleted = createAction(
  '[Products List] Product Deleted',
  props<{ id: string }>()
);
