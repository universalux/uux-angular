import { Component, signal } from "@angular/core";
import { NgSimpleButton } from "../../ng-simple-button";

@Component({
  imports: [NgSimpleButton],
  template: `
    <ng-simple-button>
      Simple Button Content
    </ng-simple-button>
  `
})
export class TestHost {}

@Component({
  imports: [NgSimpleButton],
  template: `
    <ng-simple-button
      (onClick)="handleClick($event)"

      ariaLabel="Aria label test"
      title="Title test"
      [tabIndex]="-1"
      [disabled]="isDisabled()"

      [type]="type()"
      [square]="true"
      [hover]="hover()"
      direction="column"
    >
      Simple Button Content
    </ng-simple-button>
  `
})
export class TestHostWithAttr {
  checkAction = signal<boolean>(true);

  handleClick(_event: MouseEvent) {
    this.checkAction.set(!this.checkAction());
  };

  isDisabled = signal<boolean>(false);

  type = signal<'solid' | 'minimal' | 'outline'>('minimal');
  hover = signal<'tone' | 'scale' | 'stroke' | 'shadow' | 'none'>('scale');

}





