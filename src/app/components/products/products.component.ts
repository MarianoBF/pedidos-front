import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/interfaces';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: any[] = [];

  productToAdd: Product = {nombre: "Agregabdi2", descripcion: "Una descripción", precio: 1000}

  productToUpdate: Product = {nombre: "Actualizando", descripcion: "Una dasdas dasd asd addescripción", precio: 100}

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe(products=>this.productList = products)
  }

  addProduct() {
    this.productService.addProduct(this.productToAdd).subscribe(data=>console.log(data))
  }

  updateProduct() {
    this.productService.updateProduct(3, this.productToUpdate).subscribe(data=>console.log(data))
  }

  deleteProduct() {
    this.productService.deleteProduct(8).subscribe(data=>console.log(data))
  }
}
