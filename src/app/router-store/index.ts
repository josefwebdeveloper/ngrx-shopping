import * as fromRouter from '@ngrx/router-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
>('router');

export const {
  selectCurrentRoute, // select the current route
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectSelectedCarId = selectQueryParam('carId');


// export const selectCar = createSelector(
//   selectCarEntities,
//   selectSelectedCarId,
//   (cars, carId) => cars[carId]
// );

// export const selectCarsByColor = createSelector(
//   selectCarEntities,
//   selectQueryParams,
//   (cars, params) => cars.filter((c) => c.color === params['color'])
// );
