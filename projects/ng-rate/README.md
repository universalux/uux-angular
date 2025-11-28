<p align="center">
  <a href="https://universalux.dev" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-rate/ng-rate-cover.gif?raw=true" alt="NgRate cover">
  </a>
</p>

# NgRate - Angular Menu rating component

**ng-rate** is a **standalone, reusable and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible rating component. It is also fully compatible with **SSR, CSR and prerender**.

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
npm install ng-rate
```

Angular 19:
```bash
npm install ng-rate@v19-lts
```

Angular 18:
```bash
npm install ng-rate@v18-lts
```

Using `ng-rate` is easy:
- Set the average you want to show at `(average)` input and/or able the component to generate votes using the `[readOnly]` input (you will get the vote value through `(vote)` output) .
- Configure its type, icon, hover behavior and accessibility using inputs.
- Style it with customizable CSS variables to match your design needs.

Here’s a basic usage example:

```ts
import { Component, signal } from '@angular/core';
import { NgRate } from 'ng-rate';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgRate],
  template: `
    <ng-rate
      [average]="3.4"
      [items]="7"
      icon="heart"
      [readOnly]="false"
      [hover]="['translateY', 'scale']"
    />
  `
})
export class App {}
`
```

## Functionality

First of all, the `[items]` input specifies the total number of selectable units in the rating component. For example, if you choose [items]="3", you will have a rating of three stars/hearts.

With the [average] input, you can provide the value that the component should display as the current rating. The icons will be filled according to this value.

It is important to ensure that the average you provide matches the scale defined by [items].
For example, if items="3", the average should always be a value between 0 and 3.

### readOnly

The component supports two usage modes:
one for `displaying an average value`, and another that also allows the user to `submit a rating`.

When `[readOnly]="false"`, the component becomes interactive.
Users can move their pointer or focus with the keyboard to select a rating, and when they click or press Enter, the component emits the selected value through the `(vote)` output.

`readOnly is false by default`. If you only intend to use the component to display averages, you can enable the read-only mode by setting readOnly to true.


## Inputs and Outputs

Here is a list of all input/output:

### Functionality Inputs / Outputs

| **Input / Output** | **Description**                                                                                | **Default** |
| ------------------ | ---------------------------------------------------------------------------------------------- | ----------- |
| `items`            | Number of icons displayed in the rating. Also defines the valid range for the `average` value. | `5`         |
| `average`          | Initial average value to display, rendered according to the selected number of `items`.        | `0`         |
| `readOnly`         | If `true`, the component shows only the average; if `false`, the user can vote.                | `false`     |
| `vote`             | Emits the selected rating value when the user votes (only if not in `readOnly` mode).          | —           |


### Style & Behavior Inputs

| **Input** | **Description**                                                                                  | **Default** |
| --------- | ------------------------------------------------------------------------------------------------ | ----------- |
| `icon`    | Icon style used for each item in the rating (`star` or `heart`).                                 | `'star'`    |
| `hover`   | Hover animation applied on each item. Accepts one or several effects, or `'none'` to disable it. | `['scale']` |


### Accessibility Inputs

| **Input**    | **Description**                                                         | **Default** |
| ------------ | ----------------------------------------------------------------------- | ----------- |
| `lang`       | Defines the language for built-in ARIA labels (`en`, `es`, `fr`, etc.). | `'en'`      |
| `customAria` | Provides custom ARIA labels to override default accessibility text.     | `null`      |

## Styling

You can easily customize the component’s appearance using the CSS variables listed below.

```css
ng-rate{
  max-height: 35px;
  --rate-filled-color: blue;
  --icon-stroke-width: .4;
  --icon-empty-color: white;
}
```

| **Variable**                       | **Description**                                    | **Default**                                 |
| ---------------------------------- | -------------------------------------------------- | ------------------------------------------- |
| `--rate-shadow`                    | Drop-shadow applied to the rating container.       | `2px 2px 5px rgba(0,0,0,.548)`              |
| `--rate-hover-transition-duration` | Duration of the hover animation on icons.          | `.3s`                                       |
| `--rate-focus-ring`                | Outline style applied when an item receives focus. | `2px solid var(--rate-stroke-color, white)` |
| `--rate-item-x-padding`            | Horizontal spacing between each icon.              | `.3rem`                                     |
| `--rate-filled-color` | Fill color used for the filled portion of icons. | `gold` (stars), `red` (hearts) |
| `--rate-stroke-color` | Stroke color applied to icon outlines.           | `white`                        |
| `--rate-stroke-width` | Width of the icon stroke.                        | `.7`                           |
| `--rate-empty-color`  | Color for the unfilled portion of icons.         | `transparent`                  |


## Accessibility

This component includes five default languages. When you choose one using the `lang` input, all accessibility settings are configured in that language, so you don't have to do anything else.

*** We recommend using the lang input if you don't need any other languages than the ones provided by default. It's simple and compliant with WAI-ARIA standards. ***

If you want to set up your own custom aria attributes, you should use the `RateCustomAria` interface.
You can import it directly from the component:

```ts
import { RateCustomAria } from 'ng-hero-carousel';
```

Here is the exact declaration of the HeroCarouselCustomAria type:

```ts
export interface RateCustomAria {
  containerReadOnlyAriaLabel?: string;
  containerInteractiveAriaLabel?: string;
  buttonInteractiveAriaLabel?: (value: number, total: number) => string;
};
```
Here you can see a description of every field in `RateCustomAria` interface.
Every field is type `string` (except buttonInteractiveAriaLabel) and `non-required`

| **Property**                    | **Description**                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `containerReadOnlyAriaLabel`    | `aria-label` for the rating container when the component is in read-only mode.                        |
| `containerInteractiveAriaLabel` | `aria-label` for the rating container when interaction (voting) is allowed.                           |
| `buttonInteractiveAriaLabel`    | Function that returns the `aria-label` for each interactive rating button (receives value and total). |

IMPORTANT:
- All fields are optional, so you can customize only the ones you want. Fields that have not been entered in "AccessibilityOptions" will retain their values ​​based on the selected "lang" (remember, default lang is "en")

Here you have an example of use:

```ts
import { NgRate, RateCustomAria } from 'ng-hero-carousel';

@Component({
  imports: [NgHeroCarousel],
  template: `
    <ng-rate
      [items]="4"
      [average]="2.5"
      [customAria]="accOpts()"
    />
  `
})
class App {

  accOpts = signal<RateCustomAria>({
    containerReadOnlyAriaLabel: 'CUSTOM - Average rating',
    buttonInteractiveAriaLabel: (value, total) =>
        `CHANGED - Select ${value} of ${total}`
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
