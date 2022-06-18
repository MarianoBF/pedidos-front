import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricelensDirective } from './pricelens.directive';
import { ImageAltDirective } from './image-alt.directive';



@NgModule({
  declarations: [
    PricelensDirective,
    ImageAltDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PricelensDirective,
    ImageAltDirective,
  ]
})
export class DirectivesModule { }
