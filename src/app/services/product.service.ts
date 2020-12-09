import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtReponseProduct } from '../models/jwt-reponse-product';
import { tap } from 'rxjs/operators';
import {Observable, BehaviorSubject } from 'rxjs';
import { ProductI } from '../models/product';
import { ShoppingI } from '../models/shopping';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  PRODUCT_SERVER: string = 'https://univerch-catalogo-ventas.herokuapp.com/';
  authSubject = new BehaviorSubject(false);
  private token: string;
  
  constructor(private httpClient: HttpClient) { }
  getProducts(): Observable<ProductI[]>{
    const headers = new HttpHeaders({
        'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    
    return this.httpClient.get<ProductI[]>(this.PRODUCT_SERVER+'products',{headers})
    .pipe(tap(
      (res: ProductI[])=>{
        console.log(res);
      }
    ));
  } 
  getProduct(id): Observable<ProductI> {
    const headers = new HttpHeaders({
      'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    return this.httpClient.get<ProductI>(this.PRODUCT_SERVER+'product/'+id,{headers});
    
  }
  getStore(id): Observable<any> {
    const headers = new HttpHeaders({
      'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    return this.httpClient.get(this.PRODUCT_SERVER+'store/'+id,{headers});
  }
  getProductsStore(id):Observable<ProductI[]>{
    const headers = new HttpHeaders({
      'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    return this.httpClient.get<ProductI[]>(this.PRODUCT_SERVER+'products/'+id,{headers});
  }
  getProductsShopping(id):Observable<ProductI[]>{
    const headers = new HttpHeaders({
      'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    return this.httpClient.get<ProductI[]>(this.PRODUCT_SERVER+'shopping/products/'+id,{headers});
  }
}
