import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgRate } from 'ng-rate';

@Component({
  selector: 'pg-rate',
  imports: [ NgRate ],
  templateUrl: './pg-rate.html',
  styleUrl: './pg-rate.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgRate {

}
