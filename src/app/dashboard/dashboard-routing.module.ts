import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { StoreComponent } from './store/store.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AccountComponent } from './account/account.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingDetailsComponent } from './shopping/shopping-details/shopping-details.component';
import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [
  {path: 'home', component: ProductListComponent, canActivate:[AuthGuard]},
  {path: 'products/:id', component: ProductDetailsComponent, canActivate:[AuthGuard]},
  {path: 'store/:id/products', component: ProductListComponent, canActivate:[AuthGuard]},
  {path: 'store', component: StoreComponent, canActivate:[AuthGuard]},
  {path: 'car-shopping', component: ShoppingCartComponent, canActivate:[AuthGuard]},
  {path: 'account', component: AccountComponent, canActivate:[AuthGuard]},
  {path: 'shopping', component: ShoppingListComponent, canActivate:[AuthGuard]},
  {path: 'shopping/:id', component: ShoppingDetailsComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
