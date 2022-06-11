import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../common/models/interfaces';
import { ProductsService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  productIDForm: FormGroup;



  constructor(private productService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) {
    this.productIDForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl(),
      price: new FormControl('', [
        Validators.required,
        Validators.min(0.01),
        Validators.max(300000.0),
      ]),
      image: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.
      pipe(switchMap(({ id_producto }) => this.productService.getProductById(id_producto))).subscribe((product) => {
        this.product = product[0];
        this.productIDForm.patchValue({
          name: this.product.nombre,
          description: this.product.descripcion,
          price: this.product.precio,
          image: this.product.imagen,
        })
      });
  }

  onCancel(): void {
    // this.productForm.reset();
  }

  onSubmit(): void {
    const product: Product = {
      nombre: this.productIDForm.value.name,
      descripcion: this.productIDForm.value.description,
      precio: this.productIDForm.value.price,
      imagen: this.productIDForm.value.image,
    };
    try {
      this.productService
        .addProduct(product)
        .subscribe(_ => {
          this._snackBar.open("Producto agregado con éxito", "Cerrar", {
            duration: 4000
          }
          );
        })
    } catch (error) {
      this._snackBar.open("Hubo un problema al agregar el producto, reintente en unos minutos", "Cerrar", {
        duration: 4000
      })
    } finally {
      this.productIDForm.reset();
    }
  }
}