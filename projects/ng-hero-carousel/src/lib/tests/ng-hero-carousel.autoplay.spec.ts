import { beforeEachCarouselTest, CarouselElements } from './helpers/beforeEach';
import { TestHostAttr, TestHostAutoplay } from './helpers/testHosts';
import { carouselItemsMock } from './helpers/mocks';

describe('NgHeroCarousel - No Autoplay', () => {
  let elements: CarouselElements;

  beforeEach(async () => {
    jasmine.clock().install();
    elements = await beforeEachCarouselTest('attr');
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should NOT change slide when autoplay is disabled', () => {

    const host = elements.hostComponent as TestHostAttr;
    const carouselInstance = elements.carouselInstance; // tu instancia real de NgHeroCarousel
    const selectedSignal = host.selectedItem;

    // Tomamos el valor dinámico del input
    const autoplayTime = carouselInstance.autoplayTime();

    // Inicial → slide 0
    expect(selectedSignal()).toBe(0);

    // Avanzamos el reloj usando el valor del input
    jasmine.clock().tick(autoplayTime * 2);

    // Seguimos en la slide 0 porque autoplay está desactivado
    expect(selectedSignal()).toBe(0);

  });

});

describe('NgHeroCarousel - Autoplay', () => {
  let elements: CarouselElements;

  beforeEach(async () => {
    jasmine.clock().install();
    elements = await beforeEachCarouselTest('ap');
  });

  afterEach(() => {
    jasmine.clock().uninstall();
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

  it('should change slide when autoplay is enabled', () => {

    let current = 0;
    const host = elements.hostComponent as TestHostAutoplay;
    const carouselInstance = elements.carouselInstance; // tu instancia real de NgHeroarousel
    const selectedSignal = host.selectedItem;

    // Tomamos el valor dinámico del input
    const autoplayTime = carouselInstance.autoplayTime();

    // Inicial → slide 0
    expect(selectedSignal()).toBe(current);

    // Avanzamos el reloj usando el valor del input
    jasmine.clock().tick(autoplayTime + 200);
    current ++;

    // Seguimos en la slide 0 porque autoplay está desactivado
    expect(selectedSignal()).toBe(current);
    checkState(current);

  });

  it('should pause autoplay when slide is clicked and resume after autoplayResumeTime', async () => {
    let current = 0;
    const host = elements.hostComponent as TestHostAutoplay;
    const carouselInstance = elements.carouselInstance;
    const selectedSignal = host.selectedItem;

    const autoplayTime = carouselInstance.autoplayTime();
    const autoplayResumeTime = carouselInstance.autoplayResumeTime();

    // Inicial → slide 0
    checkState(current);
    expect(selectedSignal()).toBe(current);

    // Simular click/touch sobre la slide
    const slidesContainer = elements.slides.nativeElement as HTMLElement;
    slidesContainer.dispatchEvent(new MouseEvent('click'));
    elements.fixture.detectChanges();
    // await elements.fixture.whenStable();

    jasmine.clock().tick(autoplayTime + 10);
    elements.fixture.detectChanges();
    expect(selectedSignal()).toBe(current);
    checkState(current);

    jasmine.clock().tick(autoplayResumeTime + autoplayTime);
    elements.fixture.detectChanges();
    current ++;
    checkState(current);
    expect(selectedSignal()).toBe(current);


  });

  it('should pause and restart autoplay when click toggle autoplay button', () => {
    let current = 0;
    const host = elements.hostComponent as TestHostAutoplay;
    const carouselInstance = elements.carouselInstance;
    const selectedSignal = host.selectedItem;

    const autoplayTime = carouselInstance.autoplayTime();
    const autoplayResumeTime = carouselInstance.autoplayResumeTime();

    // Inicial → slide 0
    checkState(current);
    expect(selectedSignal()).toBe(current);

    // Simular click sobre el autoplay toggler
    elements.autoplayBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
    elements.fixture.detectChanges();

    jasmine.clock().tick(autoplayResumeTime + 10);

    expect(selectedSignal()).toBe(current);
    checkState(current);


    elements.autoplayBtn.nativeElement.dispatchEvent(new MouseEvent('click'));
    elements.fixture.detectChanges();

    jasmine.clock().tick(autoplayTime + autoplayResumeTime + 10);
      current ++;
      checkState(current);
      expect(selectedSignal()).toBe(current);

  });


});
