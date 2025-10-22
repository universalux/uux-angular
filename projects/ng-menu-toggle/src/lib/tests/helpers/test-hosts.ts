import { Component, signal } from "@angular/core";
import { NgMenuToggle } from "../../ng-menu-toggle";
import { MenuToggleCustomAria, MenuToggleLangs } from "../../ng-menu-toggle.types";

@Component({
  imports: [NgMenuToggle],
  template: `
    <ng-menu-toggle
      [isOpenSignal]="isOpen"
    />
  `
})
export class TestHost {
  isOpen = signal<boolean>(false);
}

@Component({
  imports: [NgMenuToggle],
  template: `
    <ng-menu-toggle
      [isOpenSignal]="isOpen"

      [type]='type()'
      [invert]="true"
      [thin]="true"
      [rounded]="true"
      [animation]="animation()"
      [faster]="true"

      [tabIndex]="1"

      [lang]="langSignal()"
      [customAria]="customAria()"

    />
  `
})
export class TestHostWithAttrs {
  isOpen = signal<boolean>(false);
  type = signal< 'dots' | 'bars' | 'uneven' >('dots');
  animation = signal<'rotateX' | 'rotateY' | 'soft'>('rotateX');

  customAria = signal<MenuToggleCustomAria | null>(null);

  langSignal = signal<MenuToggleLangs>('es');

}
