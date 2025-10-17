import { Component, signal } from "@angular/core";
import { NgMenuButton } from "../../ng-menu-button";
import { MenuButtonCustomAria, MenuButtonLangs } from "../../ng-menu-button.types";

@Component({
  imports: [NgMenuButton],
  template: `
    <ng-menu-button
      [isOpenSignal]="isOpen"
    />
  `
})
export class TestHost {
  isOpen = signal<boolean>(false);
}

@Component({
  imports: [NgMenuButton],
  template: `
    <ng-menu-button
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

  customAria = signal<MenuButtonCustomAria | null>(null);

  langSignal = signal<MenuButtonLangs>('es');

  handleLang(event: Event){
    const target = event.target as HTMLSelectElement;
    const value = target.value as MenuButtonLangs;
    this.langSignal.set(value)
  }

}
