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

  animation = signal<boolean>(true);

  @ViewChild('track') track!: ElementRef;
  @ViewChild('trackContainer') trackContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('arrowButton') arrowButton!: ElementRef<HTMLDivElement>;

  private host = inject(ElementRef<HTMLElement>);


  currentIndex = signal<number>(0);
  cardWidth = signal<number | null>(null);
  transform = '';
  totalCards = signal<number>(3);
  maxWidth = signal<number | null>(null);

  // totalItems = signal<number | null>(null);
  // itemsToShow = input<number>(3);
  // initialWidth = signal<number |null>(null);

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
      const arrowButtonWidth = this.arrowButton.nativeElement.offsetWidth;
      console.log('Ancho real del botón:', arrowButtonWidth);
      this.arrowButtonsWidth.set(this.arrowButton.nativeElement.offsetWidth * 2);
    });
  };

  private calculateCardWidth(){
    const firstCard = this.track.nativeElement.children[0];
    if (firstCard) {
      this.cardWidth.set(firstCard.offsetWidth);
    }
  };

  private calculateTrackContainerWidth(width: number = 0){

    let initialWidth = width;
    if(this.hostWidth() && this.arrowButtonsWidth()){
      const widthFromHost = this.hostWidth()! - this.arrowButtonsWidth()!;
      console.log(this.maxWidth());
      initialWidth = widthFromHost > this.maxWidth()! ? this.maxWidth()! : widthFromHost;
    }
    const cardsViewed = Math.floor(initialWidth / this.cardWidth()!)
    this.cardsViewed.set(cardsViewed);
    const finalWidth = cardsViewed * this.cardWidth()!;
    this.trackContainerWidth.set(finalWidth);
  };

  private calculateTotalCards(){
    this.totalCards.set(this.track.nativeElement.children.length);
    this.maxWidth.set(this.track.nativeElement.children.length * this.cardWidth()!);
  }


  next() {
    if(this.currentIndex() <= this.totalCards() - this.cardsViewed()! -1 ){
      this.currentIndex.set(this.currentIndex() + 1);
      this.updateTransform();
    }

  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.set(this.currentIndex() - 1);
      this.updateTransform();
    }
  }

  updateTransform() {
    this.transform = `translateX(-${this.currentIndex() * this.cardWidth()!}px)`;
  }
}
