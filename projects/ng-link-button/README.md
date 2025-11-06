<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-link-button/ng-link-button-cover.png?raw=true" alt="NgLinkButton cover">
  </a>
</p>

# NgLinkButton - Angular link button

**ng-link-button** is a **standalone, reusable and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible link button. It is also fully compatible with **SSR, CSR and prerender**.

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
npm install ng-link-button
```

Angular 19:
```bash
npm install ng-link-button@v19-lts
```

Angular 18:
```bash
npm install ng-link-button@v18-lts
```

## Overview

Using `ng-link-button` is easy:
- You can define the navigation path in two ways: using `href` or `routerLink` (see next section)
- Configure its type, shape, hover behavior, and accessibility using inputs.
- Style it with customizable CSS variables to match your design needs.

Here’s a basic usage example:

```ts
import { Component, signal } from '@angular/core';
import { NgLinkButton } from 'ng-link-button';

@Component({
  selector: 'app',
  standalone: true,
  imports: [ NgLinkButton ],
  template: `
    <ng-link-button
      routerLink="home"
      type="solid"
      [square]="true"
      hover="shadow"
      ariaLabel="Custom aria label"
    >
      Link button inner content
    </ng-link-button>
  `,
})
export class App {

}
```

## Functionality

As it was mencioned below, you can set navigation route in two ways `href` (ideally for external links) or `routerLink` (for page routes).

### Router Link Mode

Here’s an example showing all available properties in routerLink mode.

Keep in mind that the only required input is `routerLink`. You don’t need to use all the other inputs at once — this is just a complete example for reference.

```ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgLinkButton } from 'ng-link-button';

@Component({
  selector: 'app',
  standalone: true,
  imports: [NgLinkButton],
  template: `
    <ng-link-button
      routerLink="home"
      [activatedRoute]="false"
      [queryParams]="{ category: 'books', sort: 'price' }"
      fragment="fragmentExample"
      [relativeTo]="activatedRoute"
      queryParamsHandling="merge"
      [state]="{ state: 'state example' }"
    >
      Link button inner content
    </ng-link-button>
  `,
})
export class App {
  activatedRoute = inject(ActivatedRoute);
}
```

> To get more info about this inputs, see the section [Inputs and Outputs](#inputs-and-outputs) below


### Href Link Mode

Here’s an example showing all available properties in `href` mode.

Keep in mind that the only required input is `href`.
You don’t need to use all the other inputs at once — this is just a complete example for reference.


```html
<ng-link-button
  href="https://universalux.dev"
  target="_blank"
  rel="noreferrer noopener"
>
  Link button inner content
