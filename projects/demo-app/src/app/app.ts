import { Component } from '@angular/core';
import { PgMenuButton } from './playgrounds/pg-menu-button/pg-menu-button';
import { PgThemeToggle } from "./playgrounds/pg-theme-toggle/pg-theme-toggle";
import { NgMenuButton } from 'ng-menu-button';

@Component({
  selector: 'app-root',
  imports: [
    PgMenuButton,
    PgThemeToggle,
    NgMenuButton
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
