import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<Product[]>(this.apiURL + 'productos')
      .pipe(tap((prods) => console.log('retrieved products', prods)));
  }

  addProduct(product: Product) {
    return this.http
      .post<any>(this.apiURL + 'producto/', product)
      .pipe(tap((prods) => console.log('added product', prods)));
  }

  updateProduct(id: number, product: Product) {
    return this.http
      .put<any>(this.apiURL + 'producto/' + id, product)
      .pipe(tap((prods) => console.log('update product', prods)));
  }

  deleteProduct(id: number) {
    return this.http
      .delete<any>(this.apiURL + 'producto/' + id)
      .pipe(tap((prods) => console.log('deleted product', prods, "with id", id)));
  }
}
