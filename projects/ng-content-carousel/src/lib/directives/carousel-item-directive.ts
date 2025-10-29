import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[carouselItem]',
  standalone: true
})
export class CarouselItemDirective {
  constructor(public el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'carousel-item');
  }
}
