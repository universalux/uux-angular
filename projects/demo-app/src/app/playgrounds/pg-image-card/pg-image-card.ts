import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgImageCard } from 'ng-image-card'

@Component({
  selector: 'pg-image-card',
  imports: [NgImageCard],
  templateUrl: './pg-image-card.html',
  styleUrl: './pg-image-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgImageCard {

}
