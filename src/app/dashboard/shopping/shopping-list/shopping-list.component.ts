import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductI } from 'src/app/models/product';
import { ShoppingI } from 'src/app/models/shopping';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCarService } from 'src/app/services/shopping-car.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shopping: ShoppingI[];
  constructor(private carServices: ShoppingCarService, private productService: ProductService,private router:Router) { }

  ngOnInit(): void {
    this.getShopping();
  }

  getShopping(): void {
    const id = localStorage.getItem('USER_ID');
    this.carServices.getMeShopping(id).subscribe(res => {
      res.forEach(p => {
        console.log('Compra ' + p.idclient);
      })
      console.log(res);
      this.shopping = res;
    }, (error => {
      console.log(error)
    }));
  }
  getDate(date:string):string{
    let data =date.split('T');
    let fecha =data[0];
    let hora = data[1];
    let horafinal = hora.split('.')[0];    
    return 'Fecha: '+fecha+' Hora: '+horafinal;
  }
}
