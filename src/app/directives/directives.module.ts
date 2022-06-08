import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricelensDirective } from './pricelens.directive';



@NgModule({
  declarations: [
    PricelensDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PricelensDirective,
  ]
})
export class DirectivesModule { }
