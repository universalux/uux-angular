<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-theme-toggle/ng-theme-toggle-cover.gif?raw=true" alt="NgThemeToggle cover">
  </a>
</p>

# NgThemeToggle - Angular Theme toggle button

**ng-theme-toggle** is an **standalone, reusable and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible theme toggle button.

## Table of Contents

* [Instalation](#installation)
* [Basic Usage](#basic-usage)
* [Advanced Usage](#advanced-usage)
  - [Style and behavior attributes](#style-and-behavior-attributes)
  - [Accessibility attributes](#accessibility-attributes)
  - [Custom styles](#custom-styles)
* [Report or suggest something](#report-or-suggest-something)

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

## Basic Usage

Using `ng-theme-toggle` is very simple. Only one input is required: `[isDarkSignal]`.
All other assignable attributes are explained below and are for you to customize to your liking.

| Prop              | Description                                  | Type                       | Default |
| ----------------- | -------------------------------------------- | -------------------------- | ------- |
| `isDarkSignal`    | Dark/light mode writable signal in your app  | `WritableSignal<boolean>`  | `none`  |

Here is a simple example of use:
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

## Advanced Usage

In addition to `[isDarkSignal]`, `ng-theme-toggle` provides several `optional attributes` to customize its appearance and behavior.

```html
<ng-theme-toggle
  [isDarkSignal]="isDark"
  hover="shadow"
  animation="rotateY"
  [faster]="true"
  [tabIndex]="1"
  lang="fr"
  [customAria]="{
    ariaLabelDark: 'Edited dark aria label',
    ariaLabelLight: 'Edited light aria label'
  }"
/>
```

### Style and behavior attributes

| Input       | Description                                                | Type    | Default   |
| ----------- | ---------------------------------------------------------- | ------- | --------- |
| `hover`     | Hover style: `'scale'`, `'shadow'`, `'none'`               | string  | `'scale'` |
| `animation` | Animation style: `'rotateX'`, `'rotateY'`, `'soft'`        | string  | `'soft'`  |
| `[faster]`  | Speeds up the rotate animation if `rotateX` or `rotateY`   | boolean | `false`   |


### Accessibility attributes

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


### Custom styles

#### Custom styles by css variables

You can customize all those css properties using their variables:

```css
ng-theme-toggle{
    --theme-toggle-color-duration: 400ms;
    --theme-toggle-color-timing: linear;

    --theme-toggle-color-dark: white;
    --theme-toggle-color-light: black;

    --theme-toggle-shadow-color-dark: rgba(255, 255, 255, 0.664);
    --theme-toggle-shadow-color-light: rgba(0, 0, 0, 0.623);

    --theme-toggle-sun-stroke-width: 50;
    --theme-toggle-size: 40px;
}
```
The values you see above are the default values if you dont set them.

## 📌 Report or suggest something

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/universalux/uux-hub/issues/new/choose).


## License
MIT
