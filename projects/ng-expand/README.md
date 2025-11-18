<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-expand/ng-expand-cover.gif?raw=true" alt="NgExpand cover">
  </a>
</p>

# NgExpand - Angular expandable item

**ng-expand** is a **standalone, reusable and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible expandable item. It is also fully compatible with **SSR, CSR and prerender**.

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
npm install ng-expand
```

Angular 19:
```bash
npm install ng-expand@v19-lts
```

Angular 18:
```bash
npm install ng-expand@v18-lts
```

## Overview

Using `ng-expand` is easy:
- Define the expansor button label using the `label` input.
- Set expandable content as children of the component.
- Configure it using inputs.
- Style it with customizable CSS variables to match your design needs.

Here’s a basic usage example:

```ts
import { Component, signal } from '@angular/core';
import { NgExpand } from 'ng-expand';

@Component({
  selector: 'app',
  standalone: true,
  imports: [ NgExpand ],
  template: `
    <ng-expand
      label="Expand button label"
      [startExpanded]="false"
      iconType="plus"
    >
      <p>This is the content</p>
    </ng-expand>
  `,
})
export class App {}
```

## Functionality

As you can see in the example bellow, you can use the `label` input to assign text to the expand/collapse button.

You can also use `startExpanded` input to decide the initial state and `iconType` input to choose between two different icon types (arrow or plus).

## Inputs and Outputs

Here is a list of all input/ouput:

### Functionality Inputs

| **Input** | **Description**                                  | **Default** |
| --------- | ------------------------------------------------ | ----------- |
| `label`   | Choose the text for the expand/collapse button.  | —           |

### Style & Behavior Inputs

| **Input**        | **Description**                                                      | **Default** |
| ---------------- | -------------------------------------------------------------------- | ----------- |
| `startExpanded`  | Set the initial state (expanded or collapsed) for the component      | `false`     |
| `iconType`       | choose between two different icon types: arrow or plus (+)           | `'arrow`    |


### Accessibility Inputs

| **Input**   | **Description**                                          | **Default** |
| ----------- | -------------------------------------------------------- | ----------- |
| `tabIndex`  | Controls the button’s tab order in keyboard navigation.  | `0`         |


## Styling

You can easily customize the component’s appearance using the CSS variables listed below.

```css
ng-expand {
  --expand-bg: orange;
  --expand-icon-size: 1.1rem;
}
```

#### General

| **Variable**                         | **Description**                                    | **Default**                         |
| ------------------------------------ | -------------------------------------------------- | ----------------------------------- |
| `--expand-width`                     | Sets the component width.                          | `100%`                              |
| `--expand-height`                    | Sets the component height.                         | `fit-content`                       |
| `--expand-color`                     | Defines the text color of the component.           | `inherit`                           |
| `--expand-bg`                        | Defines the background of the component.           | `transparent`                       |
| `--expand-border`                    | Applies a border to the component.                 | `none`                              |
| `--expand-border-radius`             | Sets the border radius of the component container. | `.3rem`                             |
| `--expand-gap`                       | Sets the gap between button and content when open. | `0`                                 |
| `--expand-transition-duration`       | Duration of the expand/collapse transition.        | `.3s`                               |
| `--expand-hover-transition-duration` | Duration of hover animations.                      | `0s`                                |
| `--expand-icon-color`                | Color of the arrow/plus icon.                      | `currentColor` (via fallback chain) |
| `--expand-icon-size`                 | Size of the arrow/plus icon.                       | `1.1rem`                            |


#### Expand button

| **Variable**                     | **Description**                   | **Default**                        |
| -------------------------------- | --------------------------------- | ---------------------------------- |
| `--expand-button-color`          | Button text/icon color.           | `var(--expand-color, inherit)`     |
| `--expand-button-bg`             | Button background color.          | `var(--expand-bg, black)`          |
| `--expand-button-border`         | Button border style.              | `none`                             |
| `--expand-button-text-align`     | Button text alignment.            | `left`                             |
| `--expand-button-padding`        | Button padding.                   | `1rem`                             |
| `--expand-button-hover-bg`       | Background on hover.              | `color-mix(...)` (fallback chain)  |
| `--expand-button-hover-color`    | Text color on hover.              | `var(--expand-button-color)`       |
| `--expand-button-expanded-bg`    | Background when expanded.         | `var(--expand-button-hover-bg)`    |
| `--expand-button-expanded-color` | Text color when expanded.         | `var(--expand-button-hover-color)` |
| `--expand-button-focus-ring`     | Focus outline style.              | `2px solid currentColor`           |
| `--expand-button-font-size`      | Font size for the button label.   | `1rem`                             |
| `--expand-button-font-weight`    | Font weight for the button label. | `500`                              |

#### Expandable content

| **Variable**               | **Description**                                 | **Default**                    |
| -------------------------- | ----------------------------------------------- | ------------------------------ |
| `--expand-content-padding` | Padding applied to the expandable content area. | `1rem`                         |
| `--expand-content-bg`      | Background color of the content area.           | `var(--expand-bg, black)`      |
| `--expand-content-color`   | Text color of the content area.                 | `var(--expand-color, inherit)` |


### Styling considerations:

If you have multiple expand items and need different custom styles, you can add a class to target them more precisely:

```css
ng-expand.myClass {
  --expand-bg: blue;
}
```

#### Variable inheritance

The component uses a cascading system of CSS variables where some are general and others are more specific.
Setting a general variable like --expand-bg or --expand-color applies the value to the entire component (both button and content).

However, specific variables such as --expand-button-bg or --expand-button-color override the general ones for their respective parts.

In short:
General variables apply to the whole component, while specific variables take priority in their own area.

## Accessibility

This component is fully accessible. All functional accessibility features are already built in.
The only input you can configure is `[tabIndex]`, in case you need to remove the component from the tab flow for any reason.

Keep in mind that you are responsible for configuring the accessibility of any content you place inside the component.

## Contribute or report

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/universalux/uux-hub/issues/new/choose).

## License
MIT
