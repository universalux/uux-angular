<p align="center">
  <a href="https://www.npmjs.com/~universalux" target="_blank" rel="noreferrer noopener">
    <img src="https://github.com/universalux/uux-hub/blob/main/assets/components/angular/ng-link-button/ng-link-button-cover.png?raw=true" alt="NgLinkButton cover">
  </a>
</p>

# NgLinkButton - Angular link button

**ng-link-button** is a **standalone, reusable and customizable component** for Angular 18, 19 and 20.

It is designed to work with **signals** and Angular **zoneless**, providing a lightweight, flexible, and accessible link button. It is also fully compatible with **SSR, CSR and prerender**.

## Table of Contents

* [Installation](#installation)
* [Basic Usage](#basic-usage)
* [Advanced Usage](#advanced-usage)
  - [Router Link attributes](#router-link-attributes)
  - [Href attributes](#href-attributes)
  - [Style and behavior Attributes](#style-and-behavior-attributes)
  - [Accessibility Attributes](#accessibility-attributes)
  - [Custom Styles](#custom-styles)
* [Report or suggest something](#report-or-suggest-something)

## Installation

If you want to install the latest version (currently 20):
```bash
npm install ng-link-button
```

Angular 19:
```bash
npm install ng-link-button@v19-lts
```

Angular 18:
```bash
npm install ng-link-button@v18-lts
```

## Basic Usage

Using `ng-link-button` is simple. You just have to add desired content as children of the component and control its behavior, style and accessibility using some attributes and css variables.

```html
<ng-link-button routerLink="home" type="solid" shape="square">
  Link button inner content
</ng-link-button>
```

```ts
import { NgLinkButton } from 'ng-link-button';

@Component({
  selector: 'app',
  imports: [ NgLinkButton ],
  template: `
    <ng-link-button routerLink="home" type="solid" shape="square">
      Link button inner content
    </ng-link-button>
  `,
})
```

## Advanced Usage

You can define the link’s destination using either href or routerLink,
just like you would with a standard `<a>` tag in Angular.

### Router Link Attributes

| Input                 | Description                                                                                                                                            | Type                                | Default     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ----------- |
| `routerLink`          | The route to navigate when the link is clicked. Accepts a string or an array of route segments.                                                        | `string \| any[] \| null`           | `null`      |
| `queryParams`         | Defines the query parameters to pass when navigating with the `routerLink`.                                                                            | `Record<string, any> \| null`       | `null`      |
| `fragment`            | Sets the URL fragment (the part after `#`) to navigate to within the target page.                                                                      | `string \| undefined`               | `undefined` |
| `relativeTo`          | Defines the `ActivatedRoute` from which relative navigation paths should be resolved. Useful for child routes.                                         | `ActivatedRoute \| null`            | `null`      |
| `queryParamsHandling` | Determines how query parameters should be handled when navigating. `'merge'` merges new params with existing ones, `'preserve'` keeps existing params. | `'merge' \| 'preserve' \| null`     | `null`      |
| `state`               | Passes a custom navigation state object that can be accessed after navigation using the browser’s history API.                                         | `{ [k: string]: any } \| undefined` | `undefined` |


### Href Attributes

| Input    | Description                                                                                                                                                           | Type                                                   | Default                 |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------- |
| `href`   | Specifies the external URL that the link should navigate to when clicked. Only used when no `routerLink` is provided.                                                 | `string \| null`                                       | `null`                  |
| `target` | Defines where to open the linked document. Common values are `_blank` (new tab), `_self`, `_parent`, and `_top`.                                                      | `'_self' \| '_blank' \| '_parent' \| '_top' \| string` | `'_blank'`              |
| `rel`    | Specifies the relationship between the current document and the linked one. Recommended values like `noreferrer` and `noopener` improve security when using `_blank`. | `string`                                               | `'noreferrer noopener'` |

### Style and behavior Attributes

| Input       | Description                                       | Type                                | Default     |
| ----------- | ------------------------------------------------- | ----------------------------------- | ----------- |
| `type`      | Defines the visual style of the button.           | `'solid' \| 'minimal' \| 'outline'` | `'solid'`   |
| `shape`     | Determines the button’s corner style.             | `'rounded' \| 'square'`             | `'rounded'` |
| `hover`     | Controls the hover interaction effect.            | `'color' \| 'scale' \| 'outline'`   | `'color'`   |
| `direction` | Sets the layout direction for the button content. | `'row' \| 'column'`                 | `'row'`     |


### Accessibility Attributes

| Input         | Description                                                           | Type                                 | Default |
| ------------- | --------------------------------------------------------------------- | ------------------------------------ | ------- |
| `ariaLabel`   | Provides an accessible label for assistive technologies.              | `string \| null`                     | `null`  |
| `title`       | Sets the native `title` attribute for tooltip or accessibility.       | `string \| null`                     | `null`  |
| `tabIndex`    | Controls the element’s position in the tab order.                     | `number \| null`                     | `null`  |
| `ariaCurrent` | Indicates the current item within a set (e.g., current page or step). | `'page' \| 'step' \| 'true' \| null` | `null`  |
| `download`    | Specifies that the link should be downloaded instead of navigated.    | `string \| boolean \| null`          | `null`  |
| `role`        | Defines the ARIA role of the element.                                 | `'link' \| 'button' \| null`         | `null`  |
| `disabled`    | Disables the button and prevents interaction.                         | `boolean`                            | `false` |

### Custom Styles

You can add some global styles directly on the component (see example bellow) and we’ve also prepared some useful CSS variables to handle style and behavior:

| Variable                            | Description                                                 | Default Value                      |
| ----------------------------------- | ----------------------------------------------------------- | ---------------------------------- |
| `--link-button-color`             | Defines the internal color of the button.             | `inherit`                       |
| `--link-button-bg`             | Defines the internal background color of the button.             | `depends on type`                       |
| `--link-button-width`             | Defines the width of the button.             | `fit-content`                       |
| `--link-button-justify-content`   | Defines how inner content is align.             | `center`                       |
| `--link-button-outline`        | Defines the outline of the button.                 | `depends on type`                       |
| `--link-button-padding`             | Defines the internal padding of the button.                 | `.5rem 1rem`                       |
| `--link-button-flex-gap`            | Sets the horizontal space between icon and text.            | `.5rem`                            |
| `--link-button-transition-duration` | Controls the transition speed for hover and active effects. | `0.2s`                             |
| `--link-button-hover-bg`            | Background color on hover.                                  | `#9e9e9e`                          |
| `--link-button-hover-color`         | Text color on hover.                                        | `inherit`                          |
| `--link-button-hover-outline`       | Outline style on hover.                                     | `1px solid rgb(209, 70, 70)`       |
| `--link-button-hover-scale`         | Scale transform applied on hover.                           | `1.05`                             |
| `--link-button-active-bg`           | Background color when active (pressed).                     | `var(--link-button-hover-bg)`      |
| `--link-button-active-color`        | Text color when active.                                     | `inherit`                          |
| `--link-button-active-outline`      | Outline style when active.                                  | `var(--link-button-hover-outline)` |
| `--link-button-active-scale`        | Scale transform applied when active.                        | `1.02`                             |

Here you have an example of usage:

```css
ng-link-button{

  background: red; //Only affects to type='solid'
  margin: 5px;
  box-shadow: 3px 3px 10px black;
  border-radius: 100px; //Only affects to shape='rounded'

  --link-button-width: 100%;
  --link-button-justify-content: start;
  --link-button-color: red;
  --link-button-outline: 2px solid yellow;
  --link-button-bg: blue; // Affects to all types
  --link-button-padding: .5rem 1rem;
  --link-button-flex-gap: .5rem;
  --link-button-transition-duration: 0.2s;

  --link-button-hover-bg: red;
  --link-button-hover-color: inherit;
  --link-button-hover-outline: 1px solid #824dfe;
  --link-button-hover-scale: 1.05;

  --link-button-active-bg: green;
  --link-button-active-color: inherit;
  --link-button-active-outline: 2px solid blue;
  --link-button-active-scale: 1.02;

}
```

You can set the style only for certain "type" link buttons this way:

```css
ng-link-button[type="solid"]{
  --link-button-bg: orange;
}
```

If you have several link buttons and you need diferent custom styles, we recomend you to add a class so you can narrow down elements. For example:

```css
ng-link-button.myClass{
  --link-button-outline: 2px solid orange;
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
