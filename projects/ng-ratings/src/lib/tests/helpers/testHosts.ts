import { Component, signal } from "@angular/core";
import { NgRatings } from "../../ng-ratings";
import { RatingLangs } from "../../ng-ratings.types";

export type ItemValues = 3 | 4 | 5 | 7 | 10;

@Component({
  imports: [NgRatings],
  template: `<ng-ratings [readOnly]="true" [average]="3.5" [items]="items()"/>`
})
export class TestHostReadOnly {
  items = signal<ItemValues>(5);
}

@Component({
    imports: [NgRatings],
    template: `
      <ng-ratings
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
  lang = signal<RatingLangs>('en');
}
