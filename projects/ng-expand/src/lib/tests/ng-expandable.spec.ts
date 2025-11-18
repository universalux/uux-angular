import { beforeExpandTest, ExpandElements } from './helpers/beforeEach';

describe('NgExpand - With default Attributes', () => {

  let elements: ExpandElements;
  let buttonEl : HTMLButtonElement;
  let arrowIconEl : SVGAElement;
  let expansorEl : HTMLElement;
  let contentEl : HTMLDivElement;

  beforeEach(async () => {
    elements = await beforeExpandTest();

    buttonEl = elements.expandButton.nativeElement as HTMLButtonElement;
    arrowIconEl = elements.expandArrowIcon.nativeElement as SVGAElement;
    expansorEl = elements.expandExpansor.nativeElement as HTMLElement;
    contentEl = elements.expandContent.nativeElement as HTMLDivElement;
  });

  it('should create', () => {
    expect(elements.fixture).toBeTruthy();
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.expand).toBeTruthy();
    expect(elements.expandInstance).toBeTruthy();
    expect(elements.expandButton).toBeTruthy();
    expect(elements.expandArrowIcon).toBeTruthy();
    expect(elements.expandPlusIcon).toBeNull();
    expect(elements.expandExpansor).toBeTruthy();
    expect(elements.expandContent).toBeTruthy();
  });

  it('should have default input values', () => {
    // label input
    expect(elements.expandInstance.label()).toBe("Example label at expand button");
    // startExpanded input
    expect(elements.expandInstance.startExpanded()).toBe(false);
    // iconType input
    expect(elements.expandInstance.iconType()).toBe('arrow');
    // tabIndex input
    expect(elements.expandInstance.tabIndex()).toBe(0);
  });

  it('should apply classes and attributes when toggling expand', () => {

    const buttonId = buttonEl.id;
    const expansorId = expansorEl.id;

    // Initial classes and attributes
    expect(buttonEl.classList.contains('expanded')).toBeFalse();
    expect(buttonEl.getAttribute('aria-expanded')).toBe('false');
    expect(buttonEl.getAttribute('aria-controls')).toBe(expansorId);

    expect(arrowIconEl.classList.contains('expanded')).toBeFalse();

    expect(expansorEl.getAttribute('aria-labelledby')).toBe(buttonId);
    expect(expansorEl.hasAttribute('inert')).toBeTrue();

    // Clicking the button
    buttonEl.click();
    elements.fixture.detectChanges();

    // classes and attributes after click
    expect(buttonEl.classList.contains('expanded')).toBeTrue();
    expect(buttonEl.getAttribute('aria-expanded')).toBe('true');

    expect(arrowIconEl.classList.contains('expanded')).toBeTrue();

    expect(expansorEl.hasAttribute('inert')).toBeFalse();
  });

});

describe('NgExpand - With custom Attributes', () => {

  let elements: ExpandElements;
  let buttonEl : HTMLButtonElement;
  let plusIconEl : SVGAElement;
  let expansorEl : HTMLElement;
  let contentEl : HTMLDivElement;

  beforeEach(async () => {
    elements = await beforeExpandTest('attr');

    buttonEl = elements.expandButton.nativeElement as HTMLButtonElement;
    plusIconEl = elements.expandPlusIcon.nativeElement as SVGAElement;
    expansorEl = elements.expandExpansor.nativeElement as HTMLElement;
    contentEl = elements.expandContent.nativeElement as HTMLDivElement;
  });

  it('should create', () => {
    expect(elements.fixture).toBeTruthy();
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.expand).toBeTruthy();
    expect(elements.expandInstance).toBeTruthy();
    expect(elements.expandButton).toBeTruthy();
    expect(elements.expandArrowIcon).toBeNull();
    expect(elements.expandPlusIcon).toBeTruthy();
    expect(elements.expandExpansor).toBeTruthy();
    expect(elements.expandContent).toBeTruthy();
  });

  it('should have custom input values', () => {
    // startExpanded input
    expect(elements.expandInstance.startExpanded()).toBe(true);
    // iconType input
    expect(elements.expandInstance.iconType()).toBe('plus');
    // tabIndex input
    expect(elements.expandInstance.tabIndex()).toBe(-1);
  });

  it('should apply classes and attributes when toggling expand', () => {

    // Initial classes and attributes
    expect(buttonEl.classList.contains('expanded')).toBeTrue();
    expect(buttonEl.getAttribute('aria-expanded')).toBe('true');

    expect(plusIconEl.classList.contains('expanded')).toBeTrue();

    expect(expansorEl.hasAttribute('inert')).toBeFalse();

    // Clicking the button
    buttonEl.click();
    elements.fixture.detectChanges();

    // classes and attributes after click
    expect(buttonEl.classList.contains('expanded')).toBeFalse();
    expect(buttonEl.getAttribute('aria-expanded')).toBe('false');

    expect(plusIconEl.classList.contains('expanded')).toBeFalse();

    expect(expansorEl.hasAttribute('inert')).toBeTrue();
  });

});
