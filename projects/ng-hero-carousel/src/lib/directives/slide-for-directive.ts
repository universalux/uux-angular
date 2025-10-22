import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[slideFor]'
})
export class SlideForDirective {
  template = inject(TemplateRef<any>);
  slideFor = input<number>(0);
}