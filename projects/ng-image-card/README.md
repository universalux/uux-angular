<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-image-card/ng-image-card-cover.gif?raw=true" alt="NgImageCard cover">
  </a>
</p>

# NgImageCard - Angular Customizable Image Card

**ng-image-card** is a **standalone, reusable, responsive and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible image card. It is also fully compatible with **SSR, CSR and prerender**.

## Table of Contents

* [Instalation](#installation)
* [Basic Usage](#basic-usage)
* [Advanced Usage](#advanced-usage)
  - [Slots and Sections](#slots-and-sections)
  - [Component Inputs](#component-inputs)
  - [Image Handling](#image-handling)
  - [Custom Styles](#custom-styles)
* [Report or suggest something](#report-or-suggest-something)

## Installation

If you want to install the latest version (currently 20):
```bash
npm install ng-image-card
```

Angular 19:
```bash
npm install ng-image-card@v19-lts
```

Angular 18:
```bash
npm install ng-image-card@v18-lts
```

## Basic Usage

Using `ng-image-card` is simple. You can add only the sections you need, and the card will render accordingly.

```html
<ng-image-card hover="both">
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
</ng-image-card>
```

> 💡 If you omit a section (like `card-header`), that part of the card will not be rendered.

## Advanced Usage

### Slots and Sections

`ng-image-card` provides four slots for content insertion:

| Slot           | Description                                  |
| -------------- | -------------------------------------------- |
| `card-header`  | Content to show in the header               |
| `card-image`   | Main image section                           |
| `card-body`    | Main body content                            |
| `card-footer`  | Footer content                               |

### Component Inputs

The component provides the following `inputs` to customize behavior and effects:

| Input       | Description                                  | Type                             | Default    |
| ----------- | -------------------------------------------- | -------------------------------- | ---------- |
| `animation` | Animation effect: `'translateY'`, `'fadeIn'`, `'none'` | string | `'translateY'` |
| `hover`     | Hover effect: `'scale'`, `'color'`, `'both'`, `'none'` | string | `'scale'` |
| `shadow`    | Enable/disable card shadow                   | boolean | `true` |

> These inputs are linked to CSS variables and classes that allow easy customization.

### Image Handling

For the main image inside `card-image`, you can use the provided `scaleHover` class for a smooth scale transition when hovering over the card.

```html
<section card-image>
  <img class="scaleHover" src="images/card/dog_post.png" alt="Dog">
</section>
```

### Custom Styles

You can customize styles in three different ways:

#### 1. Directly on the host tag

```css
ng-image-card {
  max-width: 280px;
  min-height: 400px;
  border: 3px solid white;
  border-radius: 3rem;
}
```

#### 2. Using CSS variables

Here we show you all the

```css
ng-image-card {
  // ----- General variables
  --card-bg: white;
  --card-fg: black;
  --card-section-padding: 16px;
  --card-image-padding-x: 0px;
  --card-footer-border-top: 0px solid currentColor;

  // ----- CSS Variables related to inputs
  // Hover
  --card-hover-velocity: .3s; //hover === 'scale' || 'color'
  --card-hover-scale: 1.03; //hover === 'scale'
  --card-hover-bg: color-mix(in srgb, var(--card-bg) 70%, #999999 30%); //hover === 'color'
  --card-hover-fg: var(--card-fg); //hover === 'color'

  // Animation
  --card-animation-delay: 0s;
  --card-animation-velocity: 1s;

  // Shadow
  --card-shadow: 3px 3px 20px color-mix(in srgb, var(--card-fg) 60%, #999999 40%);

  // ----- Section variables

  --card-header-bg: transparent;
  --card-image-bg: transparent;
  --card-body-bg: transparent;
  --card-footer-bg: transparent;

  --card-header-text-color: inherit;
  --card-body-text-color: inherit;
  --card-footer-text-color: inherit;
}
```

#### 3. Styling sections directly

```css
ng-image-card [card-header] {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

ng-image-card [card-header] img {
  width: 50px;
  border-radius: 50%;
}

ng-image-card [card-footer] {
  display: flex;
  column-gap: 0.5rem;
  justify-content: end;
}
```

## Report or suggest something

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/universalux/uux-hub/issues/new/choose).

## License
MIT

