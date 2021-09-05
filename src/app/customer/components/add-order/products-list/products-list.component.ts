import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/common/interfaces';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productList: any[] = [];
  loading = true;

  // @Output() evtUpdateProduct: EventEmitter<Product>;

  constructor(private productService: ProductsService) {
    // this.evtUpdateProduct = new EventEmitter();
   }

  ngOnInit(): void {
  }

  getProducts() {
    this.productService.getProducts().subscribe(products=>{
      this.productList = products;
      this.loading = false;})
  }

  addProduct(product:Product) {
    console.log("Add this to the cart");
  }
}
