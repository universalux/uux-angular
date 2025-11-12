<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-scroll-nav/ng-scroll-nav-cover.gif?raw=true" alt="NgScrollNav cover" />
  </a>
</p>

# NgScrollNav - Angular Scroll Nav

**ng-scroll-nav** is a **standalone, reusable, responsive and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible scrollable nav. It is also fully compatible with **SSR, CSR and prerender**.

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
npm install ng-scroll-nav
```

Angular 19:
```bash
npm install ng-scroll-nav@v19-lts
```

Angular 18:
```bash
npm install ng-scroll-nav@v18-lts
```

## Overview

The main feature of `ng-scoll-nav` is its scrolling functionality: if all the elements you add fit within the component, you'll have a normal navigation bar. Otherwise, the component becomes `scrollable`.

This component works especially well with our [ng-link-button](https://www.npmjs.com/package/ng-link-button) component

Using `ng-scroll-nav` is easy:
- Provide the links you need as children of the component.
- Configure its behavior and accessibility using inputs.
- Style it with customizable CSS variables to match your design needs.

```ts
import { NgScrollNav } from 'ng-scroll-nav';
import { NgLinkButton } from 'ng-link-button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgScrollNav, NgLinkButton],
  template: `
    <ng-scroll-nav>
      <ng-link-button [square]="true">
        Link 1
      </ng-link-button>
      <ng-link-button [square]="true">
        This is Link 2
      </ng-link-button>
      <ng-link-button [square]="true">
        Another Link 3
      </ng-link-button>
      <ng-link-button [square]="true">
        Link 4
      </ng-link-button>
    </ng-scroll-nav>
  `,
})
```

## Functionality

As shown in the example below, you just have to add link elements as children of `ng-scroll-nav`. Yo can use our `ng-link-button` or an `<a>` tag if you prefer.

You can control the scrolling behavior using the `[scrollStep]` and `scrollBehavior` inputs (see [Inputs and Outputs](#inputs-and-outputs)) section below.

```html
<ng-scroll-nav [scrollStep]="200" scrollBehavior="auto">
  <ng-link-button>
    Link 1
  </ng-link-button>
  <ng-link-button>
    This is Link 2
  </ng-link-button>
</ng-scroll-nav>
```

## Inputs and Outputs

Here is a list of all input/ouput:

### Scroll inputs

| **Input**            | **Description**                                          | **Default** |
| -------------------- | -------------------------------------------------------- | ----------- |
| `scrollStep`         | Pixels that the scroll moves when you press an arrow     | `150`       |
| `scrollBehavior`     | Scroll behavior (`auto` or `smooth`).                    | `'smooth'`  |

### Accessibility Inputs

| **Input**    | **Description**                                                         | **Default** |
| ------------ | ----------------------------------------------------------------------- | ----------- |
| `lang`       | Defines the language for built-in ARIA labels (`en`, `es`, `fr`, etc.). | `'en'`      |
| `customAria` | Provides custom ARIA labels to override default accessibility text.     | `null`      |

> For more accessibility info go to [Accessibility](#accessibility)

## Styling

You can easily customize the component’s appearance using the CSS variables listed below.

```css
ng-scroll-nav{
  --scroll-nav-justify-content: center;
  --scroll-nav-arrow-size: 1rem;
}
```

| **Variable**                   | **Description**                                                         | **Default**                |
| ------------------------------ | ----------------------------------------------------------------------- | -------------------------- |
| `--scroll-nav-bg`              | Background color of the scrollable navigation (host and arrow icons). | `inherit`                  |
| `--scroll-nav-color`           | Main text and icon color of the scrollable navigation.                  | `host: inherit` / `arrows: currentColor` |
| `--scroll-nav-arrow-size`      | Width and height of the navigation arrow icons.                         | `1.4rem`                   |
| `--scroll-nav-justify-content` | Defines the `justify-content` alignment for the scrollable container.   | `start`                    |
| `--scroll-nav-gap`             | Spacing (`gap`) between items inside the scrollable content area.       | `0`                        |


## Accessibility

This component includes five default languages. When you choose one using the "lang" attribute, all accessibility settings are configured in that language, so you don't have to do anything else.

| Attribute              | Description                                              | Type                           | Default   |
| ---------------------- | -------------------------------------------------------- | ------------------------------ | --------- |
| `lang`                 | Select the language for accessibility                     | `'en', 'es', 'fr', 'de', 'it'` | `en`      |
| `customAria` | Set up your own custom aria attributes (more info below) | `ScrollNavCustomAria or null` | `null`    |

*** We recommend using the lang attribute if you don't need any other languages than the ones provided by default. It's simple and compliant with WAI-ARIA standards. ***

If you want to set up your own custom aria attributes, you should use the `customAria` interface.
You can import it directly from the component:

```ts
import { ScrollNavCustomAria } from 'ng-scroll-nav';
```

Here is the exact declaration of the ScrollNavCustomAria type:

```ts
export interface ScrollNavCustomAria {
  navAriaLabel?: string;
  prevBtnAriaLabel?: string;
  nextBtnAriaLabel?: string;
  linksGroupAriaLabel?: string;
};
```

Here you can see a description of every field in `ScrollNavCustomAria` interface.
Every field is type `string` and `non-required`

| **Property**          | **Description**                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `navAriaLabel`        | `aria-label` for the main scrollable navigation container. Helps describe the navigation region to assistive technologies.                      |
| `prevBtnAriaLabel`    | Label for the “previous” navigation button. Communicates its purpose to screen readers.                                                         |
| `nextBtnAriaLabel`    | Label for the “next” navigation button. Communicates its purpose to screen readers.                                                             |
| `linksGroupAriaLabel` | `aria-label` for the group of navigable links or items inside the scrollable container. Useful to describe the type of content being navigated. |


IMPORTANT:
- All fields are optional, so you can customize only the ones you want. Fields that have not been entered in "customAria" input will retain their values ​​based on the selected "lang" (remember, default lang is "en")

Here you have an example of use:

```ts
import { NgScrollNav, ScrollNavCustomAria } from 'ng-scroll-nav';

@Component({
  imports: [NgScrollNav],
  template: `
    <ng-scroll-nav lang="en" [customAria]="accOpts()">
      <ng-link-button [square]="true">
        Link 1
      </ng-link-button>
      <ng-link-button [square]="true">
        This is Link 2
      </ng-link-button>
    </ng-scroll-nav>
  `
})
class App {
  accOpts = signal<ScrollNavCustomAria>({
    navAriaLabel: 'EDITED navAriaLabel',
    prevBtnAriaLabel: 'EDITED prevBtnAriaLabel',
    nextBtnAriaLabel: 'EDITED nextBtnAriaLabel',
    linksGroupAriaLabel: 'EDITED linksGroupAriaLabel',
  });
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

