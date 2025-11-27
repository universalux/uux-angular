import { By } from '@angular/platform-browser';
import { beforeEachRateTest, RateElements } from './helpers/beforeEach';
import { TestHostInteractive, TestHostReadOnly } from './helpers/testHosts';
import { RateStar } from '../rate-star/rate-star';
import { DebugElement } from '@angular/core';
import { RateHeart } from '../rate-heart/rate-heart';

describe('NgRate - ReadOnly', () => {

  let elements: RateElements;

  beforeEach(async () => {
    elements = await beforeEachRateTest('readOnly');
  });

  const checkItemsFill = (list: DebugElement[]) => {
    let average = elements.rateInstance.average();
    list.forEach((debugEl) => {
      const compInstance = debugEl.componentInstance as RateStar;
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
  });

  it('should render icons depending on "items" input and adjust filled items', () => {
    const host = elements.hostComponent as TestHostReadOnly;

    expect(elements.rateStars.length).toBe(host.items());
    checkItemsFill(elements.rateStars);

    host.items.set(3);
    elements.fixture.detectChanges();

    const rateStarsUpdatedTo3 = elements.fixture.debugElement.queryAll(By.directive(RateStar));
    expect(rateStarsUpdatedTo3.length).toBe(host.items());
    checkItemsFill(elements.rateStars);

    host.items.set(4);
    elements.fixture.detectChanges();

    const rateStarsUpdatedTo4 = elements.fixture.debugElement.queryAll(By.directive(RateStar));
    expect(rateStarsUpdatedTo4.length).toBe(host.items());
    checkItemsFill(elements.rateStars);

    host.items.set(7);
    elements.fixture.detectChanges();

    const rateStarsUpdatedTo7 = elements.fixture.debugElement.queryAll(By.directive(RateStar));
    expect(rateStarsUpdatedTo7.length).toBe(host.items());
    checkItemsFill(elements.rateStars);

    host.items.set(10);
    elements.fixture.detectChanges();

    const rateStarsUpdatedTo10 = elements.fixture.debugElement.queryAll(By.directive(RateStar));
    expect(rateStarsUpdatedTo10.length).toBe(host.items());
    checkItemsFill(elements.rateStars);

  });

});

describe('NgRate - Interactive', () => {

  let elements: RateElements;

  beforeEach(async () => {
    elements = await beforeEachRateTest('interactive');
  });

  const checkItemsFill = (list: DebugElement[]) => {
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

  const checkItemsVote = (list: DebugElement[]) => {
    list.forEach((button, index) => {
      const host = elements.hostComponent as TestHostInteractive;
      button.triggerEventHandler('mouseenter', {});
      elements.fixture.detectChanges();
      button.nativeElement.click();
      elements.fixture.detectChanges();

      expect(host.vote()).toBe(index + 1);
    })
  };

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
    const host = elements.hostComponent as TestHostReadOnly;
    const rateButtonsUpdatedTo3 = elements.fixture.debugElement.queryAll(By.css('.rateItemButton'));

    expect(elements.rateHearts.length).toBe(host.items());
    expect(rateButtonsUpdatedTo3.length).toBe(host.items());
    checkItemsFill(elements.rateHearts);
    checkItemsVote(rateButtonsUpdatedTo3);

    host.items.set(4);
    elements.fixture.detectChanges();

    const rateHeartsUpdatedTo4 = elements.fixture.debugElement.queryAll(By.directive(RateHeart));
    const rateButtonsUpdatedTo4 = elements.fixture.debugElement.queryAll(By.css('.rateItemButton'));
    expect(rateHeartsUpdatedTo4.length).toBe(host.items());
    checkItemsFill(elements.rateHearts);
    checkItemsVote(rateButtonsUpdatedTo4);

    host.items.set(5);
    elements.fixture.detectChanges();

    const rateHeartsUpdatedTo5 = elements.fixture.debugElement.queryAll(By.directive(RateHeart));
    const rateButtonsUpdatedTo5 = elements.fixture.debugElement.queryAll(By.css('.rateItemButton'));
    expect(rateHeartsUpdatedTo5.length).toBe(host.items());
    checkItemsFill(elements.rateHearts);
    checkItemsVote(rateButtonsUpdatedTo5);

    host.items.set(7);
    elements.fixture.detectChanges();

    const rateHeartsUpdatedTo7 = elements.fixture.debugElement.queryAll(By.directive(RateHeart));
    const rateButtonsUpdatedTo7 = elements.fixture.debugElement.queryAll(By.css('.rateItemButton'));
    expect(rateHeartsUpdatedTo7.length).toBe(host.items());
    checkItemsFill(elements.rateHearts);
    checkItemsVote(rateButtonsUpdatedTo7);

    host.items.set(10);
    elements.fixture.detectChanges();

    const rateHeartsUpdatedTo10 = elements.fixture.debugElement.queryAll(By.directive(RateHeart));
    const rateButtonsUpdatedTo10 = elements.fixture.debugElement.queryAll(By.css('.rateItemButton'));
    expect(rateHeartsUpdatedTo10.length).toBe(host.items());
    checkItemsFill(elements.rateHearts);
    checkItemsVote(rateButtonsUpdatedTo10);

  });



});
