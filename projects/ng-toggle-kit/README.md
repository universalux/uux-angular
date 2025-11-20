<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-toggle-kit/ng-toggle-kit-cover.gif?raw=true" alt="NgToggleKit cover">
  </a>
</p>

# Angular toggle kit

**ng-toggle-kit** is a **standalone, reusable and customizable components kit** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible theme toggle button. It is also fully compatible with **SSR, CSR and prerender**.

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
npm install ng-theme-toggle
```

Angular 19:
```bash
npm install ng-theme-toggle@v19-lts
```

Angular 18:
```bash
npm install ng-theme-toggle@v18-lts
```

## Overview

Using `ng-theme-toggle` is easy:
- Provide a complete signal to the `[isDarkSignal]` input and the component will handle the state automatically.
- Configure its type, shape, hover behavior, and accessibility using inputs.
- Style it with customizable CSS variables to match your design needs.

Here’s a basic usage example:

```ts
import { Component, signal } from '@angular/core';
import { NgThemeToggle } from 'ng-theme-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgThemeToggle],
  template: `
    <ng-theme-toggle
      [isDarkSignal]="isDark"
    />
  `
})
export class App {
  isDark = signal<boolean>(false);
}`
```

## Functionality

As shown in the example above, you can use the `[isDarkSignal]` input to manage your theme mode signal.

It’s important to provide the entire signal (not just its value, e.g. isDark()) because the component itself changes the value of the signal when clicking on it.

## Inputs and Outputs

Here is a list of all input/ouput:

### Functionality Input

| **Input**      | **Description**                                                    | **Default** |
| -------------- | ------------------------------------------------------------------ | ----------- |
| `isDarkSignal` | Provides the writable signal that controls the current theme mode. | —           |

### Style & Behavior Inputs

| **Input**   | **Description**                                                       | **Default** |
| ----------- | --------------------------------------------------------------------- | ----------- |
| `type`      | Defines the toggle’s visual style (`solid`, `minimal`, or `outline`). | `'minimal'` |
| `hover`     | Sets the hover effect style (`tone`, `scale`, `shadow`, or `none`).   | `'scale'`   |
| `animation` | Determines the toggle animation (`rotateX`, `rotateY`, or `soft`).    | `'soft'`    |
| `faster`    | Speeds up the toggle animation when set to `true`.                    | `false`     |

### Accessibility Inputs

| **Input**    | **Description**                                                         | **Default** |
| ------------ | ----------------------------------------------------------------------- | ----------- |
| `tabIndex`   | Controls the toggle’s tab order in keyboard navigation.                 | `0`         |
| `lang`       | Defines the language for built-in ARIA labels (`en`, `es`, `fr`, etc.). | `'en'`      |
| `customAria` | Provides custom ARIA labels to override default accessibility text.     | `null`      |

## Styling

You can easily customize the component’s appearance using the CSS variables listed below.

```css
ng-theme-toggle {
  --theme-toggle-bg: var(--global-color-from-theme);
  --theme-toggler-padding: 8px 16px;
}
```

