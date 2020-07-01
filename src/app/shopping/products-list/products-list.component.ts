import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Currency } from 'src/app/currency/models/currency';
import { Product } from '../models/product';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { productReceived, productDeleted } from '../shopping.actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  @Input() currencyUpdated: Currency;
  @Input() products: Product[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  checkToggled(product: Product) {
    const updatedProduct: Product = {
      ...product,
      received: !product.received,
    };

    const update: Update<Product> = {
      id: product.id,
      changes: updatedProduct,
    };

    this.store.dispatch(productReceived({ update }));
  }

  deleteItem(product: Product) {
    this.store.dispatch(productDeleted({ id: product.id }));
  }
}
