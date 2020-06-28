import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCurrency from './reducers';
import { CurrencyComponent } from './currency/currency.component';

@NgModule({
  declarations: [CurrencyComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCurrency.currencyFeatureKey,
      fromCurrency.reducers,
      { metaReducers: fromCurrency.metaReducers }
    ),
  ],
  exports: [
    CurrencyComponent
  ]
})
export class CurrencyModule {}
