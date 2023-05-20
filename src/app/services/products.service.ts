import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../common/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiURL = environment.apiURL;
  private debug = environment.debug;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http
      .get<Product[]>(this.apiURL + 'productos')
      .pipe(tap((prods) => { if (this.debug) console.log('retrieved products', prods) }));
  }

  getProductById(id: number) {
    return this.http
      .get<Product[]>(this.apiURL + 'producto/' + id)
      .pipe(tap((prod) => { if (this.debug) console.log('retrieved single product', prod) }));
  }

  addProduct(product: Product) {
    return this.http
      .post<Product>(this.apiURL + 'producto/', product)
      .pipe(tap((prods) => { if (this.debug) console.log('added product', prods) }));
  }

  updateProduct(id: number, product: Product) {
    return this.http
      .put<Product>(this.apiURL + 'producto/' + id, product)
      .pipe(tap((prods) => { if (this.debug) console.log('updated product', prods) }));
  }

  deleteProduct(id: number) {
    return this.http
      .delete<any>(this.apiURL + 'producto/' + id)
      .pipe(tap((prods) => { if (this.debug) console.log('deleted product', prods, "with id", id) }));
  }
}
