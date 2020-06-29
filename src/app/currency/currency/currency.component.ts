import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { currencyFetched } from '../store/currency.actions';
import { Observable } from 'rxjs';
import { CurrencyState } from '../store/reducers';
import { map, tap } from 'rxjs/operators';
import { currencyUpdated, currencyRatesUpdated } from '../store/currency.selector';
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

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService,
    private store: Store<CurrencyState>
  ) {}

  ngOnInit(): void {
    this.currencyForm = this.fb.group({
      currency: this.fb.control(this.currenciesList[0], [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}$/g),
      ]),
    });
    this.getCurrency();
    this.updateTimestamp$ = this.store.pipe(select(currencyUpdated));
    this.currency$ = this.store.pipe(select(currencyRatesUpdated));
    this.store
      .pipe(select(currencyRatesUpdated))
      .subscribe((r) => console.log(r));
  }

  getCurrency(symbols = this.currenciesList) {
    debugger
    const currency = localStorage.getItem('currency');
    if (currency) {
      this.store.dispatch(currencyFetched({ currency: JSON.parse(currency) }));
    }

    this.currencyService.getCurrencyRates(symbols).subscribe((currency) => {
      // console.log(currency);
    });
  }
}
