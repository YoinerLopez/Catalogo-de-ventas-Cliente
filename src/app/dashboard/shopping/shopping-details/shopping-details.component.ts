import { Component, OnInit } from '@angular/core';
import { ShoppingCarService } from 'src/app/services/shopping-car.service';

@Component({
  selector: 'app-shopping-details',
  templateUrl: './shopping-details.component.html',
  styleUrls: ['./shopping-details.component.css']
})
export class ShoppingDetailsComponent implements OnInit {

  constructor(private carServices: ShoppingCarService) { }


  ngOnInit(): void {
  }

}
