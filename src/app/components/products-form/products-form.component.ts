import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  @Input() editing = false;

  productForm: FormGroup;

  constructor() {
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

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.productForm.value);
  }
}
