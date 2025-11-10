import { Component, signal } from "@angular/core";
import { NgContentCard } from "../../ng-content-card";

@Component({
  imports: [NgContentCard],
  template: `
    <ng-content-card>
      <header card-header>
        <p>Header content</p>
      </header>
      <section card-image>
        <img src="./helpers/card-image-mock.png">
      </section>
      <section card-body>
        <p>Body content</p>
      </section>
      <footer card-footer>
        <p>Footer content</p>
      </footer>
    </ng-content-card>
  `
})
export class TestHost {}

@Component({
  imports: [NgContentCard],
  template: `
    <ng-content-card [animation]="animationSignal()" [hover]="hoverSignal()" [shadow]="false">
      <header card-header>
        <p>Header content</p>
      </header>
      <section card-image>
        <img src="./helpers/card-image-mock.png">
      </section>
      <section card-body>
        <p>Body content</p>
      </section>
      <footer card-footer>
        <p>Footer content</p>
      </footer>
    </ng-content-card>
  `
})
export class TestHostWithAttrs {
  animationSignal = signal<'translateY' | 'fadeIn' |'none'>('fadeIn');
  hoverSignal = signal<'scale' | 'tone' | 'both' | 'none'>('tone');
}
