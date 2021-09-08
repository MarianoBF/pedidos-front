import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  handleProductUpdate($event:any){
    console.log($event)
    if ($event[1]==="add") {
      this.cartService.addToCart($event[0])
    }
  }

}
