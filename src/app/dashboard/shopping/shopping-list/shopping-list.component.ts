import { Component, OnInit } from '@angular/core';
import { ShoppingCarService } from 'src/app/services/shopping-car.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(private carServices: ShoppingCarService) { }

  ngOnInit(): void {
  }

}
