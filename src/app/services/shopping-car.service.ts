import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingI } from '../models/shopping';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCarService {
  shopping: ShoppingI;
  meshopping: ShoppingI[];
  SHOPPING_SERVER: string = 'https://univerch-catalogo-ventas.herokuapp.com/';
  authSubject = new BehaviorSubject(false);
  constructor(private httpClient: HttpClient) {
    this.iniciarServicio();
  }
  getShopping():ShoppingI{
    this.getShoppingLocalStorege();
    return this.shopping;
  }
  addIdUser(id:string):void{
    this.shopping.idclient=id;
    this.actualizar();
  }
  addProduct(id:string,cantidad:number):boolean{
    if(this.verificarProduct(id)){
      return false;
    }
    this.shopping.idproducts.push(id);
    this.shopping.quantities.push(cantidad);
    this.actualizar();
    return true;
  }
  private verificarProduct(id:string):boolean{
    var temp=this.shopping.idproducts.indexOf(id);
    if(temp==-1){
      return false;
    }
    return true;
  }
  setProduct(id:string,cantidad:number):boolean{
    var i = this.shopping.idproducts.indexOf( id );
    
    if ( i !== -1 ) {
      this.shopping.idproducts[i]=id;
      this.shopping.quantities[i]=cantidad;
      this.actualizar();
      return true;
    }
    return false;
  }
  removeProduct(id:string):boolean{
    var i= this.shopping.idproducts.indexOf( id );
    if ( i !== -1 ) {
      this.shopping.idproducts.splice( i, 1 );
      this.shopping.quantities.splice(i,1);
      this.actualizar();
      return true;
    }
    return false;
  }
  private iniciarServicio(){
      this.getShoppingLocalStorege();
  }

  private actualizar(){
    localStorage.setItem('CAR', JSON.stringify(this.shopping));
  }
  private getShoppingLocalStorege(){
    let data =localStorage.getItem('CAR');
    if(data!=null){
      this.shopping = JSON.parse(data);
      if(this.shopping.idclient!=localStorage.getItem('USER_ID')){
        this.removeCar();
      }
      this.shopping.idclient= localStorage.getItem('USER_ID');
      this.actualizar();
    }
    else{
      this.removeCar();
      this.shopping.idclient= localStorage.getItem('USER_ID');
      this.actualizar();
    }
  }
  removeCar(){
    this.shopping = {'idclient': '','idproducts':[],'quantities':[],'resulted':0,'status':'Solicitada'};
    this.actualizar();
  }
  saveShopping():Observable<any>{
    const shopping= this.getShopping();
    const headers = new HttpHeaders({
      'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    return this.httpClient.post<any>(this.SHOPPING_SERVER+'shopping',
    shopping,{headers}).pipe(tap(
      (res: any)=>{
        this.removeCar();
      }
    ));
  }
  getMeShopping(id):Observable<ShoppingI[]>{
    const shopping= this.getShopping();
    const headers = new HttpHeaders({
      'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    return this.httpClient.get<ShoppingI[]>(this.SHOPPING_SERVER+'shopping'+id,{headers});
  }  
}
