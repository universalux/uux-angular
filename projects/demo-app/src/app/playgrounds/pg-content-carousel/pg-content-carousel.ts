import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgContentCarousel } from 'ng-content-carousel';

@Component({
  selector: 'pg-content-carousel',
  imports: [NgContentCarousel],
  templateUrl: './pg-content-carousel.html',
  styleUrl: './pg-content-carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgContentCarousel {

}
