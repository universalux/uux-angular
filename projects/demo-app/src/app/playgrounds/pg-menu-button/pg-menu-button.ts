import { Component, signal } from '@angular/core';
import { NgMenuButton, MenuButtonLangs, MenuButtonCustomAria } from 'ng-menu-button';

@Component({
  selector: 'pg-menu-button',
  imports: [NgMenuButton],
  templateUrl: './pg-menu-button.html',
  styleUrl: './pg-menu-button.scss'
})
export class PgMenuButton {

  menuOpenSignal = signal<boolean>(false);

  langSignal = signal<MenuButtonLangs>('en');

  handleLang(event: Event){
    const target = event.target as HTMLSelectElement;
    const value = target.value as MenuButtonLangs;
    this.langSignal.set(value)
  }

  customAria = signal<MenuButtonCustomAria | null>(null);

}
