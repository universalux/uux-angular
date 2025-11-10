import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NgContentCard} from 'ng-content-card';

@Component({
  selector: 'pg-content-card',
  imports: [NgContentCard],
  templateUrl: './pg-content-card.html',
  styleUrl: './pg-content-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgContentCard {

}
