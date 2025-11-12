<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-content-carousel/ng-content-carousel-cover.gif?raw=true" alt="NgContentCarousel cover" />
  </a>
</p>

# NgContentCarousel - Angular Content Carousel

**ng-content-carousel** is a **standalone, reusable, responsive and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible custom content carousel. It is also fully compatible with **SSR, CSR and prerender**.

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

## Overview

Using `ng-content-carousel` is easy:
- Provide content for the carousel using de `contentCarouselItem` directive. Each element with this tag will represent one item.
- Configure its type, shape, behavior, and accessibility using inputs.
- Style it with customizable CSS variables to match your design needs.

```ts
import { NgContentCarousel, ContentCarouselItemDirective } from 'ng-content-carousel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgContentCarousel, ContentCarouselItemDirective],
  template: `
    <ng-content-carousel>
      <div contentCarouselItem >
        Here goes the item content you want
      </div>
      <div contentCarouselItem >
        Here goes the item content you want
      </div>
    </ng-content-carousel>
  `,
})
```

## Functionality

As shown in the example below, you just have to import the `ContentCarouselItemDirective` on your component and use `contentCarouselItem` on each container (this container can be any label: `<a>, <div>, <section>`... ).

> IMPORTANT: All elements should have the same `width` so the carousel mechanism works well.

## Inputs and Outputs

Here is a list of all input/ouput:

### Style & Behavior Inputs

| **Input**                  | **Description**                                          | **Default** |
| -------------------------- | -------------------------------------------------------- | ----------- |
| `transition`               | Enables or disables slide transition animation.          | `true`      |
| `advanceMode`              | Defines how the carousel advances (`single` or `page`).  | `'page'`    |
| -------------------------- | -------------------------------------------------------- | ----------- |
| `arrowStyle`               | Sets the arrow appearance (`minimal` or `solid`).        | `'minimal'` |
| `hideArrowsOnEdges`        | Hides navigation arrows when at the first or last slide. | `true`      |
| `hideArrowsWhenNoOverflow` | Hides arrows if all items fit within the carousel width. | `true`      |

### Accessibility Inputs

| **Input**    | **Description**                                                         | **Default** |
| ------------ | ----------------------------------------------------------------------- | ----------- |
| `lang`       | Defines the language for built-in ARIA labels (`en`, `es`, `fr`, etc.). | `'en'`      |
| `customAria` | Provides custom ARIA labels to override default accessibility text.     | `null`      |

## Styling

You can easily customize the component’s appearance using the CSS variables listed below.

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

| **Variable**                    | **Description**                                             | **Default**                    |
| ------------------------------- | ----------------------------------------------------------- | ------------------------------ |
| `--carousel-accent-color`       | Defines the main accent color for icons and focus outlines. | `currentColor`                 |
| `--carousel-arrows-solid-bg`    | Background color for solid-style navigation arrows.         | `#444444`                      |
| `--carousel-arrows-hover-bg`    | Background color of arrows when hovered.                    | `#acacac`                      |
| `--carousel-arrows-hover-color` | Icon color of arrows when hovered.                          | `var(--carousel-accent-color)` |
| `--carousel-transition-time`    | Duration of the carousel slide transition animation.        | `.3s`                          |

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

## Accessibility

This component includes five default languages. When you choose one using the "lang" attribute, all accessibility settings are configured in that language, so you don't have to do anything else.

| Attribute              | Description                                              | Type                           | Default   |
| ---------------------- | -------------------------------------------------------- | ------------------------------ | --------- |
| `lang`                 | Select the language for accessibility                     | `'en', 'es', 'fr', 'de', 'it'` | `en`      |
| `customAria` | Set up your own custom aria attributes (more info below) | `ContentCarouselCustomAria or null` | `null`    |

*** We recommend using the lang attribute if you don't need any other languages than the ones provided by default. It's simple and compliant with WAI-ARIA standards. ***

If you want to set up your own custom aria attributes, you should use the `customAria` interface.
You can import it directly from the component:

```ts
import { ContentCarouselCustomAria } from 'ng-content-carousel';
```

Here is the exact declaration of the ContentCarouselCustomAria type:

```ts
export interface ContentCarouselCustomAria {
  globalAriaLabel?: string;
  globalRoleDescription?: string;
  prevBtnAriaLabel?: string;
  nextBtnAriaLabel?: string;
  trackRoleDescription?: string;
  trackAriaLabel?: string;
  rangeMessage?: (first: number, last: number, total: number) => string;
};
```

Here you can see a description of every field in `ContentCarouselCustomAria` interface.
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
- All fields are optional, so you can customize only the ones you want. Fields that have not been entered in "customAria" input will retain their values ​​based on the selected "lang" (remember, default lang is "en")

Here you have an example of use:

```ts
import { NgContentCarousel, ContentCarouselItemDirective, ContentCarouselCustomAria } from 'ng-content-carousel';

@Component({
  imports: [NgContentCarousel, ContentCarouselItemDirective],
  template: `
    <ng-content-carousel [customAria]="accOpts()">
      <div contentCarouselItem>
        Here goes the item content you want
      </div>
      <div contentCarouselItem>
        Here goes the item content you want
      </div>
    </ng-content-carousel>
  `
})
class App {

  accOpts : ContentCarouselCustomAria = {
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

## Contribute or report

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/universalux/uux-hub/issues/new/choose).

## License
MIT

