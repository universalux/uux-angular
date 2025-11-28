import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'rating-star',
  imports: [],
  templateUrl: './rating-star.html',
  styleUrl: '../rating-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingStar {
  itemPercentage = input<number>(0);
  uniqueId = signal<string>(this.generateUniqueId());

  generateUniqueId(prefix = 'rating-star'): string {
    const random = Math.random().toString(36).substring(2, 10);
    return `${prefix}-${random}`;
  }
}
