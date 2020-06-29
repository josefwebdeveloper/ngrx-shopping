import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { CurrencyActions } from './action.types';
import { tap } from 'rxjs/operators';

@Injectable()
export class CurrencyEffects {
  currencyFetched$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CurrencyActions.currencyFetched),
        tap((action) =>
          localStorage.setItem('currency', JSON.stringify(action.currency))
        )
      ),
    { dispatch: false }
  );
  constructor(private actions$: Actions) {}
}
