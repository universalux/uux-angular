import { Component } from '@angular/core';
import { PgThemeToggle } from "./playgrounds/pg-theme-toggle/pg-theme-toggle";
import { PgMenuToggle } from './playgrounds/pg-menu-toggle/pg-menu-toggle';
import { PgHeroCarousel } from './playgrounds/pg-hero-carousel/pg-hero-carousel';
import { PgContentCarousel } from "./playgrounds/pg-content-carousel/pg-content-carousel";
import { PgButtons } from "./playgrounds/pg-buttons/pg-buttons";
import { PgContentCard } from './playgrounds/pg-content-card/pg-content-card';

@Component({
  selector: 'app-root',
  imports: [
    PgMenuToggle,
    PgThemeToggle,
    PgHeroCarousel,
    PgContentCard,
    PgContentCarousel,
    PgButtons
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
