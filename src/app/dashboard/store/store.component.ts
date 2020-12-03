import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from 'src/app/models/store';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  allStore: Store[];
  constructor(private storeService: StoreService,private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    //this.store = this.route.snapshot.paramMap.get('id');
    this.getAllStore();
  }
  getAllStore(){
    console.log()
    this.storeService.getAllStore().subscribe(res=>{
      this.allStore=res;
   });;
  }

}
