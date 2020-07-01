import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShoppingActions } from './action.types';
import { ShoppingService } from './shopping.service';
import { concatMap, map } from 'rxjs/operators';
import { allProductsLoaded, allShopsLoaded, loadAllShops } from './shopping.actions';

@Injectable()
export class ShoppingEffects {
  loadedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingActions.loadAllProducts),
      concatMap((action) => this.shoppingService.getInitialProducts()),
      map((initialProducts) => {
        return allProductsLoaded({ products: initialProducts })
      })
    )
  );

  loadShops$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingActions.allProductsLoaded),
      map(() => {
        return loadAllShops()
      })
    )
  );

  loadedShops$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingActions.loadAllShops),
      concatMap((action) => this.shoppingService.getInitialShops()),
      map((initialShops) => {
        return allShopsLoaded({ shops: initialShops })
      })
    )
  );

  constructor(
    private actions$: Actions,
    private shoppingService: ShoppingService
  ) {}
}
