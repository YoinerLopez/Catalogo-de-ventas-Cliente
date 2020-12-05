import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account = null;
  client =null;
  cambiar=null;
  nickname:string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.nickname= localStorage.getItem('USER_NAME');
    this.getAccount();
    this.getUser();
  }

  getAccount():void{
    const id = localStorage.getItem('USER_ID');
    this.authService.getAccount(id).subscribe(
      data => {
        this.account = data;
        console.log(data);
      },
      error => {
      });
  }
  getUser():void{
    const id = localStorage.getItem('USER_ID');
    this.authService.getUser(id).subscribe(
      data => {
        this.client = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  putPassword(newpass:HTMLInputElement,pass:HTMLInputElement):void{
    const id = localStorage.getItem('USER_ID');
    this.authService.putPassword(id,pass.value,newpass.value).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error.message);
      });
    this.cambiar=null;
  } 
  abrir(){
    this.cambiar=1;
  } 
  cerrar(){
    this.cambiar=null;
  } 
}
