import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgContentCarousel, CarouselItemDirective } from 'ng-content-carousel';
import { NgImageCard } from 'ng-image-card';

@Component({
  selector: 'pg-content-carousel',
  imports: [NgContentCarousel, NgImageCard, CarouselItemDirective],
  templateUrl: './pg-content-carousel.html',
  styleUrl: './pg-content-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgContentCarousel {
  cardList = [
    {
      header: 'CARD 1',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'CARD 2',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'CARD 3',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'CARD 4',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'CARD 5',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'CARD 6',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'CARD 7',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'CARD 8',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
  ]
}
