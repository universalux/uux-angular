import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgContentCarousel } from 'ng-content-carousel';
import { NgImageCard } from 'ng-image-card';

@Component({
  selector: 'pg-content-carousel',
  imports: [NgContentCarousel, NgImageCard],
  templateUrl: './pg-content-carousel.html',
  styleUrl: './pg-content-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgContentCarousel {
  cardList = [
    {

      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'This is the header',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {

      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'This is the header',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'This is the header',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'This is the header',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'This is the header',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
    {
      header: 'LAST: This is the header',
      image: {url: 'images/card/dog_post.png', alt: 'Alt del perro'},
      body: 'This is the content for the body of the card',
      footer: 'Card footer content'
    },
  ]
}
