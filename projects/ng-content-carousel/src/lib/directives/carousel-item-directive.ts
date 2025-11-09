import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[contentCarouselItem]',
  standalone: true
})
export class ContentCarouselItemDirective {
  constructor(public el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'carousel-item');
  }
}
