import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgThemeToggle } from '../ng-theme-toggle';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { TestHost } from './helpers/test-hosts';
import { By } from '@angular/platform-browser';

describe('NgThemeToggle - with No attributes', () => {

  /** Test Host declaration */
  let testHostFixture: ComponentFixture<TestHost>;
  let testHostComponent: TestHost;

  /** Menu Button Component declaration */
  let themeToggleDebugEl: DebugElement;
  let themeToggleInstance: NgThemeToggle;

  /** Menu Button Btn declaration */
  let themeToggleBtnDebugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgThemeToggle],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    /** Creating new component fixture */
    testHostFixture = TestBed.createComponent(TestHost);
    testHostComponent = testHostFixture.componentInstance;

    /** Instance for Menu Button Component */
    themeToggleDebugEl = testHostFixture.debugElement.query(By.directive(NgThemeToggle));
    themeToggleInstance = themeToggleDebugEl.componentInstance;

    /** Instance for Menu Button Btn */
    themeToggleBtnDebugEl = testHostFixture.debugElement.query(By.css('.themeToggle__button'));

    testHostFixture.detectChanges();
  });

  it('should create testHost and include NgMenuButton component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(themeToggleInstance).toBeTruthy();
    expect(themeToggleBtnDebugEl).toBeTruthy();
  });

});
