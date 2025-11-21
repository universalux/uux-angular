<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-toggle-kit/ng-toggle-kit-cover.gif?raw=true" alt="NgToggleKit cover">
  </a>
</p>

# Angular toggle kit

**ng-toggle-kit** is a **standalone, reusable and customizable components kit** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible theme toggle button. It is also fully compatible with **SSR, CSR and prerender**.

The main purpose of this kit is to allow you to obtain different components with a single installation.

## Table of Contents

* [Included components](#included-components)
* [Installation](#installation)
* [Import](#import)
* [Contribute or Report](#contribute-or-report)

## Included components

| **Component**   | **Description**                         | **Documentation** |
| --------------- | --------------------------------------- | ----------------- |
| `NgMenuToggle`  | Toggle button to handle a menu isOpen/isClose signal  | [See doc](https://www.npmjs.com/package/ng-menu-toggle) |
| `NgThemeToggle` | Toggle button to handle a theme isDark/isLight signal  | [See doc](https://www.npmjs.com/package/ng-theme-toggle) |

## Installation

If you want to install the latest version (currently 20):
```bash
npm install ng-toggle-kit
```

Angular 19:
```bash
npm install ng-toggle-kit@v19-lts
```

Angular 18:
```bash
npm install ng-toggle-kit@v18-lts
```

## Import

You can import components of this kit lke this:

```ts
import { NgThemeToggle, ThemeToggleLangs, ThemeToggleCustomAria } from 'ng-toggle-kit';
import { NgMenuToggle, MenuToggleLangs, MenuToggleCustomAria } from 'ng-toggle-kit';
```

> See the documentation for each component to learn more about the elements in the example.

## Contribute or report

Choose the form that best fits your case:

- 🐞 [Report a bug](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_bug_report.yml)
- ✨ [Request an improvement for an existing component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=angular_feature_request.yml)
- 🧩 [Suggest a new component](https://github.com/universalux/uux-hub/issues/new?assignees=aldaydev&labels=bug&template=new_component_request.yml)

👉 Or go to the [form selector](https://github.com/universalux/uux-hub/issues/new/choose).

## License
MIT
