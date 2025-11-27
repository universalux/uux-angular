import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgRate } from 'ng-rate';

type Items = 3 | 4 | 5 | 7 | 10;

@Component({
  selector: 'pg-rate',
  imports: [ NgRate ],
  templateUrl: './pg-rate.html',
  styleUrl: './pg-rate.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgRate {

  customPercentage = signal<number | null>(2.4);

  items = signal<Items>(5);

  handleCustomPercentage(event: Event){
    const target = event.target as HTMLInputElement;
    this.customPercentage.set(+target.value);
  }

  handleCustomItems(event: Event){
    const target = event.target as HTMLInputElement;
    this.items.set(+target.value as Items);
  }

  vote = signal<number | null>(null);

}
