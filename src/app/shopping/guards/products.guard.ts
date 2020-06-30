import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { loadAllProducts } from '../shopping.actions';
import { areProductsLoaded } from '../products.selectors';
import { productsReducer } from '../reducers/shopping.reducers';

@Injectable({
  providedIn: 'root',
})
export class ProductsGuard implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this.store.pipe(
      select(areProductsLoaded),
      tap(productsLoaded => {
        if (!this.loading && !productsLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllProducts());
        }
      }),
      filter(productsLoaded => productsLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
