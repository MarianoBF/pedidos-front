import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  exports: [MatButtonModule, MatGridListModule, MatInputModule, MatToolbarModule, ],
})
export class MaterialUIModule {}
