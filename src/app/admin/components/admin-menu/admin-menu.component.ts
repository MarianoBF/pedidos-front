import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
})
export class AdminMenuComponent implements OnChanges {

  @Input() openMenu = false;
  @ViewChild('sidenav') public sidenav!: MatSidenav;


  ngOnChanges(): void {
    if (this.sidenav) {
      this.sidenav?.toggle();
    }
  }

}
