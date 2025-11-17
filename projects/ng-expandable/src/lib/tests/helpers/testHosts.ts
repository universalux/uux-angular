import { Component, signal } from "@angular/core";
import { NgExpandable } from "../../ng-expandable";


@Component({
  imports: [NgExpandable],
  template: `
    <ng-expandable label="Example label at expandable button">
        <p>Example text at expandable content</p>
    </ng-expandable>
  `
})
export class TestHost {}

@Component({
    imports: [NgExpandable],
    template: `
      <ng-expandable
        title="Example label at expandable button"
        [startExpanded]="true"
        iconType="plus"
        [tabIndex]="-1"
      >
        <p>Example text at expandable content</p>
      </ng-expandable>
    `
})
export class TestHostAttr {}
