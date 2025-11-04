import {
  beforeEachLinkButtonTest,
  LinkButtonElements,
} from './helpers/beforeEach';
import { TestHostRouterLink } from './helpers/testHosts';

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

  it('should have initial default attributes', () => {
    expect(elements.linkButtonInstance.ariaLabel()).toBeNull();
    expect(elements.linkButtonInstance.title()).toBeNull();
    expect(elements.linkButtonInstance.tabIndex()).toBeNull();
    expect(elements.linkButtonInstance.ariaCurrent()).toBeNull();
    expect(elements.linkButtonInstance.download()).toBeNull();
    expect(elements.linkButtonInstance.role()).toBeNull();
    expect(elements.linkButtonInstance.disabled()).toBeFalse();

    expect(elements.linkButtonInstance.type()).toBe('solid');
    expect(elements.linkButtonInstance.shape()).toBe('rounded');
    expect(elements.linkButtonInstance.hover()).toBe('color');
    expect(elements.linkButtonInstance.direction()).toBe('row');
  });

  it('should apply classes according to default attributes', () => {
    elements.fixture.detectChanges();
    const linkButtonHostEl = elements.linkButton.nativeElement as HTMLElement;

    expect(linkButtonHostEl.classList.contains('minimal')).toBeFalse();
    expect(linkButtonHostEl.classList.contains('outline')).toBeFalse();

    expect(linkButtonHostEl.classList.contains('square')).toBeFalse();

    expect(linkButtonHostEl.classList.contains('colorHover')).toBeTrue();
    expect(linkButtonHostEl.classList.contains('scaleHover')).toBeFalse();
    expect(linkButtonHostEl.classList.contains('outlineHover')).toBeFalse();

    expect(elements.linkButtonAnchor.nativeElement.classList.contains('column')).toBeFalse();

    expect(elements.linkButtonAnchor.nativeElement.getAttribute('aria-disabled')).toBe('false');
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
    expect(elements.linkButtonInstance.shape()).toBe('square');
    expect(elements.linkButtonInstance.hover()).toBe('scale');
    expect(elements.linkButtonInstance.direction()).toBe('column');
  });

  it('should apply classes according to default attributes', () => {
    elements.fixture.detectChanges();
    const linkButtonHostEl = elements.linkButton.nativeElement as HTMLElement;

    expect(linkButtonHostEl.classList.contains('solid')).toBeFalse();
    expect(linkButtonHostEl.classList.contains('outline')).toBeFalse();

    expect(linkButtonHostEl.classList.contains('square')).toBeTrue();

    expect(linkButtonHostEl.classList.contains('scaleHover')).toBeTrue();
    expect(linkButtonHostEl.classList.contains('colorHover')).toBeFalse();
    expect(linkButtonHostEl.classList.contains('outlineHover')).toBeFalse();

    expect(elements.linkButtonAnchor.nativeElement.classList.contains('column')).toBeTrue();

    expect(elements.linkButtonAnchor.nativeElement.getAttribute('aria-label')).toBe('Aria label example');
    expect(elements.linkButtonAnchor.nativeElement.getAttribute('title')).toBe('Title example');
    expect(elements.linkButtonAnchor.nativeElement.getAttribute('tabIndex')).toBe('-1');
    expect(elements.linkButtonAnchor.nativeElement.getAttribute('role')).toBe('link');
    expect(elements.linkButtonAnchor.nativeElement.getAttribute('aria-disabled')).toBe('true');

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
