import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/interfaces';
import { ProductsService } from 'src/app/services/products.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  @Input() editing = false;
  @Input() product?: Product;

  @Output() done: EventEmitter<boolean>;

  productForm: FormGroup;



  constructor(private productService: ProductsService, private router: Router, private _snackBar: MatSnackBar) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl(),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0.01),
        Validators.max(300000.0),
      ]),
      image: new FormControl(),
    });
    this.done = new EventEmitter();
  }

  ngOnInit(): void {
    console.log("product", this.product)
    if (this.product) {
      this.productForm.patchValue({
        name: this.product.nombre,
        description: this.product.descripcion,
        price: this.product.precio,
        image: this.product.imagen,
      });
    }
  }

  onCancel(): void {
    this.productForm.reset();
    setTimeout(()=>this.done.emit(false),500);
  }

  onSubmit(): void {
    console.log(this.productForm.value);
    const product: Product = {
      nombre: this.productForm.value.name,
      descripcion: this.productForm.value.description,
      precio: this.productForm.value.price,
      imagen: this.productForm.value.image
    };
    try {
      if (this.editing) {
        const id = this.product?.id_producto || 0; // TODO : Chequear
        this.productService
          .updateProduct(id, product)
          .subscribe((data) => console.log(data));
          this._snackBar.open("Producto actualizado con éxito", "Cerrar", {
            duration: 4000
          })
      } else {
        this.productService
          .addProduct(product)
          .subscribe((data) => console.log(data));
          this._snackBar.open("Producto agregado con éxito", "Cerrar", {
            duration: 4000
          })
      }
    } catch (error) {
      console.log(error);
      this._snackBar.open("Hubo un problema al agregar el producto, reintente en unos minutos", "Cerrar", {
        duration: 4000
      })
    } finally {
      this.productForm.reset();
      setTimeout(()=>this.done.emit(true),4000);
    }
  }
}