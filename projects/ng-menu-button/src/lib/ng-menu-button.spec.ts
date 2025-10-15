import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgMenuButton } from './ng-menu-button';
import { TestHost } from './testing/test-hosts';
import { By } from '@angular/platform-browser';


describe('NgMenuButton - No Attrs', () => {

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
