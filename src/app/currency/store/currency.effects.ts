import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { CurrencyActions } from './action.types';
import {
  tap,
  map,
  switchMap,
  catchError,
  take,
  startWith,
} from 'rxjs/operators';
import {
  CurrencyRequestParams,
  Currency,
  CurrencyError,
} from '../models/currency';
import { interval, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CurrencyEffects {
  requestsCounter = 1;

  currencyFetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrencyActions.currencyFetchStart),
      map((action) => action.currencyRequestParams),
      switchMap((currencyRequestParams: CurrencyRequestParams) => {
        const initialCurrencyData: Currency = JSON.parse(localStorage.getItem('currency'))
        return interval(currencyRequestParams.fetchInterval).pipe(
          tap(() => this.requestsCounter++),
          startWith(initialCurrencyData),
          take(4),
          switchMap(() =>
            this.http
              .get<Currency>(
                // `https://api.exchangeratesapi.io/latest?symbols=${this.requestsCounter === 3 ? '9999999' : currencyRequestParams.convertionCurrencySymbol}&base=${currencyRequestParams.baseCurrencySymbol}`
                `https://api.exchangeratesapi.io/latest?symbols=${currencyRequestParams.convertionCurrencySymbol}&base=${currencyRequestParams.baseCurrencySymbol}`
              )
              .pipe(
                map((currency) => {
                  localStorage.setItem('currency', JSON.stringify(currency))
                  const successTime = this.requestsCounter === 1 && JSON.parse(localStorage.getItem('successTime'))
                    ? new Date(JSON.parse(localStorage.getItem('successTime')))
                    : new Date();
                  localStorage.setItem('successTime', JSON.stringify(successTime))
                  console.log({currency, successTime})
                  return CurrencyActions.currencyFetchSuccess({ currency, successTime });
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                  return of(
                    CurrencyActions.currencyFetchFail({
                      currencyError: {
                        error: errorResponse.error.error,
                      },
                    })
                  );
                })
              )
          )
        );
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
