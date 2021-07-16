import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productList: any[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe(products=>this.productList = products)
  }

  deleteProduct(id:number) {
    this.productService.deleteProduct(id).subscribe(data=>console.log(data))
    this.getProducts();
  }

}
