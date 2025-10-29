import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, input, signal, ViewChild } from '@angular/core';

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
  gap = input<number>(16);

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

  ngAfterViewInit() {
    this.calculateHostWidth();
    this.calculateCardWidth();
    this.calculateTotalCards();
    this.calculateArrowsWidth();

    const initialWidth = this.trackContainer.nativeElement.offsetWidth;
    this.calculateTrackContainerWidth(initialWidth);
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
    const firstCard = this.track.nativeElement.children[0];
    if (firstCard) {
      this.cardWidth.set(firstCard.offsetWidth + this.gap());
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

    const calculatedWidth = cardsViewed * this.cardWidth()!;
    const finalWidth = calculatedWidth < this.cardWidth()! ? this.minWidth() : calculatedWidth;
    this.trackContainerWidth.set(finalWidth);
  };

  private calculateTotalCards(){
    this.totalCards.set(this.track.nativeElement.children.length);
    this.maxWidth.set(this.track.nativeElement.children.length * this.cardWidth()!);
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
  }

  updateTransform() {
    let translatePoint = (this.currentIndex() * this.cardWidth()!) - this.gap();
    if(this.currentIndex() === 1 || this.currentIndex() === this.totalCards() - 1){
      translatePoint = (this.currentIndex() * this.cardWidth()!) - (this.gap() / 2);
    }else if(this.currentIndex() === 0){
      translatePoint = 0;
    }
    this.transform.set(`translateX(-${translatePoint}px)`);
  }
}
