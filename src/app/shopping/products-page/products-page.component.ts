import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../shopping.service';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { selectAllProducts } from '../products.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  allProducts$: Observable<Product[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getInitialProducts();
  }

  getInitialProducts() {
    this.allProducts$ = this.store.pipe(select(selectAllProducts))
  }

}
