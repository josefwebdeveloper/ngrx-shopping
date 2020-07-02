import { Component, OnInit, Input } from '@angular/core';
import { Currency } from 'src/app/currency/models/currency';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from 'src/app/reducers';
import { Product, Shop } from '../../models/product';
import { productReceived, shopUpdated, productDeleted } from '../../store/shopping.actions';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  @Input() currencyUpdated: Currency;
  @Input() products: Product[];
  @Input() shops: Shop[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  checkToggled(product: Product) {
    const isReceived = !product.received;
    const updatedProduct: Product = {
      ...product,
      received: isReceived,
    };
    const originalShop = this.shops.find((shop) => shop.id === product.shop.id);

    const updatedShop: Shop = {
      ...originalShop,

      totalReceivedProducts: !isReceived
        ? originalShop.totalReceivedProducts > 0
          ? originalShop.totalReceivedProducts - 1
          : originalShop.totalReceivedProducts
        : originalShop.totalReceivedProducts + 1,
      totalReceivedValue: {
        USD: isReceived
          ? originalShop.totalReceivedValue.USD + product.price.USD
          : originalShop.totalReceivedValue.USD - product.price.USD,
      },
    };

    const productUpdate: Update<Product> = {
      id: product.id,
      changes: updatedProduct,
    };

    const shopUpdate: Update<Shop> = {
      id: product.shop.id,
      changes: updatedShop,
    };

    this.store.dispatch(productReceived({ update: { ...productUpdate } }));
    this.store.dispatch(shopUpdated({ update: { ...shopUpdate } }));
  }

  deleteItem(product: Product) {
    const originalShop = this.shops.find((shop) => shop.id === product.shop.id);

    const updatedShop: Shop = {
      ...originalShop,
      totalValue: {
        USD: originalShop.totalValue.USD - product.price.USD,
      },
      totalProducts: originalShop.totalProducts - 1,

      totalReceivedProducts: product.received
        ? originalShop.totalReceivedProducts - 1
        : originalShop.totalReceivedProducts,
      totalReceivedValue: {
        USD: product.received
          ? originalShop.totalReceivedValue.USD - product.price.USD
          : originalShop.totalReceivedValue.USD,
      },
    };

    const shopUpdate: Update<Shop> = {
      id: product.shop.id,
      changes: updatedShop,
    };

    this.store.dispatch(productDeleted({ id: product.id }));
    this.store.dispatch(shopUpdated({ update: { ...shopUpdate } }));
  }
}
