import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { Currency } from '../../models/currency';
import { CurrencyActions } from '../../store/action.types';

export const currencyFeatureKey = 'currency';

export interface CurrencyState {
  currency: Currency;
  successTime: Date;
}

const initialCurrencyState: CurrencyState = {
  currency: undefined,
  successTime: undefined,
};

export const metaReducers: MetaReducer<
  CurrencyState
>[] = !environment.production ? [] : [];

export const currencyReducer = createReducer(
  initialCurrencyState,
  on(CurrencyActions.currencyFetchSuccess, (state, action) => {
    return {
      currency: action.currency,
      successTime: action.successTime
    };
  })
);
