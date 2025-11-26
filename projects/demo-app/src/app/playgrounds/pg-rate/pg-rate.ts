import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgRate } from 'ng-rate';

@Component({
  selector: 'pg-rate',
  imports: [ NgRate ],
  templateUrl: './pg-rate.html',
  styleUrl: './pg-rate.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgRate {

  customPercentage = signal<number | null>(50);

  handleCustomPercentage(event: Event){
    const target = event.target as HTMLInputElement;
    this.customPercentage.set(+target.value);
  }

  vote = signal<number | null>(null);

  getVotePercentage(){
    return this.vote()! * (100/5);
  }

}
