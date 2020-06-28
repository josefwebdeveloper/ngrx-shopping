import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCurrency from './reducers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCurrency.currencyFeatureKey,
      fromCurrency.reducers,
      { metaReducers: fromCurrency.metaReducers }
    ),
  ],
})
export class CurrencyModule {}
