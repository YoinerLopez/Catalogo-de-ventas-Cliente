import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { StoreComponent } from './store/store.component';
const routes: Routes = [
  {path: 'home', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'store/:id/products', component: ProductListComponent}, 
  {path: 'store', component: StoreComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
