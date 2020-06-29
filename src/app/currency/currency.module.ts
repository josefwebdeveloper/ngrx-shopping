import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCurrency from './store/reducers';
import { CurrencyComponent } from './currency/currency.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CurrencyEffects } from './store/currency.effects';

@NgModule({
  declarations: [CurrencyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature(
      fromCurrency.currencyFeatureKey,
      fromCurrency.currencyReducer
      // fromCurrency.reducers,
      // { metaReducers: fromCurrency.metaReducers }
    ),
    EffectsModule.forFeature([CurrencyEffects])
  ],
  exports: [CurrencyComponent],
})
export class CurrencyModule {}
