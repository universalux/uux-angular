import { AccessibilityOptions } from "../../ng-content-carousel.types";

export const carouselItemsMock : string[] = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
  'Item 11',
  'Item 12',
  'Item 13',
  'Item 14',
];

export const externalItemSize : number = 100;

export const initialItemPadding: number = 16 * 2;

export const customAccesibilityOptions : AccessibilityOptions = {
  globalAriaLabel: 'EDIT Content carousel',
  globalRoleDescription: 'EDIT Carousel of content',
  prevBtnAriaLabel: 'EDIT Go to previous item',
  nextBtnAriaLabel: 'EDIT Go to next item',
  trackRoleDescription: 'EDIT Carousel track',
  trackAriaLabel: 'EDIT Carousel items',
  rangeMessage: (first, last, total) => `EDIT Showing items ${first} to ${last} of ${total}`,
};
