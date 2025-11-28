import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'rating-heart',
  imports: [],
  templateUrl: './rating-heart.html',
  styleUrl: '../rating-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingHeart {
  itemPercentage = input<number>(0);
  uniqueId = signal<string>(this.generateUniqueId());

  generateUniqueId(prefix = 'rating-heart'): string {
    const random = Math.random().toString(36).substring(2, 10);
    return `${prefix}-${random}`;
  }
}
