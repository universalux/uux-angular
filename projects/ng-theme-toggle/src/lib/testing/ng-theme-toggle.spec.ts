import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgThemeToggle } from '../ng-theme-toggle';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { TestHost, TestHostWithAttrs } from './helpers/test-hosts';
import { By } from '@angular/platform-browser';
import { THEME_TOGGLE_LANG } from '../accessibility/theme-toggle.lang';

describe('NgThemeToggle - with No attributes', () => {

  /** Test Host declaration */
  let testHostFixture: ComponentFixture<TestHost>;
  let testHostComponent: TestHost;

  /** Theme Toggle Component declaration */
  let themeToggleDebugEl: DebugElement;
  let themeToggleInstance: NgThemeToggle;

  /** Theme Toggle Btn declaration */
  let themeToggleBtnDebugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgThemeToggle],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    /** Creating new component fixture */
    testHostFixture = TestBed.createComponent(TestHost);
    testHostComponent = testHostFixture.componentInstance;

    /** Instance for Theme Toggle Component */
    themeToggleDebugEl = testHostFixture.debugElement.query(By.directive(NgThemeToggle));
    themeToggleInstance = themeToggleDebugEl.componentInstance;

    /** Instance for Theme Toggle Btn */
    themeToggleBtnDebugEl = testHostFixture.debugElement.query(By.css('.themeToggle__button'));

    testHostFixture.detectChanges();
  });

  it('should create testHost and include NgThemeToggle component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(themeToggleInstance).toBeTruthy();
    expect(themeToggleBtnDebugEl).toBeTruthy();
  });

  /** ---------- NON DEFINE INPUTS ---------- */

  it('should have predefine input values if not asigned from host', () => {
    expect(themeToggleInstance.hover()).toBe('scale');

    expect(themeToggleInstance.animation()).toBe('soft');
    expect(themeToggleInstance.faster()).toBe(false);
    expect(themeToggleInstance.tabIndex()).toBe(0);
  });

  it('should change host state and ng-theme-toggle input when click on button', () => {

    /** Initial vale of host signal and theme toggle input */
    expect(testHostComponent.isDark()).toBe(false);
    expect(typeof themeToggleInstance.isDarkSignal).toBe('function'); // is a signal
    expect(typeof themeToggleInstance.isDarkSignal()?.update).toBe('function'); // is writable
    expect(themeToggleInstance.isDarkSignal()!()).toBe(false); // initial valie of the signal

    /** Clicking the theme button */
    themeToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** After first button click vale of host signal and theme toggle input */
    expect(testHostComponent.isDark()).toBe(true);
    expect(themeToggleInstance.isDarkSignal()!()).toBe(true);

    /** Clicking the theme button */
    themeToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** After second button click vale of host signal and theme toggle input */
    expect(testHostComponent.isDark()).toBe(false);
    expect(themeToggleInstance.isDarkSignal()!()).toBe(false);
  });

  it('should toggle .isDark class on ng-theme-toggle elements when click on button', () => {

    /** Initial selection of elements */
    const innerMask = testHostFixture.debugElement.query(By.css('.themeToggle__innerMask'));
    const rays = testHostFixture.debugElement.query(By.css('.themeToggle__rays'));

    /** Initial class - not .isDark */
    expect(themeToggleBtnDebugEl.nativeElement.classList).not.toContain('isDark');
    expect(innerMask.nativeElement.classList).not.toContain('isDark');
    expect(rays.nativeElement.classList).not.toContain('isDark');

    /** Clicking the theme toggler button */
    themeToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** Class after first button click - .isDark */
    expect(themeToggleBtnDebugEl.nativeElement.classList).toContain('isDark');
    expect(innerMask.nativeElement.classList).toContain('isDark');
    expect(rays.nativeElement.classList).toContain('isDark');

    /** Clicking the theme toggle button */
    themeToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** Class after second button click - not .isDark */
    expect(themeToggleBtnDebugEl.nativeElement.classList).not.toContain('isDark');
    expect(innerMask.nativeElement.classList).not.toContain('isDark');
    expect(rays.nativeElement.classList).not.toContain('isDark');

  });

  it('should toggle aria attributes on ng-theme-toggle button when click on it', () => {

    /** Initial aria attributes */
    expect(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-pressed')).toBe('false');
    expect(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe('Change to dark mode');

    /** Clicking the theme toggler button */
    themeToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** aria values after first button click */
    expect(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-pressed')).toBe('true');
    expect(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe('Change to light mode');

    /** Clicking the theme toggle button */
    themeToggleBtnDebugEl.triggerEventHandler('click', null);
    testHostFixture.detectChanges();

    /** aria values after second button click */
    expect(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-pressed')).toBe('false');
    expect(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe('Change to dark mode');

  });

});

describe('NgThemeToggle - with attributes', () => {
  /** Test Host declaration */
  let testHostFixture: ComponentFixture<TestHostWithAttrs>;
  let testHostComponent: TestHostWithAttrs;

  /** Theme Toggle Component declaration */
  let themeToggleDebugEl: DebugElement;
  let themeToggleInstance: NgThemeToggle;

  /** Theme Toggle Btn declaration */
  let themeToggleBtnDebugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgThemeToggle],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    /** Creating new component fixture */
    testHostFixture = TestBed.createComponent(TestHostWithAttrs);
    testHostComponent = testHostFixture.componentInstance;

    /** Instance for Theme Toggle Component */
    themeToggleDebugEl = testHostFixture.debugElement.query(By.directive(NgThemeToggle));
    themeToggleInstance = themeToggleDebugEl.componentInstance;

    /** Instance for Theme Toggle Btn */
    themeToggleBtnDebugEl = testHostFixture.debugElement.query(By.css('.themeToggle__button'));

    testHostFixture.detectChanges();
  });

  function checkAria (dark: string, light: string) : void {

    /** Initial aria label custom attributes ('es' set by lang) */
      expect(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe(light);

      // console.log(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-label'));

      /** Clicking the theme button button */
      themeToggleBtnDebugEl.triggerEventHandler('click', null);
      testHostFixture.detectChanges();

      /** Aria label after first button click */
      expect(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe(dark);

      // console.log(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-label'));

      /** Clicking the theme button button */
      themeToggleBtnDebugEl.triggerEventHandler('click', null);
      testHostFixture.detectChanges();

      /** Aria label after second button click */
      expect(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-label')).toBe(light);

      // console.log(themeToggleBtnDebugEl.nativeElement.getAttribute('aria-label'));
  }

  it('should create testHost and include NgThemeToggle component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(themeToggleInstance).toBeTruthy();
    expect(themeToggleBtnDebugEl).toBeTruthy();
  });

  it('should have custom input values from host attributes', () => {

    expect(themeToggleInstance.hover()).toBe('shadow');

    expect(themeToggleInstance.animation()).toBe('rotateX');
    expect(themeToggleInstance.faster()).toBe(true);
    expect(themeToggleInstance.tabIndex()).toBe(1);
    expect(themeToggleInstance.lang()).toBe('es');
    expect(themeToggleInstance.customAria()).toBe(null);

  });

  it('should apply classes and tabindex depending on custom inputs', () => {

    /** Initial selection of elements */
    const rays = testHostFixture.debugElement.query(By.css('.themeToggle__rays'));

    /** .shadow class */
    expect(themeToggleBtnDebugEl.nativeElement.classList).toContain('hover-shadow');

    /** .rotateX class */
    expect(themeToggleBtnDebugEl.nativeElement.classList).toContain('rotateX');
    expect(rays.nativeElement.classList).toContain('rotateX');

    /** .faster class */
    expect(themeToggleBtnDebugEl.nativeElement.classList).toContain('faster');
    expect(rays.nativeElement.classList).toContain('faster');

    /** tabindex */
    expect(themeToggleBtnDebugEl.nativeElement.getAttribute('tabindex')).toBe('1');

  });

  it('should apply rotate Y class if indicated', () => {

    //Selectin "rays" element
    const rays = testHostFixture.debugElement.query(By.css('.themeToggle__rays'));

    // Changing animation value
    testHostComponent.animation.set('rotateY');
    testHostFixture.detectChanges();

    /** rotate input changed */
    expect(themeToggleInstance.animation()).toBe('rotateY');
    /** .rotateY class */
    expect(themeToggleBtnDebugEl.nativeElement.classList).toContain('rotateY');
    expect(rays.nativeElement.classList).toContain('rotateY');
  });

  /** ---------- TOGGLE CUSTOM ARIA LABEL VALUE ---------- */

  it('should toggle aria label attribute depending on lang when click on button', () => {

    /** Check initial aria labels set by lang (es) */
    checkAria(THEME_TOGGLE_LANG.es.ariaLabelDark, THEME_TOGGLE_LANG.es.ariaLabelLight);

    /** Change lang to it */
    testHostComponent.langSignal.set('it');
    testHostFixture.detectChanges();

    checkAria(THEME_TOGGLE_LANG.it.ariaLabelDark, THEME_TOGGLE_LANG.it.ariaLabelLight);

    /** Change lang to fr */
    testHostComponent.langSignal.set('fr');
    testHostFixture.detectChanges();

    checkAria(THEME_TOGGLE_LANG.fr.ariaLabelDark, THEME_TOGGLE_LANG.fr.ariaLabelLight);

    /** Change lang to de */
    testHostComponent.langSignal.set('de');
    testHostFixture.detectChanges();

    checkAria(THEME_TOGGLE_LANG.de.ariaLabelDark, THEME_TOGGLE_LANG.de.ariaLabelLight);

    /** Change lang to en */
    testHostComponent.langSignal.set('en');
    testHostFixture.detectChanges();

    checkAria(THEME_TOGGLE_LANG.en.ariaLabelDark, THEME_TOGGLE_LANG.en.ariaLabelLight);

  });

  it('should toggle aria label attribute depending on customAria when click on button', () => {

    const customAriaValue = {
      ariaLabelDark: 'Custom Dark Aria', ariaLabelLight: 'Custom Light Aria'
    };
    /** Change customAria host signal from null to a value */
    testHostComponent.customAria.set(customAriaValue);
    testHostFixture.detectChanges();

    /** Check initial aria labels set by lang (es) */
    checkAria(customAriaValue.ariaLabelDark, customAriaValue.ariaLabelLight);

  });

});
