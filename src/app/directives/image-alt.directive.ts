import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appImageAlt]'
})
export class ImageAltDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appImageAlt(hasImage: any) {
    if (!hasImage) {
      this.viewContainer.clear();
    }
    else if (hasImage === 'null') {
      this.viewContainer.clear();

    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
