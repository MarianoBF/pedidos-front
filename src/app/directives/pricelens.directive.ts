import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appPricelens]'
})
export class PricelensDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.zoom('2');
    this.weight = 'bold'
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.zoom('1');
    this.weight = 'normal'
  }

  @HostBinding('style.font-weight') weight!: string;

  private zoom(zoomlevel: string) {
    this.el.nativeElement.style.zoom = zoomlevel;
  }

}
