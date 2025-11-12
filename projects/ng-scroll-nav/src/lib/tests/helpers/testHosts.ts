import { Component, signal } from "@angular/core";
import { NgScrollNav } from "../../ng-scroll-nav";
import { ScrollNavCustomAria, ScrollNavLangs } from "../../ng-scroll-nav.types";

@Component({
  imports: [NgScrollNav],
  template: `
    <ng-scroll-nav [style.width]="'100%'">
      <a>Content 1</a>
      <a>Content 2</a>
      <a>Content 3</a>
      <a>Content 4</a>
      <a>Content 5</a>
      <a>Content 6</a>
      <a>Content 7</a>
      <a>Content 8</a>
      <a>Content 9</a>
      <a>Content 10</a>
      <a>Content 11</a>
      <a>Content 12</a>
      <a>Content 13</a>
      <a>Content 14</a>
    </ng-scroll-nav>
  `
})
export class TestHost {
}

@Component({
  imports: [NgScrollNav],
  template: `
    <ng-scroll-nav
      [style.width]="'400px'"

      [scrollStep]="200"
      scrollBehavior="auto"

      [lang]="langSelection()"
      [customAria]="customAria()"
    >
      <a>Content 1</a>
      <a>Content 2</a>
      <a>Content 3</a>
      <a>Content 4</a>
      <a>Content 5</a>
      <a>Content 6</a>
      <a>Content 7</a>
      <a>Content 8</a>
      <a>Content 9</a>
      <a>Content 10</a>
      <a>Content 11</a>
      <a>Content 12</a>
      <a>Content 13</a>
      <a>Content 14</a>
    </ng-scroll-nav>
  `
})
export class TestHostWithAttr {
  langSelection = signal<ScrollNavLangs>('en');
  customAria = signal<ScrollNavCustomAria |null>(null);

}





