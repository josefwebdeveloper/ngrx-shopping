import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  baseCurrency = 'USD';
  currenciesList = ['ILS'];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getCurrency();
  }

  getCurrency(baseCurrency = this.baseCurrency, symbols = this.currenciesList) {
    this.currencyService
      .getCurrencyRates(baseCurrency, symbols)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
