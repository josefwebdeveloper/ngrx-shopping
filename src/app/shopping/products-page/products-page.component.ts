import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { selectAllProducts } from '../shopping.selectors';
import {
  currentShowCurrency,
  currencyUpdated,
} from 'src/app/currency/store/currency.selector';
import { Currency } from 'src/app/currency/models/currency';
import { filter, map, switchMap, first } from 'rxjs/operators';
import { selectCurrentRoute, selectUrl } from 'src/app/router-store';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  allProducts$: Observable<Product[]>;
  receivedProducts$: Observable<Product[]>;
  currencyUpdated$: Observable<Currency>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getInitialProducts();
  }

  getInitialProducts() {
    this.currencyUpdated$ = this.store.pipe(select(currencyUpdated));

    this.store.pipe(select(selectUrl), first()).subscribe((url) => {
      if (url.includes('received')) {
        this.allProducts$ = this.store.pipe(
          select(selectAllProducts),
          map((products) => {
            return products.filter((product) => product.received);
          })
        );
      } else {
        this.allProducts$ = this.store.pipe(
          select(selectAllProducts),
          map((products) => {
            return products.filter((product) => !product.received);
          })
        );
      }
    });
  }
}
