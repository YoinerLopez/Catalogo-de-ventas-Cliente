import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account = null;
  nickname:string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.nickname= localStorage.getItem('USER_NAME');
    this.getAccount();
  }

  getAccount():void{
    const id = localStorage.getItem('USER_ID');
    this.authService.getAccount(id).subscribe(
      data => {
        this.account = data;
        console.log(data);
      },
      error => {
        console.log('hola');
        console.log(error.error.message);
      });;
  }
}
