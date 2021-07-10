import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiURL = 'https://pedidos456.herokuapp.com/api/v1/';

  httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'x-access-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJhZG1pbmlzdHJhZG9yIiwibm9tYnJlX3VzdWFyaW8iOiJqcGVyZXozMyIsImlkX3VzdWFyaW8iOjEwNSwiaWF0IjoxNjI1OTU3MzQ1LCJleHAiOjE2MjYwNDM3NDV9.fHcl3VDqYT9K684ZRfzoCX01MS0f3H8xHg6jDPM34Wk',
    }),
  };

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<any[]>(this.apiURL + 'productos', this.httpOptions)
      .pipe(tap((prods) => console.log('retrieved products', prods)));
  }

  // addProduct(){

  // }

  // updateProduct(){

  // }

  // deleteProduct(){

  // }
}
