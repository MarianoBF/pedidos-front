import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<any[]>(this.apiURL + 'productos')
      .pipe(tap((prods) => console.log('retrieved products', prods)));
  }

  // addProduct(){

  // }

  // updateProduct(){

  // }

  // deleteProduct(){

  // }
}
