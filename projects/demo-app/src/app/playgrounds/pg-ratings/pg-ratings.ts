import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgRatings } from 'ng-ratings';

type Items = 3 | 4 | 5 | 7 | 10;

@Component({
  selector: 'pg-ratings',
  imports: [ NgRatings ],
  templateUrl: './pg-ratings.html',
  styleUrl: './pg-ratings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgRatings {

  customPercentage = signal<number | null>(2.4);

  items = signal<Items>(7);

  handleCustomPercentage(event: Event){
    const target = event.target as HTMLInputElement;
    this.customPercentage.set(+target.value);
  }

  handleCustomItems(event: Event){
    const target = event.target as HTMLInputElement;
    this.items.set(+target.value as Items);
  }

  hoverSettings = signal<Array<'scale' | 'rotateX' | 'translateY'> | 'none'>('none');

  get hoverArray(): Array<'scale' | 'rotateX' | 'translateY'> {
    const value = this.hoverSettings();
    return value === 'none' ? [] : value;
  }

  handleHoverChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value as 'scale' | 'rotateX' | 'translateY';

    // si hover es 'none', empezamos desde array vacío
    const current = this.hoverSettings() === 'none'
      ? []
      : this.hoverArray;

    let next: Array<'scale' | 'rotateX' | 'translateY'>;

    if (target.checked) {
      next = [...current, value];
    } else {
      next = current.filter(item => item !== value);
    }

    // actualizamos el input con set() porque es Signal Input
    this.hoverSettings.set(next);
  }

  vote = signal<number | null>(null);
  vote2 = signal<number | null>(null);
  vote3 = signal<number | null>(null);
  average = signal<number>(5.5);

}
