import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtReponseI } from '../models/jwt-reponse';
import { tap } from 'rxjs/operators';
import {Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  AUTH_SERVER: string = 'https://univerch-catalogo-ventas.herokuapp.com/';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) { }

  register(user: UserI): Observable<JwtReponseI>{
    return this.httpClient.post<JwtReponseI>(this.AUTH_SERVER+'register',
    user).pipe(tap(
      (res: JwtReponseI)=>{
        if(res){
          //Guardar token
          this.saveToken(res.data.token,res.data.expiresIn);
        }
      }
    ));
  }
  login(user: UserI): Observable<JwtReponseI>{
    return this.httpClient.post<JwtReponseI>(this.AUTH_SERVER+'login',
    user).pipe(tap(
      (res: JwtReponseI)=>{
        if(res){
          //Guardar token
          this.saveToken(res.data.token,res.data.expiresIn);
          this.saveUser(res.client.id,res.client.nickname);
          console.log('login');
        }
      }
    ));
  }
  logout(): void{
    this.token= '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("USER_NAME");
  }

  private saveToken(token:string,expiresIn:string):void{
    localStorage.setItem("ACCESS_TOKEN",token);
    localStorage.setItem("EXPIRES_IN",expiresIn);
    this.token = token;
  }
  private saveUser(id:string,name:string):void{
    localStorage.setItem("USER_ID",id);
    localStorage.setItem("USER_NAME",name);
  }
  public getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

}
