import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgMenuButton } from '../ng-menu-button';
import { TestHost, TestHostWithAttrs } from './helpers/test-hosts';
import { By } from '@angular/platform-browser';
import { MENU_BUTTON_LANG } from '../accessibility/menu-button.lang';


describe('NgMenuButton - with No attributes', () => {

  /** Test Host declaration */
  let testHostFixture: ComponentFixture<TestHost>;
  let testHostComponent: TestHost;

  /** Menu Button Component declaration */
  let menuButtonDebugEl: DebugElement;
  let menuButtonInstance: NgMenuButton;

  /** Menu Button Btn declaration */
  let menuButtonBtnDebugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMenuButton],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    /** Creating new component fixture */
    testHostFixture = TestBed.createComponent(TestHost);
    testHostComponent = testHostFixture.componentInstance;

    /** Instance for Menu Button Component */
    menuButtonDebugEl = testHostFixture.debugElement.query(By.directive(NgMenuButton));
    menuButtonInstance = menuButtonDebugEl.componentInstance;

    /** Instance for Menu Button Btn */
    menuButtonBtnDebugEl = testHostFixture.debugElement.query(By.css('.menuButton__button'));

    testHostFixture.detectChanges();
  });

  it('should create testHost and include NgMenuButton component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(menuButtonInstance).toBeTruthy();
    expect(menuButtonBtnDebugEl).toBeTruthy();
  });

  /** ---------- NON DEFINE INPUTS ---------- */

  it('should have predefine input values if not asigned from host', () => {
    expect(menuButtonInstance.type()).toBe('bars');
    expect(menuButtonInstance.invert()).toBe(false);
    expect(menuButtonInstance.thin()).toBe(false);
    expect(menuButtonInstance.rounded()).toBe(false);
    expect(menuButtonInstance.animation()).toBe('soft');
    expect(menuButtonInstance.faster()).toBe(false);
    expect(menuButtonInstance.tabIndex()).toBe(0);
  });

  /** ---------- ISOPEN TESTS ---------- */

  it('should change host state and ng-menu-button input when click on button', () => {

    /** Initial vale of host signal and menu button input */
    expect(testHostComponent.isOpen()).toBe(false);
    expect(typeof menuButtonInstance.isOpenSignal).toBe('function'); // is a signal
    expect(typeof menuButtonInstance.isOpenSignal()?.update).toBe('function'); // is writable
    expect(menuButtonInstance.isOpenSignal()!()).toBe(false); // initial valie of the signal

    /** Clicking the menu button */
    menuButtonBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** After first button click vale of host signal and menu button input */
    expect(testHostComponent.isOpen()).toBe(true);
    expect(menuButtonInstance.isOpenSignal()!()).toBe(true);

    /** Clicking the menu button */
    menuButtonBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** After second button click vale of host signal and menu button input */
    expect(testHostComponent.isOpen()).toBe(false);
    expect(menuButtonInstance.isOpenSignal()!()).toBe(false);
  });

  it('should toggle .isOpen class on ng-menu-button elements when click on button', () => {

    /** Initial selection of elements */
    const bar1 = testHostFixture.debugElement.query(By.css('.menuButton__bar--1'));
    const bar3 = testHostFixture.debugElement.query(By.css('.menuButton__bar--3'));
    const bar4 = testHostFixture.debugElement.query(By.css('.menuButton__bar--4'));
    const bar5 = testHostFixture.debugElement.query(By.css('.menuButton__bar--5'));

    /** Initial class - not .isOpen */
    expect(menuButtonBtnDebugEl.nativeElement.classList).not.toContain('isOpen');
    expect(bar1.nativeElement.classList).not.toContain('isOpen');
    expect(bar3.nativeElement.classList).not.toContain('isOpen');
    expect(bar4.nativeElement.classList).not.toContain('isOpen');
    expect(bar5.nativeElement.classList).not.toContain('isOpen');

    /** Clicking the menu button button */
    menuButtonBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** Class after first button click - .isOpen */
    expect(menuButtonBtnDebugEl.nativeElement.classList).toContain('isOpen');
    expect(bar1.nativeElement.classList).toContain('isOpen');
    expect(bar3.nativeElement.classList).toContain('isOpen');
    expect(bar4.nativeElement.classList).toContain('isOpen');
    expect(bar5.nativeElement.classList).toContain('isOpen');

    /** Clicking the menu button button */
    menuButtonBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** Class after second button click - not .isOpen */
    expect(menuButtonBtnDebugEl.nativeElement.classList).not.toContain('isOpen');
    expect(bar1.nativeElement.classList).not.toContain('isOpen');
    expect(bar3.nativeElement.classList).not.toContain('isOpen');
    expect(bar4.nativeElement.classList).not.toContain('isOpen');
    expect(bar5.nativeElement.classList).not.toContain('isOpen');

  });

  it('should toggle aria attributes on ng-menu-button button when click on button', () => {

    /** Initial aria attributes */
    expect(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-expanded')).toBe('false');
    expect(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe('Open menu');

    /** Clicking the menu button */
    menuButtonBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** aria values after first button click */
    expect(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-expanded')).toBe('true');
    expect(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe('Close menu');

    /** Clicking the menu button */
    menuButtonBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** aria values after second button click */
    expect(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-expanded')).toBe('false');
    expect(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe('Open menu');

  });


});

describe('NgMenuButton - with attributes', () => {

  /** Initial declarations */

  /** Test Host declaration */
  let testHostFixture : ComponentFixture<TestHostWithAttrs>;
  let testHostComponent : TestHostWithAttrs;

  /** Menu Button Component declaration */
  let menuButtonDebugEl: DebugElement;
  let menuButtonInstance: NgMenuButton;

  /** Menu Button Button declaration */
  let menuButtonBtnDebugEl: DebugElement;

  /** Before Each test (it) */
  beforeEach(async () => {
    /** Building de TestBed */
    TestBed.configureTestingModule({
      /** Providing zoneless */
      providers: [provideZonelessChangeDetection()]
    });

    /** Creating new component fixture */
    testHostFixture = TestBed.createComponent(TestHostWithAttrs);
    testHostComponent = testHostFixture.componentInstance;

    /** Instance for Menu Button Component */
    menuButtonDebugEl = testHostFixture.debugElement.query(By.directive(NgMenuButton));
    menuButtonInstance = menuButtonDebugEl.componentInstance;

    /** Instance for Menu Button Button */
    menuButtonBtnDebugEl = testHostFixture.debugElement.query(By.css('.menuButton__button'));

    await testHostFixture.whenStable();
  });

  function checkAria (closed: string, opened: string) : void {

    /** Initial aria label custom attributes ('es' set by lang) */
      expect(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe(closed);

      // console.log(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-label'));

      /** Clicking the menu button button */
      menuButtonBtnDebugEl.triggerEventHandler('click', null);
      testHostFixture.detectChanges();

      /** Aria label after first button click */
      expect(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe(opened);

      // console.log(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-label'));

      /** Clicking the menu button button */
      menuButtonBtnDebugEl.triggerEventHandler('click', null);
      testHostFixture.detectChanges();

      /** Aria label after second button click */
      expect(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe(closed);

      // console.log(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-label'));
  }

  it('should create testHost and include NgMenuButton component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(menuButtonInstance).toBeTruthy();
    expect(menuButtonBtnDebugEl).toBeTruthy();
  });

  /** ---------- CUSTOM INPUT VALUES, CLASSES AND ARIA VALUES---------- */

  it('should have custom input values from host attributes', () => {

    expect(menuButtonInstance.type()).toBe('dots');
    expect(menuButtonInstance.invert()).toBe(true);
    expect(menuButtonInstance.thin()).toBe(true);
    expect(menuButtonInstance.rounded()).toBe(true);
    expect(menuButtonInstance.animation()).toBe('rotateX');
    expect(menuButtonInstance.faster()).toBe(true);
    expect(menuButtonInstance.tabIndex()).toBe(1);
    expect(menuButtonInstance.lang()).toBe('es');
    expect(menuButtonInstance.customAria()).toBe(null);

  });

  it('should apply classes and tabindex depending on custom inputs', () => {

    /** Initial selection of elements */
    const bar1 = testHostFixture.debugElement.query(By.css('.menuButton__bar--1'));
    const bar2 = testHostFixture.debugElement.query(By.css('.menuButton__bar--2'));
    const bar3 = testHostFixture.debugElement.query(By.css('.menuButton__bar--3'));
    const bar4 = testHostFixture.debugElement.query(By.css('.menuButton__bar--4'));
    const bar5 = testHostFixture.debugElement.query(By.css('.menuButton__bar--5'));

    /** .thin class */
    expect(bar1.nativeElement.classList).toContain('thin');
    expect(bar2.nativeElement.classList).toContain('thin');
    expect(bar3.nativeElement.classList).toContain('thin');
    expect(bar4.nativeElement.classList).toContain('thin');
    expect(bar5.nativeElement.classList).toContain('thin');

    /** .dots class */
    expect(bar1.nativeElement.classList).toContain('dots');
    expect(bar2.nativeElement.classList).toContain('dots');
    expect(bar3.nativeElement.classList).toContain('dots');
    expect(bar4.nativeElement.classList).toContain('dots');
    expect(bar5.nativeElement.classList).toContain('dots');

    /** .rounded class */
    expect(menuButtonBtnDebugEl.nativeElement.classList).toContain('rounded');
    expect(bar1.nativeElement.classList).toContain('rounded');
    expect(bar3.nativeElement.classList).toContain('rounded');
    expect(bar4.nativeElement.classList).toContain('rounded');
    expect(bar5.nativeElement.classList).toContain('rounded');

    /** .rotateX class */
    expect(menuButtonBtnDebugEl.nativeElement.classList).toContain('rotateX');

    /** .invert class */
    expect(menuButtonBtnDebugEl.nativeElement.classList).toContain('invert');
    expect(bar4.nativeElement.classList).toContain('invert');
    expect(bar5.nativeElement.classList).toContain('invert');

    /** .faster class */
    expect(menuButtonBtnDebugEl.nativeElement.classList).toContain('faster');

    /** tabindex attribute */
    expect(menuButtonBtnDebugEl.nativeElement.getAttribute('tabindex')).toBe('1');

    /** lang attribute */
    expect(menuButtonBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe('Abrir menú');

  });

  it('should apply rotate Y class if indicated', () => {
    testHostComponent.animation.set('rotateY');

    testHostFixture.detectChanges();

    /** rotate input changed */
    expect(menuButtonInstance.animation()).toBe('rotateY');
    /** .rotateY class */
    expect(menuButtonBtnDebugEl.nativeElement.classList).toContain('rotateY');

  });

  it('should apply uneven class if indicated', () => {
    testHostComponent.type.set('uneven');

    testHostFixture.detectChanges();

    /** rotate input changed */
    expect(menuButtonInstance.type()).toBe('uneven');

    /** .uneven class */
    const bar3 = testHostFixture.debugElement.query(By.css('.menuButton__bar--3'));
    const bar4 = testHostFixture.debugElement.query(By.css('.menuButton__bar--4'));
    const bar5 = testHostFixture.debugElement.query(By.css('.menuButton__bar--5'));

    expect(bar3.nativeElement.classList).toContain('uneven');
    expect(bar4.nativeElement.classList).toContain('uneven');
    expect(bar5.nativeElement.classList).toContain('uneven');

  });


  /** ---------- TOGGLE CUSTOM ARIA LABEL VALUE ---------- */

  it('should toggle aria label attribute depending on lang when click on button', () => {

    /** Check initial aria labels set by lang (es) */
    checkAria(MENU_BUTTON_LANG.es.ariaLabelClosed, MENU_BUTTON_LANG.es.ariaLabelOpened);

    /** Change lang to it */
    testHostComponent.langSignal.set('it');
    testHostFixture.detectChanges();

    checkAria(MENU_BUTTON_LANG.it.ariaLabelClosed, MENU_BUTTON_LANG.it.ariaLabelOpened);

    /** Change lang to fr */
    testHostComponent.langSignal.set('fr');
    testHostFixture.detectChanges();

    checkAria(MENU_BUTTON_LANG.fr.ariaLabelClosed, MENU_BUTTON_LANG.fr.ariaLabelOpened);

    /** Change lang to de */
    testHostComponent.langSignal.set('de');
    testHostFixture.detectChanges();

    checkAria(MENU_BUTTON_LANG.de.ariaLabelClosed, MENU_BUTTON_LANG.de.ariaLabelOpened);

    /** Change lang to en */
    testHostComponent.langSignal.set('en');
    testHostFixture.detectChanges();

    checkAria(MENU_BUTTON_LANG.en.ariaLabelClosed, MENU_BUTTON_LANG.en.ariaLabelOpened);

  });

  it('should toggle aria label attribute depending on customAria when click on button', () => {

    const customAriaValue = {
      ariaLabelOpened: 'Custom Opened Aria', ariaLabelClosed: 'Custom Opened Aria'
    };
    /** Change customAria host signal from null to a value */
    testHostComponent.customAria.set(customAriaValue);
    testHostFixture.detectChanges();

    /** Check initial aria labels set by lang (es) */
    checkAria(customAriaValue.ariaLabelClosed, customAriaValue.ariaLabelOpened);

  });


});
