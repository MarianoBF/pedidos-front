import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/common/interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements OnInit {
  @Input() editing = false;
  @Input() product?: Product;

  @Output() done: EventEmitter<boolean>;

  productForm: FormGroup;

  constructor(private productService: ProductsService, private _snackBar: MatSnackBar) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl(''),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0.01),
        Validators.max(300000.0),
      ]),
      image: new FormControl(''),
    });
    this.done = new EventEmitter();
  }

  ngOnInit(): void {
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
    setTimeout(() => this.done.emit(false), 500);
  }

  onSubmit(): void {
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
          .subscribe(_ => {
            this._snackBar.open("Producto actualizado con éxito", "Cerrar", {
              duration: 4000
            }
            );

          })
        setTimeout(() => {
          this.productForm.reset();
          this.done.emit(true), 3000
        });
      } else {
        this.productService
          .addProduct(product)
          .subscribe(_ => {
            this._snackBar.open("Producto agregado con éxito", "Cerrar", {
              duration: 4000
            })

          });
        setTimeout(() => {
          this.productForm.reset();
          this.done.emit(true), 3000
        });
      }
    } catch (error) {
      this._snackBar.open("Hubo un problema al agregar el producto, reintente en unos minutos", "Cerrar", {
        duration: 4000
      })
    }
  }
}