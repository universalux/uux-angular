<p align="center">
  <a href="https://universalux.dev" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-expand-group/ng-expand-group-cover.gif?raw=true" alt="NgExpandGroup cover">
  </a>
</p>

# NgExpandGroup - Angular accordion

**ng-expand-group** is a **standalone, reusable and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accordion of expandable items. It is also fully compatible with **SSR, CSR and prerender**.

## Table of Contents

* [Installation](#installation)
* [Overview](#overview)
* [Functionality](#functionality)
* [Inputs and Outputs](#inputs-and-outputs)
* [Styling](#styling)
* [Accessibility](#accessibility)
* [Contribute or Report](#contribute-or-report)

## Installation

If you want to install the latest version (currently 20):
```bash
npm install ng-expand-group
```

Angular 19:
```bash
npm install ng-expand-group@v19-lts
```

Angular 18:
```bash
npm install ng-expand-group@v18-lts
```

## Overview


`ng-expand-group` requires the `ng-expand` component from our library. However, you don't need to install anything, as ng-expand is automatically installed with ng-expand-group.

Using `ng-expand-group` is easy:
- Define the accordion items you need using ng-expand as children of the component.
- If needed, you can use the `(expandedItem)` output to get the index of the current expanded item.
- Style it with customizable CSS variables to match your design needs.

Here’s a basic usage example:

```ts
import { Component, signal } from '@angular/core';
import { NgExpand, NgExpandGroup } from 'ng-expand-group';

@Component({
  selector: 'app',
  standalone: true,
  imports: [ NgExpand, NgExpandGroup ],
  template: `
    <ng-expand-group (expandedItem)="expandedItemSignal.set($event)>
      <ng-expand label="Expand button label 1">
        <p>This is the content 1</p>
      </ng-expand>
      <ng-expand label="Expand button label 2">
        <p>This is the content 2</p>
      </ng-expand>
    </ng-expand-group>
  `,
})
export class App {
  expandedItemSignal = signal<number | null>(null);
}
```

## Functionality

As you can see in the example bellow, you simply have to add as `ng-expand` items you need as children of `ng-expand-group`.

If needed, you can get the index of the current expanded item through the output `(expandedItem)`. If a ng-expand item is expanded, you will get its index (number). If there is no item expanded, you will get null.

## Inputs and Outputs

Here is a list of all input/ouput:

### Functionality Outputs

| **Output**        | **Description**                                               | **Default** |
| ----------------- | ------------------------------------------------------------- | ----------- |
| `(expandedItem)`  | Get the index of the current expanded item (number or null )  | null        |


## Styling

You can easily customize the component’s appearance using CSS.
There is only one CSS variable that will help you to set up the `gap` between each item (--expand-group-gap).

```css
ng-expand-group {
  padding: 10px 20px;
  --expand-group-gap: 1rem;
}
```

| **Variable**           | **Description**                      | **Default**       |
| ---------------------- | ------------------------------------ | ----------------- |
| `--expand-group-gap`   | Gap between ng-expand items inside.  | `.5rem`           |


## Accessibility

This component is fully accessible. All functional accessibility features are already built in.

Keep in mind that you are responsible for configuring the accessibility of any content you place inside the ng-expand components.

## Contribute or report

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/universalux/uux-hub/issues/new/choose).

## License
MIT
