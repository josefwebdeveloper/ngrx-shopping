import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product, Shop } from '../../models/product';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllShops } from '../../store/shopping.selectors';
import { productAdded, shopUpdated } from '../../store/shopping.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  allShops$: Subscription;
  allShops: Shop[];

  addProductForm = new FormGroup({
    name: new FormControl('asd', [
      Validators.required,
      Validators.minLength(1),
    ]),
    shopId: new FormControl('s2', [Validators.pattern('s[0-9]+')]),
    priceUSD: new FormControl(9.99, [
      Validators.required,
      Validators.min(0.01),
    ]),
    deliveryEstDate: new FormControl('', [Validators.required]),
  });

  submitted = false;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.allShops$ = this.store
      .pipe(select(selectAllShops))
      .subscribe((allShops) => (this.allShops = allShops));
  }

  onSubmit() {
    const newProduct: Product = {
      id: 'p' + Date.now(),
      name: this.addProductForm.value.name,
      price: {
        USD: this.addProductForm.value.priceUSD,
      },
      received: false,
      deliveryEstDate: new Date(
        this.addProductForm.value.deliveryEstDate
      ).toISOString(),
      shop: this.allShops.find(
        (shop) => shop.id === this.addProductForm.value.shopId
      ),
    };
    const updatedShop = {
      ...newProduct.shop,
      totalValue: {
        USD: newProduct.shop.totalValue.USD + newProduct.price.USD,
      },
      totalProducts: newProduct.shop.totalProducts + 1,

      totalReceivedProducts: newProduct.received
        ? newProduct.shop.totalReceivedProducts + 1
        : newProduct.shop.totalReceivedProducts,
      totalReceivedValue: {
        USD: newProduct.received
          ? newProduct.shop.totalReceivedValue.USD + newProduct.price.USD
          : newProduct.shop.totalReceivedValue.USD,
      },
    };
    this.store.dispatch(productAdded({ product: { ...newProduct } }));
    this.store.dispatch(
      shopUpdated({
        update: { id: updatedShop.id, changes: { ...updatedShop } },
      })
    );

    this.submitted = true;
    this.addProductForm.disable();
  }

  onResetForm() {
    this.addProductForm.enable();
    this.submitted = false;
  }

  ngOnDestroy() {
    this.allShops$.unsubscribe();
  }
}
