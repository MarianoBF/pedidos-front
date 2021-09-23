import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/common/interfaces';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {


  displayedColumns: string[] = ['id_producto', 'nombre', 'descripcion', 'precio', 'delete', 'edit'];
  // dataSource: Product[] = [];
  currentStatus: string = "";
  modifyID: number = -1;
  dataSource: any;


  productList: any[] = [];
  loading = true;

  @Output() evtUpdateProduct: EventEmitter<Product>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private productService: ProductsService) {
    this.evtUpdateProduct = new EventEmitter();
    this.getProducts();
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(products=>{
      this.dataSource =  new MatTableDataSource<Product>(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      this.loading = false;})
  }

  deleteProduct(id:number) {
    this.productService.deleteProduct(id).subscribe(
      res => {console.log(res);
      this.getProducts();}
    );
  }

  filter = ($event: any) => {
    this.dataSource.filter = $event.target.value.trim().toLocaleLowerCase();
  }

  updateProduct(product:Product) {
    this.evtUpdateProduct.emit(product);
  }

  // sortData(sort: Sort) {
  //   const data = this.dataSource.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.dataSource = data;
  //     return;
  //   }
  //   this.dataSource = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'nombre': return this.compare(a.nombre, b.nombre, isAsc);
  //       case 'precio': return this.compare(a.precio, b.precio, isAsc);
  //       case 'descripcion': return this.compare(a.descripcion, b.descripcion, isAsc);
  //       case 'id_producto': return this.compare(a.id_producto!, b.id_producto!, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

  // compare(a: number | string, b: number | string, isAsc: boolean) {
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }
}
