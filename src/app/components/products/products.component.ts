import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/interfaces';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  editing:boolean = false;

  productToAdd: Product = {nombre: "Agregabdi2", descripcion: "Una descripción", precio: 1000}

  productToUpdate: Product = {nombre: "Actualizando", descripcion: "Una dasdas dasd asd addescripción", precio: 100}

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }

  addProduct() {
    this.productService.addProduct(this.productToAdd).subscribe(data=>console.log(data))
  }

  updateProduct() {
    this.productService.updateProduct(3, this.productToUpdate).subscribe(data=>console.log(data))
  }


}
