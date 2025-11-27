import { Component, signal } from "@angular/core";
import { NgRate } from "../../ng-rate";


@Component({
  imports: [NgRate],
  template: `<ng-rate [readOnly]="true" [average]="3.5" [items]="items()"/>`
})
export class TestHostReadOnly {
  items = signal< 3 | 4 | 5 | 7 | 10>(5);
}

@Component({
    imports: [NgRate],
    template: `
      <ng-rate
        [average]="vote()!"
        [items]="items()"
        icon="heart"
        (vote)="vote.set($event)"
      />
    `
})
export class TestHostInteractive {
  vote = signal<number | null>(null);
  items = signal< 3 | 4 | 5 | 7 | 10>(3);
}
