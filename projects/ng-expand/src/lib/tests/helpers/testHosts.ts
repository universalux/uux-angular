import { Component } from "@angular/core";
import { NgExpand } from "../../ng-expand";


@Component({
  imports: [NgExpand],
  template: `
    <ng-expand label="Example label at expand button">
        <p>Example text at expand content</p>
    </ng-expand>
  `
})
export class TestHost {}

@Component({
    imports: [NgExpand],
    template: `
      <ng-expand
        title="Example label at expand button"
        [startExpanded]="true"
        iconType="plus"
        [tabIndex]="-1"
      >
        <p>Example text at expand content</p>
      </ng-expand>
    `
})
export class TestHostAttr {}
