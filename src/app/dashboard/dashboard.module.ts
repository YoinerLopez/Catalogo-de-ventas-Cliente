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

@NgModule({
  declarations: [ NavbarComponent, ProductListComponent, ProductDetailsComponent, StoreComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DashboardRoutingModule
  ],
  providers:[ProductService, StoreService]
})
export class DashboardModule { }