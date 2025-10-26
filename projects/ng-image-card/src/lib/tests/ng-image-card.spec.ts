import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgImageCard } from '../ng-image-card';
import { DebugElement, provideZonelessChangeDetection } from '@angular/core';
import { TestHost } from './helpers/test-hosts';
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
