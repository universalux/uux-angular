<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-menu-toggle/ng-menu-toggle-cover.gif?raw=true" alt="NgMenuToggle cover">
  </a>
</p>

# NgMenuToggle - Angular Menu toggle button

**ng-menu-toggle** is a **standalone, reusable and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible menu toggle button. It is also fully compatible with **SSR, CSR and prerender**.

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

Using `ng-menu-toggle` is easy:
- Provide a complete signal to the `[isOpenSignal]` input and the component will handle the state automatically.
- Configure its type, shape, hover behavior, and accessibility using inputs.
- Style it with customizable CSS variables to match your design needs.

Here’s a basic usage example:

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

## Functionality

As shown in the example above, you can use the `[isOpenSignal]` input to manage your open state signal.

It’s important to provide the entire signal (not just its value, e.g. isOpen()) because the component itself changes the value of the signal when clicking on it.

## Inputs and Outputs

Here is a list of all input/output:

### Functionality Input

| **Input**        | **Description**                                                  | **Default** |
| ---------------- | ---------------------------------------------------------------- | ----------- |
| `isOpenSignal`   | Provides the writable signal that controls the open/close state. | —           |

### Style & Behavior Inputs

| **Input**   | **Description**                                                | **Default** |
| ----------- | -------------------------------------------------------------- | ----------- |
| `type`      | Defines the toggle’s visual style (`dots`, `bars`, or `uneven`). | `'bars'`    |
| `invert`    | Inverts the toggle colors when set to `true`.                  | `false`     |
| `thin`      | Makes the toggle lines thinner.                                 | `false`     |
| `rounded`   | Applies rounded corners to the toggle lines.                    | `false`     |
| `animation` | Determines the toggle animation (`rotateX`, `rotateY`, or `soft`). | `'soft'`    |
| `faster`    | Speeds up the toggle animation when set to `true`.             | `false`     |

### Accessibility Inputs

| **Input**    | **Description**                                                         | **Default** |
| ------------ | ----------------------------------------------------------------------- | ----------- |
| `tabIndex`   | Controls the toggle’s tab order in keyboard navigation.                 | `0`         |
| `lang`       | Defines the language for built-in ARIA labels (`en`, `es`, `fr`, etc.). | `'en'`      |
| `customAria` | Provides custom ARIA labels to override default accessibility text.     | `null`      |

## Styling

You can easily customize the component’s appearance using the CSS variables listed below.

```css
ng-menu-toggle{
    --menu-toggle-size: 50px;
    --menu-toggle-color: red;
}
```

| **Variable**          | **Description**                                | **Default** |
| --------------------- | ---------------------------------------------- | ----------- |
| `--menu-toggle-size`  | Defines the toggle width and height            | `40px`      |
| `--menu-toggle-color` | Sets the main color for bars and focus outline | `black`     |

## Accessibility

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


## Contribute or report

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/universalux/uux-hub/issues/new/choose).

## License
MIT
