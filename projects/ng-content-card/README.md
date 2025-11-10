<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-content-card/ng-content-card-cover.gif?raw=true" alt="NgContentCard cover">
  </a>
</p>

# NgContentCard - Angular Customizable content Card

**ng-content-card** is a **standalone, reusable, responsive and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible content card. It is also fully compatible with **SSR, CSR and prerender**.

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
npm install ng-content-card
```

Angular 19:
```bash
npm install ng-content-card@v19-lts
```

Angular 18:
```bash
npm install ng-content-card@v18-lts
```

## Overview

Using `ng-content-card` is easy:
- You can add only the sections you need (using the projection attribute, such as card-header, card-image, etc.) and the card will render accordingly.
- Configure its behavior, style and accessibility using inputs.
- Style it with customizable CSS variables to match your design needs.

```html
<ng-content-card hover="both">
  <header card-header>
    Header Content
  </header>
  <section card-image>
    <img class="scaleHover" src="images/card/dog_post.png" alt="Dog">
  </section>
  <section card-body>
    Body content
  </section>
  <footer card-footer>
    Footer content
  </footer>
  <div absolute-content>
    Extra content
  </footer>
</ng-content-card>
```

## Functionality

As shown in the example below, you just have to add content using the projection attributes: `card-header`, `card-image`, `card-body`, `card-footer` and `absolute-content`.

You can add only sections needed (e.g only `card-image` and `card-footer`).

| Slot                | Description                                  |
| ------------------- | -------------------------------------------- |
| `card-header`       | Content to show in the header                |
| `card-image`        | Main image section                           |
| `card-body`         | Main body content                            |
| `card-footer`       | Footer content                               |
| `absolute-content`  | Extra content with position absolute         |

For the main image inside `card-image`, you can use the provided `scaleHover` class for a smooth scale transition when hovering over the card.

```html
<section card-image>
  <img class="scaleHover" src="images/card/dog_post.png" alt="Dog">
</section>
```

## Inputs and Outputs

Here is a list of all input/ouput:

| **Input**   | **Description**                                                 | **Default**    |
| ----------- | --------------------------------------------------------------- | -------------- |
| `animation` | Entrance animation effect: `'translateY'`, `'fadeIn'`, `'none'` | `'translateY'` |
| `hover`     | Hover effect: `'scale'`, `'color'`, `'both'`, `'none'`          | `'scale'`      |
| `shadow`    | Enable/disable card shadow                                      | `true`         |

## Styling

You can customize styles in three different ways:

#### 1. Directly on the host tag

```css
ng-content-card {
  max-width: 280px;
  min-height: 400px;
  border: 3px solid white;
  border-radius: 3rem;
}
```

#### 2. Using CSS variables

```css
ng-content-card {
  --card-bg: white;
  --card-fg: black;
}
```

| Variable                       | Description                                                    | Default                  | Related to |
| ------------------------------ | -------------------------------------------------------------- | ------------------------ | ---------- |
| **`--card-bg`**                | Background color of the entire card                            | `white`                  | General    |
| **`--card-fg`**                | Foreground (text) color of the card                            | `black`                  | General    |
| **`--card-section-padding`**   | Internal padding for each section (`header`, `body`, `footer`) | `16px`                   | General    |
| **`--card-image-padding-x`**   | Horizontal padding for the image container                     | `0px`                    | General    |
| **`--card-footer-border-top`** | Top border of the footer section                               | `0px solid currentColor` | General    |

| Variable                    | Description                                                     | Default                                               | Related to |
| --------------------------- | --------------------------------------------------------------- | ----------------------------------------------------- | ---------- |
| **`--card-hover-velocity`** | Transition duration applied on hover                            | `.3s`                                                 | Hover      |
| **`--card-hover-scale`**    | Scale factor when hovering (if `hover='scale'`)                 | `1.03`                                                | Hover      |
| **`--card-hover-bg`**       | Background color on hover (if `hover='color'` or `'both'`)      | `color-mix(in srgb, var(--card-bg) 70%, #999999 30%)` | Hover      |
| **`--card-hover-fg`**       | Foreground/text color on hover (if `hover='color'` or `'both'`) | `var(--card-fg)`                                      | Hover      |

| Variable                        | Description                                | Default | Related to |
| ------------------------------- | ------------------------------------------ | ------- | ---------- |
| **`--card-animation-delay`**    | Delay before the entrance animation starts | `0s`    | Animation  |
| **`--card-animation-velocity`** | Duration of the entrance animation         | `1s`    | Animation  |

| Variable            | Description                           | Default                                                            | Related to |
| ------------------- | ------------------------------------- | ------------------------------------------------------------------ | ---------- |
| **`--card-shadow`** | Box-shadow applied when `shadow=true` | `3px 3px 20px color-mix(in srgb, var(--card-fg) 60%, #999999 40%)` | Shadow     |

| Variable                       | Description                            | Default       | Related to |
| ------------------------------ | -------------------------------------- | ------------- | ---------- |
| **`--card-header-bg`**         | Background color of the header section | `transparent` | Sections   |
| **`--card-image-bg`**          | Background color of the image section  | `transparent` | Sections   |
| **`--card-body-bg`**           | Background color of the body section   | `transparent` | Sections   |
| **`--card-footer-bg`**         | Background color of the footer section | `transparent` | Sections   |
| **`--card-header-text-color`** | Text color inside the header section   | `inherit`     | Sections   |
| **`--card-body-text-color`**   | Text color inside the body section     | `inherit`     | Sections   |
| **`--card-footer-text-color`** | Text color inside the footer section   | `inherit`     | Sections   |


#### 3. Styling sections directly

```css
ng-content-card [card-header] {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

ng-content-card [card-header] img {
  width: 50px;
  border-radius: 50%;
}

ng-content-card [card-footer] {
  display: flex;
  column-gap: 0.5rem;
  justify-content: end;
}
```

## Accessibility

Since the content within the card is entered externally, you must manage the accessibility of the entered items yourself, if necessary.

## Contribute or report

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/universalux/uux-hub/issues/new/choose).

## License
MIT