| **Variable**                      | **Description**                                      | **Default**                       |
| --------------------------------- | ---------------------------------------------------- | --------------------------------- |
| `--theme-toggle-size`             | Defines the toggle width and height                 | `40px`                            |
| `--theme-toggle-bg`               | Background color of the button                      | Inherits light/dark mode          |
| `--theme-toggle-bg-light`         | Background in light mode                             | `transparent` / `white` *(solid)*|
| `--theme-toggle-bg-dark`          | Background in dark mode                              | `transparent` / `black` *(solid)*|
| `--theme-toggle-padding`          | Inner spacing of the button                          | `0` / `5px` *(solid/outline)*    |
| `--theme-toggle-border`           | Border style of the button                            | Inherits light/dark mode          |
| `--theme-toggle-border-light`     | Border in light mode                                  | `2px solid black`                 |
| `--theme-toggle-border-dark`      | Border in dark mode                                   | `2px solid white`                 |
| `--theme-toggle-radius`           | Controls the corner roundness                         | `50%`                             |
| `--theme-toggle-shadow`           | Box shadow of the button                               | Inherits light/dark mode          |
| `--theme-toggle-shadow-light`     | Shadow in light mode                                   | `none`                             |
| `--theme-toggle-shadow-dark`      | Shadow in dark mode                                    | `none`                             |
| `--theme-toggle-hover-transition` | Transition timing for hover effects                   | `.4s ease-in-out`                 |
| `--theme-toggle-color-transition` | Transition timing for color and stroke changes       | `.4s ease-in-out`                 |
| `--theme-toggle-color`            | Main icon color and focus outline                     | Inherits light/dark mode          |
| `--theme-toggle-color-light`      | Icon color in light mode                               | `black`                            |
| `--theme-toggle-color-dark`       | Icon color in dark mode                                | `white`                            |
| `--theme-toggle-hover-bg`         | Background on hover                                   | Inherits light/dark mode          |
| `--theme-toggle-hover-bg-light`   | Hover background in light mode                        | `#949494`                          |
| `--theme-toggle-hover-bg-dark`    | Hover background in dark mode                         | `#949494`                          |
| `--theme-toggle-hover-scale`      | Scale effect applied on hover                          | `1.05`                             |
| `--theme-toggle-hover-shadow-color-light` | Shadow color on hover in light mode            | `rgba(0, 0, 0, 0.623)`           |
| `--theme-toggle-hover-shadow-color-dark`  | Shadow color on hover in dark mode             | `rgba(255, 255, 255, 0.664)`     |
| `--theme-toggle-rays-stroke-width`| Stroke width of the SVG rays                            | `50`                               |


### 💡 **Usage Notes**

- Variables with suffixes `-light` and `-dark` are automatically applied based on the theme state (`isDark`).
- The generic variables (like `--theme-toggle-bg` or `--theme-toggle-border`) act as entry points to override both modes at once.
- You can freely mix hover effects (`hover-tone`, `hover-scale`, `hover-shadow`) for combined transitions.
- All color and transform transitions share the same easing and duration for visual consistency.

## Accessibility

There are two ways of setting the aria-label attributes: `by lang attribute` or `by customAria attribute`

| Input        | Description                    | Type                              | Default   |
| ------------ | ------------------------------ | --------------------------------- | --------- |
| `lang`       | Aria labels predefine language | `ThemeToggleLangs`                | `'en'`    |
| `customAria` | Aria labels custom content     | `ThemeToggleCustomAria` or `null` | `none`    |

- If needed, you can import `ThemeToggleLangs` and `ThemeToggleCustomAria` types like this:
```ts
import { NgThemeButton, ThemeToggleLangs, ThemeToggleCustomAria } from 'ng-theme-toggle';
```

#### 1. `lang` attribute:

The component includes **five predefined languages** for accessibility labels that you can set easily with the `lang attribute`:

| Language           | Code | Example                                                              |
|------------------- | ---- | -------------------------------------------------------------------- |
| English (default)  | `en` | `"Change to light mode" / "Change to dark mode"`                     |
| Spanish            | `es` | `"Cambiar a modo claro" / "Cambiar a modo oscuro"`                   |
| Italian            | `it` | `"Passa alla modalità chiara" / "Passa alla modalità scura"`         |
| French             | `fr` | `"Passer en mode clair" / "Passer en mode sombre"`                   |
| German             | `de` | `"Wechseln Sie zum hellen Modus" / "Wechseln Sie zum dunklen Modus"` |

> 💡 If no value is provided in `lang`, the default language is **English (`en`)**. <br>
> 💡 If your application supports `multiple languages`, you can bind the lang attribute to a signal and link it with a `select`, for example.

#### 2. `customAria` attribute:

In addition to the predefined languages available through the `lang` attribute, you can fully **customize the ARIA labels** for your theme toggle button by using the `customAria` input.

This option gives you full control over the **text announced by screen readers** when the theme is dark or light — perfect for custom translations, accessibility improvements, or when you want to use a language that is not included in the predefined set.

---

##### 🧩 Example usage

```html
<ng-theme-toggle
  [customAria]="{
    ariaLabelDark: 'Custom - set light mode',
    ariaLabelLight: 'Custom - set dark mode'
  }"
/>
```

> 💡 Remember that what is indicated in the `customAria` attribute replaces the default language set in `lang`. <br>
> 💡 If you only set one of the properties, the other will use the label from the current `lang`.

## Contribute or report

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/universalux/uux-hub/issues/new/choose).

## License
MIT
