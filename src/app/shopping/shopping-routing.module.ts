import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsGuard } from './guards/products.guard';

const routes: Routes = [
  { 
    path: '', 
    component: ProductsPageComponent ,
    resolve: {
      products: ProductsGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
