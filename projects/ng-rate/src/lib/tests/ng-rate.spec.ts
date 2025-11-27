import { By } from '@angular/platform-browser';
import { beforeEachRateTest, RateElements } from './helpers/beforeEach';
import { ItemValues, TestHostInteractive, TestHostReadOnly } from './helpers/testHosts';
import { RateStar } from '../rate-star/rate-star';
import { DebugElement } from '@angular/core';
import { RateHeart } from '../rate-heart/rate-heart';
import { RATE_LANG } from '../accessibility/rate.lang';
import { RateLangs } from '../ng-rate.types';

describe('NgRate - ReadOnly', () => {

  let elements: RateElements;

  beforeEach(async () => {
    elements = await beforeEachRateTest('readOnly');
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
      const buttonList = elements.fixture.debugElement.queryAll(By.css('.rateItemButton'));
      expect(buttonList.length).toBe(value);
      checkButtonVote(buttonList);
    };
  };

  const checkItemsFill = (list: DebugElement[]) => {
    console.log('CHECKING ITEMS FILL');
    let average = elements.rateInstance.average();
    list.forEach((debugEl) => {
      const compInstance = debugEl.componentInstance as RateHeart;
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
    expect(elements.rate).toBeTruthy();
    expect(elements.rateInstance).toBeTruthy();
    expect(elements.rateItemButtons).toEqual([]);
    expect(elements.rateStars).toBeTruthy();
    expect(elements.rateHearts).toEqual([]);
  });

  it('should have initial predefined values', () => {
    expect(elements.rateInstance.items()).toBe(5);
    expect(elements.rateInstance.average()).toBe(3.5);
    expect(elements.rateInstance.icon()).toBe('star');
    expect(elements.rateInstance.readOnly()).toBe(true);
    expect(elements.rateInstance.lang()).toBe('en');
    expect(elements.rateInstance.customAria()).toBe(null);
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
        iconType: RateStar,
        interactive: false,
        value: itemValue
      });
    });
  });

  it('should apply accessibility readOnly labels', () => {
    const container = elements.fixture.debugElement.query(By.css('.rateContainer')).nativeElement as HTMLDivElement;
    expect(container.getAttribute('aria-label')).toBe(RATE_LANG['en'].containerReadOnlyAriaLabel)
  });

});

describe('NgRate - Interactive', () => {

  let elements: RateElements;

  beforeEach(async () => {
    elements = await beforeEachRateTest('interactive');
  });

  // HELPER FUNCTIONS

  const itemValues : number[] = [3, 5, 4, 7, 10];
  interface CheckItemValues {
    host: any;
    iconType: any;
    isinteractive: boolean;
    value: number;
  };
  const langValues : RateLangs[] = ['en', 'es', 'it', 'de', 'fr'];

  const checkItemValue = ({host, iconType, isinteractive, value} : CheckItemValues) => {
    console.log('CHECKING LENGTH: ', value);
    const itemList = elements.fixture.debugElement.queryAll(By.directive(iconType));
    expect(itemList.length).toBe(value);
    checkItemsFill(itemList);

    if(isinteractive){
      const buttonList = elements.fixture.debugElement.queryAll(By.css('.rateItemButton'));
      expect(buttonList.length).toBe(value);
      checkButton(buttonList, value);
    };

    checkContainerAcc(host, isinteractive);
  };

  const checkItemsFill = (list: DebugElement[]) => {
    console.log('CHECKING ITEMS FILL');
    let average = elements.rateInstance.average();
    list.forEach((debugEl) => {
      const compInstance = debugEl.componentInstance as RateHeart;
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

      const container = elements.fixture.debugElement.query(By.css('.rateContainer')).nativeElement as HTMLDivElement;
      if(interactive){
        expect(container.getAttribute('aria-label')).toBe(RATE_LANG[lang].containerInteractiveAriaLabel);

      }else{
        expect(container.getAttribute('aria-label')).toBe(RATE_LANG[lang].containerReadOnlyAriaLabel);
      }

    });
  };

  // -----------

  const checkButtonAcc = (host: any, button: DebugElement, current: number, total : number) => {
    console.log('CHECKING BUTTON LANGS');

    langValues.forEach((lang) => {

      host.lang.set(lang);
      elements.fixture.detectChanges();

      expect(button.nativeElement.getAttribute('aria-label')).toBe(RATE_LANG[lang].buttonInteractiveAriaLabel(current + 1, total));

    });
  };

  // --------------

  it('should create', () => {
    expect(elements.fixture).toBeTruthy();
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.rate).toBeTruthy();
    expect(elements.rateInstance).toBeTruthy();
    expect(elements.rateItemButtons).toBeTruthy();
    expect(elements.rateStars).toEqual([]);
    expect(elements.rateHearts).toBeTruthy();
  });

  it('should have initial predefined values', () => {
    expect(elements.rateInstance.items()).toBe(3);
    expect(elements.rateInstance.average()).toBeNull();
    expect(elements.rateInstance.icon()).toBe('heart');
    expect(elements.rateInstance.readOnly()).toBe(false);
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
        iconType: RateHeart,
        isinteractive: true,
        value: itemValue
      });
    });
  });


});
