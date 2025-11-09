import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, effect, ElementRef, HostListener, inject, input, OnInit, QueryList, signal, ViewChild } from '@angular/core';
import { ContentCarouselItemDirective } from '../public-api';
import { CONTENT_CAROUSEL_LANG } from './accessibility/content-carousel.lang';
import { ContentCarouselCustomAria, ContentCarouselLangs } from './ng-content-carousel.types';

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
  hideArrowsOnEdges = input<boolean>(true);
  hideArrowsWhenNoOverflow = input<boolean>(true);
  advanceMode= input<'single' |'page'>('page');

  lang = input<ContentCarouselLangs>('en');
  customAria = input<ContentCarouselCustomAria | null>(null);

  @ContentChildren(ContentCarouselItemDirective) items!: QueryList<ContentCarouselItemDirective>;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('track') track!: ElementRef;
  @ViewChild('trackContainer') trackContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('arrowButtonPrev') arrowButtonPrev!: ElementRef<HTMLDivElement>;
  @ViewChild('arrowButtonNext') arrowButtonNext!: ElementRef<HTMLDivElement>;

  host = inject(ElementRef<HTMLElement>);

  acc = signal<ContentCarouselCustomAria>(CONTENT_CAROUSEL_LANG['en']);

  currentIndex = signal<number>(0);
  itemWidth = signal<number | null>(null);
  transform = signal<string>('');
  totalItems = signal<number>(3);
  maxWidth = signal<number | null>(null);
  minWidth = signal<number | null>(null);
  hasOverflow = signal<boolean>(true);

  onStart = signal<boolean>(true);
  onEnd = signal<boolean>(false);

  trackContainerWidth = signal<number | null>(null);
  arrowButtonsWidth = signal<number | null>(null);
  hostWidth = signal<number | null>(null);
  itemsViewed = signal<number | null>(null);

  @HostListener('window:resize', ['$event'])
  onResize(_event: UIEvent) {
    this.calculateHostWidth();
    this.calculateitemWidth();
    this.calculateArrowsWidth();

    this.calculateTrackContainerWidth();
    this.calculateOverflow();
  }

  onKeyDown(event: KeyboardEvent) {
    const active = document.activeElement;
    const container = this.carouselContainer.nativeElement;

    if (active !== container) return; // ignore if focus is on a son parent

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
    this.calculateitemWidth();
    this.calculatetotalItems();
    this.calculateArrowsWidth();

    const initialWidth = this.trackContainer.nativeElement.offsetWidth;
    this.calculateTrackContainerWidth(initialWidth);

    this.updateVisibleItems();
    this.calculateOverflow();
  };

  constructor() {
    effect(() => {
      this.setAccOptions();
    });
    // **IMPORTANT** For angular 18 add ", { allowSignalWrites: true }" to each effect
  };

  calculateHostWidth(){
    this.hostWidth.set(this.host.nativeElement.offsetWidth);
  }

  calculateArrowsWidth(){
    setTimeout(() => {
      const arrowPrevWidth = this.arrowButtonPrev.nativeElement.offsetWidth;
      const arrowNextWidth = this.arrowButtonNext.nativeElement.offsetWidth;
      this.arrowButtonsWidth.set(arrowPrevWidth + arrowNextWidth);
    });
  };

  calculateitemWidth(){
    const firstItem = this.items.first?.el.nativeElement;
    if (firstItem) {
      this.itemWidth.set(firstItem.offsetWidth);
    }
  };

  calculateTrackContainerWidth(width: number = 0){

    let initialWidth = width;
    if(this.hostWidth() && this.arrowButtonsWidth()){
      const widthFromHost = this.hostWidth()! - this.arrowButtonsWidth()!;
      initialWidth = widthFromHost > this.maxWidth()! ? this.maxWidth()! : widthFromHost;
    }
    const itemsViewed = Math.floor(initialWidth / this.itemWidth()!);
    itemsViewed === 0
      ? this.itemsViewed.set(1)
      : this.itemsViewed.set(itemsViewed);

    const calculatedWidth = (itemsViewed * this.itemWidth()!);
    const finalWidth = calculatedWidth < this.itemWidth()! ? this.minWidth() : calculatedWidth;
    this.trackContainerWidth.set(finalWidth);
  };

  calculatetotalItems(){
    this.totalItems.set(this.items.length);
    this.maxWidth.set(this.items.length * this.itemWidth()!);
    this.minWidth.set(this.itemWidth()!);
  };

  calculateOverflow(){

    if(this.hideArrowsWhenNoOverflow() && this.itemsViewed() === this.totalItems()) {
      this.hasOverflow.set(false);
    }else{
      this.hasOverflow.set(true);
    }
    // console.log('Total items: ', this.totalItems(), 'items viewed: ', this.itemsViewed())
  };


  next() {
    if(this.currentIndex() <= this.totalItems() - this.itemsViewed()! - 1){

      if(this.advanceMode() === 'page'){
        const itemsToAdvance = this.currentIndex() + (this.itemsViewed()! * 2) > this.totalItems()
          ? this.totalItems() - this.itemsViewed()!
          : this.currentIndex() + this.itemsViewed()!
        this.currentIndex.set(itemsToAdvance);
      }else{
        this.currentIndex.set(this.currentIndex() + 1);
      }
      this.updateTransform();
    }

    if(this.currentIndex() === this.totalItems() - this.itemsViewed()!){
      this.onEnd.set(true);
    }

    if(this.currentIndex() > 0){
      this.onStart.set(false);
    }

    this.updateVisibleItems();

  }

  prev() {
    if (this.currentIndex() > 0) {
      if(this.advanceMode() === 'page'){
        const itemsToAdvance = this.currentIndex() - (this.itemsViewed()!) < 0
          ? 0
          : this.currentIndex() - this.itemsViewed()!
        this.currentIndex.set(itemsToAdvance);
      }else{
        this.currentIndex.set(this.currentIndex() - 1);
      }
      this.updateTransform();
    }

    if(this.currentIndex() === 0){
      this.onStart.set(true);
    }

    if(this.currentIndex() !== this.totalItems() - this.itemsViewed()! ){
      this.onEnd.set(false);
    }

    this.updateVisibleItems();
  };

  startX = 0;
  endX = 0;
  startY = 0;
  endY = 0;

  onTouchStart(e: TouchEvent) {
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }

  onTouchEnd(e: TouchEvent) {
    this.endX = e.changedTouches[0].clientX;
    this.endY = e.changedTouches[0].clientY;

    const diffX = this.startX - this.endX;
    const diffY = this.startY - this.endY;

    if (Math.abs(diffY) > Math.abs(diffX)) return;

    if (Math.abs(diffX) > 10) {
      diffX > 0 ? this.next() : this.prev();
    }
  }


  updateTransform() {
    let translatePoint = this.currentIndex() * (this.itemWidth()!);
    if(this.currentIndex() === 0){
      translatePoint = 0;
    }
    this.transform.set(`translateX(-${translatePoint}px)`);
  };

  firstVisibleIndex = signal<number>(0);
  lastVisibleIndex = signal<number>(0);

  updateVisibleItems() {

    if (!this.itemsViewed() || this.items.length === 0) {
      this.firstVisibleIndex.set(0);
      this.lastVisibleIndex.set(0);

      // Set timeout for avoiding false positive on ssr
      setTimeout(() => {
        if (this.items.length === 0) {
          console.warn('NgContentCarousel: no projected children detected.');
        }
      });

      return;
    }

    const visibleItemsArr : number[] = [];
    for (let i = this.currentIndex(); i <= (this.currentIndex() + this.itemsViewed()! - 1); i++) {
      visibleItemsArr.push(i);
    }

    this.firstVisibleIndex.set(visibleItemsArr[0]);
    this.lastVisibleIndex.set(visibleItemsArr[visibleItemsArr.length - 1]);

    this.items.forEach(({ el }, i) => {
      if(!visibleItemsArr.includes(i)){
        el.nativeElement.toggleAttribute('inert', true);
      }else{
        el.nativeElement.toggleAttribute('inert', false);
      }
    });
  };

  setAccOptions() {
    const currentLang = this.lang() ?? 'en';
    const langDefaults = CONTENT_CAROUSEL_LANG[currentLang];
    const userOptions = this.customAria() ?? {};

    this.acc.set({
      ...langDefaults,
      ...userOptions,
    });
  };

  visibleRangeMessage() {
    const first = this.firstVisibleIndex();
    const last = this.lastVisibleIndex();
    const total = this.items.length;

    const acc = this.acc(); // current accessibility options
    return acc.rangeMessage!(first + 1, last + 1, total);

  };
}
