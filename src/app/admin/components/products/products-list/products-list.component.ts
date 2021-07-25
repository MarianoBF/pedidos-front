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

  @Output() evtUpdateProduct: EventEmitter<Product>;

  constructor(private productService: ProductsService) {
    this.evtUpdateProduct = new EventEmitter();
   }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe(products=>this.productList = products)
  }

  deleteProduct(id:number) {
    this.productService.deleteProduct(id).subscribe();
    const toDelete = this.productList.findIndex(item=>item.id_producto === id);
    this.productList.splice(toDelete, 1);
  }
  updateProduct(product:Product) {
    this.evtUpdateProduct.emit(product);
  }
}
