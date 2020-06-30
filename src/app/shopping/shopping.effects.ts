import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ShoppingActions } from './action.types';
import { ShoppingService } from './shopping.service';
import { concatMap, map } from 'rxjs/operators';
import { allProductsLoaded } from './shopping.actions';

@Injectable()
export class ShoppingEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingActions.loadAllProducts),
      concatMap((action) => this.shoppingService.getInitialProducts()),
      map((initialProducts) => {
        return allProductsLoaded({ products: initialProducts })
      })
    )
  );

  constructor(
    private actions$: Actions,
    private shoppingService: ShoppingService
  ) {}
}
