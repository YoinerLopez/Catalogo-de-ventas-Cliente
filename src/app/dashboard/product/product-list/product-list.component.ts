import { Component, OnInit } from '@angular/core';
//import { ProductI } from 'src/app/models/product';
import { ProductService } from '../../../services/product.service';
import { ProductI } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductI[];
  store=null;
  infStore=null;
  constructor(private productService: ProductService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.store= this.route.snapshot.paramMap.get('id');
    this.getProducts();
    if(!(this.store===null)){
      this.getStore(this.store);
    }
  }
  getProducts():void{

    //this.products = 
    console.log('iniciando');
    this.productService.getProducts().subscribe(res=>{
       res.forEach(product => {
        console.log('Imprimiendo'+product.name+' '+ product.price);
       });
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
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
