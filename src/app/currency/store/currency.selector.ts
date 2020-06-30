import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CurrencyState } from '../store/reducers';

export const selectCurrencyState = createFeatureSelector<CurrencyState>(
  'currency'
);

export const currencyUpdated = createSelector(
  selectCurrencyState,
  (currency) => {
    return currency.currency;
  }
);

export const currencySuccessTimeUpdated = createSelector(
  selectCurrencyState,
  (currency) => {
    return currency.successTime;
  }
);
