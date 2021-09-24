import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-customer-menu',
  templateUrl: './customer-menu.component.html',
  styleUrls: ['./customer-menu.component.css']
})
export class CustomerMenuComponent implements OnInit, OnChanges {


  @Input() openMenu = false;
  @ViewChild('sidenav') public sidenav!: MatSidenav;


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.sidenav?.toggle();
  }

  ngOnInit(): void {
  }

}
