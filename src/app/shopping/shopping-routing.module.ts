import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsGuard } from './guards/products.guard';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProductsPageComponent ,
    resolve: {
      products: ProductsGuard
    }
  },
  { 
    path: 'test', 
    component: TestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
