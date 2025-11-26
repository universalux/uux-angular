import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'rate-star',
  imports: [],
  templateUrl: './rate-star.html',
  styleUrl: './rate-star.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateStar {
  itemPercentage = input<number>(0);
  uniqueId = signal<string>(this.generateUniqueId());
  index = input<number>();

  mouseOver = output<number>();

  // markedForVote(){
  //   if(this.index()){
  //     console.log(this.index());
  //     this.mouseOver.emit(this.index()!);
  //   }
  // }

  generateUniqueId(prefix = 'rate-star'): string {
    const random = Math.random().toString(36).substring(2, 10);
    return `${prefix}-${random}`;
  }
}
