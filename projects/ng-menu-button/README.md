

<p align="center">
  <a href="https://alday.dev" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-menu-button/ng-menu-button-cover.gif?raw=true" alt="NgMenuButton cover">
  </a>
</p>

# NgxMenuToggler - Angular Menu Toggler

`ngx-menu-toggler` is an **standalone, reusable and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible menu toggler.


## Installation

If you want to install the latest version (currently 20):
```bash
npm install ngx-menu-toggler
```

Angular 19:
```bash
npm install ngx-menu-toggler@angular19
```

Angular 18:
```bash
npm install ngx-menu-toggler@angular18
```

## Basic Usage

Using `ngx-menu-toggler` is very simple. Only two inputs/outputs are required: `[isOpen]` and `(setIsOpen)`.
All other assignable attributes are explained below and are for you to customize to your liking.

| Prop         | Description              | Type                       | Default |
| ------------ | ------------------------ | -------------------------- | ------- |
| `isOpen`     | Current isOpen value     | `boolean`                  | `false` |
| `setIsOpen`  | Toggle the isOpen value  | `(value: boolean) => void` |    X    |

Here is a simple example of use:

```ts
import { Component, signal } from '@angular/core';
import { NgxMenuToggler } from 'ngx-menu-toggler';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxMenuToggler],
  template: `
    <ngx-menu-toggler
      [isOpen]="menuOpen()"
      (setIsOpen)="menuOpen.set($event)"
    />
  `
})
export class App {
  menuOpen = signal<boolean>(false);
}`
```

## Advanced Usage / Optional Attributes

In addition to `[isOpen]` and `(setIsOpen)`, `ngx-menu-toggler` provides several optional attributes to customize its appearance and behavior.

```html
<ngx-menu-toggler
  [isOpen]="menuOpen()"
  (setIsOpen)="menuOpen.set($event)"
  type="uneven"
  invert="true"
  [thin]="true"
  [rounded]="true"
  color="#FF5733"
  animation="rotateY"
  [faster]="true"
  [tabIndex]="1"
  ariaLabelOpened="Close menu"
  ariaLabelClosed="Open menu"
/>
```

### Style Options

| Input       | Description                                         | Type    | Default   |
| ----------- | --------------------------------------------------- | ------- | --------- |
| `type`      | Toggler design: `'bars'`, `'dots'`, `'uneven'`      | string  | `'bars'`  |
| `invert`    | Mirror effect when `type="uneven"`                  | boolean | `false`   |
| `thin`      | It makes lines or dots thinner                      | boolean | `false`   |
| `[rounded]` | Rounded borders                                     | boolean | `false`   |
| `color`     | Toggler color                                       | string  | `'black'` |
| `animation` | Animation style: `'rotateX'`, `'rotateY'`, `'soft'` | string  | `'soft'`  |
| `[faster]`  | Speeds up the rotate animation                      | boolean | `false`   |


### Accessibility Options

| Input             | Description                              | Type   | Default        |
| ----------------- | ---------------------------------------- | ------ | -------------- |
| `[tabIndex]`      | Controls the button `tabindex` attribute | number | `0`            |
| `ariaLabelOpened` | Custom `aria-label` when menu is opened  | string | `'Close menu'` |
| `ariaLabelClosed` | Custom `aria-label` when menu is closed  | string | `'Open menu'`  |

The component is already optimized for accessibility by default.

## Advance custom styles


### Custom size
This component comes with an initial size of 40px. You can easily change its size by setting the --menu-toggler-size CSS variable. For example:

```css
ngx-menu-toggler{
    --menu-toggler-size: 40px;
}
```
### Custom styles
You can customize styles by using ::gn-deep in css. For example:

```css
:ng-deep .ngxMenuToggler__button{
  background color: red
}
```

### Customizable elements

- `.ngxMenuToggler__button` → The main button element
- `.ngxMenuToggler__bar` → Individual bars inside the button
- `.ngxMenuToggler__bar--1` → Top bar
- `.ngxMenuToggler__bar--2` → Hidden bar for spacing
- `.ngxMenuToggler__bar--3` → Bottom bar
- `.ngxMenuToggler__bar--4` → Cross bar (positioned absolutely)
- `.ngxMenuToggler__bar--5` → Cross bar (positioned absolutely)

You can target different states by combining classes. For example:

```css
:ng-deep .ngxMenuToggler__button.isOpen {
  background-color: red;
}

:ng-deep .ngxMenuToggler__bar--1 {
  background-color: blue;
}

:ng-deep .ngxMenuToggler__bar.rounded {
  border: 2px solid red;
}

:ng-deep .ngxMenuToggler__bar.dots {
  filter: drop-shadow(0 0 0.75rem red);
}
```

## 📌 Report or suggest something

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/aldaydev/ngx-components-issues/issues/new?template=bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/aldaydev/ngx-components-issues/issues/new?template=feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/aldaydev/ngx-components-issues/issues/new?template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/aldaydev/ngx-components-issues/issues/new/choose).


## License
MIT
