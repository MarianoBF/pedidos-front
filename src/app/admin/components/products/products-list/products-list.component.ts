import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Product } from '../../../../common/models/interfaces';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {


  displayedColumns: string[] = ['id_producto', 'nombre', 'descripcion', 'precio', 'delete', 'edit'];
  currentStatus: string = "";
  modifyID: number = -1;
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
