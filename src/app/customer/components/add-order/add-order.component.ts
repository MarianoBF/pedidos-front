import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleProductUpdate($event:any){
    console.log($event)
  }

}
