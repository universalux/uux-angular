import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { PgButtons } from './playgrounds/pg-buttons/pg-buttons';

const routes: Route[] = [
  { path: '', component: PgButtons }, // lo pintas como vista principal
  { path: 'test', component: PgButtons },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};
