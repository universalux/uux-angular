import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'rate-star',
  imports: [],
  templateUrl: './rate-star.html',
  styleUrl: '../rate-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateStar {
  itemPercentage = input<number>(0);
  uniqueId = signal<string>(this.generateUniqueId());

  generateUniqueId(prefix = 'rate-star'): string {
    const random = Math.random().toString(36).substring(2, 10);
    return `${prefix}-${random}`;
  }
}
