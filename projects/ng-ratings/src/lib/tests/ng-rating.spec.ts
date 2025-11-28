import { By } from '@angular/platform-browser';
import { beforeEachRatingsTest, RatingElements } from './helpers/beforeEach';
import { ItemValues, TestHostInteractive, TestHostReadOnly } from './helpers/testHosts';
import { RatingStar } from '../rating-star/rating-star';
import { DebugElement } from '@angular/core';
import { RatingHeart } from '../rating-heart/rating-heart';
import { RATING_LANG } from '../accessibility/rating.lang';
import { RatingLangs } from '../ng-ratings.types';

describe('NgRatings - ReadOnly', () => {

  let elements: RatingElements;

  beforeEach(async () => {
    elements = await beforeEachRatingsTest('readOnly');
  });

  // HELPER FUNCTIONS

  const itemValues : number[] = [3, 5, 4, 7, 10];
  interface CheckItemValues {
    iconType: any;
    interactive: boolean;
    value: number;
  }

  const checkItemValue = ({iconType, interactive, value} : CheckItemValues) => {
    console.log('CHECKING LENGTH: ', value);
    const itemList = elements.fixture.debugElement.queryAll(By.directive(iconType));
    expect(itemList.length).toBe(value);
    checkItemsFill(itemList);

    if(interactive){
      const buttonList = elements.fixture.debugElement.queryAll(By.css('.ratingItemButton'));
      expect(buttonList.length).toBe(value);
      checkButtonVote(buttonList);
    };
  };

  const checkItemsFill = (list: DebugElement[]) => {
    console.log('CHECKING ITEMS FILL');
    let average = elements.ratingsInstance.average();
    list.forEach((debugEl) => {
      const compInstance = debugEl.componentInstance as RatingHeart;
      if(average >= 1){
        expect(compInstance.itemPercentage()).toBe(100);
        average --;
      }else if(average < 1 && average > 0){
        expect(compInstance.itemPercentage()).toBe(50);
        average = 0;
      }else{
        expect(compInstance.itemPercentage()).toBe(0);
      }
    });
  };

  const checkButtonVote = (list: DebugElement[]) => {
    console.log('CHECKING BUTTON VOTE');
    list.forEach((button, index) => {
      const host = elements.hostComponent as TestHostInteractive;
      button.triggerEventHandler('mouseenter', {});
      elements.fixture.detectChanges();
      button.nativeElement.click();
      elements.fixture.detectChanges();

      expect(host.vote()).toBe(index + 1);
    })
  };

  // --------------

  it('should create', () => {
    expect(elements.fixture).toBeTruthy();
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.ratings).toBeTruthy();
    expect(elements.ratingsInstance).toBeTruthy();
    expect(elements.ratingItemButtons).toEqual([]);
    expect(elements.ratingStars).toBeTruthy();
    expect(elements.ratingHearts).toEqual([]);
  });

  it('should have initial predefined values', () => {
    expect(elements.ratingsInstance.items()).toBe(5);
    expect(elements.ratingsInstance.average()).toBe(3.5);
    expect(elements.ratingsInstance.icon()).toBe('star');
    expect(elements.ratingsInstance.readOnly()).toBe(true);
    expect(elements.ratingsInstance.lang()).toBe('en');
    expect(elements.ratingsInstance.customAria()).toBe(null);
  });

  it('should render icons depending on "items" input and adjust filled items', () => {
    const host = elements.hostComponent as TestHostReadOnly;

    //We map possible itemValues (3, 4, 5, 7, 10)
    itemValues.forEach((itemValue) => {
      // We set current value as items input on each iteration
      host.items.set(itemValue as ItemValues);
      elements.fixture.detectChanges();

      // We check functionalities with each item value
      checkItemValue({
        iconType: RatingStar,
        interactive: false,
        value: itemValue
      });
    });
  });

  it('should apply accessibility readOnly labels', () => {
    const container = elements.fixture.debugElement.query(By.css('.ratingContainer')).nativeElement as HTMLDivElement;
    expect(container.getAttribute('aria-label')).toBe(RATING_LANG['en'].containerReadOnlyAriaLabel)
  });

});

