import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/common/interfaces';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  @Input() editing = false;
  @Input() product?: Product;

  productForm: FormGroup;

  constructor(private productService: ProductsService) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl(),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0.01),
        Validators.max(300000.0),
      ]),
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue({
        name: this.product.nombre,
        description: this.product.descripcion,
        price: this.product.precio,
      });
    }
  }

  onSubmit(): void {
    console.log(this.productForm.value);
    const product: Product = {
      nombre: this.productForm.value.name,
      descripcion: this.productForm.value.description,
      precio: this.productForm.value.price,
    };
    if (this.editing) {
      const id = this.product?.id_producto || 0; // TODO : Chequear
      this.productService
        .updateProduct(id, product)
        .subscribe((data) => console.log(data));
    } else {
      this.productService
        .addProduct(product)
        .subscribe((data) => console.log(data));
    }
  }
}
