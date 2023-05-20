import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from 'src/app/actions/products.actions';
import { Product } from 'src/app/common/models/product.model';
import { selectLoading, selectProducts } from 'src/app/selectors/products.selector';
import { CartService } from '../../../cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  productList: any[] = [];

  @Input() ordering: boolean = false;

  @Output() evtUpdateProduct: EventEmitter<[Product, string]>;
  loading$: any;

  constructor(private cartService: CartService, private store: Store<any>) {
    this.evtUpdateProduct = new EventEmitter();
   }

  ngOnInit(): void {
    this.getProducts();
    this.loading$ = this.store.select(selectLoading);
  }

  getProducts() {
    this.store.dispatch(loadProducts());
    this.store.select(selectProducts).subscribe( products => {
      this.productList = products
      for (let product of this.productList) {
        product.quantity = 1;
      }
  });
  }

  addProduct(product:Product) {
    this.evtUpdateProduct.emit([product, "add"])
  }

  inCart(product: Product) {
    return this.cartService.inCart(product)
  }

  decrease(product:Product) {
    const pos = this.productList.findIndex(item=> item.id_producto === product.id_producto)
    if (this.productList[pos].quantity > 1) {this.productList[pos].quantity--}
    this.evtUpdateProduct.emit([product, "decrease"])
  }

  increase(product: Product) {
    const pos = this.productList.findIndex(item=> item.id_producto === product.id_producto)
    this.productList[pos].quantity++
    this.evtUpdateProduct.emit([product, "increase"])
  }
}
