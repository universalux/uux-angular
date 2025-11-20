import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { NgThemeToggle, NgMenuToggle } from 'ng-toggle-kit';

@Component({
  selector: 'app-pg-kits',
  imports: [NgThemeToggle, NgMenuToggle],
  templateUrl: './pg-kits.html',
  styleUrl: './pg-kits.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgKits {
  isDark = signal(true);
  isOpen = signal(false);
}
