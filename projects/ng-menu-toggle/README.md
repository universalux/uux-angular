<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-menu-toggle/ng-menu-toggle-cover.gif?raw=true" alt="NgMenuToggle cover">
  </a>
</p>

# NgMenuToggle - Angular Menu toggle button

**ng-menu-toggle** is a **standalone, reusable and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible menu toggle button.

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
npm install ng-menu-toggle
```

Angular 19:
```bash
npm install ng-menu-toggle@v19-lts
```

Angular 18:
```bash
npm install ng-menu-toggle@v18-lts
```

## Basic Usage

Using `ng-menu-toggle` is very simple. Only one input is required: `[isOpenSignal]`.
All other assignable attributes are explained below and are for you to customize to your liking.

| Prop              | Description             | Type                       | Default |
| ----------------- | ----------------------- | -------------------------- | ------- |
| `isOpenSignal`    | Menu isOpen signal      | `WritableSignal<boolean>`  | `none`  |

Here is a simple example of use:

```ts
import { Component, signal } from '@angular/core';
import { NgMenuToggle } from 'ng-menu-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgMenuToggle],
  template: `
    <ng-menu-toggle
      [isOpenSignal]="menuOpen"
    />
  `
})
export class App {
  menuOpen = signal<boolean>(false);
}`
```

## Advanced Usage

In addition to `[isOpenSignal]`, `ng-menu-toggle` provides several `optional attributes` to customize its appearance and behavior.

```html
<ng-menu-toggle
  [isOpenSignal]="menuOpen"
  type="uneven"
  invert="true"
  [thin]="true"
  [rounded]="true"
  animation="rotateY"
  [faster]="true"
  [tabIndex]="1"
  lang="fr"
  [customAria]="{
    ariaLabelOpened: 'Edited Opened aria label',
    ariaLabelClosed: 'Edited Closed aria label'
  }"
/>
```

### Style and behavior attributes

| Input       | Description                                                | Type    | Default   |
| ----------- | ---------------------------------------------------------- | ------- | --------- |
| `type`      | Button design: `'bars'`, `'dots'`, `'uneven'`              | string  | `'bars'`  |
| `invert`    | Mirror effect. Usefull when `type="uneven"`                | boolean | `false`   |
| `thin`      | It makes lines or dots thinner                             | boolean | `false`   |
| `[rounded]` | Rounded borders                                            | boolean | `false`   |
| `animation` | Animation style: `'rotateX'`, `'rotateY'`, `'soft'`        | string  | `'soft'`  |
| `[faster]`  | Speeds up the rotate animation if `rotateX` or `rotateY`   | boolean | `false`   |


### Accessibility attributes

There are two ways of setting the aria-label attributes: `by lang attribute` or `by customAria attribute`

| Input        | Description                    | Type                             | Default   |
| ------------ | ------------------------------ | -------------------------------- | --------- |
| `lang`       | Aria labels predefine language | `MenuToggleLangs`                | `'en'`    |
| `customAria` | Aria labels custom content     | `MenuToggleCustomAria` or `null` | `none`    |

- If needed, you can import `MenuToggleLangs` and `MenuToggleCustomAria` types like this:
```ts
import { NgMenuToggle, MenuToggleLangs, MenuToggleCustomAria } from 'ng-menu-toggle';
```

#### 1. `lang` attribute:

The component includes **five predefined languages** for accessibility labels that you can set easily with the `lang attribute`:

| Language           | Code | Example                               |
|------------------- | ---- | --------------------------------------|
| English (default)  | `en` | `"Open menu" / "Close menu"`          |
| Spanish            | `es` | `"Abrir menú" / "Cerrar menú"`        |
| Italian            | `it` | `"Apri menu" / "Chiudi menu"`         |
| French             | `fr` | `"Ouvrir le menu" / "Fermer le menu"` |
| German             | `de` | `"Menü öffnen" / "Menü schließen"`    |

> 💡 If no value is provided in `lang`, the default language is **English (`en`)**. <br>
> 💡 If your application supports `multiple languages`, you can bind the lang attribute to a signal and link it with a `select`, for example.

#### 2. `customAria` attribute:

In addition to the predefined languages available through the `lang` attribute, you can fully **customize the ARIA labels** for your menu button by using the `customAria` input.

This option gives you full control over the **text announced by screen readers** when the menu is opened or closed — perfect for custom translations, accessibility improvements, or when you want to use a language that is not included in the predefined set.

---

##### 🧩 Example usage

```html
<ng-menu-toggle
  [customAria]="{
    ariaLabelOpened: 'Custom - Hide navigation',
    ariaLabelClosed: 'Custom - Show navigation'
  }"
/>
```

> 💡 Remember that what is indicated in the `customAria` attribute replaces the default language set in `lang`. <br>
> 💡 If you only set one of the properties, the other will use the label from the current `lang`.


### Custom styles

#### Custom styles by css variables

You can customize `size` and `color` by using css variables.

```css
ng-menu-toggle{
    --menu-toggle-size: 50px;
    --menu-toggle-color: red;
}
```
If not set, **default size** is `40px` and **default color** is `black`

#### Custom styles by ng-deep
You can customize styles by using ::gn-deep in css. For example:

```css
:ng-deep .menuToggle__botton{
  background color: red
}
```

##### Customizable elements

- `.menuToggle__button` → The main button element
- `.menuToggle__bar` → Individual bars inside the button
- `.menuToggle__bar--1` → Top bar
- `.menuToggle__bar--2` → Hidden bar for spacing
- `.menuToggle__bar--3` → Bottom bar
- `.menuToggle__bar--4` → Cross bar (positioned absolutely)
- `.menuToggle__bar--5` → Cross bar (positioned absolutely)

You can target different states by combining classes. For example:

```css
:ng-deep .menuToggle__button.isOpen {
  background-color: red;
}

:ng-deep .menuToggle__bar--1 {
  background-color: blue;
}

:ng-deep .menuToggle.rounded {
  border: 2px solid red;
}

:ng-deep .menuToggle__bar.dots {
  filter: drop-shadow(0 0 0.75rem red);
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
