import { ChangeDetectionStrategy, Component, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
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

  count = input<3 | 4 | 5 | 7 | 10>(5);
  percetage = input(0);
  icon = input<'star' | 'heart'>('heart');
  voteFormat = input<'items' | 'percentage'>('items');
  vote = output<number>();

  itemsPercentages = signal<number[]>([]);

  currentVote = signal<number | null>(0);

  // ---------- Life cycle ----------

  firstRender : boolean = true;
  ngOnInit(): void {
    this.updateItems(this.percetage());
    this.firstRender = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['percetage'] && !this.firstRender) {
      this.updateItems(changes['percetage'].currentValue);
    }
  }

  // ---------- Methods ----------

  setVote(index: number){
    const oneItem = 100 / this.count();
    const markedElements = (index + 1) * oneItem;
    console.log(markedElements);
    this.updateItems(markedElements);
    console.log('cuandots', markedElements / oneItem)
    if(this.voteFormat() === 'items'){
      this.currentVote.set(markedElements / oneItem);
    }
    if(this.voteFormat() === 'percentage'){
      this.currentVote.set(markedElements);
    }
  };

  cancelVote(){
    this.currentVote.set(null);
    this.updateItems(this.percetage());
  };

  sendVote(){
    if(this.currentVote()){
      this.vote.emit(this.currentVote()!);
    }

  }

  private updateItems (percentage: number ) {

    const count = this.count();
    const oneItem = 100 / count;
    let total = percentage;
    let itemsArr = [];

    for (let i = 1; i <= count; i++) {
      if(total > oneItem){
        itemsArr.push(100);
        total = total - oneItem;
      }else if(total <= oneItem && total > 0){
        const lastItemPercentage = Math.floor((100 * total) / oneItem);
        itemsArr.push(lastItemPercentage);
        total = 0;
      }else{
        itemsArr.push(0);
      }
    }

    this.itemsPercentages.set(itemsArr);

  };


}
