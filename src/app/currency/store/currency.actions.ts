import { createAction, props } from '@ngrx/store';
import {
  Currency,
  CurrencyError,
  CurrencyRequestParams,
} from '../models/currency';

export const currencyFetchStart = createAction(
  '[Currency] Currency Fetch Start',
  props<{ currencyRequestParams: CurrencyRequestParams }>()
);

export const currencyFetchSuccess = createAction(
  '[Currency] Currency Fetch Success',
  props<{ currency: Currency; successTime: Date }>()
);

export const currencyFetchFail = createAction(
  '[Currency] Currency Fetch Fail',
  props<{ currencyError: CurrencyError }>()
);

export const currencyFetchFailClear = createAction(
  '[Currency] Currency Fetch Error Clear'
);
