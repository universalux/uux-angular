import { Component, signal } from '@angular/core';
import { NgMenuButton } from 'ng-menu-button';

type languages = 'en' | 'es' | 'it' |'fr' | 'de';

@Component({
  selector: 'pg-menu-button',
  imports: [NgMenuButton],
  templateUrl: './pg-menu-button.html',
  styleUrl: './pg-menu-button.scss'
})
export class PgMenuButton {

  menuOpenSignal = signal<boolean>(false);

  langSignal = signal<languages>('en');

  handleLang(event: Event){
    const target = event.target as HTMLSelectElement;
    const value = target.value as languages;
    this.langSignal.set(value)
  }

}
