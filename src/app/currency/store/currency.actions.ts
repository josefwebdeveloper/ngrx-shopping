import { createAction, props } from '@ngrx/store';
import { Currency, CurrencyError } from '../models/currency';

export const currencyFetched = createAction(
  '[Currency] Currency Fetched',
  props<{ currency: Currency }>()
);

export const currencyFetchFailed = createAction(
  '[Currency] Currency Fetch Failed',
  props<{ currencyError: CurrencyError }>()
);