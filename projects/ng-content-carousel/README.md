<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-content-carousel/ng-content-carousel-cover.gif?raw=true" alt="NgContentCarousel cover" />
  </a>
</p>

# NgContentCarousel - Angular Content Carousel

**ng-content-carousel** is a **standalone, reusable, responsive and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible custom content carousel. It is also fully compatible with **SSR, CSR and prerender**.

## Table of Contents

* [Instalation](#installation)
* [Basic Usage](#basic-usage)
* [Advanced Usage](#advanced-usage)
  - [Component Inputs](#component-inputs)
  - [Accessibility attributes](#accessibility-attributes)
  - [Custom styles](#custom-styles)
* [Report or suggest something](#report-or-suggest-something)

## Installation

If you want to install the latest version (currently 20):
```bash
npm install ng-content-carousel
```

Angular 19:
```bash
npm install ng-content-carousel@v19-lts
```

Angular 18:
```bash
npm install ng-content-carousel@v18-lts
```

## Basic Usage

Using `ng-content-carousel` is simple. You can add child content items using the `carouselItem` directive on each container (this container can be any label: `<a>, <div>, <section>`... )

```ts
import { NgContentCarousel, CarouselItemDirective } from 'ng-content-carousel';

@Component({
  selector: 'app',
  imports: [NgContentCarousel, CarouselItemDirective],
  template: `
    <ng-content-carousel>
      <div carouselItem>
        Here goes the item content you want
      </div>
      <div carouselItem>
        Here goes the item content you want
      </div>
    </ng-content-carousel>
  `,
})
```

## Advanced Usage

### Component Inputs

The component provides the following `inputs` to customize behavior and effects:

| Input       | Description                                  | Type                             | Default    |
| ----------- | -------------------------------------------- | -------------------------------- | ---------- |
| `transition` | Transition effect when navigate between items | boolean | `true` |
| `arrowStyle` | Nagivate arrows style: `'minimal'` (only arrow and hover), `'solid'`(button style) | string | `'minimal'` |
| `hideArrowsOnEdges`    | Hide arrows when carousel is onStart / onEnd     | boolean | `true` |
| `advanceMode`    | `'single'` (Items moves one by one) or `'page'` (items move the next non visible item)    | string | `page` |

### Accessibility Attributes

This component includes five default languages. When you choose one using the "lang" attribute, all accessibility settings are configured in that language, so you don't have to do anything else.

| Attribute              | Description                                              | Type                           | Default   |
| ---------------------- | -------------------------------------------------------- | ------------------------------ | --------- |
| `lang`                 | Select the language for accessibility                     | `'en', 'es', 'fr', 'de', 'it'` | `en`      |
| `accessibilityOptions` | Set up your own custom aria attributes (more info below) | `AccessibilityOptions or null` | `null`    |

*** We recommend using the lang attribute if you don't need any other languages than the ones provided by default. It's simple and compliant with WAI-ARIA standards. ***

If you want to set up your own custom aria attributes, you should use the `AccessibilityOptions` interface.
You can import it directly from the component:

```ts
import { AccessibilityOptions } from 'ng-content-carousel';
```

Here is the exact declaration of the AccessibilityOptions type:

```ts
export interface AccessibilityOptions {
  globalAriaLabel?: string;
  globalRoleDescription?: string;
  prevBtnAriaLabel?: string;
  nextBtnAriaLabel?: string;
  trackRoleDescription?: string;
  trackAriaLabel?: string;
  rangeMessage?: (first: number, last: number, total: number) => string;
};
```

Here you can see a description of every field in `AccessibilityOptions` interface.
Every field is type `string` (except rangeMessage) and `non-required`

| Property                | Description                                                                                                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `globalAriaLabel`       | `aria-label` for the global container. Useful to indicate that the user has entered a carousel component.                                                                                      |
| `globalRoleDescription` | Describes the role of the carousel region (e.g., “carousel” or “image gallery”) to assistive technologies.                                                                                     |
| `prevBtnAriaLabel`      | Label for the “previous” navigation button. Communicates its purpose to screen readers.                                                                                                        |
| `nextBtnAriaLabel`      | Label for the “next” navigation button. Communicates its purpose to screen readers.                                                                                                            |
| `trackRoleDescription`  | Describes the carousel track region that contains the sliding items (e.g., “list of items”).                                                                                                   |
| `trackAriaLabel`        | Label for the carousel track. Can be used to describe what the list contains (e.g., “featured products”).                                                                                      |
| `rangeMessage`          | Function that returns a message indicating the current visible item range in relation to the total (e.g., “Showing items 1–3 of 10”). Useful for providing dynamic feedback to screen readers. |

IMPORTANT:
- All fields are optional, so you can customize only the ones you want. Fields that have not been entered in "AccessibilityOptions" will retain their values ​​based on the selected "lang" (remember, default lang is "en")

Here you have an example of use:

```ts
import { NgContentCarousel, CarouselItemDirective, AccessibilityOptions } from 'ng-content-carousel';

@Component({
  imports: [NgContentCarousel, CarouselItemDirective],
  template: `
    <ng-content-carousel [accessibilityOptions]="accOpts()">
      <div carouselItem>
        Here goes the item content you want
      </div>
      <div carouselItem>
        Here goes the item content you want
      </div>
    </ng-content-carousel>
  `
})
class App {

  accOpts : AccessibilityOptions = {
    globalAriaLabel: 'EDIT Content carousel',
    globalRoleDescription: 'EDIT Carousel of content',
    prevBtnAriaLabel: 'EDIT Go to previous item',
    nextBtnAriaLabel: 'EDIT Go to next item',
    trackRoleDescription: 'EDIT Carousel track',
    trackAriaLabel: 'EDIT Carousel items',
    rangeMessage: (first, last, total) => `EDIT Showing items ${first} to ${last} of ${total}`,
  }
}
```

### Custom styles

You can customize styles by using different **variables in CSS**.
Some global component styles can be configured directly (see example below).

| CSS Variable                 | Description                                                              | Default                   |
| ---------------------------- | ------------------------------------------------------------------------ | ------------------------- |
| `-carousel-accent-color`     | Color for arrows and focus-visible in focuseable items     | `currentColor`                    |
| `--carousel-arrows-solid-bg`   | Background for arrow buttons when `arrowStyle` is `'solid'`           | `#444444`                  |
| `--carousel-arrows-hover-bg`  | Arrows hover background even for `'solid' or 'minimal' arrowStyle attribute`                      | `#acacac`                 |
| `--carousel-arrows-hover-color`   | Change the color of the arrows when hover (initialy it doesnt change) | `var(--carousel-accent-color)`
| `--carousel-transition-time`   | Change the transition time when the carousel moves | `.3s`

Examples of use:

```css
ng-content-carousel{
  margin: 1rem; //Example of property you can change directly for the whole component
  --carousel-accent-color: green;
  --carousel-arrows-solid-bg: red;
  --carousel-arrows-hover-bg: #a538a5;
  --carousel-arrows-hover-color: #ffffff;
  --carousel-transition-time: 1s;
}
```

When using the `carouselItem` directive, a predefined class is added to each element: `.carousel-item`.
This class have some predefined properties:

```css
:host ::ng-deep .carousel-item:focus-visible{
  outline: 2px solid var(--carousel-accent-color);
  outline-offset: -2px;
  border-radius: 4px;
}

:host ::ng-deep .carousel-item{
  padding: 1rem;
}
```

You can change this initial properties if you want simply using the class in you component:

```css
ng-content-carousel .carousel-item{
  background-color: blue;
}
```

**IMPORTANT**: the component itselfs calculate his width related to items width. If you want to give space between items, use `padding`.
**IMPORTANT**: Ideally you will the label with the `carouselItem` directive as a item container and, if you want to add several labels into it, it is appropiate to use another container inside. For example:

```html
<ng-content-carousel [accessibilityOptions]="accOpts()">
  <div carouselItem> // Use this as a item container => predefine position, padding...
    <div class=""> // Use another container for the content itself
      <span>Top content</span>
      <span>Middle content</span>
      <span>Bottom content</span>
    </div>
  </div>
</ng-content-carousel>
```

## Report or suggest something

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/universalux/uux-hub/issues/new/choose).

## License
MIT
