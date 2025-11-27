import { Component, signal } from "@angular/core";
import { NgRate } from "../../ng-rate";
import { RateLangs } from "../../ng-rate.types";

export type ItemValues = 3 | 4 | 5 | 7 | 10;

@Component({
  imports: [NgRate],
  template: `<ng-rate [readOnly]="true" [average]="3.5" [items]="items()"/>`
})
export class TestHostReadOnly {
  items = signal<ItemValues>(5);
}

@Component({
    imports: [NgRate],
    template: `
      <ng-rate
        [average]="vote()!"
        [items]="items()"
        icon="heart"
        (vote)="vote.set($event)"
        [lang]="lang()"
      />
    `
})
export class TestHostInteractive {
  vote = signal<number | null>(null);
  items = signal<ItemValues>(3);
  lang = signal<RateLangs>('en');
}
