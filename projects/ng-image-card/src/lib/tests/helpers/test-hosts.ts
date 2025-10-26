import { Component, signal } from "@angular/core";
import { NgImageCard } from "../../ng-image-card";

@Component({
  imports: [NgImageCard],
  template: `
    <ng-image-card>
      <header card-header>
        <p>Header content</p>
      </header>
      <section card-image>
        <img src="./card-image.mock.png">
      </section>
      <section card-body>
        <p>Body content</p>
      </section>
      <footer card-footer>
        <p>Footer content</p>
      </footer>
    </ng-image-card>
  `
})
export class TestHost {}

@Component({
  imports: [NgImageCard],
  template: `
    <ng-image-card animation="fadeIn" [hover]="hoverSignal()" [shadow]="false">
      <header card-header>
        <p>Header content</p>
      </header>
      <section card-image>
        <img src="./card-image.mock.png">
      </section>
      <section card-body>
        <p>Body content</p>
      </section>
      <footer card-footer>
        <p>Footer content</p>
      </footer>
    </ng-image-card>
  `
})
export class TestHostWithAttrs {
  hoverSignal = signal<'scale' | 'color' | 'both' | 'none'>('color');
}