</ng-link-button>
```

> To get more info about this inputs, see the section [Inputs and Outputs](#inputs-and-outputs) below

## Inputs and Outputs

Here is a list of all input/ouput:

### Router Link Inputs

| **Input**             | **Description**                                            | **Default** |
| ---------------------- | --------------------------------------------------------- | ----------- |
| `routerLink`           | Defines the internal navigation route.                    | `undefined` |
| `activatedRoute`       | Enables `ActivatedRoute` context usage.                   | `true`      |
| `queryParams`          | Adds query parameters to the route.                       | `null`      |
| `fragment`             | Defines a URL fragment (anchor).                          | `undefined` |
| `relativeTo`           | Sets a relative navigation based on an `ActivatedRoute`.  | `null`      |
| `queryParamsHandling`  | Strategy for handling query params (`merge` / `preserve`).| `null`      |
| `state`                | Adds custom navigation state data.                        | `undefined` |

### Href Inputs

| **Input** | **Description**                                           | **Default**              |
| ---------- | -------------------------------------------------------- | ------------------------ |
| `href`     | Defines the external link URL.                           | `null`                   |
| `target`   | Specifies where to open the link (`_blank`, `_self`...). | `'_blank'`               |
| `rel`      | Defines the link relation attribute for security.        | `'noreferrer noopener'`  |


### Style & Behavior Inputs

| **Input**   | **Description**                                                                     | **Default** |
| ----------- | ----------------------------------------------------------------------------------- | ----------- |
| `type`      | Defines the button’s visual style (`solid`, `minimal`, or `outline`).               | `'solid'`   |
| `square`    | Makes the button shape perfectly square instead of rounded.                         | `false`     |
| `hover`     | Sets the hover effect style (`tone`, `scale`, `stroke`, `shadow`, or `none`).       | `'tone'`    |
| `direction` | Arranges the button’s inner content horizontally or vertically. (`row` / `column`). | `'row'`     |

### Accessibility Inputs

| **Input**     | **Description**                                          | **Default** |
| -------------- | -------------------------------------------------------- | ----------- |
| `ariaLabel`    | Provides an accessible label for assistive technologies. | `null`      |
| `title`        | Sets the native tooltip text shown on hover.             | `null`      |
| `tabIndex`     | Controls the button’s tab order in keyboard navigation.  | `0`         |
| `ariaCurrent`  | Indicates the current item in a set (e.g. current page). | `null`      |
| `download`     | Suggests that the link should be downloaded as a file.   | `null`      |
| `role`         | Defines the ARIA role (`link` or `button`).              | `null`      |
| `disabled`     | Disables the button and prevents user interaction.       | `false`     |


## Styling

You can easily customize the component’s appearance using the CSS variables listed below.

```css
ng-link-button {
  --link-button-bg: orange;
  --link-button-hover-bg: red;
}
```

#### Layout & Spacing

| **Variable**                    | **Description**                  | **Default**   |
| ------------------------------- | -------------------------------- | ------------- |
| `--link-button-width`           | Defines the button width.        | `fit-content` |
| `--link-button-height`          | Sets the button height.          | `auto`        |
| `--link-button-radius`          | Controls the corner roundness.   | `1.3rem`      |
| `--link-button-padding`         | Sets the inner spacing.          | `.5rem 1rem`  |
| `--link-button-gap`             | Space between icon and label.    | `.5rem`       |
| `--link-button-justify-content` | Horizontal alignment of content. | `center`      |
| `--link-button-align-items`     | Vertical alignment of content.   | `center`      |

#### Style & Visuals

| **Variable**                        | **Description**                      | **Default**                                                      |
| ----------------------------------- | ------------------------------------ | ---------------------------------------------------------------- |
| `--link-button-bg`                  | Background color of the button.      | `white` *(solid)* / `transparent` *(outline, minimal)*           |
| `--link-button-color`               | Main color.                          | `black` *(solid)* / `inherit` *(outline, minimal)*               |
| `--link-button-border`              | Defines the border style.            | `none` *(solid, minimal)* / `2px solid currentColor` *(outline)* |
| `--link-button-focus-ring`          | Outline shown when focused.          | `0 0 0 2px rgba(0, 0, 0, 0.2)`                                 |
| `--link-button-transition-duration` | Duration of hover/focus transitions. | `.3s`                                                            |

#### Hover & Active Effects

| **Variable**                 | **Description**                 | **Default**                               |
| ---------------------------- | ------------------------------- | ----------------------------------------- |
| `--link-button-hover-color`  | Text color on hover.            | `var(--link-button-color, black)`         |
| `--link-button-hover-scale`  | Scale effect applied on hover.  | `1.05` *(scaleHover)*                     |
| `--link-button-hover-shadow` | Box shadow applied on hover.    | `2px 2px 5px #525252` *(shadowHover)*   |
| `--link-button-hover-bg`     | Background color on hover.      | `#949494` *(toneHover)*                   |
| `--link-button-hover-stroke` | Outline stroke on hover.        | `2px solid currentColor` *(strokeHover)*  |
| `--link-button-active-color` | Text color when active.         | `var(--link-button-color, black)`         |
| `--link-button-active-scale` | Scale effect when active.       | `1.05` *(scaleHover)*                     |
| `--link-button-active-shadow`| Box shadow when active.         | `2px 2px 5px #525252` *(shadowHover)*   |
| `--link-button-active-bg`    | Background color when active.   | `#949494` *(toneHover)*                   |
| `--link-button-active-stroke`| Outline stroke when active.     | `2px solid currentColor` *(strokeHover)*  |


> The `active` class is automatically applied when the current route matches the link’s `routerLink`.
> This behavior depends on the `ActivatedRoute` context when `activatedRoute` input is enabled (default: `true`).

### Styling considerations:

You can apply styles to a specific button type as follows:

```css
ng-link-button[type="solid"] {
  --link-button-bg: orange;
}
```

If you have multiple buttons and need different custom styles, you can also add a class to target them more precisely:

```css
ng-link-button.myClass {
  --link-button-outline: 2px solid orange;
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
