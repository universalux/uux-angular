import { SCROLL_NAV_LANG } from '../accessibility/scroll-nav.lang';
import { ScrollNavLangs } from '../ng-scroll-nav.types';
import { beforeEachScrollNavTest, ScrollNavElements } from './helpers/beforeEach';
import { TestHostWithAttr } from './helpers/testHosts';

describe('NgScrollNav - With default Attributes', () => {
  let elements: ScrollNavElements;

  beforeEach(async () => {
    elements = await beforeEachScrollNavTest('noAttr');
  });

  it('should create', () => {
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.fixture).toBeTruthy();

    expect(elements.scrollNav).toBeTruthy();
    expect(elements.scrollNavInstance).toBeTruthy();

    expect(elements.nav).toBeTruthy();
    expect(elements.contentContainer).toBeTruthy();
    expect(elements.content).toBeTruthy();
    expect(elements.linkList).toBeTruthy();
  });

  //---Doens´t work on husky tests
  // it('should not show arrows if it´s enought space for inner elements', () => {
  //   expect(elements.prevButton).toBeNull();
  //   expect(elements.nextButton).toBeNull();
  //   expect(elements.scrollNavInstance.hasOverflow()).toBe(false);
  // });

  it('should have default signals if inputs wasn´t set', () => {
    expect(elements.scrollNavInstance.scrollStep()).toBe(150);
    expect(elements.scrollNavInstance.scrollBehavior()).toBe('smooth');
    expect(elements.scrollNavInstance.lang()).toBe('en');
    expect(elements.scrollNavInstance.customAria()).toBe(null);
  });

});

describe('NgScrollNav - With CUSTOM Attributes', () => {
  let elements: ScrollNavElements;

  beforeEach(async () => {
    elements = await beforeEachScrollNavTest();
  });

  const checkAccByLang = (lang: ScrollNavLangs) => {
    const translations = SCROLL_NAV_LANG[lang];

    const navEl = elements.nav.nativeElement as HTMLElement;
    const prevButtonEl = elements.prevButton.nativeElement as HTMLElement;
    const nextButtonEl = elements.nextButton.nativeElement as HTMLElement;
    const contentEl = elements.content.nativeElement as HTMLElement;

    expect(navEl.getAttribute('aria-label')).toBe(translations.navAriaLabel!);
    expect(prevButtonEl.getAttribute('aria-label')).toBe(translations.prevBtnAriaLabel!);
    expect(nextButtonEl.getAttribute('aria-label')).toBe(translations.nextBtnAriaLabel!);
    expect(contentEl.getAttribute('aria-label')).toBe(translations.linksGroupAriaLabel!);
  };

  it('should create', () => {
    expect(elements.hostComponent).toBeTruthy();
    expect(elements.fixture).toBeTruthy();

    expect(elements.scrollNav).toBeTruthy();
    expect(elements.scrollNavInstance).toBeTruthy();

    expect(elements.nav).toBeTruthy();
    expect(elements.contentContainer).toBeTruthy();
    expect(elements.content).toBeTruthy();
    expect(elements.linkList).toBeTruthy();
  });

  it('should show arrows if it´s enought space for inner elements', () => {

    expect(elements.prevButton).toBeTruthy();
    expect(elements.nextButton).toBeTruthy();
    expect(elements.scrollNavInstance.hasOverflow()).toBe(true);



    expect(elements.contentContainer.nativeElement.classList.contains('overflow')).toBe(true);
    expect(elements.content.nativeElement.classList.contains('overflow')).toBe(true);
  });

  it('should have default signals if inputs wasn´t set', () => {
    expect(elements.scrollNavInstance.scrollStep()).toBe(200);
    expect(elements.scrollNavInstance.scrollBehavior()).toBe('auto');
    expect(elements.scrollNavInstance.lang()).toBe('en');
    expect(elements.scrollNavInstance.customAria()).toBe(null);
  });

  // ----- ACCESSIBILITY -----

  it('should set aria labels according to "lang" input', () => {
    checkAccByLang('en');

    const host = elements.hostComponent as TestHostWithAttr;

    host.langSelection.set('es');
    elements.fixture.detectChanges();
    checkAccByLang('es');

    host.langSelection.set('fr');
    elements.fixture.detectChanges();
    checkAccByLang('fr');

    host.langSelection.set('it');
    elements.fixture.detectChanges();
    checkAccByLang('it');

    host.langSelection.set('de');
    elements.fixture.detectChanges();
    checkAccByLang('de');

  });

  it('should set aria labels according to "customAria" input', () => {
    const host = elements.hostComponent as TestHostWithAttr;

    host.customAria.set({
      navAriaLabel: 'EDIT Navigation bar',
      prevBtnAriaLabel: 'EDIT Scroll left',
      nextBtnAriaLabel: 'EDIT Scroll right',
      linksGroupAriaLabel: 'EDIT Links group',
    });

    elements.fixture.detectChanges();

    const navEl = elements.nav.nativeElement as HTMLElement;
    const prevButtonEl = elements.prevButton.nativeElement as HTMLElement;
    const nextButtonEl = elements.nextButton.nativeElement as HTMLElement;
    const contentEl = elements.content.nativeElement as HTMLElement;

    expect(navEl.getAttribute('aria-label')).toBe('EDIT Navigation bar');
    expect(prevButtonEl.getAttribute('aria-label')).toBe('EDIT Scroll left');
    expect(nextButtonEl.getAttribute('aria-label')).toBe('EDIT Scroll right');
    expect(contentEl.getAttribute('aria-label')).toBe('EDIT Links group');
  });

});


