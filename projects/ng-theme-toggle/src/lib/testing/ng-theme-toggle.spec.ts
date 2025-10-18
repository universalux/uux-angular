import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgThemeToggle } from '../ng-theme-toggle';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { TestHost, TestHostWithAttrs } from './helpers/test-hosts';
import { By } from '@angular/platform-browser';

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

  it('should create testHost and include NgThemeToggle component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(themeToggleInstance).toBeTruthy();
    expect(themeToggleBtnDebugEl).toBeTruthy();
  });
});
