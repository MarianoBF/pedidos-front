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

  @Output() evtUpdateProduct: EventEmitter<[Product, string]>;

  constructor(private productService: ProductsService) {
    this.evtUpdateProduct = new EventEmitter();
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(products=>{
      this.productList = products;
      for (let product of this.productList) {
        product.quantity = 1;
      }
      this.loading = false;})
  }

  addProduct(product:Product) {
    this.evtUpdateProduct.emit([product, "add"])
  }

  decrease(product:Product) {
    const pos = this.productList.findIndex(item=> item.id_producto === product.id_producto)
    if (this.productList[pos].quantity > 1) {this.productList[pos].quantity--}
    this.evtUpdateProduct.emit([product, "decrease"])
  }

  increase(product: Product) {
    const pos = this.productList.findIndex(item=> item.id_producto === product.id_producto)
    this.productList[pos].quantity++
    this.evtUpdateProduct.emit([product, "increase"])
  }
}
