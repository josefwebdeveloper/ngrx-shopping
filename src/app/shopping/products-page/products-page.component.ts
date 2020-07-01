import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { selectAllProducts } from '../products.selectors';
import { currentShowCurrency, currencyUpdated } from 'src/app/currency/store/currency.selector';
import { Currency } from 'src/app/currency/models/currency';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  allProducts$: Observable<Product[]>;
  currencyUpdated$: Observable<Currency>

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getInitialProducts();
  }

  getInitialProducts() {
    this.allProducts$ = this.store.pipe(select(selectAllProducts))
    this.currencyUpdated$ = this.store.pipe(select(currencyUpdated));
  }

}
