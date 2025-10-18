import { Component, signal } from "@angular/core";
import { NgThemeToggle } from "../../ng-theme-toggle";
import { ThemeToggleCustomAria, ThemeToggleLangs } from "../../ng-theme-toggle.types";

@Component({
  imports: [NgThemeToggle],
  template: `
    <ng-theme-toggle
      [isDarkSignal]="isDark"
    />
  `
})
export class TestHost {
  isDark = signal<boolean>(false);
}

@Component({
  imports: [NgThemeToggle],
  template: `
    <ng-theme-toggle
      [isDarkSignal]="isDark"

      [hover]="hover()"
      [animation]="animation()"
      [faster]="true"

      [tabIndex]="1"

      [lang]="langSignal()"
      [customAria]="customAria()"

    />
  `
})
export class TestHostWithAttrs {
  isDark = signal<boolean>(false);

  hover = signal<'scale' | 'shadow' | 'none'>('shadow');
  animation = signal<'rotateX' | 'rotateY' | 'soft'>('rotateX');

  customAria = signal<ThemeToggleCustomAria | null>(null);

  langSignal = signal<ThemeToggleLangs>('es');

}
