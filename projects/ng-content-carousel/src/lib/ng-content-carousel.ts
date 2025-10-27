import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ng-content-carousel',
  imports: [],
  templateUrl: './ng-content-carousel.html',
  styleUrl: './ng-content-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgContentCarousel implements AfterViewInit {
  @ViewChild('track') track!: ElementRef;
  currentIndex = 0;
  cardWidth = 0;
  transform = '';

  ngAfterViewInit() {
    console.log(this.track.nativeElement.children.length);
    const firstCard = this.track.nativeElement.children[0];
    if (firstCard) {
      this.cardWidth = firstCard.offsetWidth;
    }
  }

  next() {
    if(this.currentIndex <= this.track.nativeElement.children.length - 1){
      this.currentIndex++;
      this.updateTransform();
    }

  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTransform();
    }
  }

  updateTransform() {
    this.transform = `translateX(-${this.currentIndex * this.cardWidth}px)`;
  }
}
