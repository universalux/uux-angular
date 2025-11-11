import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[slide-bg]'
})
export class SlideBgDirective {

  @Input() image?: string;
  @Input() color?: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const background = this.image
      ? `url(${this.image}), ${this.color || 'transparent'}`
      : this.color || 'transparent';

    this.renderer.setStyle(this.el.nativeElement, 'background', background);
    this.renderer.setStyle(this.el.nativeElement, 'background-size', 'cover');
    this.renderer.setStyle(this.el.nativeElement, 'background-position', 'center');
  }
}
