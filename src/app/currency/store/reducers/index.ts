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
  currencyRates: Currency;
  lastSuccessfulUpdate: Date;
}

const initialCurrencyState: CurrencyState = {
  currencyRates: undefined,
  lastSuccessfulUpdate: undefined,
};

// export const reducers: ActionReducerMap<CurrencyState> = {};

export const metaReducers: MetaReducer<
  CurrencyState
>[] = !environment.production ? [] : [];

export const currencyReducer = createReducer(
  initialCurrencyState,
  on(CurrencyActions.currencyFetched, (state, action) => {
    console.log(state)
    console.log(action)
    const fetchSuccessTimestamp = new Date();
    return {
      currencyRates: action.currency,
      lastSuccessfulUpdate: fetchSuccessTimestamp
    };
  })
);
