import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPricelens]'
})
export class PricelensDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.zoom('2');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.zoom('1');
  }

  private zoom(zoomlevel: string) {
    this.el.nativeElement.style.zoom = zoomlevel;
  }

}
