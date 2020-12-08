import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductService } from '../services/product.service';
import { StoreComponent } from './store/store.component';
import { StoreService } from '../services/store.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCarService } from '../services/shopping-car.service';
import { AccountComponent } from './account/account.component';
import { AuthService } from '../services/auth.service';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingDetailsComponent } from './shopping/shopping-details/shopping-details.component';


@NgModule({
  declarations: [NavbarComponent, ProductListComponent, ProductDetailsComponent, StoreComponent, ShoppingCartComponent, AccountComponent, ShoppingListComponent, ShoppingDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DashboardRoutingModule
  ],
  providers:[ProductService, StoreService,ShoppingCarService,AuthService],
})
export class DashboardModule { }