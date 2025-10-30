import { CONTENT_CAROUSEL_LANG } from '../accessibility/content-carousel.lang';
import { ContentCarouselLangs } from '../ng-content-carousel.types';
import { beforeEachCarouselTest, CarouselElements } from './helpers/beforeEach';
import { carouselItemsMock, externalItemSize, initialItemPadding } from './helpers/mocks';

describe('NgContentCarousel - General', () => {

  let elements: CarouselElements;

  beforeEach(async () => {
    elements = await beforeEachCarouselTest();
  });

  const checkAccByLang = (lang: ContentCarouselLangs) => {
    const translations = CONTENT_CAROUSEL_LANG[lang];
    const totalItems : number = elements.itemList.length;
    const firstItem : number = elements.carouselInstance.currentIndex() + 1;
    const lastItem : number = elements.carouselInstance.currentIndex() + elements.carouselInstance.itemsViewed()!;

    expect(elements.carouselContainer.nativeElement.getAttribute('aria-label')).toBe(translations.globalAriaLabel!);
    expect(elements.carouselContainer.nativeElement.getAttribute('aria-roleDescription')).toBe(translations.globalRoleDescription!);

    expect(elements.prevButton.nativeElement.getAttribute('aria-label')).toBe(translations.prevBtnAriaLabel!);
    expect(elements.nextButton.nativeElement.getAttribute('aria-label')).toBe(translations.nextBtnAriaLabel!);

    expect(elements.track.nativeElement.getAttribute('aria-roleDescription')).toBe(translations.trackRoleDescription!);
    expect(elements.track.nativeElement.getAttribute('aria-label')).toBe(translations.trackAriaLabel!);

    expect(elements.titlesReader.nativeElement.innerText).toBe(translations.rangeMessage!(firstItem, lastItem, totalItems));
  };


  it('should create', () => {
    expect(elements.fixture).toBeTruthy();
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.carousel).toBeTruthy();
    expect(elements.carouselInstance).toBeTruthy();
    expect(elements.carouselContainer).toBeTruthy();
    expect(elements.titlesReader).toBeTruthy();
    expect(elements.prevContainer).toBeTruthy();
    expect(elements.prevButton).toBeTruthy();
    expect(elements.nextContainer).toBeTruthy();
    expect(elements.nextButton).toBeTruthy();
    expect(elements.trackContainer).toBeTruthy();
    expect(elements.track).toBeTruthy();
    expect(elements.itemList).toBeTruthy();
  });

  it('should render items mock (10) and indicated item size', () => {
    expect(elements.itemList.length).toBe(carouselItemsMock.length);
    const itemWidth = elements.carouselInstance.itemWidth();
    expect(itemWidth).toBe(externalItemSize + initialItemPadding);
  });

  it('should init with default attribute values', () => {
    expect(elements.carouselInstance.transition()).toBe(true);
    expect(elements.carouselInstance.arrowStyle()).toBe('minimal');
    expect(elements.carouselInstance.hideArrowsOnEdges()).toBe(true);
    expect(elements.carouselInstance.advanceMode()).toBe('page');
  });

  it('should apply classes according to default attribute values', () => {

    // transition attribute
    expect(elements.track.nativeElement.classList.contains('transition')).toBe(true);

    // arrowStyle attribute
    expect(elements.prevButton.nativeElement.classList.contains('minimal')).toBe(true);
    expect(elements.nextButton.nativeElement.classList.contains('minimal')).toBe(true);

    // hideArrowsOnEdges attribute
    expect(elements.prevContainer.nativeElement.classList.contains('onStart')).toBe(true);
    expect(elements.prevButton.nativeElement.hasAttribute('inert')).toBe(true);
    expect(elements.prevButton.nativeElement.getAttribute('aria-disabled')).toBe('true');

    expect(elements.nextContainer.nativeElement.classList.contains('onEnd')).toBe(false);
    expect(elements.nextButton.nativeElement.hasAttribute('inert')).toBe(false);
    expect(elements.nextButton.nativeElement.getAttribute('aria-disabled')).toBe('false');

  });

  it('should go to next and prev item according to "advanceMode" (default - page)', () => {
    let currentIndex = elements.carouselInstance.currentIndex();
    const itemsViewed = elements.carouselInstance.itemsViewed();
    expect(currentIndex).toBe(0);
    console.log(currentIndex, itemsViewed);

    elements.nextButton.nativeElement.click();
    elements.fixture.detectChanges();

    const newCurrentIndex = elements.carouselInstance.currentIndex();

    expect(newCurrentIndex).toBe(currentIndex + itemsViewed!);

    elements.nextButton.nativeElement.click();
    elements.fixture.detectChanges();

    const finalCurrentIndex = elements.carouselInstance.currentIndex();
    const expectedIndex = elements.itemList.length - itemsViewed!;

    expect(finalCurrentIndex).toBe(expectedIndex);

  });

  it('should have default accessibility values whe no attributes', () => {
    checkAccByLang('en');
  });

});
