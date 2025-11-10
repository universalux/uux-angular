import { DebugElement } from '@angular/core';
import { beforeEachCarouselTest, CarouselElements } from './helpers/beforeEach';
import { HERO_CAROUSEL_LANG } from '../accessibility/hero-carousel.lang';
import { accessibilityOptionsMock } from './helpers/mocks';
import { TestHostAutoplay } from './helpers/testHosts';

describe('NgxFullCarousel - No Attrs', () => {
  let elements: CarouselElements;
  let nextBtn: HTMLElement;
  let prevBtn: HTMLElement;
  let slides: HTMLElement;
  let slideArticleList: HTMLElement[];

  beforeEach(async () => {
    elements = await beforeEachCarouselTest('noAttr');
    nextBtn = elements.nextBtn.nativeElement as HTMLElement;
    prevBtn = elements.prevBtn.nativeElement as HTMLElement;
    slides = elements.slides.nativeElement as HTMLElement;
    slideArticleList = elements.slideArticleList.map(
      (el: DebugElement) => el.nativeElement as HTMLElement
    );

  });

  const checkAutoplayAccByLang = (
    lang: 'en' | 'es' | 'fr' | 'de' | 'it',
    autoplayBtn: HTMLElement,
    expectPlaying: boolean
  ) => {
    const translations = HERO_CAROUSEL_LANG[lang];

    // Autoplay
    if (expectPlaying) {
      expect(autoplayBtn.getAttribute('aria-label')).toBe(translations.autoplayPauseLabel!);
      expect(autoplayBtn.getAttribute('title')).toBe(translations.autoplayPauseLabel!);
      expect(autoplayBtn.getAttribute('aria-pressed')).toBe('true');
    } else {
      expect(autoplayBtn.getAttribute('aria-label')).toBe(translations.autoplayPlayLabel!);
      expect(autoplayBtn.getAttribute('title')).toBe(translations.autoplayPlayLabel!);
      expect(autoplayBtn.getAttribute('aria-pressed')).toBe('false');
    }
  };

  const checkAccByLang = (lang: 'en' | 'es' | 'fr' | 'de' | 'it') => {
    const translations = HERO_CAROUSEL_LANG[lang];

    expect(elements.carousel.nativeElement.getAttribute('aria-label')).toBe(translations.hostAriaLabel!);

    expect(prevBtn.getAttribute('aria-label')).toBe(translations.prevBtnAriaLabel!);
    expect(nextBtn.getAttribute('aria-label')).toBe(translations.nextBtnAriaLabel!);

    expect(slides.getAttribute('aria-label')).toBe(translations.slidesRegionAriaLabel!);
    expect(slides.getAttribute('aria-roledescription')).toBe(translations.slidesRegionRoleDescription!);

    expect(slideArticleList[0].getAttribute('aria-label')).toBe(translations.slideAriaLabel!(1 ,2));
    expect(slideArticleList[0].getAttribute('aria-roledescription')).toBe(translations.slideRoleDescription!);
  }

  it('should update aria attributes (default en) of autoplay button when toggled', () => {
    const autoplayBtn = elements.autoplayBtn.nativeElement as HTMLElement;

    // Inicialmente está reproduciendo
    checkAutoplayAccByLang('en', autoplayBtn, true);

    // Click debería cambiar a estado "pausado"
    autoplayBtn.click();
    elements.fixture.detectChanges();
    checkAutoplayAccByLang('en', autoplayBtn, false);

    // Otro click vuelve a reproducir
    autoplayBtn.click();
    elements.fixture.detectChanges();
    checkAutoplayAccByLang('en', autoplayBtn, true);
  });

  it('should have predefined aria attributes (en)', () => {
    checkAccByLang('en');
  });

});

