import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  editing:boolean = false;
  add: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  addProduct() {
    // this.productService.addProduct(this.productToAdd).subscribe(data=>console.log(data))
    this.add = true;
  }

  updateProduct() {
    // this.productService.updateProduct(3, this.productToUpdate).subscribe(data=>console.log(data))
  }


}
