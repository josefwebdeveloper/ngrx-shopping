import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingEffects } from './shopping.effects';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './reducers/products.reducers';
import { MaterialModule } from '../material.module';
import { ConvertCurrencyPipe } from './pipes/convert-currency.pipe';
import { ShopsListComponent } from './shops-list/shops-list.component';
import { shopsReducer } from './reducers/shops.reducers';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsListComponent,
    ProductComponent,
    ConvertCurrencyPipe,
    ShopsListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ShoppingRoutingModule,
    StoreModule.forFeature('products', productsReducer),
    StoreModule.forFeature('shops', shopsReducer),
    EffectsModule.forFeature([ShoppingEffects]),
  ],
  providers: [CurrencyPipe],
})
export class ShoppingModule {}
