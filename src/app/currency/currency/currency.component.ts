import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  currencyFetchSuccess,
  currencyFetchStart,
} from '../store/currency.actions';
import { Observable } from 'rxjs';
import { CurrencyState } from '../store/reducers';
import {
  currencyUpdated,
  currencySuccessTimeUpdated,
} from '../store/currency.selector';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Currency } from '../models/currency';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  currenciesList = ['ILS', 'USD'];

  updateTimestamp$: Observable<Date>;
  currency$: Observable<Currency>;

  currencyForm: FormGroup;
  intervalsList = [
    3000, // 3s
    10000, // 10s
    30000, // 30s
    60000, // 1m
    120000, // 2m
    300000, // 5m
    600000, // 10m
    1800000, // 30m
  ];

  constructor(private fb: FormBuilder, private store: Store<CurrencyState>) {}

  ngOnInit(): void {
    this.currencyForm = this.fb.group({
      currency: this.fb.control(this.currenciesList[0], [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}$/g),
      ]),
      updateInterval: this.fb.control(this.intervalsList[0], [])// add validator function to check values
    });
    this.getCurrency();
    this.updateTimestamp$ = this.store.pipe(select(currencySuccessTimeUpdated));
    this.currency$ = this.store.pipe(select(currencyUpdated));
  }

  getCurrency(symbols = this.currenciesList) {
    this.store.dispatch(
      currencyFetchStart({
        currencyRequestParams: {
          baseCurrencySymbol: 'USD',
          convertionCurrencySymbol: 'ILS',
          fetchInterval: 2000,
        },
      })
    );
  }
}
