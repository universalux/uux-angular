import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgImageCard } from '../ng-image-card';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { TestHost, TestHostWithAttrs } from './helpers/test-hosts';
import { By } from '@angular/platform-browser';

describe('NgImageCard - with No attributes', () => {

  /** Test Host declaration */
  let testHostFixture: ComponentFixture<TestHost>;
  let testHostComponent: TestHost;

  /** Image Card Component declaration */
  let imageCardDebugEl: DebugElement;
  let imageCardInstance: NgImageCard;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgImageCard],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    /** Creating new component fixture */
    testHostFixture = TestBed.createComponent(TestHost);
    testHostComponent = testHostFixture.componentInstance;

    /** Instance for Menu toggle Component */
    imageCardDebugEl = testHostFixture.debugElement.query(By.directive(NgImageCard));
    imageCardInstance = imageCardDebugEl.componentInstance;


    testHostFixture.detectChanges();
  });

  it('should create testHost and include NgImageCard component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(imageCardInstance).toBeTruthy();
  });

  /** ---------- NON DEFINE INPUTS ---------- */

  it('should have predefine input values if not asigned from host', () => {
    expect(imageCardInstance.animation()).toBe('translateY');
    expect(imageCardInstance.hover()).toBe('scale');
    expect(imageCardInstance.shadow()).toBe(true);
  });

  it('should render projected header content', () => {
    const header = testHostFixture.nativeElement.querySelector('[card-header]');
    expect(header).toBeTruthy();
    expect(header.textContent).toContain('Header content');
  });

  it('should render projected image content', () => {
    const img = testHostFixture.nativeElement.querySelector('[card-image] img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('card-image.mock.png');
  });

  it('should render projected body and footer content', () => {
    const body = testHostFixture.nativeElement.querySelector('[card-body]');
    const footer = testHostFixture.nativeElement.querySelector('[card-footer]');
    expect(body.textContent).toContain('Body content');
    expect(footer.textContent).toContain('Footer content');
  });

  it('should render in the correct order', () => {
    const projectedElements = testHostFixture.nativeElement.querySelectorAll('ng-image-card > *');
    expect(projectedElements[0].hasAttribute('card-header')).toBeTrue();
    expect(projectedElements[1].hasAttribute('card-image')).toBeTrue();
  });

  it('should apply default classes based on predefined inputs', () => {
    const hostElement: HTMLElement = testHostFixture.nativeElement.querySelector('ng-image-card');

    // shadow = true → should have class "shadow"
    expect(hostElement.classList.contains('shadow')).toBeTrue();

    // hover = 'scale' → should have class "scaleHover"
    expect(hostElement.classList.contains('scaleHover')).toBeTrue();

    // hover = 'scale' → should NOT have class "colorHover"
    expect(hostElement.classList.contains('colorHover')).toBeFalse();

    // animation = 'translateY' → should have class "translateAnimation"
    expect(hostElement.classList.contains('translateAnimation')).toBeTrue();

    // animation = 'translateY' → should NOT have class "fadeInAnimation"
    expect(hostElement.classList.contains('fadeInAnimation')).toBeFalse();
  });

});

describe('NgImageCard - with attributes', () => {

  /** Test Host declaration */
  let testHostFixture: ComponentFixture<TestHostWithAttrs>;
  let testHostComponent: TestHostWithAttrs;

  /** Image Card Component declaration */
  let imageCardDebugEl: DebugElement;
  let imageCardInstance: NgImageCard;
  let imageCardEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgImageCard],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    /** Creating new component fixture */
    testHostFixture = TestBed.createComponent(TestHostWithAttrs);
    testHostComponent = testHostFixture.componentInstance;

    /** Instance for Menu toggle Component */
    imageCardDebugEl = testHostFixture.debugElement.query(By.directive(NgImageCard));
    imageCardInstance = imageCardDebugEl.componentInstance;
    imageCardEl = imageCardDebugEl.nativeElement;

    testHostFixture.detectChanges();
  });

  it('should create testHost and include NgImageCard component', () => {
    expect(testHostComponent).toBeTruthy();
    expect(imageCardInstance).toBeTruthy();
  });

  it('should apply classes based on initial custom input values', () => {
    // Initial values from TestHostWithAttrs (set by user):
    // animation = 'fadeIn', hover = 'color', shadow = false

    expect(imageCardEl.classList.contains('shadow')).toBeFalse(); // shadow=false → class not applied
    expect(imageCardEl.classList.contains('fadeInAnimation')).toBeTrue(); // fadeIn → fadeInAnimation applied
    expect(imageCardEl.classList.contains('translateAnimation')).toBeFalse(); // not translateY
    expect(imageCardEl.classList.contains('colorHover')).toBeTrue(); // hover=color → colorHover applied
    expect(imageCardEl.classList.contains('scaleHover')).toBeFalse(); // not scale or both
  });

  it('should update host classes when signals change', () => {
    // Change signals manually
    testHostComponent.animationSignal.set('translateY');
    testHostComponent.hoverSignal.set('both');
    testHostFixture.detectChanges();

    // Expect updated classes on the host
    expect(imageCardEl.classList.contains('fadeInAnimation')).toBeFalse();
    expect(imageCardEl.classList.contains('translateAnimation')).toBeTrue();
    expect(imageCardEl.classList.contains('scaleHover')).toBeTrue();
    expect(imageCardEl.classList.contains('colorHover')).toBeTrue();
  });

  it('should remove hover and animation classes when set to none', () => {
    // Set signals to "none" → should remove related classes
    testHostComponent.hoverSignal.set('none');
    testHostComponent.animationSignal.set('none');
    testHostFixture.detectChanges();

    // Expect no hover or animation classes
    expect(imageCardEl.classList.contains('scaleHover')).toBeFalse();
    expect(imageCardEl.classList.contains('colorHover')).toBeFalse();
    expect(imageCardEl.classList.contains('translateAnimation')).toBeFalse();
    expect(imageCardEl.classList.contains('fadeInAnimation')).toBeFalse();
  });


});
