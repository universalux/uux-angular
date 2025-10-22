import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, effect, ElementRef, HostBinding, HostListener, inject, input, OnInit, output, QueryList, Renderer2, signal, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { SlideForDirective } from './directives/slide-for-directive';
import { HERO_CAROUSEL_LANG } from './accessibility/hero-carousel.lang';
import { CarouselItem, AccessibilityOptions } from './ng-hero-carousel.types';
import { SlideBgDirective } from "./directives/slide-bg-directive";

@Component({
  standalone: true,
  selector: 'ng-hero-carousel',
  imports: [NgTemplateOutlet, CommonModule, SlideBgDirective],
  templateUrl: './ng-hero-carousel.html',
  styleUrl: './ng-hero-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgHeroCarousel implements OnInit, AfterViewInit {

  /** ---------- INJECTIONS ---------- */

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  /** ---------- INPUTS ---------- */

  slides = input<CarouselItem[]>([]);

  /** STYLE INPUTS */

  hasOverlay = input<boolean>(true);
  transitionTime = input<number>(800);
  arrowsPlacement = input<'up' | 'down' | 'auto'>('auto');
  indicators = input< 'bars' |'circles' | 'none' >('bars');
  hasCounter = input<boolean>(false);

  /** AUTOPLAY INPUTS */
  hasAutoplay = input<boolean>(true);
  autoplayTime = input<number>(7000);
  autoplayResumeTime = input<number>(15000);


  /** ACCESIBILITY INPUTS */

  lang = input<'en' | 'es' | 'fr' | 'de' | 'it'>('en');
  accessibilityOptions = input<AccessibilityOptions |null>(null);

  /** ---------- OUTPUTS ---------- */

  selected = output<number>();

  /** ---------- SIGNALS ---------- */

  protected currentSlide = signal<number>(0);
  protected carouselId = signal<string | null>(null);

  protected prev = signal<number>(this.slides().length - 1);

  private isChangingSlide = signal<boolean>(false);
  protected isPlaying = signal<boolean>(true);
  private isStopped = signal<boolean>(false);

  private slideWidth = signal<number>(0);

  private autoplayTimer = signal<number>(0);
  private resumeTimer = signal<number>(0);

  protected acc = signal<AccessibilityOptions>(HERO_CAROUSEL_LANG['en']);

  /** ---------- VIEW CHILDREN ---------- */

  @ViewChildren('indicatorBtn') indicatorBtn!: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('indicatorsContainer') indicatorsContainer!: ElementRef<HTMLButtonElement>;
  @ViewChildren('slide') slidesElements!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('slideCustomContent') slideCustomContent!: QueryList<ElementRef<HTMLElement>>;
  @ContentChildren(SlideForDirective) slideTemplates!: QueryList<SlideForDirective>;
  @ContentChild('outerContent') outerContent!: TemplateRef<any>;
  @ViewChild('prevBtn', { static: true }) prevBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('nextBtn', { static: true }) nextBtn!: ElementRef<HTMLButtonElement>;

  /** ---------- HOST BINDING / HOST LISTENERS ---------- */

  @HostBinding('class.user-is-tabbing') userIsTabbing = false;

  @HostListener('window:resize')
  onResize(){
    this.calculateSlideWidth();
  }

  @HostListener('keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent) {

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      if (event.key === 'ArrowLeft') {
        this.prevSlide();
        this.prevBtn.nativeElement.focus();
      };
      if (event.key === 'ArrowRight') {
        this.nextSlide();
        this.nextBtn.nativeElement.focus();
      };
    }
    if (event.key === 'Tab') {
      this.userIsTabbing = true;
    }
  }


  @HostListener('window:touchstart')
  onTouchStart() {
    this.userIsTabbing = false;
  }

  /** ---------- LIFE CYCLE---------- */

  constructor() {
    effect(() => {
      const selectedSlide = this.currentSlide();
      this.selected.emit(selectedSlide);
    });

    effect(() => {
      this.setAccOptions();
      this.setGlobalAriaLabel();
    });
  };

  ngOnInit(): void {
    if(this.hasAutoplay()) this.autoplay();

    this.carouselId.set(`carousel-${Math.random().toString(36).slice(2,9)}`);

    this.setAccOptions();
  };

  ngAfterViewInit(): void {

    this.setTransitionVariable();
    this.setGlobalAriaLabel();

    this.calculateSlideWidth();
    this.setSelectorInScroll();

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.setSelectorInScroll();
      }
    });
  };

  /** ---------- METHODS --------- */

  // Gets custom content for every slide set in ng-template
  protected getChildren(index: number) {
    return this.slideTemplates.find(t => t.slideFor() === index)?.template ?? null;
  }

  /**  AUTOPLAY METHODS  */

  protected toggleAutoplay(){
    if(this.isPlaying()){
      this.stopAutoplay();
    }else{
      this.isStopped.set(false);
      this.autoplay();
    }
  }

  private stopAutoplay (){
    clearTimeout(this.autoplayTimer());
    clearTimeout(this.resumeTimer());
    this.isPlaying.set(false);
    this.isStopped.set(true);
  }

  protected resetAutoplay() {
    if (this.hasAutoplay() && !this.isStopped()) {
      clearTimeout(this.autoplayTimer());
      clearTimeout(this.resumeTimer());
      this.isPlaying.set(false);

      this.resumeTimer.set(setTimeout(() => this.autoplay(), this.autoplayResumeTime()));

    }
  };

  private autoplay() {
    if(this.isStopped()) return;
    clearTimeout(this.autoplayTimer());
    this.autoplayTimer.set(
      setTimeout(() => {
        this.goToSlide((this.currentSlide() + 1) % this.slides().length);
        this.setSelectorInScroll();
        this.autoplay();
      }, this.autoplayTime())
    );
    this.isPlaying.set(true);
  };

  /** NAVIGATION METHODS  */

  liveRegionText = signal<string>('');

  protected goToSlide(index: number) {
    if (this.isChangingSlide()) return;

    const slides = this.slides();
    if (!slides || slides.length === 0) return;
    // Limitar el índice al rango válido
    const clamped = Math.max(0, Math.min(index, slides.length - 1));
    // Si no cambia, no hacemos nada
    if (clamped === this.currentSlide()) return;

    this.isChangingSlide.set(true);
    this.resetAutoplay();
    this.prev.set(this.currentSlide());

    this.currentSlide.set(clamped);
    this.setSelectorInScroll();

    const slideData = slides[clamped];
    const slideNumber = clamped + 1;
    const totalSlides = slides.length;
    this.liveRegionText.set(
      `Slide ${slideNumber} of ${totalSlides}. ${slideData.title || ''} ${slideData.subtitle || ''}`.trim()
    );

    const newSlideEl = this.slidesElements.toArray()[clamped]?.nativeElement;

    if (this.transitionTime() === 0) {
      // No hay transición → desbloqueo inmediato
      this.isChangingSlide.set(false);
    } else if (newSlideEl) {
      const onEnd = () => {
        newSlideEl.removeEventListener('transitionend', onEnd);
        this.isChangingSlide.set(false);
      };
      newSlideEl.addEventListener('transitionend', onEnd);
    } else {
      // fallback de seguridad
      setTimeout(() => this.isChangingSlide.set(false), this.transitionTime());
    }

  };

  protected nextSlide() {
    this.goToSlide((this.currentSlide() + 1) % this.slides().length);
  }

  protected prevSlide() {
    if(this.currentSlide() === 0){
      this.goToSlide(this.slides().length - 1);
    }else{
      this.goToSlide(this.currentSlide() - 1);
    }

  }

  private setSelectorInScroll() {

    setTimeout(() => {
      const clamped = this.currentSlide();
      const activeButton = this.indicatorBtn.toArray()[clamped];

      if (activeButton) {
        const container = this.indicatorsContainer.nativeElement; // referencia al div padre de los botones
        const active = activeButton.nativeElement;

        const offsetLeft = active.offsetLeft;
        const offsetWidth = active.offsetWidth;
        // Calculamos posición para centrar el botón en el contenedor
        const scrollPos = offsetLeft - (this.slideWidth() / 2) + (offsetWidth / 2);

        container.scrollTo({
          left: scrollPos,
          behavior: 'smooth'
        });
      }
    }, this.transitionTime());
  }

  private touchStartX = 0;
  private startedOnIndicators = false;

  protected onUserDragStart(event: TouchEvent) {
    // si ya estamos en transición, ignoramos
    if (this.isChangingSlide()) return;

    // Detectar si el touch empezó en los selectores (robusto)
    const target = event.target as HTMLElement;
    this.startedOnIndicators = !!target.closest('.carousel__indicators');

    // Pausar autoplay para evitar que salte mientras se arrastra
    clearTimeout(this.autoplayTimer());
    this.touchStartX = event.touches[0].clientX;

    // No propagar para evitar conflictos con otros handlers
    event.stopPropagation();
  }

  protected onUserDragEnd(event: TouchEvent) {
    // Si estabamos en transición, ignoramos y reseteamos flag
    if (this.isChangingSlide()) {
      this.startedOnIndicators = false;
      return;
    }

    // Si el touch empezó en los selectores, no lo consideramos un swipe del carousel
    if (this.startedOnIndicators) {
      this.startedOnIndicators = false; // reset
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - this.touchStartX;

    // pequeño umbral para considerar swipe
    const THRESHOLD = 50;

    event.stopPropagation();

    if (Math.abs(deltaX) > THRESHOLD) {
      // evitar que el touch genere un click fantasma en algunos browsers
      event.preventDefault();

      if (deltaX > 0) {
        // swipe right -> anterior
        this.prevSlide();
      } else {
        // swipe left -> siguiente
        this.nextSlide();
      }
    }

    // reanudar o reprogramar autoplay
    this.resetAutoplay();
  }

  /** ACCESSIBILITY METHODS  */

  private setGlobalAriaLabel(): void{
    this.renderer.setAttribute(this.el.nativeElement, 'aria-label', this.acc().hostAriaLabel!);
  }

  private setAccOptions() {
      const currentLang = this.lang() ?? 'en';
      const langDefaults = HERO_CAROUSEL_LANG[currentLang];
      const userOptions = this.accessibilityOptions() ?? {};

      this.acc.set({
        ...langDefaults,
        ...userOptions,
        slideAriaLabel: userOptions.slideAriaLabel ?? langDefaults.slideAriaLabel,
      });
  }

  /** OTHER METHODS  */

  private get transitionCssValue(): string {
    return `${this.transitionTime()}ms`;
  };

  private calculateSlideWidth() {
    const firstSlide = this.slidesElements.first;
    if (!firstSlide) return;
    const rect = firstSlide.nativeElement.getBoundingClientRect();
    const width = Number(rect.width.toFixed(2));
    this.slideWidth.set(width);
  };

  private setTransitionVariable(): void {
    this.el.nativeElement.style.setProperty(
      '--carousel-transition-time',
      this.transitionCssValue
    );
  }

}
