import { beforeEachCarouselTest, CarouselElements } from './helpers/beforeEach';
import { TestHostAttr } from './helpers/testHosts';
import { carouselItemsMock } from './helpers/mocks';

describe('NgHeroCarousel - Functionality', () => {
  let elements: CarouselElements;

  beforeEach(async () => {
    elements = await beforeEachCarouselTest('attr');
  });

  //Helper que comprueba todos los cambios referentes al cambio de slide
  const checkState = (current: number) => {

    const slides = elements.slideArticleList.map(s => s.nativeElement as HTMLElement);
    const indicators = elements.indicatorBtnList.map(b => b.nativeElement as HTMLElement);
    const selectedSignal = (elements.hostComponent as TestHostAttr).selectedItem;

    // 1) Comprobaciones por cada slide (clases, posicionado, indicators)
    slides.forEach((slideEl, index) => {
      const slideContent = slideEl.querySelector('.carousel__slideContent') as HTMLElement;

      // active state correct
      const isActive = slideEl.classList.contains('active');
      expect(isActive).toBe(index === current ? true : false);

      // content active class
      expect(slideContent.classList.contains('active')).toBe(isActive);

      if (index > current) {
        expect(slideEl.classList.contains('fromRight')).toBeTrue();
      }
      if (index < current) {
        expect(slideEl.classList.contains('fromLeft')).toBeTrue();
      }
      if (index === slides.length - 1 && current === 0) {
        expect(slideEl.classList.contains('firstFromLeft')).toBeTrue();
      }

      // indicator mapping (estos suelen estar vinculados por índice)
      if (indicators[index]) {
        expect(indicators[index].classList.contains('active')).toBe(index === current);
      }
    });

    // ---- 2) Comprobación: el slide *activo* tiene el título/subtítulo correctos ----
    const activeSlide = slides.find(s => s.classList.contains('active')) as HTMLElement | undefined;
    expect(activeSlide).toBeTruthy();

    if (activeSlide) {
      const activeContent = activeSlide.querySelector('.carousel__slideContent') as HTMLElement;
      const activeTitle = activeContent.querySelector('.carousel__slideTitle') as HTMLElement | null;
      const activeSubtitle = activeContent.querySelector('.carousel__slideSubitle, .carousel__slideSubtitle') as HTMLElement | null;
      // comparas con el model
      expect(activeTitle?.textContent?.trim()).toBe(carouselItemsMock[current].title);
      if (carouselItemsMock[current].subtitle) {
        expect(activeSubtitle?.textContent?.trim()).toBe(carouselItemsMock[current].subtitle);
      } else {
        expect(activeSubtitle).toBeNull();
      }

      // Contenido externo: slideCustomContent
      const custom = activeContent.querySelector('.slideCustomContent') as HTMLElement | null;
      const customBtn = activeContent.querySelector('#testSlide0Btn') as HTMLElement | null;
      if (current === 0) {
        expect(custom).toBeTruthy();
        expect(customBtn).toBeTruthy();
      } else {
        // opcional: asegurarte que no está (si así lo deseas)
        expect(customBtn).toBeNull();
      }
    }
    // ---- 3) Contenido externo: outerContent
    const outerContent = elements.outerContent.nativeElement as HTMLElement;
    const outerContentBtn = outerContent.querySelector('#testOuterContent') as HTMLElement;
    expect(outerContent).toBeTruthy();
    expect(outerContentBtn).toBeTruthy();

    // ---- 4) Output signal debe reflejar current ----
    expect(selectedSignal()).toBe(current);
  };

  it('should navigate slides correctly with next and prev buttons', (done) => {
    let current = 0;
    const transitionTimeMs = elements.carouselInstance.transitionTime();

    // Initial check
    checkState(current);

    // 2. Click en next
    elements.nextBtn.nativeElement.click();
    current++;
    elements.fixture.detectChanges();

    setTimeout(() => {
      elements.fixture.detectChanges();
      checkState(current);

      // 3. Click en prev
      elements.prevBtn.nativeElement.click();
      current--;
      elements.fixture.detectChanges();

      setTimeout(() => {
        elements.fixture.detectChanges();
        checkState(current);
      }, transitionTimeMs);
      done();
    }, transitionTimeMs);

  });

  it('should navigate slides with keyboard arrows', (done) => {
    let current = 0;
    const transitionTimeMs = elements.carouselInstance.transitionTime();


    checkState(current);

    // Simular tecla ArrowRight
    const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    elements.carousel.nativeElement.dispatchEvent(eventRight);
    current++;
    elements.fixture.detectChanges();

    setTimeout(() => {
      elements.fixture.detectChanges();
      checkState(current);

      // Simular tecla ArrowLeft
      const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      elements.carousel.nativeElement.dispatchEvent(eventLeft);
      current--;
      elements.fixture.detectChanges();

      setTimeout(() => {
        elements.fixture.detectChanges();
        checkState(current);
        done();
      }, transitionTimeMs);

    }, transitionTimeMs);
  });

  it('should navigate slides by clicking indicators', () => {

    const indicators = elements.indicatorBtnList.map(btn => btn.nativeElement);

    // Vamos pulsando cada indicator
    indicators.forEach((indicator, i) => {
      indicator.click();
      elements.fixture.detectChanges();
      checkState(i);
    });
  });

});