describe('NgxFullCarousel - Languages (es)', () => {
  let elements: CarouselElements;
  let nextBtn: HTMLElement;
  let prevBtn: HTMLElement;
  let slides: HTMLElement;
  let slideArticleList: HTMLElement[];

  beforeEach(async () => {
    elements = await beforeEachCarouselTest('ap');
    nextBtn = elements.nextBtn.nativeElement as HTMLElement;
    prevBtn = elements.prevBtn.nativeElement as HTMLElement;
    slides = elements.slides.nativeElement as HTMLElement;
    slideArticleList = elements.slideArticleList.map(
      (el: DebugElement) => el.nativeElement as HTMLElement
    );

  });

  const checkAutoplayAccByLang = (
    lang: 'en' | 'es' | 'fr' | 'de' | 'it',
    autoplayBtn: HTMLElement,
    expectPlaying: boolean
  ) => {
    const translations = HERO_CAROUSEL_LANG[lang];

    // Autoplay
    if (expectPlaying) {
      expect(autoplayBtn.getAttribute('aria-label')).toBe(translations.autoplayPauseLabel!);
      expect(autoplayBtn.getAttribute('title')).toBe(translations.autoplayPauseLabel!);
      expect(autoplayBtn.getAttribute('aria-pressed')).toBe('true');
    } else {
      expect(autoplayBtn.getAttribute('aria-label')).toBe(translations.autoplayPlayLabel!);
      expect(autoplayBtn.getAttribute('title')).toBe(translations.autoplayPlayLabel!);
      expect(autoplayBtn.getAttribute('aria-pressed')).toBe('false');
    }
  };

  const checkAccByLang = (lang: 'en' | 'es' | 'fr' | 'de' | 'it') => {
    const translations = HERO_CAROUSEL_LANG[lang];

    expect(elements.carousel.nativeElement.getAttribute('aria-label')).toBe(translations.hostAriaLabel!);

    expect(prevBtn.getAttribute('aria-label')).toBe(translations.prevBtnAriaLabel!);
    expect(nextBtn.getAttribute('aria-label')).toBe(translations.nextBtnAriaLabel!);

    expect(slides.getAttribute('aria-label')).toBe(translations.slidesRegionAriaLabel!);
    expect(slides.getAttribute('aria-roledescription')).toBe(translations.slidesRegionRoleDescription!);

    expect(slideArticleList[0].getAttribute('aria-label')).toBe(translations.slideAriaLabel!(1 ,2));
    expect(slideArticleList[0].getAttribute('aria-roledescription')).toBe(translations.slideRoleDescription!);
  }

  it('should update aria attributes (custom es) of autoplay button when toggled', () => {
    const autoplayBtn = elements.autoplayBtn.nativeElement as HTMLElement;

    // Inicialmente está reproduciendo
    checkAutoplayAccByLang('es', autoplayBtn, true);

    // Click debería cambiar a estado "pausado"
    autoplayBtn.click();
    elements.fixture.detectChanges();
    checkAutoplayAccByLang('es', autoplayBtn, false);

    // Otro click vuelve a reproducir
    autoplayBtn.click();
    elements.fixture.detectChanges();
    checkAutoplayAccByLang('es', autoplayBtn, true);
  });

  it('should have custom aria attributes (es)', () => {
    checkAccByLang('es');
  });

  it('should have custom aria attributes (it)', () => {
    const host = elements.hostComponent as TestHostAutoplay;
    host.langSelection.set('it');
    elements.fixture.detectChanges();

    checkAccByLang('it');
  });

  it('should have custom aria attributes (fr)', () => {
    const host = elements.hostComponent as TestHostAutoplay;
    host.langSelection.set('fr');
    elements.fixture.detectChanges();

    checkAccByLang('fr');
  });

  it('should have custom aria attributes (de)', () => {
    const host = elements.hostComponent as TestHostAutoplay;
    host.langSelection.set('de');
    elements.fixture.detectChanges();

    checkAccByLang('de');
  });

});

describe('NgxFullCarousel - Languages Acc Options', () => {
  let elements: CarouselElements;
  let nextBtn: HTMLElement;
  let prevBtn: HTMLElement;
  let slides: HTMLElement;
  let slideArticleList: HTMLElement[];

  beforeEach(async () => {
    elements = await beforeEachCarouselTest('attr');
    nextBtn = elements.nextBtn.nativeElement as HTMLElement;
    prevBtn = elements.prevBtn.nativeElement as HTMLElement;
    slides = elements.slides.nativeElement as HTMLElement;
    slideArticleList = elements.slideArticleList.map(
      (el: DebugElement) => el.nativeElement as HTMLElement
    );

  });


  it('should have custom aria attributes by customAria', () => {
    const translations = accessibilityOptionsMock;

    expect(elements.carousel.nativeElement.getAttribute('aria-label')).toBe(translations.hostAriaLabel!);

    expect(prevBtn.getAttribute('aria-label')).toBe(translations.prevBtnAriaLabel!);
    expect(nextBtn.getAttribute('aria-label')).toBe(translations.nextBtnAriaLabel!);

    expect(slides.getAttribute('aria-label')).toBe(translations.slidesRegionAriaLabel!);
    expect(slides.getAttribute('aria-roledescription')).toBe(translations.slidesRegionRoleDescription!);

    expect(slideArticleList[0].getAttribute('aria-label')).toBe(translations.slideAriaLabel!(1 ,2));
    expect(slideArticleList[0].getAttribute('aria-roledescription')).toBe(translations.slideRoleDescription!);
  });

});
