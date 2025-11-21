<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-uux/ng-uux-cover.png?raw=true" alt="NgUux cover">
  </a>
</p>

# Angular UUX components collection

**ng-uux** is a **standalone, reusable and customizable components collection** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible components. It is also fully compatible with **SSR, CSR and prerender**.

The main purpose of this kit is to allow you to obtain all UUX components with a single installation.

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
| `NgSimpleButton` | Simple button which execute a function   | [See doc](https://www.npmjs.com/package/ng-simple-button) |
| `NgLinkButton`   | Button to navigate by href or routerLink | [See doc](https://www.npmjs.com/package/ng-link-button) |
| `NgContentCard`  | A customizable content card | [See doc](https://www.npmjs.com/package/ng-content-card) |
| `NgContentCarousel`  | A customizable content carousel | [See doc](https://www.npmjs.com/package/ng-content-carousel) |
| `NgHeroCarousel`  | A customizable carousel for hero sections | [See doc](https://www.npmjs.com/package/ng-hero-carousel) |
| `NgScrollNav`  | A responsive scrollable nav | [See doc](https://www.npmjs.com/package/ng-scroll-nav) |
| `NgExpand`  | An expandable component | [See doc](https://www.npmjs.com/package/ng-expand) |


## Installation

If you want to install the latest version (currently 20):
```bash
npm install ng-uux
```

Angular 19:
```bash
npm install ng-uux@v19-lts
```

Angular 18:
```bash
npm install ng-uux@v18-lts
```

## Import

You can import components of this kit lke this:

```ts
import { NgThemeToggle, ThemeToggleLangs, ThemeToggleCustomAria } from 'ng-uux';
import { NgMenuToggle, MenuToggleLangs, MenuToggleCustomAria } from 'ng-uux';
import { NgLinkButton } from 'ng-uux';
import { NgSimpleButton } from 'ng-uux';
import { NgContentCard } from 'ng-uux';
import { NgContentCarousel, ContentCarouselLangs, ContentCarouselCustomAria, ContentCarouselItemDirective } from 'ng-uux';
import { NgHeroCarousel, HeroCarouselLangs, HeroCarouselCustomAria, SlideForDirective } from 'ng-uux';
import { NgScrollNav, ScrollNavLangs, ScrollNavCustomAria } from 'ng-uux';
import { NgExpand } from 'ng-uux';
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
