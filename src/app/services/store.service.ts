import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  PRODUCT_SERVER: string = 'https://univerch-catalogo-ventas.herokuapp.com/';
  private token: string;
  
  constructor(private httpClient: HttpClient) { }
  getAllStore(): Observable<Store[]>{
    const headers = new HttpHeaders({
        'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    
    return this.httpClient.get<Store[]>(this.PRODUCT_SERVER+'store/',{headers})
    .pipe(tap(
      (res: [])=>{
        console.log(res);
      }
    ));
  } 
  getOneStore(id): Observable<any> {
    const headers = new HttpHeaders({
      'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    return this.httpClient.get(this.PRODUCT_SERVER+'store/'+id,{headers});
  }
}
