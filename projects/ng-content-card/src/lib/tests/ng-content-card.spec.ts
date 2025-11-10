import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgContentCard } from '../ng-content-card';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { TestHost, TestHostWithAttrs } from './helpers/test-hosts';
import { By } from '@angular/platform-browser';

describe('NgContentCard - with No attributes', () => {

  /** Test Host declaration */
  let testHostFixture: ComponentFixture<TestHost>;
  let testHostComponent: TestHost;

  /** content Card Component declaration */
  let contentCardDebugEl: DebugElement;
  let contentCardInstance: NgContentCard;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgContentCard],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    /** Creating new component fixture */
    testHostFixture = TestBed.createComponent(TestHost);
    testHostComponent = testHostFixture.componentInstance;

    /** Instance for Menu toggle Component */
    contentCardDebugEl = testHostFixture.debugElement.query(By.directive(NgContentCard));
    contentCardInstance = contentCardDebugEl.componentInstance;


    testHostFixture.detectChanges();
  });

  it('should create testHost and include NgContentCard component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(contentCardInstance).toBeTruthy();
  });

  /** ---------- NON DEFINE INPUTS ---------- */

  it('should have predefine input values if not asigned from host', () => {
    expect(contentCardInstance.animation()).toBe('translateY');
    expect(contentCardInstance.hover()).toBe('scale');
    expect(contentCardInstance.shadow()).toBe(true);
  });

  it('should render projected header content', () => {
    const header = testHostFixture.nativeElement.querySelector('[card-header]');
    expect(header).toBeTruthy();
    expect(header.textContent).toContain('Header content');
  });

  it('should render projected image content', () => {
    const img = testHostFixture.nativeElement.querySelector('[card-image] img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('card-image-mock.png');
  });

  it('should render projected body and footer content', () => {
    const body = testHostFixture.nativeElement.querySelector('[card-body]');
    const footer = testHostFixture.nativeElement.querySelector('[card-footer]');
    expect(body.textContent).toContain('Body content');
    expect(footer.textContent).toContain('Footer content');
  });

  it('should render in the correct order', () => {
    const projectedElements = testHostFixture.nativeElement.querySelectorAll('ng-content-card > *');
    expect(projectedElements[0].hasAttribute('card-header')).toBeTrue();
    expect(projectedElements[1].hasAttribute('card-image')).toBeTrue();
  });

  it('should apply default classes based on predefined inputs', () => {
    const hostElement: HTMLElement = testHostFixture.nativeElement.querySelector('ng-content-card');

    // shadow = true → should have class "shadow"
    expect(hostElement.classList.contains('shadow')).toBeTrue();

    // hover = 'scale' → should have class "scaleHover"
    expect(hostElement.classList.contains('scaleHover')).toBeTrue();

    // hover = 'scale' → should NOT have class "toneHover"
    expect(hostElement.classList.contains('toneHover')).toBeFalse();

    // animation = 'translateY' → should have class "translateAnimation"
    expect(hostElement.classList.contains('translateAnimation')).toBeTrue();

    // animation = 'translateY' → should NOT have class "fadeInAnimation"
    expect(hostElement.classList.contains('fadeInAnimation')).toBeFalse();
  });

});

describe('NgContentCard - with attributes', () => {

  /** Test Host declaration */
  let testHostFixture: ComponentFixture<TestHostWithAttrs>;
  let testHostComponent: TestHostWithAttrs;

  /** content Card Component declaration */
  let contentCardDebugEl: DebugElement;
  let contentCardInstance: NgContentCard;
  let contentCardEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgContentCard],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    /** Creating new component fixture */
    testHostFixture = TestBed.createComponent(TestHostWithAttrs);
    testHostComponent = testHostFixture.componentInstance;

    /** Instance for Menu toggle Component */
    contentCardDebugEl = testHostFixture.debugElement.query(By.directive(NgContentCard));
    contentCardInstance = contentCardDebugEl.componentInstance;
    contentCardEl = contentCardDebugEl.nativeElement;

    testHostFixture.detectChanges();
  });

  it('should create testHost and include NgContentCard component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(contentCardInstance).toBeTruthy();
  });

  it('should apply classes based on initial custom input values', () => {
    // Initial values from TestHostWithAttrs (set by user):
    // animation = 'fadeIn', hover = 'tone', shadow = false

    expect(contentCardEl.classList.contains('shadow')).toBeFalse(); // shadow=false → class not applied
    expect(contentCardEl.classList.contains('fadeInAnimation')).toBeTrue(); // fadeIn → fadeInAnimation applied
    expect(contentCardEl.classList.contains('translateAnimation')).toBeFalse(); // not translateY
    expect(contentCardEl.classList.contains('toneHover')).toBeTrue(); // hover=tone → toneHover applied
    expect(contentCardEl.classList.contains('scaleHover')).toBeFalse(); // not scale or both
  });

  it('should update host classes when signals change', () => {
    // Change signals manually
    testHostComponent.animationSignal.set('translateY');
    testHostComponent.hoverSignal.set('both');
    testHostFixture.detectChanges();

    // Expect updated classes on the host
    expect(contentCardEl.classList.contains('fadeInAnimation')).toBeFalse();
    expect(contentCardEl.classList.contains('translateAnimation')).toBeTrue();
    expect(contentCardEl.classList.contains('scaleHover')).toBeTrue();
    expect(contentCardEl.classList.contains('toneHover')).toBeTrue();
  });

  it('should remove hover and animation classes when set to none', () => {
    // Set signals to "none" → should remove related classes
    testHostComponent.hoverSignal.set('none');
    testHostComponent.animationSignal.set('none');
    testHostFixture.detectChanges();

    // Expect no hover or animation classes
    expect(contentCardEl.classList.contains('scaleHover')).toBeFalse();
    expect(contentCardEl.classList.contains('toneHover')).toBeFalse();
    expect(contentCardEl.classList.contains('translateAnimation')).toBeFalse();
    expect(contentCardEl.classList.contains('fadeInAnimation')).toBeFalse();
  });


});
