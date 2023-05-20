import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductsService } from '../services/products.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from '../actions/products.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map(products => loadProductsSuccess({ products })),
          catchError(error => of(loadProductsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productService: ProductsService) {}
}
