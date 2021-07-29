import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  exports: [MatButtonModule, MatGridListModule, MatInputModule, MatToolbarModule,  MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatSnackBarModule, ],
})
export class MaterialUIModule {}
