import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtReponseI } from '../models/jwt-reponse';
import { tap } from 'rxjs/operators';
import {Observable, BehaviorSubject } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { AccountI } from '../models/account';
@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'https://univerch-catalogo-ventas.herokuapp.com/';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient) { }

  register(user: UserI): Observable<JwtReponseI>{
    user.password= this.cifrarPass(user.password);
    console.log('El usuario es: '+user.password);
    return this.httpClient.post<JwtReponseI>(this.AUTH_SERVER+'register',
    user).pipe(tap(
      (res: JwtReponseI)=>{
        if(res){
          //Guardar token
          this.saveToken(res.data.token,res.data.expiresIn);
          this.saveUser(res.client);
          console.log('register');
        }
      },
      (error)=>{
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
          this.saveUser(res.client);
          console.log('login');
        }
      }
    ));
  }

  loggedIn(): boolean
  {
    console.log(localStorage.getItem('ACCESS_TOKEN'));
    return !!localStorage.getItem('ACCESS_TOKEN');
  }

  logout(): void{
    this.token= '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("USER_NAME");
    localStorage.removeItem("CAR");
  }

  private saveToken(token:string,expiresIn:string):void{
    localStorage.setItem("ACCESS_TOKEN",token);
    localStorage.setItem("EXPIRES_IN",expiresIn);
    this.token = token;
  }
  private saveUser(client):void{
    localStorage.setItem("USER_ID",client._id);
    localStorage.setItem("USER_NAME",client.nickname);
  }
  public getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }
  private cifrarPass(password:string):string{
    return bcrypt.hashSync(password, 10);
  }
  getAccount(id):Observable<AccountI>{
    const headers = new HttpHeaders({
      'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    return this.httpClient.get<AccountI>(this.AUTH_SERVER+'account/'+id,{headers});

  }
  getUser(id):Observable<UserI>{
    const headers = new HttpHeaders({
      'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    return this.httpClient.get<UserI>(this.AUTH_SERVER+'clients/'+id,{headers});
  }
  putPassword(id:string,passlast:string,passnew:string){

    const headers = new HttpHeaders({
      'ACCESS_TOKEN': localStorage.getItem('ACCESS_TOKEN')
    });
    return this.httpClient.put(this.AUTH_SERVER+'clients/'+id+'/password',{'lastpassword':passlast,
    'password':passnew
    },{headers});
  }
}
