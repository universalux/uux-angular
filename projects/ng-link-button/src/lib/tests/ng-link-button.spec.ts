import { beforeEachLinkButtonTest, LinkButtonElements } from './helpers/beforeEach';

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

  });
});
