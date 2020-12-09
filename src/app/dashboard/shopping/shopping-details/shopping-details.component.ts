import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductI } from 'src/app/models/product';
import { ShoppingI } from 'src/app/models/shopping';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCarService } from 'src/app/services/shopping-car.service';

@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  styleUrls: ['./shopping-details.component.css']
})
export class ShoppingDetailsComponent implements OnInit {
  id: string;
  products: ProductI[];
  shopping: ShoppingI;
  constructor(private route: ActivatedRoute, private carServices: ShoppingCarService, private productService: ProductService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this,this.getShopping();
    this.getProducts(this.id);
  }
  getQuantities(sh: ShoppingI): number[] {
    return sh.quantities;
  }
  getProducts(id: string): void {
    console.log('error');
    this.productService.getProductsShopping(id).subscribe(res => {
      this.products = res;
      console.log('Productos');
      console.log(res);
    }, (error => {
      console.log('ocurrio un error ' + error.status);
    }));
  }
  getShopping(): void {
    this.carServices.getShoppingId(this.id).subscribe(res => {
      console.log(res);
      this.shopping = res;
    }, (error => {
      console.log(error);
    }));
  }
  getDate():string{
    if(this.shopping.createdAt !=undefined){
      let date = this.shopping.createdAt;
      let data =date.split('T');
      let fecha =data[0];
      let hora = data[1];
      let horafinal = hora.split('.')[0];    
      return 'Fecha: '+fecha+' Hora: '+horafinal;
    }
  }
}
