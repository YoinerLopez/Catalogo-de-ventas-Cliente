import { Component, OnInit } from '@angular/core';
//import { ProductI } from 'src/app/models/product';
import { ProductService } from '../../../services/product.service';
import { ProductI } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCarService } from 'src/app/services/shopping-car.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductI[];
  productssearch:ProductI[];
  store=null;
  infStore=null;
  constructor(private productService: ProductService,private shoppingCar: ShoppingCarService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.store= this.route.snapshot.paramMap.get('id');
    this.productssearch=[];
    if(this.store!=null){
      this.getStore(this.store);
      this.getProductStore(this.store);
    }else
      this.getProducts();
  }
  getProducts():void{
    this.productService.getProducts().subscribe(res=>{
       this.products=res;
    });
    
  }
  getPrice(product: ProductI):String {
    return (product.price-((product.discount*product.price)/100)).toFixed(2);
  }
  getStore(id):void{
    this.productService.getStore(id)
      .subscribe(
        data => {
          this.infStore = data;
        },
        error => {
          console.log(error);
        });
  }
  getProductStore(id){
    this.productService.getProductsStore(id).subscribe(res=>{

       this.products=res;
    });
  }
  //product: ProductI
  addProduct(id:HTMLInputElement):void{

    let opc=this.shoppingCar.addProduct(id.value,1);
    if(opc){
      alert("Se agrego con exito");
    }else{
      alert("Ya lo tienes en tu carrito de compras entra para modificar la cantidad");
    }
    
  }
  search(productsearch:HTMLInputElement){
    this.productssearch=[];
    if(productsearch.value!=''){
      this.products.forEach(product => {
        if(this.searchSubString(product.name,productsearch.value)){
          this.productssearch.push(product);
        }
      });
    }
  }
  searchSubString(stringold, stringnew) {
    // Reemplaza cadenaVieja por cadenaNueva en cadenaCompleta
    
       for (var i = 0; i < stringold.length; i++) {
         if(i+stringnew.length>stringold.length){
           return false;
         }else if(stringold.substr(i,stringnew.length)===stringnew)
          return true;  
       }
    }
}
