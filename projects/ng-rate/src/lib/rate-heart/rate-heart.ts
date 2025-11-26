import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'rate-heart',
  imports: [],
  templateUrl: './rate-heart.html',
  styleUrl: '../rate-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateHeart {
  itemPercentage = input<number>(0);
  uniqueId = signal<string>(this.generateUniqueId());

  generateUniqueId(prefix = 'rate-heart'): string {
    const random = Math.random().toString(36).substring(2, 10);
    return `${prefix}-${random}`;
  }
}
