import { Component } from '@angular/core';
import { PgMenuButton } from './playgrounds/pg-menu-button/pg-menu-button';
import { PgThemeToggle } from "./playgrounds/pg-theme-toggle/pg-theme-toggle";
import { NgMenuButton } from 'ng-menu-button';
import { PgMenuToggle } from './playgrounds/pg-menu-toggle/pg-menu-toggle';
import { PgHeroCarousel } from './playgrounds/pg-hero-carousel/pg-hero-carousel';

@Component({
  selector: 'app-root',
  imports: [
    // PgMenuButton,
    // PgMenuToggle,
    // PgThemeToggle,
    // NgMenuButton,
    PgHeroCarousel
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
