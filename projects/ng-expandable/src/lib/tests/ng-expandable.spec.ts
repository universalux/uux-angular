import { beforeExpandableTest, ExpandableElements } from './helpers/beforeEach';

describe('NgExpandable - With default Attributes', () => {

  let elements: ExpandableElements;
  let buttonEl : HTMLButtonElement;
  let arrowIconEl : SVGAElement;
  let expansorEl : HTMLElement;
  let contentEl : HTMLDivElement;

  beforeEach(async () => {
    elements = await beforeExpandableTest();

    buttonEl = elements.expandableButton.nativeElement as HTMLButtonElement;
    arrowIconEl = elements.expandableArrowIcon.nativeElement as SVGAElement;
    expansorEl = elements.expandableExpansor.nativeElement as HTMLElement;
    contentEl = elements.expandableContent.nativeElement as HTMLDivElement;
  });

  it('should create', () => {
    expect(elements.fixture).toBeTruthy();
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.expandable).toBeTruthy();
    expect(elements.expandableInstance).toBeTruthy();
    expect(elements.expandableButton).toBeTruthy();
    expect(elements.expandableArrowIcon).toBeTruthy();
    expect(elements.expandablePlusIcon).toBeNull();
    expect(elements.expandableExpansor).toBeTruthy();
    expect(elements.expandableContent).toBeTruthy();
  });

  it('should have default input values', () => {
    // label input
    expect(elements.expandableInstance.label()).toBe("Example label at expandable button");
    // startExpanded input
    expect(elements.expandableInstance.startExpanded()).toBe(false);
    // iconType input
    expect(elements.expandableInstance.iconType()).toBe('arrow');
    // tabIndex input
    expect(elements.expandableInstance.tabIndex()).toBe(0);
  });

  it('should apply classes and attributes when toggling expandable', () => {

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

describe('NgExpandable - With custom Attributes', () => {

  let elements: ExpandableElements;
  let buttonEl : HTMLButtonElement;
  let plusIconEl : SVGAElement;
  let expansorEl : HTMLElement;
  let contentEl : HTMLDivElement;

  beforeEach(async () => {
    elements = await beforeExpandableTest('attr');

    buttonEl = elements.expandableButton.nativeElement as HTMLButtonElement;
    plusIconEl = elements.expandablePlusIcon.nativeElement as SVGAElement;
    expansorEl = elements.expandableExpansor.nativeElement as HTMLElement;
    contentEl = elements.expandableContent.nativeElement as HTMLDivElement;
  });

  it('should create', () => {
    expect(elements.fixture).toBeTruthy();
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.expandable).toBeTruthy();
    expect(elements.expandableInstance).toBeTruthy();
    expect(elements.expandableButton).toBeTruthy();
    expect(elements.expandableArrowIcon).toBeNull();
    expect(elements.expandablePlusIcon).toBeTruthy();
    expect(elements.expandableExpansor).toBeTruthy();
    expect(elements.expandableContent).toBeTruthy();
  });

  it('should have custom input values', () => {
    // startExpanded input
    expect(elements.expandableInstance.startExpanded()).toBe(true);
    // iconType input
    expect(elements.expandableInstance.iconType()).toBe('plus');
    // tabIndex input
    expect(elements.expandableInstance.tabIndex()).toBe(-1);
  });

  it('should apply classes and attributes when toggling expandable', () => {

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
