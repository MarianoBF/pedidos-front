import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/common/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {


  displayedColumns: string[] = ['id_producto', 'nombre', 'descripcion', 'precio', 'delete', 'edit'];
  currentStatus = "";
  modifyID = -1;
  dataSource: any;


  productList: any[] = [];
  loading = true;

  @Output() evtUpdateProduct: EventEmitter<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductsService, private _snackBar: MatSnackBar) {
    this.evtUpdateProduct = new EventEmitter();
    this.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.dataSource = new MatTableDataSource<Product>(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      _ => {
        this._snackBar.open("Producto borrado con éxito", "Cerrar", {
          duration: 4000
        }
        );
        this.getProducts();
      }
    );
  }

  filter = ($event: any) => {
    this.dataSource.filter = $event.target.value.trim().toLocaleLowerCase();
  }

  updateProduct(product: Product) {
    this.evtUpdateProduct.emit(product);
  }
}
