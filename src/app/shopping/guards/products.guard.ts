import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable, combineLatest, forkJoin } from 'rxjs';
import { Product } from '../models/product';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { tap, first, finalize, filter, take, skipUntil } from 'rxjs/operators';
import { loadAllProducts, loadAllShops } from '../shopping.actions';
import { areProductsLoaded, areShopsLoaded } from '../shopping.selectors';
import { productsReducer } from '../reducers/products.reducers';

@Injectable({
  providedIn: 'root',
})
export class ProductsGuard implements Resolve<any> {
  productsLoading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this.store.pipe(
      select(areProductsLoaded),
      tap((productsLoaded) => {
        if (!this.productsLoading && !productsLoaded) {
          this.productsLoading = true;
          this.store.dispatch(loadAllProducts());
        }
      }),
      filter((productsLoaded) => productsLoaded),
      first(),
      finalize(() => (this.productsLoading = false))
    );
  }
}
