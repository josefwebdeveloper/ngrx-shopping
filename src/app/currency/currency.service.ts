import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from './models/currency';
import { interval, of } from 'rxjs';
import { map, flatMap, switchMap, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  requestInterval = 2000;
  counter = 0;

  constructor(private http: HttpClient) {}

  getCurrencyRates(baseCurrency: string = 'USD', symbols: string[] = ['ILS']) {
    const symbolsParams = symbols.join(',');
    // return interval(this.requestInterval).pipe(
    //   // tap(() => {
    //   //   this.counter++;
    //   //   if (this.counter === 3) {
    //   //     baseCurrency = '999999999999';
    //   //   } else {
    //   //     baseCurrency = 'USD';
    //   //   }
    //   // }),
    //   switchMap(() =>
    //     this.http
    //       .get<Currency>(
    //         `https://api.exchangeratesapi.io/latest?symbols=${symbolsParams}&base=${baseCurrency}`
    //       )
    //       .pipe(catchError((error) => of(error)))
    //   )
    // );

    return this.http.get<Currency>(
      `https://api.exchangeratesapi.io/latest?symbols=${symbolsParams}&base=${baseCurrency}`
    );
  }
}
