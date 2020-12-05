import { Component, OnInit } from '@angular/core';
import { ProductI } from 'src/app/models/product';
import { ShoppingI} from 'src/app/models/shopping';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCarService } from 'src/app/services/shopping-car.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  car:ShoppingI;
  products: ProductI[];
  productos=null;
  cantidades=null;
  closeResult = null;

  constructor( private carServices: ShoppingCarService, private productService: ProductService) { }

  ngOnInit(): void {
    this.products =[];
    this.ShoopingCar();
  }

  private ShoopingCar(){
    this.car=this.carServices.getShopping();
    console.log(this.car);
    this.productos=  this.car.idproducts;
    this.cantidades= this.car.quantities;
    this.products=[];
    for (let index = 0; index < this.productos.length; index++) {
      const element = this.productos[index];
      this.productService.getProduct(element).subscribe(
        data => {
          
          this.products.push(data);
          console.log(data);
        },
        error => {
          console.log(error);
        });
      
    }
    if(this.productos.length>0){
      this.closeResult=' ';
    }else{
      this.closeResult=null;
    }
    console.log(this.productos);
  }
  edit(id:HTMLInputElement,cant:HTMLInputElement,pass:HTMLInputElement){
    if(Number(cant.value)<1){
      alert('verifica el valor que sea mayor a uno y vuelve a intentar');
      this.ShoopingCar();
    }else{
      
      if(Number(pass.value)==Number(cant.value)){
        alert('No se han realiazado cambios');
      }else{
        alert('Hemos agregado correctamente');
        this.carServices.setProduct(id.value,Number(cant.value));
        this.ShoopingCar();
      }
    }
    console.log(id.value);
  }
  deleteProduct(id:HTMLInputElement){
    this.carServices.removeProduct(id.value);
    this.ShoopingCar();
    console.log('eliminar '+id.value);
  }
  cancelShopping(){
    this.carServices.removeCar();
    this.ShoopingCar();
    console.log('cancelar compra');
  }
  saveShopping(){
    if(localStorage.getItem('USER_ID')!='undefined'){
      console.log('el usuario es');
      console.log(localStorage.getItem('USER_ID'));
      this.carServices.saveShopping().subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
          
        });
   }else{
     console.log('Usuario no identificado');
   }
  }
}
