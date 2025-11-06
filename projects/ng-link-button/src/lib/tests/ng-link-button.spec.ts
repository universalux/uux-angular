import {
  beforeEachLinkButtonTest,
  LinkButtonElements,
} from './helpers/beforeEach';
import { TestHostRouterLink, TestHostWithAttr } from './helpers/testHosts';

describe('NgLinkButton - No attributes', () => {
  let elements: LinkButtonElements;

  beforeEach(async () => {
    elements = await beforeEachLinkButtonTest('noAttr');
  });

  it('should create', () => {
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.linkButton).toBeTruthy();
    expect(elements.linkButtonInstance).toBeTruthy();
    expect(elements.linkButtonAnchor).toBeTruthy();
  });

  it('should render inner content', () => {
    expect(elements.linkButtonAnchor.nativeElement.textContent).toContain('Link Button Content');
  });

  it('should have initial default attributes', () => {
    expect(elements.linkButtonInstance.ariaLabel()).toBeNull();
    expect(elements.linkButtonInstance.title()).toBeNull();
    expect(elements.linkButtonInstance.tabIndex()).toBe(0);
    expect(elements.linkButtonInstance.ariaCurrent()).toBeNull();
    expect(elements.linkButtonInstance.download()).toBeNull();
    expect(elements.linkButtonInstance.role()).toBeNull();
    expect(elements.linkButtonInstance.disabled()).toBeFalse();

    expect(elements.linkButtonInstance.type()).toBe('solid');
    expect(elements.linkButtonInstance.square()).toBe(false);
    expect(elements.linkButtonInstance.hover()).toBe('tone');
    expect(elements.linkButtonInstance.direction()).toBe('row');
  });

  it('should apply classes according to default attributes', () => {

    const linkButtonAnchor = elements.linkButtonAnchor.nativeElement as HTMLButtonElement;

    //Accessibility attributes
    expect(linkButtonAnchor.getAttribute('aria-label')).toBeNull();
    expect(linkButtonAnchor.getAttribute('title')).toBeNull();
    expect(linkButtonAnchor.getAttribute('tabindex')).toBe('0');
    expect(linkButtonAnchor.getAttribute('aria-disabled')).toBe('false');
    expect(linkButtonAnchor.classList.contains('disabled')).toBeFalse();

    // Style and behavior attributes
    expect(linkButtonAnchor.classList.contains('solid')).toBeTrue();
    expect(linkButtonAnchor.classList.contains('square')).toBeFalse();
    expect(linkButtonAnchor.classList.contains('toneHover')).toBeTrue();
    expect(linkButtonAnchor.classList.contains('column')).toBeFalse();

  });

});

describe('NgLinkButton - With Attributes', () => {
  let elements: LinkButtonElements;

  beforeEach(async () => {
    elements = await beforeEachLinkButtonTest();
  });

  it('should have initial custom attributes', () => {
    expect(elements.linkButtonInstance.ariaLabel()).toBe('Aria label example');
    expect(elements.linkButtonInstance.title()).toBe('Title example');
    expect(elements.linkButtonInstance.tabIndex()).toBe(-1);
    expect(elements.linkButtonInstance.ariaCurrent()).toBe('page');
    expect(elements.linkButtonInstance.download()).toBe(true);
    expect(elements.linkButtonInstance.role()).toBe('link');
    expect(elements.linkButtonInstance.disabled()).toBeTrue();

    expect(elements.linkButtonInstance.type()).toBe('minimal');
    expect(elements.linkButtonInstance.square()).toBe(true);
    expect(elements.linkButtonInstance.hover()).toBe('scale');
    expect(elements.linkButtonInstance.direction()).toBe('column');
  });

  it('should apply attributes and classes according to accessibility inputs', () => {
    const linkButtonAnchor = elements.linkButtonAnchor.nativeElement as HTMLButtonElement;

    //Accessibility attributes
    expect(linkButtonAnchor.getAttribute('aria-label')).toBe('Aria label example');
    expect(linkButtonAnchor.getAttribute('title')).toBe('Title example');
    expect(linkButtonAnchor.getAttribute('tabindex')).toBe('-1');
    expect(linkButtonAnchor.getAttribute('aria-disabled')).toBe('true');
    expect(linkButtonAnchor.classList.contains('disabled')).toBeTrue();

  });

  it('should apply attributes and classes according to style and behavior inputs', () => {
    const linkButtonAnchor = elements.linkButtonAnchor.nativeElement as HTMLButtonElement;

    // Initial style and behavior custom attributes
    expect(linkButtonAnchor.classList.contains('minimal')).toBeTrue();
    expect(linkButtonAnchor.classList.contains('square')).toBeTrue();
    expect(linkButtonAnchor.classList.contains('scaleHover')).toBeTrue();
    expect(linkButtonAnchor.classList.contains('column')).toBeTrue();

    // Testing rest of "type" options
    const hostComponent = elements.hostComponent as TestHostWithAttr;
    hostComponent.type.set('outline');
    elements.fixture.detectChanges();
    expect(linkButtonAnchor.classList.contains('minimal')).toBeFalse();
    expect(linkButtonAnchor.classList.contains('outline')).toBeTrue();

    // Testing rest of "hover" options
    hostComponent.hover.set('stroke');
    elements.fixture.detectChanges();
    expect(linkButtonAnchor.classList.contains('strokeHover')).toBeTrue();
    hostComponent.hover.set('shadow');
    elements.fixture.detectChanges();
    expect(linkButtonAnchor.classList.contains('shadowHover')).toBeTrue();
    hostComponent.hover.set('none');
    elements.fixture.detectChanges();
    expect(linkButtonAnchor.classList.contains('shadowHover')).toBeFalse();
    expect(linkButtonAnchor.classList.contains('toneHover')).toBeFalse();
    expect(linkButtonAnchor.classList.contains('scaleHover')).toBeFalse();
    expect(linkButtonAnchor.classList.contains('strokeHover')).toBeFalse();

  });

});

describe('NgLinkButton - routerLink mode', () => {
  let elements: LinkButtonElements;

  beforeEach(async () => {
    elements = await beforeEachLinkButtonTest('routerLink');
  });

  it('should have initial custom attributes', () => {
    expect(elements.linkButtonInstance.routerLink()).toBe('/test');
    expect(elements.linkButtonInstance.queryParams()).toEqual({ category: 'books', sort: 'price' });
    expect(elements.linkButtonInstance.fragment()).toBe('fragment');

    const hostComponent = elements.fixture.componentInstance as TestHostRouterLink;
    const relativeTo = elements.linkButtonInstance.relativeTo();
    expect(relativeTo).toBe(hostComponent.route);
    expect(elements.linkButtonInstance.queryParamsHandling()).toBe('merge');
    expect(elements.linkButtonInstance.state()).toEqual({state: 'hola'});
  });

});

describe('NgLinkButton - href mode', () => {
  let elements: LinkButtonElements;

  beforeEach(async () => {
    elements = await beforeEachLinkButtonTest('href');
  });

  it('should have initial custom attributes', () => {
    expect(elements.linkButtonInstance.href()).toBe('https://alday.dev');
    expect(elements.linkButtonInstance.target()).toBe('_blank');
    expect(elements.linkButtonInstance.rel()).toBe('noreferrer noopener');
  });

});
