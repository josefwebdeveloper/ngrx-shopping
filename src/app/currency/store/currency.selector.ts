import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CurrencyState } from '../store/reducers';

export const selectCurrencyState = createFeatureSelector<CurrencyState>(
  'currency'
);

export const currencyUpdated = createSelector(
  selectCurrencyState,
  (currency) => {
    return currency.lastSuccessfulUpdate;
  }
);

export const currencyRatesUpdated = createSelector(
  selectCurrencyState,
  (currency) => {
    return currency.currencyRates;
  }
);
