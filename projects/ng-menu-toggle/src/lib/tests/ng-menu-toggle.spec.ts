import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgMenuToggle } from '../ng-menu-toggle';
import { TestHost, TestHostWithAttrs } from './helpers/test-hosts';
import { By } from '@angular/platform-browser';
import { MENU_TOGGLE_LANG } from '../accessibility/menu-toggle.lang';


describe('NgMenuToggle - with No attributes', () => {

  /** Test Host declaration */
  let testHostFixture: ComponentFixture<TestHost>;
  let testHostComponent: TestHost;

  /** Menu toggle Component declaration */
  let menuToggleDebugEl: DebugElement;
  let menuToggleInstance: NgMenuToggle;

  /** Menu toggle Btn declaration */
  let menuToggleBtnDebugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMenuToggle],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    /** Creating new component fixture */
    testHostFixture = TestBed.createComponent(TestHost);
    testHostComponent = testHostFixture.componentInstance;

    /** Instance for Menu toggle Component */
    menuToggleDebugEl = testHostFixture.debugElement.query(By.directive(NgMenuToggle));
    menuToggleInstance = menuToggleDebugEl.componentInstance;

    /** Instance for Menu toggle Btn */
    menuToggleBtnDebugEl = testHostFixture.debugElement.query(By.css('.menuToggle__button'));

    testHostFixture.detectChanges();
  });

  it('should create testHost and include NgMenuToggle component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(menuToggleInstance).toBeTruthy();
    expect(menuToggleBtnDebugEl).toBeTruthy();
  });

  /** ---------- NON DEFINE INPUTS ---------- */

  it('should have predefine input values if not asigned from host', () => {
    expect(menuToggleInstance.type()).toBe('bars');
    expect(menuToggleInstance.invert()).toBe(false);
    expect(menuToggleInstance.thin()).toBe(false);
    expect(menuToggleInstance.rounded()).toBe(false);
    expect(menuToggleInstance.animation()).toBe('soft');
    expect(menuToggleInstance.faster()).toBe(false);
    expect(menuToggleInstance.tabIndex()).toBe(0);
  });

  /** ---------- ISOPEN TESTS ---------- */

  it('should change host state and ng-menu-toggle input when click on button', () => {

    /** Initial vale of host signal and menu toggle input */
    expect(testHostComponent.isOpen()).toBe(false);
    expect(typeof menuToggleInstance.isOpenSignal).toBe('function'); // is a signal
    expect(typeof menuToggleInstance.isOpenSignal()?.update).toBe('function'); // is writable
    expect(menuToggleInstance.isOpenSignal()!()).toBe(false); // initial valie of the signal

    /** Clicking the menu toggle */
    menuToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** After first button click vale of host signal and menu toggle input */
    expect(testHostComponent.isOpen()).toBe(true);
    expect(menuToggleInstance.isOpenSignal()!()).toBe(true);

    /** Clicking the menu button */
    menuToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** After second button click vale of host signal and menu toggle input */
    expect(testHostComponent.isOpen()).toBe(false);
    expect(menuToggleInstance.isOpenSignal()!()).toBe(false);
  });

  it('should toggle .isOpen class on ng-menu-toggle elements when click on button', () => {

    /** Initial selection of elements */
    const bar1 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--1'));
    const bar3 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--3'));
    const bar4 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--4'));
    const bar5 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--5'));

    /** Initial class - not .isOpen */
    expect(menuToggleBtnDebugEl.nativeElement.classList).not.toContain('isOpen');
    expect(bar1.nativeElement.classList).not.toContain('isOpen');
    expect(bar3.nativeElement.classList).not.toContain('isOpen');
    expect(bar4.nativeElement.classList).not.toContain('isOpen');
    expect(bar5.nativeElement.classList).not.toContain('isOpen');

    /** Clicking the menu toggle button */
    menuToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** Class after first button click - .isOpen */
    expect(menuToggleBtnDebugEl.nativeElement.classList).toContain('isOpen');
    expect(bar1.nativeElement.classList).toContain('isOpen');
    expect(bar3.nativeElement.classList).toContain('isOpen');
    expect(bar4.nativeElement.classList).toContain('isOpen');
    expect(bar5.nativeElement.classList).toContain('isOpen');

    /** Clicking the menu toggle button */
    menuToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** Class after second button click - not .isOpen */
    expect(menuToggleBtnDebugEl.nativeElement.classList).not.toContain('isOpen');
    expect(bar1.nativeElement.classList).not.toContain('isOpen');
    expect(bar3.nativeElement.classList).not.toContain('isOpen');
    expect(bar4.nativeElement.classList).not.toContain('isOpen');
    expect(bar5.nativeElement.classList).not.toContain('isOpen');

  });

  it('should toggle aria attributes on ng-menu-toggle button when click on button', () => {

    /** Initial aria attributes */
    expect(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-expanded')).toBe('false');
    expect(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe('Open menu');

    /** Clicking the menu button */
    menuToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** aria values after first button click */
    expect(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-expanded')).toBe('true');
    expect(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe('Close menu');

    /** Clicking the menu button */
    menuToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** aria values after second button click */
    expect(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-expanded')).toBe('false');
    expect(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe('Open menu');

  });


});

describe('NgMenuToggle - with attributes', () => {

  /** Initial declarations */

  /** Test Host declaration */
  let testHostFixture : ComponentFixture<TestHostWithAttrs>;
  let testHostComponent : TestHostWithAttrs;

  /** Menu toggle Component declaration */
  let menuToggleDebugEl: DebugElement;
  let menuToggleInstance: NgMenuToggle;

  /** Menu toggle Button declaration */
  let menuToggleBtnDebugEl: DebugElement;

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

    /** Instance for Menu toggle Component */
    menuToggleDebugEl = testHostFixture.debugElement.query(By.directive(NgMenuToggle));
    menuToggleInstance = menuToggleDebugEl.componentInstance;

    /** Instance for Menu toggle Button */
    menuToggleBtnDebugEl = testHostFixture.debugElement.query(By.css('.menuToggle__button'));

    await testHostFixture.whenStable();
  });

  function checkAria (closed: string, opened: string) : void {

    /** Initial aria label custom attributes ('es' set by lang) */
      expect(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe(closed);

      // console.log(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-label'));

      /** Clicking the menu toggle button */
      menuToggleBtnDebugEl.triggerEventHandler('click', null);
      testHostFixture.detectChanges();

      /** Aria label after first button click */
      expect(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe(opened);

      // console.log(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-label'));

      /** Clicking the menu toggle button */
      menuToggleBtnDebugEl.triggerEventHandler('click', null);
      testHostFixture.detectChanges();

      /** Aria label after second button click */
      expect(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe(closed);

      // console.log(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-label'));
  }

  it('should create testHost and include NgMenuToggle component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(menuToggleInstance).toBeTruthy();
    expect(menuToggleBtnDebugEl).toBeTruthy();
  });

  /** ---------- CUSTOM INPUT VALUES, CLASSES AND ARIA VALUES---------- */

  it('should have custom input values from host attributes', () => {

    expect(menuToggleInstance.type()).toBe('dots');
    expect(menuToggleInstance.invert()).toBe(true);
    expect(menuToggleInstance.thin()).toBe(true);
    expect(menuToggleInstance.rounded()).toBe(true);
    expect(menuToggleInstance.animation()).toBe('rotateX');
    expect(menuToggleInstance.faster()).toBe(true);
    expect(menuToggleInstance.tabIndex()).toBe(1);
    expect(menuToggleInstance.lang()).toBe('es');
    expect(menuToggleInstance.customAria()).toBe(null);

  });

  it('should apply classes and tabindex depending on custom inputs', () => {

    /** Initial selection of elements */
    const bar1 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--1'));
    const bar2 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--2'));
    const bar3 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--3'));
    const bar4 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--4'));
    const bar5 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--5'));

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
    expect(menuToggleBtnDebugEl.nativeElement.classList).toContain('rounded');
    expect(bar1.nativeElement.classList).toContain('rounded');
    expect(bar3.nativeElement.classList).toContain('rounded');
    expect(bar4.nativeElement.classList).toContain('rounded');
    expect(bar5.nativeElement.classList).toContain('rounded');

    /** .rotateX class */
    expect(menuToggleBtnDebugEl.nativeElement.classList).toContain('rotateX');

    /** .invert class */
    expect(menuToggleBtnDebugEl.nativeElement.classList).toContain('invert');
    expect(bar4.nativeElement.classList).toContain('invert');
    expect(bar5.nativeElement.classList).toContain('invert');

    /** .faster class */
    expect(menuToggleBtnDebugEl.nativeElement.classList).toContain('faster');

    /** tabindex attribute */
    expect(menuToggleBtnDebugEl.nativeElement.getAttribute('tabindex')).toBe('1');

    /** lang attribute */
    expect(menuToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe('Abrir menú');

  });

  it('should apply rotate Y class if indicated', () => {
    testHostComponent.animation.set('rotateY');

    testHostFixture.detectChanges();

    /** rotate input changed */
    expect(menuToggleInstance.animation()).toBe('rotateY');
    /** .rotateY class */
    expect(menuToggleBtnDebugEl.nativeElement.classList).toContain('rotateY');

  });

  it('should apply uneven class if indicated', () => {
    testHostComponent.type.set('uneven');

    testHostFixture.detectChanges();

    /** rotate input changed */
    expect(menuToggleInstance.type()).toBe('uneven');

    /** .uneven class */
    const bar3 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--3'));
    const bar4 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--4'));
    const bar5 = testHostFixture.debugElement.query(By.css('.menuToggle__bar--5'));

    expect(bar3.nativeElement.classList).toContain('uneven');
    expect(bar4.nativeElement.classList).toContain('uneven');
    expect(bar5.nativeElement.classList).toContain('uneven');

  });


  /** ---------- TOGGLE CUSTOM ARIA LABEL VALUE ---------- */

  it('should toggle aria label attribute depending on lang when click on button', () => {

    /** Check initial aria labels set by lang (es) */
    checkAria(MENU_TOGGLE_LANG.es.ariaLabelClosed, MENU_TOGGLE_LANG.es.ariaLabelOpened);

    /** Change lang to it */
    testHostComponent.langSignal.set('it');
    testHostFixture.detectChanges();

    checkAria(MENU_TOGGLE_LANG.it.ariaLabelClosed, MENU_TOGGLE_LANG.it.ariaLabelOpened);

    /** Change lang to fr */
    testHostComponent.langSignal.set('fr');
    testHostFixture.detectChanges();

    checkAria(MENU_TOGGLE_LANG.fr.ariaLabelClosed, MENU_TOGGLE_LANG.fr.ariaLabelOpened);

    /** Change lang to de */
    testHostComponent.langSignal.set('de');
    testHostFixture.detectChanges();

    checkAria(MENU_TOGGLE_LANG.de.ariaLabelClosed, MENU_TOGGLE_LANG.de.ariaLabelOpened);

    /** Change lang to en */
    testHostComponent.langSignal.set('en');
    testHostFixture.detectChanges();

    checkAria(MENU_TOGGLE_LANG.en.ariaLabelClosed, MENU_TOGGLE_LANG.en.ariaLabelOpened);

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