describe('NgRating - Interactive', () => {

  let elements: RatingElements;

  beforeEach(async () => {
    elements = await beforeEachRatingsTest('interactive');
  });

  // HELPER FUNCTIONS

  const itemValues : number[] = [3, 5, 4, 7, 10];
  interface CheckItemValues {
    host: any;
    iconType: any;
    isinteractive: boolean;
    value: number;
  };
  const langValues : RatingLangs[] = ['en', 'es', 'it', 'de', 'fr'];

  const checkItemValue = ({host, iconType, isinteractive, value} : CheckItemValues) => {
    console.log('CHECKING LENGTH: ', value);
    const itemList = elements.fixture.debugElement.queryAll(By.directive(iconType));
    expect(itemList.length).toBe(value);
    checkItemsFill(itemList);

    if(isinteractive){
      const buttonList = elements.fixture.debugElement.queryAll(By.css('.ratingItemButton'));
      expect(buttonList.length).toBe(value);
      checkButton(buttonList, value);
    };

    checkContainerAcc(host, isinteractive);
  };

  const checkItemsFill = (list: DebugElement[]) => {
    console.log('CHECKING ITEMS FILL');
    let average = elements.ratingsInstance.average();
    list.forEach((debugEl) => {
      const compInstance = debugEl.componentInstance as RatingHeart;
      if(average >= 1){
        expect(compInstance.itemPercentage()).toBe(100);
        average --;
      }else if(average < 1 && average > 0){
        expect(compInstance.itemPercentage()).toBe(50);
        average = 0;
      }else{
        expect(compInstance.itemPercentage()).toBe(0);
      }
    });
  };

  const checkButton = (list: DebugElement[], total: number) => {
    console.log('CHECKING BUTTON VOTE');
    list.forEach((button, index) => {
      const host = elements.hostComponent as TestHostInteractive;
      button.triggerEventHandler('mouseenter', {});
      elements.fixture.detectChanges();
      button.nativeElement.click();
      elements.fixture.detectChanges();

      expect(host.vote()).toBe(index + 1);

      checkButtonAcc(host, button, index, total);
    })
  };

  const checkContainerAcc = (host : any, interactive: boolean) => {
    console.log('CHECKING CONTAINER LANGS');

    langValues.forEach((lang) => {

      host.lang.set(lang);
      elements.fixture.detectChanges();

      const container = elements.fixture.debugElement.query(By.css('.ratingContainer')).nativeElement as HTMLDivElement;
      if(interactive){
        expect(container.getAttribute('aria-label')).toBe(RATING_LANG[lang].containerInteractiveAriaLabel);

      }else{
        expect(container.getAttribute('aria-label')).toBe(RATING_LANG[lang].containerReadOnlyAriaLabel);
      }

    });
  };

  // -----------

  const checkButtonAcc = (host: any, button: DebugElement, current: number, total : number) => {
    console.log('CHECKING BUTTON LANGS');

    langValues.forEach((lang) => {

      host.lang.set(lang);
      elements.fixture.detectChanges();

      expect(button.nativeElement.getAttribute('aria-label')).toBe(RATING_LANG[lang].buttonInteractiveAriaLabel(current + 1, total));

    });
  };

  // --------------

  it('should create', () => {
    expect(elements.fixture).toBeTruthy();
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.ratings).toBeTruthy();
    expect(elements.ratingsInstance).toBeTruthy();
    expect(elements.ratingItemButtons).toBeTruthy();
    expect(elements.ratingStars).toEqual([]);
    expect(elements.ratingHearts).toBeTruthy();
  });

  it('should have initial predefined values', () => {
    expect(elements.ratingsInstance.items()).toBe(3);
    expect(elements.ratingsInstance.average()).toBeNull();
    expect(elements.ratingsInstance.icon()).toBe('heart');
    expect(elements.ratingsInstance.readOnly()).toBe(false);
  });

  it('should render icons depending on "items" input and adjust filled items', () => {
    const host = elements.hostComponent as TestHostInteractive;

    //We map possible itemValues (3, 4, 5, 7, 10)
    itemValues.forEach((itemValue) => {
      // We set current value as items input on each iteration
      host.items.set(itemValue as ItemValues);
      elements.fixture.detectChanges();

      // We check functionalities with each item value
      checkItemValue({
        host,
        iconType: RatingHeart,
        isinteractive: true,
        value: itemValue
      });
    });
  });


});
