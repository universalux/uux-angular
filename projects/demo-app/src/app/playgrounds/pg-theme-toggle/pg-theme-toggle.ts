import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgThemeToggle, ThemeToggleCustomAria, ThemeToggleLangs } from 'ng-theme-toggle';

@Component({
  selector: 'pg-theme-toggle',
  imports: [NgThemeToggle],
  templateUrl: './pg-theme-toggle.html',
  styleUrl: './pg-theme-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgThemeToggle {

  isDark1 = signal<boolean>(false);
  isDark2 = signal<boolean>(true);
  isDark3 = signal<boolean>(true);

  customAria = signal<ThemeToggleCustomAria | null>({
    ariaLabelDark: 'Custom Dark',
    ariaLabelLight: 'Custom Light'
  });

  currentLang  = signal<ThemeToggleLangs>('en');

  handleLang(event: Event){
    const target = event.target as HTMLSelectElement;
    const value = target.value as ThemeToggleLangs;
    this.currentLang .set(value)
  }
}
