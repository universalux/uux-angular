import { beforeEachSimpleButtonTest, SimpleButtonElements } from './helpers/beforeEach';
import { TestHostWithAttr } from './helpers/testHosts';

describe('NgSimpleButton - No attributes', () => {
  let elements: SimpleButtonElements;

  beforeEach(async () => {
    elements = await beforeEachSimpleButtonTest('noAttr');
  });

  it('should create', () => {
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.simpleButton).toBeTruthy();
    expect(elements.simpleButtonInstance).toBeTruthy();
    expect(elements.simpleButtonBtn).toBeTruthy();
  });

  it('should render inner content', () => {
    expect(elements.simpleButtonBtn.nativeElement.textContent).toContain('Simple Button Content');
  });

  it('should have initial default attributes', () => {
    expect(elements.simpleButtonInstance.ariaLabel()).toBeNull();
    expect(elements.simpleButtonInstance.title()).toBeNull();
    expect(elements.simpleButtonInstance.tabIndex()).toBe(0);
    expect(elements.simpleButtonInstance.disabled()).toBeFalse();

    expect(elements.simpleButtonInstance.type()).toBe('solid');
    expect(elements.simpleButtonInstance.square()).toBe(false);
    expect(elements.simpleButtonInstance.hover()).toBe('tone');
    expect(elements.simpleButtonInstance.direction()).toBe('row');
  });

  it('should apply classes and attributes according to default attributes', () => {

    const simpleButtonBtn = elements.simpleButtonBtn.nativeElement as HTMLButtonElement;

    //Accessibility attributes
    expect(simpleButtonBtn.getAttribute('aria-label')).toBeNull();
    expect(simpleButtonBtn.getAttribute('title')).toBeNull();
    expect(simpleButtonBtn.getAttribute('tabindex')).toBe('0');
    expect(simpleButtonBtn.getAttribute('aria-disabled')).toBe('false');
    expect(simpleButtonBtn.classList.contains('disabled')).toBeFalse();

    // Style and behavior attributes
    expect(simpleButtonBtn.classList.contains('solid')).toBeTrue();
    expect(simpleButtonBtn.classList.contains('square')).toBeFalse();
    expect(simpleButtonBtn.classList.contains('toneHover')).toBeTrue();
    expect(simpleButtonBtn.classList.contains('column')).toBeFalse();

  });
});

describe('NgSimpleButton - With attributes', () => {
  let elements: SimpleButtonElements;

  beforeEach(async () => {
    elements = await beforeEachSimpleButtonTest('attr');
  });

  it('should have initial custom attributes', () => {
    expect(elements.simpleButtonInstance.ariaLabel()).toBe('Aria label test');
    expect(elements.simpleButtonInstance.title()).toBe('Title test');
    expect(elements.simpleButtonInstance.tabIndex()).toBe(-1);
    expect(elements.simpleButtonInstance.disabled()).toBeFalse();

    expect(elements.simpleButtonInstance.type()).toBe('minimal');
    expect(elements.simpleButtonInstance.square()).toBe(true);
    expect(elements.simpleButtonInstance.hover()).toBe('scale');
    expect(elements.simpleButtonInstance.direction()).toBe('column');
  });

  it('should apply attributes and classes according to accessibility inputs', () => {
    const simpleButtonBtn = elements.simpleButtonBtn.nativeElement as HTMLButtonElement;

    //Accessibility attributes
    expect(simpleButtonBtn.getAttribute('aria-label')).toBe('Aria label test');
    expect(simpleButtonBtn.getAttribute('title')).toBe('Title test');
    expect(simpleButtonBtn.getAttribute('tabindex')).toBe('-1');
    expect(simpleButtonBtn.getAttribute('aria-disabled')).toBe('false');
    expect(simpleButtonBtn.classList.contains('disabled')).toBeFalse();

    // Testing disabling the button
    const hostComponent = elements.hostComponent as TestHostWithAttr;
    hostComponent.isDisabled.set(true);
    elements.fixture.detectChanges();
    expect(simpleButtonBtn.classList.contains('disabled')).toBeTrue();
  });

  it('should apply attributes and classes according to style and behavior inputs', () => {
    const simpleButtonBtn = elements.simpleButtonBtn.nativeElement as HTMLButtonElement;

    // Initial style and behavior custom attributes
    expect(simpleButtonBtn.classList.contains('minimal')).toBeTrue();
    expect(simpleButtonBtn.classList.contains('square')).toBeTrue();
    expect(simpleButtonBtn.classList.contains('scaleHover')).toBeTrue();
    expect(simpleButtonBtn.classList.contains('column')).toBeTrue();

    // Testing rest of "type" options
    const hostComponent = elements.hostComponent as TestHostWithAttr;
    hostComponent.type.set('outline');
    elements.fixture.detectChanges();
    expect(simpleButtonBtn.classList.contains('minimal')).toBeFalse();
    expect(simpleButtonBtn.classList.contains('outline')).toBeTrue();

    // Testing rest of "hover" options
    hostComponent.hover.set('stroke');
    elements.fixture.detectChanges();
    expect(simpleButtonBtn.classList.contains('strokeHover')).toBeTrue();
    hostComponent.hover.set('shadow');
    elements.fixture.detectChanges();
    expect(simpleButtonBtn.classList.contains('shadowHover')).toBeTrue();
    hostComponent.hover.set('none');
    elements.fixture.detectChanges();
    expect(simpleButtonBtn.classList.contains('shadowHover')).toBeFalse();
    expect(simpleButtonBtn.classList.contains('toneHover')).toBeFalse();
    expect(simpleButtonBtn.classList.contains('scaleHover')).toBeFalse();
    expect(simpleButtonBtn.classList.contains('strokeHover')).toBeFalse();

  });

  it('should execute external function when clicking the button', () => {
    const hostComponent = elements.hostComponent as TestHostWithAttr;
    expect(hostComponent.checkAction()).toBe(true);

    elements.simpleButtonBtn.nativeElement.click();
    elements.fixture.detectChanges();
    expect(hostComponent.checkAction()).toBe(false);
  });
});
