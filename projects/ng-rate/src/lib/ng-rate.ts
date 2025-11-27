import { ChangeDetectionStrategy, Component, computed, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { RateStar } from './rate-star/rate-star';
import { RateHeart } from "./rate-heart/rate-heart";

@Component({
  standalone: true,
  selector: 'ng-rate',
  imports: [RateStar, RateHeart],
  templateUrl: './ng-rate.html',
  styleUrl: './ng-rate.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgRate implements OnInit, OnChanges {

  items = input< 3 | 4 | 5 | 7 | 10 >(5);
  average = input(0);
  icon = input<'star' | 'heart'>('star');
  readOnly = input<boolean>(false);
  vote = output<number>();

  itemsAverages = signal<number[]>([]);
  currentVote = signal<number | null>(0);
  clampedAverage = computed(() => {
    const avg = this.average();
    const max = this.items();
    const min = 0;

    if (typeof avg !== 'number' || isNaN(avg)) return 0;

    // clamp (0 → max)
    return Math.min(max, Math.max(min, avg));
  });

  // ---------- Life cycle ----------

  firstRender : boolean = true;
  ngOnInit(): void {
    this.updateItems(this.clampedAverage());
    this.firstRender = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['average'] || changes['items']  && !this.firstRender) {
      this.updateItems(this.clampedAverage());
    }

  }

  // ---------- Methods ----------

  setVote(index: number){

    const markedElements = (index + 1);
    this.updateItems(markedElements);
    this.currentVote.set(markedElements);
  };

  cancelVote(){
    this.currentVote.set(null);
    this.updateItems(this.average());
  };

  sendVote(){
    if(this.currentVote()){
      this.vote.emit(this.currentVote()!);
    }

  }

  private updateItems (average: number ) {

    let currentAverage = average;
    const items = this.items();
    let itemsArr = [];

    for (let i = 1; i <= items; i++) {
      if(currentAverage >= 1){
        itemsArr.push(100);
        currentAverage --;
      }else if(currentAverage < 1 && currentAverage > 0){
        itemsArr.push(Math.floor(currentAverage * 100));
        currentAverage = 0;
      }else {
        itemsArr.push(0);
      }
    }

    this.itemsAverages.set(itemsArr);
  };

}
