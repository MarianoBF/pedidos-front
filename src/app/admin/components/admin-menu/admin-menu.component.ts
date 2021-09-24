import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit, OnChanges {

  @Input() openMenu = false;
  @ViewChild('sidenav') public sidenav!: MatSidenav;


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.sidenav) {
      this.sidenav?.toggle();
    }
  }

  ngOnInit(): void {
  }

}
