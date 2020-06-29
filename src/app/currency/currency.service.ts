import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Currency } from './models/currency';
import { interval, of } from 'rxjs';
import {
  map,
  flatMap,
  switchMap,
  tap,
  catchError,
  take,
  filter,
  startWith,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CurrencyState } from './store/reducers';
import { currencyFetched, currencyFetchFailed } from './store/currency.actions';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseCurrency = 'USD';
  requestInterval = 2000;
  counter = 0;

  constructor(private http: HttpClient, private store: Store<CurrencyState>) {
  }

  getCurrencyRates(symbols: string[] = ['ILS']) {
    const symbolsParams = symbols.join(',');
    return interval(this.requestInterval).pipe(
      tap(() => {
        this.counter++;
        if (this.counter === 3) {
          this.baseCurrency = '999999999999';
        } else {
          this.baseCurrency = 'USD';
        }
      }),
      take(4),
      switchMap(() =>
        this.http
          .get<Currency>(
            `https://api.exchangeratesapi.io/latest?symbols=${symbolsParams}&base=${this.baseCurrency}`
          )
          .pipe(
            catchError((error) => {
              console.log(error);
              this.store.dispatch(
                currencyFetchFailed({ currencyError: error.error })
              );
              return of(error);
            }),
            filter((res) => !(res instanceof HttpErrorResponse)),
            map((currency) => {
              console.log(currency);
              this.store.dispatch(currencyFetched({ currency }));
            })
          )
      )
    );

    // return this.http.get<Currency>(
    //   `https://api.exchangeratesapi.io/latest?symbols=${symbolsParams}&base=${baseCurrency}`
    // );
  }
}
