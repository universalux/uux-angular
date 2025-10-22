import { beforeEachCarouselTest, CarouselElements } from './helpers/beforeEach';
import { TestHostAttr } from './helpers/testHosts';
import { carouselItemsMock } from './helpers/mocks';

describe('NgHeroCarousel - Styles - No Attributes', () => {
  let elements: CarouselElements;

  beforeEach(async () => {
    elements = await beforeEachCarouselTest('noAttr');
  });

  it('should apply "overlay" class to all slides when hasOverlay is true (default)', () => {
    elements.slideArticleList.forEach((debugEl) => {
      const slideEl: HTMLElement = debugEl.nativeElement;
      expect(slideEl.classList.contains('overlay')).toBeTrue();
    });
  });

  it('should set default transitionTime (800ms) as CSS variable on host', () => {
    const hostEl: HTMLElement = elements.carousel.nativeElement;
    const cssVar = hostEl.style.getPropertyValue('--carousel-transition-time').trim();
    expect(cssVar).toBe('800ms');
  });

  it('should apply default arrowsPlacement="auto" classes on button containers', () => {
    const prevBtnContainer: HTMLElement = elements.prevBtnContainer.nativeElement;
    const nextBtnContainer: HTMLElement = elements.nextBtnContainer.nativeElement;

    // Por defecto debe ser "auto"
    expect(prevBtnContainer.classList.contains('auto')).toBeTrue();
    expect(nextBtnContainer.classList.contains('auto')).toBeTrue();

    // Y no debe ser "up"
    expect(prevBtnContainer.classList.contains('up')).toBeFalse();
    expect(nextBtnContainer.classList.contains('up')).toBeFalse();
  });

  it('should render indicators with default type="bars"', () => {
    // El contenedor general de indicadores debe estar presente
    expect(elements.indicators).toBeTruthy();

    // Todos los botones de indicadores deben existir
    expect(elements.indicatorBtnList.length).toBe(carouselItemsMock.length);

    // Ningún indicador debe tener clase "circles" por defecto
    const indicatorIcons = elements.fixture.nativeElement.querySelectorAll('.carousel__indicatorIcon');
    indicatorIcons.forEach((icon: HTMLElement) => {
      expect(icon.classList.contains('circles')).toBeFalse();
    });
  });

  it('should not render counter by default', () => {
    const counterEl = elements.counter;
    expect(counterEl).toBeNull(); // o toBeFalsy(), ambas funcionan
  });

});

describe('NgHeroCarousel - Styles - With Attributes', () => {
  let elements: CarouselElements;

  beforeEach(async () => {
    elements = await beforeEachCarouselTest('attr');
  });

  it('should not apply "overlay" class to slides when hasOverlay is false', () => {
    elements.slideArticleList.forEach((debugEl) => {
      const slideEl: HTMLElement = debugEl.nativeElement;
      expect(slideEl.classList.contains('overlay')).toBeFalse();
    });
  });

  it('should set custom transitionTime (0ms) as CSS variable on host', () => {
    const hostEl: HTMLElement = elements.carousel.nativeElement;
    const cssVar = hostEl.style.getPropertyValue('--carousel-transition-time').trim();
    expect(cssVar).toBe('0ms');
  });

  it('should apply custom arrowsPlacement="up" classes on button containers', () => {
    const prevBtnContainer: HTMLElement = elements.prevBtnContainer.nativeElement;
    const nextBtnContainer: HTMLElement = elements.nextBtnContainer.nativeElement;

    // Por defecto debe ser "auto"
    expect(prevBtnContainer.classList.contains('up')).toBeTrue();
    expect(nextBtnContainer.classList.contains('up')).toBeTrue();

    // Y no debe ser "up"
    expect(prevBtnContainer.classList.contains('auto')).toBeFalse();
    expect(nextBtnContainer.classList.contains('auto')).toBeFalse();
  });

  it('should render buttons without extra class when arrowsPlacement="down"', () => {
    // Seteamos la señal a "down"
    (elements.hostComponent as TestHostAttr).arrows.set('down');
    elements.fixture.detectChanges();

    const prevBtnContainer: HTMLElement = elements.prevBtnContainer.nativeElement;
    const nextBtnContainer: HTMLElement = elements.nextBtnContainer.nativeElement;

    // No debe tener las clases "auto" ni "up"
    expect(prevBtnContainer.classList.contains('auto')).toBeFalse();
    expect(prevBtnContainer.classList.contains('up')).toBeFalse();
    expect(nextBtnContainer.classList.contains('auto')).toBeFalse();
    expect(nextBtnContainer.classList.contains('up')).toBeFalse();
  });

  it('should render indicators with custom type="circles"', () => {
    // El contenedor general de indicadores debe estar presente
    expect(elements.indicators).toBeTruthy();

    // Todos los botones de indicadores deben existir
    expect(elements.indicatorBtnList.length).toBe(carouselItemsMock.length);

    // Ningún indicador debe tener clase "circles" por defecto
    const indicatorIcons = elements.fixture.nativeElement.querySelectorAll('.carousel__indicatorIcon');
    indicatorIcons.forEach((icon: HTMLElement) => {
      expect(icon.classList.contains('circles')).toBeTrue();
    });
  });

  it('should not render indicators when indicators="none"', async () => {
    // Cambiamos el valor del input a 'none'
    (elements.hostComponent as TestHostAttr).ind.set('none');
    elements.fixture.detectChanges();

    // El contenedor de indicadores no debe existir
    const indicatorsContainer = elements.fixture.nativeElement.querySelector('.carousel__indicatorsContainer');
    expect(indicatorsContainer).toBeNull();

    // No debería haber ningún botón de indicador
    const indicatorBtns = elements.fixture.nativeElement.querySelectorAll('.carousel__indicatorBtn');
    expect(indicatorBtns.length).toBe(0);
  });

  it('should update counter when clicking next button (with delay)', (done) => {
    let current : number = 1;
    const total : number = elements.slideArticleList.length;
    const nextBtn: HTMLElement = elements.nextBtn.nativeElement;
    const counter: HTMLElement = elements.counter?.nativeElement;

    expect(counter?.textContent?.trim()).toBe(`${current}/${total}`);

    // Click en next
    nextBtn.click();
    current++;
    elements.fixture.detectChanges();

    const transitionTimeMs = elements.carouselInstance.transitionTime();

    setTimeout(() => {
      elements.fixture.detectChanges();

      expect(counter?.textContent?.trim()).toBe(`${current}/${total}`);

      done(); // Avisamos a Jasmine que el test ha terminado
    }, transitionTimeMs);
  });

});
