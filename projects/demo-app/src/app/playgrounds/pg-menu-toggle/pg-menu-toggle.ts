import { Component, signal } from '@angular/core';
import { NgMenuToggle, MenuToggleLangs, MenuToggleCustomAria } from 'ng-menu-toggle';


@Component({
  selector: 'pg-menu-toggle',
  imports: [NgMenuToggle],
  templateUrl: './pg-menu-toggle.html',
  styleUrl: './pg-menu-toggle.scss'
})
export class PgMenuToggle {

  menuOpenSignal = signal<boolean>(false);
  menuOpenSignalOpened = signal<boolean>(true);

  currentLang  = signal<MenuToggleLangs>('en');

  handleLang(event: Event){
    const target = event.target as HTMLSelectElement;
    const value = target.value as MenuToggleLangs;
    this.currentLang .set(value)
  }

  customAria = signal<MenuToggleCustomAria | null>(null);

}
