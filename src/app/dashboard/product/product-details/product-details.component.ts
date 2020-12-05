import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCarService } from 'src/app/services/shopping-car.service';
import { ProductI } from '../../../models/product';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product = null;
  store =null;
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,private shoppingCar: ShoppingCarService) { }

  ngOnInit(): void {
    this.message = '';
    this.getProduct(this.route.snapshot.paramMap.get('id'));
  }
  getPrice(product: ProductI):String {
    return (product.price-((product.discount*product.price)/100)).toFixed(2);
  }
  

  getProduct(id): void {
    this.productService.getProduct(id)
      .subscribe(
        data => {
          this.product = data;
          console.log(data);
          this.getStore(data.idstore);
        },
        error => {
          console.log(error);
        });
  }
  
  getStore(id):void{
    this.productService.getStore(id)
      .subscribe(
        data => {
          this.store = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  addProduct(id:HTMLInputElement):void{

    let opc=this.shoppingCar.addProduct(id.value,1);
    if(opc){
      console.log(id.value);
      alert("Se agrego con exito");
    }else{
      alert("Ya lo tienes en tu carrito de compras entra para modificar la cantidad");
    }
  }
}
