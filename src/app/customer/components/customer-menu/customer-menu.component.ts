import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-customer-menu',
  templateUrl: './customer-menu.component.html',
})
export class CustomerMenuComponent implements OnChanges {

  @Input() openMenu = false;
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  ngOnChanges(changes: SimpleChanges): void {
    this.sidenav?.toggle();
  }
}
