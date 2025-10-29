import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, HostListener, inject, input, QueryList, signal, ViewChild } from '@angular/core';
import { CarouselItemDirective } from '../public-api';

@Component({
  standalone: true,
  selector: 'ng-content-carousel',
  imports: [],
  templateUrl: './ng-content-carousel.html',
  styleUrl: './ng-content-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgContentCarousel implements AfterViewInit {

  transition = input<boolean>(true);
  arrowStyle = input<'minimal' |'solid'>('minimal');
  showArrowsOnEdges = input<boolean>(true);
  // gap = input<number>(16);

  @ContentChildren(CarouselItemDirective) items!: QueryList<CarouselItemDirective>;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('track') track!: ElementRef;
  @ViewChild('trackContainer') trackContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('arrowButtonPrev') arrowButtonPrev!: ElementRef<HTMLDivElement>;
  @ViewChild('arrowButtonNext') arrowButtonNext!: ElementRef<HTMLDivElement>;

  private host = inject(ElementRef<HTMLElement>);

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

  updateVisibleItems() {
    // console.log('cardsViewed', this.cardsViewed(), 'current', this.currentIndex());
    const visibleItemsArr : number[] = [];
    for (let i = this.currentIndex(); i <= (this.currentIndex() + this.cardsViewed()! - 1); i++) {
      visibleItemsArr.push(i);
    }
    this.items.forEach(({ el }, i) => {
      if(!visibleItemsArr.includes(i)){
        el.nativeElement.toggleAttribute('inert', true);
      }else{
        console.log(el, i);
        el.nativeElement.toggleAttribute('inert', false);
      }
    });
  };

  // applyItemsClass(){
  //   this.items.forEach((item) => {
  //     item.el.nativeElement.classList.add('item');
  //   });
  // };


  // updateVisibleItems() {
  //   const containerRect = this.trackContainer.nativeElement.getBoundingClientRect();

  //   this.items.forEach(({ el }) => {
  //     const rect = el.nativeElement.getBoundingClientRect();
  //     const isVisible = rect.right > containerRect.left && rect.left < containerRect.right;

  //     el.nativeElement.toggleAttribute('inert', !isVisible);
  //   });
  // }

  // updateTransform() {
  //   let translatePoint = (this.currentIndex() * this.cardWidth()!) - (this.gap());
  //   if(this.currentIndex() === 1 || this.currentIndex() === this.totalCards() - 1){
  //     console.log('Es la primera o la ultima');
  //     translatePoint = (this.currentIndex() * this.cardWidth()!) + (this.gap());
  //   }else if(this.currentIndex() === 0){
  //     translatePoint = 0;
  //   }
  //   this.transform.set(`translateX(-${translatePoint}px)`);
  // }
}
