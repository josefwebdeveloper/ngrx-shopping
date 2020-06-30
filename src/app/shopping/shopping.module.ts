import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingEffects } from './shopping.effects';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './reducers/shopping.reducers';
import { MaterialModule } from '../material.module';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [ProductsPageComponent, ProductsListComponent, ProductComponent, TestComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ShoppingRoutingModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ShoppingEffects])
  ]
})
export class ShoppingModule { }
