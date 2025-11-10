import { beforeEachCarouselTest, CarouselElements } from './helpers/beforeEach';
import { carouselItemsMock } from './helpers/mocks';

describe('NgHeroCarousel - General', () => {
  let elements: CarouselElements;

  beforeEach(async () => {
    elements = await beforeEachCarouselTest('noAttr');
  });

  it('should render hostComponent, Carousel and Elements', () => {
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.fixture).toBeTruthy();
    expect(elements.carousel).toBeTruthy();
    expect(elements.carouselInstance).toBeTruthy();
    expect(elements.autoplayBtn).toBeTruthy();
    expect(elements.outerContent).toBeFalsy(); //Default false
    expect(elements.titlesReader).toBeTruthy();
    expect(elements.prevBtnContainer).toBeTruthy();
    expect(elements.prevBtn).toBeTruthy();
    expect(elements.nextBtnContainer).toBeTruthy();
    expect(elements.nextBtn).toBeTruthy();
    expect(elements.slides).toBeTruthy();
    expect(elements.slideArticleList).toBeTruthy();
    expect(elements.indicators).toBeTruthy();
    expect(elements.indicatorBtnList).toBeTruthy();
    expect(elements.counter).toBeFalsy(); //Default false
  });

  it('should receive "carouselItemsMock" at "slides" input', () => {
    // Comprobamos que el slides input coincide con el mock introducido
    const slidesInput = elements.carouselInstance.slides();
    expect(slidesInput).toEqual(carouselItemsMock);
    expect(slidesInput.length).toBe(carouselItemsMock.length);
    expect(slidesInput[0]).toEqual(carouselItemsMock[0]);
    expect(slidesInput[1]).toEqual(carouselItemsMock[1]);

  });

  it('should render content according to mock', () => {

    // Comprobamos que se renderizan el número correcto de slides
    expect(elements.slideArticleList.length).toEqual(carouselItemsMock.length);

    // Comprobamos que se aplican el background-image y background-color en cada slide
    elements.slideArticleList.forEach((debugEl, index) => {
      const slideEl: HTMLElement = debugEl.nativeElement;
      const mock = carouselItemsMock[index];

      // Comprobar background-image
      if (mock.image_url) {
        expect(slideEl.style.background).toBe(`url("${mock.image_url}") center center / cover, ${mock.backgroundColor || 'transparent'}`);
      } else {
        expect(slideEl.style.background).toBe(`center center / cover ${mock.backgroundColor || 'transparent'}`);
      }

      // Buscar h2 y h3 dentro del slide
      const titleEl = slideEl.querySelector('h2.carousel__slideTitle');
      const subtitleEl = slideEl.querySelector('h3.carousel__slideSubtitle');

      // Comprobar title
      if (mock.title) {
        expect(titleEl).toBeTruthy();
        expect(titleEl?.textContent?.trim()).toBe(mock.title);
      } else {
        expect(titleEl).toBeNull();
      }

      // Comprobar subtitle
      if (mock.subtitle) {
        expect(subtitleEl).toBeTruthy();
        expect(subtitleEl?.textContent?.trim()).toBe(mock.subtitle);
      } else {
        expect(subtitleEl).toBeNull();
      }
    });
  });

  it('should init with default values', () => {
    // Obtenemos los inputs
    const hasOverlayInput = elements.carouselInstance.hasOverlay();
    const transitionTimeInput = elements.carouselInstance.transitionTime();
    const arrowsPlacementInput = elements.carouselInstance.arrowsPlacement();
    const indicatorsInput = elements.carouselInstance.indicators();
    const hasCounterInput = elements.carouselInstance.hasCounter();
    const hasAutoplayInput = elements.carouselInstance.hasAutoplay();
    const autoplayTimeInput = elements.carouselInstance.autoplayTime();
    const autoplayResumeTimeInput = elements.carouselInstance.autoplayResumeTime();
    const langInput = elements.carouselInstance.lang();
    const customAriaInput = elements.carouselInstance.customAria();

    expect(hasOverlayInput).toBe(true);
    expect(transitionTimeInput).toBe(800);
    expect(arrowsPlacementInput).toBe('auto');
    expect(indicatorsInput).toBe('bars');
    expect(hasCounterInput).toBe(false);
    expect(hasAutoplayInput).toBe(true);
    expect(autoplayTimeInput).toBe(7000);
    expect(autoplayResumeTimeInput).toBe(15000);
    expect(langInput).toBe('en');
    expect(customAriaInput).toBe(null);

  });

  it('should have prev/next buttons enabled by default', () => {
    const prevBtnEl: HTMLButtonElement = elements.prevBtn.nativeElement;
    const nextBtnEl: HTMLButtonElement = elements.nextBtn.nativeElement;

    expect(prevBtnEl.disabled).toBeFalse();
    expect(nextBtnEl.disabled).toBeFalse();
  });

  it('should have aria-label on slides container', () => {
    const slidesContainer: HTMLElement = elements.slides.nativeElement;

    expect(slidesContainer.hasAttribute('aria-label')).toBeTrue();
    expect(slidesContainer.getAttribute('aria-label')).not.toBe('');
  });

});
