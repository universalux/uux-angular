import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, effect, ElementRef, HostListener, inject, input, OnInit, QueryList, signal, ViewChild } from '@angular/core';
import { CarouselItemDirective } from '../public-api';
import { CONTENT_CAROUSEL_LANG } from './accessibility/content-carousel.lang';
import { AccessibilityOptions, ContentCarouselLangs } from './ng-content-carousel.types';

@Component({
  standalone: true,
  selector: 'ng-content-carousel',
  imports: [],
  templateUrl: './ng-content-carousel.html',
  styleUrl: './ng-content-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgContentCarousel implements AfterViewInit, OnInit {

  transition = input<boolean>(true);
  arrowStyle = input<'minimal' |'solid'>('minimal');
  showArrowsOnEdges = input<boolean>(true);
  lang = input<ContentCarouselLangs>('en');
  accessibilityOptions = input<AccessibilityOptions | null>(null);
  // gap = input<number>(16);

  @ContentChildren(CarouselItemDirective) items!: QueryList<CarouselItemDirective>;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('track') track!: ElementRef;
  @ViewChild('trackContainer') trackContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('arrowButtonPrev') arrowButtonPrev!: ElementRef<HTMLDivElement>;
  @ViewChild('arrowButtonNext') arrowButtonNext!: ElementRef<HTMLDivElement>;

  private host = inject(ElementRef<HTMLElement>);

  protected acc = signal<AccessibilityOptions>(CONTENT_CAROUSEL_LANG['en']);

  currentIndex = signal<number>(0);
  cardWidth = signal<number | null>(null);
  transform = signal<string>('');
  totalCards = signal<number>(3);
  maxWidth = signal<number | null>(null);
  minWidth = signal<number | null>(null);

  onStart = signal<boolean>(true);
  onEnd = signal<boolean>(false);

  trackContainerWidth = signal<number | null>(null);
  arrowButtonsWidth = signal<number | null>(null);
  hostWidth = signal<number | null>(null);
  cardsViewed = signal<number | null>(null);

  @HostListener('window:resize', ['$event'])
  onResize(_event: UIEvent) {
    this.calculateHostWidth();
    this.calculateCardWidth();
    this.calculateArrowsWidth();

    this.calculateTrackContainerWidth();
  }

  onKeyDown(event: KeyboardEvent) {
    const active = document.activeElement;
    const container = this.carouselContainer.nativeElement;

    if (active !== container) return; // 👈 ignora si el foco está en un hijo

    if (event.key === 'ArrowRight') {
      this.next();
      event.preventDefault();
    }
    if (event.key === 'ArrowLeft') {
      this.prev();
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.setAccOptions();
  };

  ngAfterViewInit() {
    this.calculateHostWidth();
    this.calculateCardWidth();
    this.calculateTotalCards();
    this.calculateArrowsWidth();

    const initialWidth = this.trackContainer.nativeElement.offsetWidth;
    this.calculateTrackContainerWidth(initialWidth);

    console.log(this.items);
    // this.calculateElementsOnView();
    this.updateVisibleItems();
  }

  constructor() {
    effect(() => {
      this.setAccOptions();
    });
    // **IMPORTANT** For angular 18 add ", { allowSignalWrites: true }" to each effect
  };

  private calculateHostWidth(){
    this.hostWidth.set(this.host.nativeElement.offsetWidth);
  }

  private calculateArrowsWidth(){
    setTimeout(() => {
      const arrowPrevWidth = this.arrowButtonPrev.nativeElement.offsetWidth;
      const arrowNextWidth = this.arrowButtonNext.nativeElement.offsetWidth;
      this.arrowButtonsWidth.set(arrowPrevWidth + arrowNextWidth);
    });
  };

  private calculateCardWidth(){
    const firstCard = this.items.first?.el.nativeElement;
    console.log('cardWidth', firstCard.offsetWidth);
    if (firstCard) {
      this.cardWidth.set(firstCard.offsetWidth);
    }
  };

  private calculateTrackContainerWidth(width: number = 0){

    let initialWidth = width;
    if(this.hostWidth() && this.arrowButtonsWidth()){
      const widthFromHost = this.hostWidth()! - this.arrowButtonsWidth()!;
      initialWidth = widthFromHost > this.maxWidth()! ? this.maxWidth()! : widthFromHost;
    }
    const cardsViewed = Math.floor(initialWidth / this.cardWidth()!);
    this.cardsViewed.set(cardsViewed);

    // const calculatedWidth = (cardsViewed * this.cardWidth()!) + (this.gap() * (cardsViewed - 1));
    const calculatedWidth = (cardsViewed * this.cardWidth()!);
    const finalWidth = calculatedWidth < this.cardWidth()! ? this.minWidth() : calculatedWidth;
    this.trackContainerWidth.set(finalWidth);
  };

  private calculateTotalCards(){
    this.totalCards.set(this.items.length);
    this.maxWidth.set(this.items.length * this.cardWidth()!);
    this.minWidth.set(this.cardWidth()! * 2);
  }

  next() {
    if(this.currentIndex() <= this.totalCards() - this.cardsViewed()! - 1){
      this.currentIndex.set(this.currentIndex() + 1);
      this.updateTransform();
    }

    if(this.currentIndex() === this.totalCards() - this.cardsViewed()!){
      this.onEnd.set(true);
    }

    if(this.currentIndex() > 0){
      this.onStart.set(false);
    }

    this.updateVisibleItems();

  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.set(this.currentIndex() - 1);
      this.updateTransform();
    }

    if(this.currentIndex() === 0){
      this.onStart.set(true);
    }

    if(this.currentIndex() !== this.totalCards() - this.cardsViewed()! ){
      this.onEnd.set(false);
    }

    this.updateVisibleItems();
  };


  updateTransform() {
    // let translatePoint = this.currentIndex() * (this.cardWidth()! + this.gap());
    let translatePoint = this.currentIndex() * (this.cardWidth()!);
    if(this.currentIndex() === 0){
      translatePoint = 0;
    }
    this.transform.set(`translateX(-${translatePoint}px)`);
  };

  firstVisibleIndex = signal<number>(0);
  lastVisibleIndex = signal<number>(0);

  updateVisibleItems() {
    // console.log('cardsViewed', this.cardsViewed(), 'current', this.currentIndex());
    const visibleItemsArr : number[] = [];
    for (let i = this.currentIndex(); i <= (this.currentIndex() + this.cardsViewed()! - 1); i++) {
      visibleItemsArr.push(i);
    }

    this.firstVisibleIndex.set(visibleItemsArr[0]);
    this.lastVisibleIndex.set(visibleItemsArr[visibleItemsArr.length - 1]);

    this.items.forEach(({ el }, i) => {
      if(!visibleItemsArr.includes(i)){
        el.nativeElement.toggleAttribute('inert', true);
      }else{
        console.log(el, i);
        el.nativeElement.toggleAttribute('inert', false);
      }
    });
  };

  private setAccOptions() {
      const currentLang = this.lang() ?? 'en';
      const langDefaults = CONTENT_CAROUSEL_LANG[currentLang];
      const userOptions = this.accessibilityOptions() ?? {};

      this.acc.set({
        ...langDefaults,
        ...userOptions,
      });
  };

  visibleRangeMessage() {
    const first = this.firstVisibleIndex();
    const last = this.lastVisibleIndex();
    const total = this.items.length;

    const acc = this.acc(); // tus opciones de accesibilidad actuales
    if (acc.rangeMessage) {
      return acc.rangeMessage(first + 1, last + 1, total);
    }

    // fallback por si no hay función definida
    return `Showing items ${first + 1} to ${last + 1} of ${total}`;
  };
}
