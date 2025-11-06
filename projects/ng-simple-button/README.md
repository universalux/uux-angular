<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-simple-button/ng-simple-button-cover.png?raw=true" alt="NgSimpleButton cover">
  </a>
</p>

# NgSimpleButton - Angular simple button

**ng-simple-button** is a **standalone, reusable and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible simple button. It is also fully compatible with **SSR, CSR and prerender**.

## Table of Contents

* [Installation](#installation)
* [Overview](#overview)
* [Functionality](#functionality)
* [Inputs and Outputs](#inputs-and-outputs)
* [Styling](#styling)
* [Contribute or Report](#contribute-or-report)

## Installation

If you want to install the latest version (currently 20):
```bash
npm install ng-simple-button
```

Angular 19:
```bash
npm install ng-simple-button@v19-lts
```

Angular 18:
```bash
npm install ng-simple-button@v18-lts
```

## Overview

Using `ng-simple-button` is easy:
- Define the component’s functionality through the `(onClick)` output.
- Configure its type, shape, hover behavior, and accessibility using inputs.
- Style it with customizable CSS variables to match your design needs.

Here’s a basic usage example:

```ts
import { Component, signal } from '@angular/core';
import { NgSimpleButton } from 'ng-simple-button';

@Component({
  selector: 'app',
  standalone: true,
  imports: [ NgSimpleButton ],
  template: `
    <ng-simple-button
      (onClick)="clickFunction()"
      type="solid"
      [square]="true"
      hover="shadow"
      ariaLabel="Custom aria label"
    >
      Simple button inner content
    </ng-simple-button>

    <p>Clicked {{ count() }} times</p>
  `,
})
export class App {
  count = signal<number>(1);

  clickFunction(){
    const current = this.count();
    this.count.set(current + 1);
  };
}
```

## Functionality

As you can see in the example bellow, you can use the `(onClick)` output to assign the action you want the button to execute.

You can also access the native `MouseEvent` if you need to handle event data:

```html
<ng-simple-button (onClick)="handleClick($event)">
  Click me
</ng-simple-button>
```

```ts
handleClick(event: MouseEvent) {
  console.log(event.clientX, event.clientY);
}
```

## Inputs and Outputs

Here is a list of all input/ouput:

### Action Output

| **Output** | **Description**                                  | **Default** |
| ---------- | ------------------------------------------------ | ----------- |
| `onClick`  | Emits a `MouseEvent` when the button is clicked. | —           |

### Style & Behavior Inputs

| **Input**   | **Description**                                                                     | **Default** |
| ----------- | ----------------------------------------------------------------------------------- | ----------- |
| `type`      | Defines the button’s visual style (`solid`, `minimal`, or `outline`).               | `'solid'`   |
| `square`    | Makes the button shape perfectly square instead of rounded.                         | `false`     |
| `hover`     | Sets the hover effect style (`tone`, `scale`, `stroke`, `shadow`, or `none`).       | `'tone'`    |
| `direction` | Arranges the button’s inner content horizontally or vertically. (`row` / `column`). | `'row'`     |

### Accessibility Inputs

| **Input**   | **Description**                                          | **Default** |
| ----------- | -------------------------------------------------------- | ----------- |
| `ariaLabel` | Provides an accessible label for assistive technologies. | `null`      |
| `title`     | Sets the native tooltip text shown on hover.             | `null`      |
| `tabIndex`  | Controls the button’s tab order in keyboard navigation.  | `0`         |
| `disabled`  | Disables the button and prevents user interaction.       | `false`     |


## Styling

You can easily customize the component’s appearance using the CSS variables listed below.

```css
ng-simple-button {
  --simple-button-bg: orange;
  --simple-button-hover-bg: red;
}
```


#### Layout & Spacing

| **Variable**                      | **Description**                  | **Default**   |
| --------------------------------- | -------------------------------- | ------------- |
| `--simple-button-width`           | Defines the button width.        | `fit-content` |
| `--simple-button-height`          | Sets the button height.          | `auto`        |
| `--simple-button-radius`          | Controls the corner roundness.   | `1.3rem`      |
| `--simple-button-padding`         | Sets the inner spacing.          | `.5rem 1rem`  |
| `--simple-button-gap`             | Space between icon and label.    | `.5rem`       |
| `--simple-button-justify-content` | Horizontal alignment of content. | `center`      |
| `--simple-button-align-items`     | Vertical alignment of content.   | `center`      |

#### Style & Visuals

| **Variable**                          | **Description**                      | **Default**                                                      |
| ------------------------------------- | ------------------------------------ | ---------------------------------------------------------------- |
| `--simple-button-bg`                  | Background color of the button.      | `white` *(solid)* / `transparent` *(outline, minimal)*           |
| `--simple-button-color`               | Main color.                          | `black` *(solid)* / `inherit` *(outline, minimal)*               |
| `--simple-button-border`              | Defines the border style.            | `none` *(solid, minimal)* / `2px solid currentColor` *(outline)* |
| `--simple-button-focus-ring`          | Outline shown when focused.          | `0 0 0 2px rgba(0, 0, 0, 0.2)`                                 |
| `--simple-button-transition-duration` | Duration of hover/focus transitions. | `.3s`                                                            |

#### Hover Effects

| **Variable**                   | **Description**                | **Default**                              |
| ------------------------------ | ------------------------------ | ---------------------------------------- |
| `--simple-button-hover-color`  | Text color on hover.           | `var(--simple-button-color, black)`      |
| `--simple-button-hover-scale`  | Scale effect applied on hover. | `1.05` *(scaleHover)*                    |
| `--simple-button-hover-shadow` | Box shadow applied on hover.   | `2px 2px 5px #525252` *(shadowHover)*  |
| `--simple-button-hover-bg`     | Background color on hover.     | `#949494` *(toneHover)*                  |
| `--simple-button-hover-stroke` | Outline stroke on hover.       | `2px solid currentColor` *(strokeHover)* |

### Styling considerations:

You can apply styles to a specific button type as follows:

```css
ng-simple-button[type="solid"] {
  --simple-button-bg: orange;
}
```

If you have multiple buttons and need different custom styles, you can also add a class to target them more precisely:

```css
ng-simple-button.myClass {
  --simple-button-outline: 2px solid orange;
}
```

## Contribute or report

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/universalux/uux-hub/issues/new/choose).

## License
MIT
