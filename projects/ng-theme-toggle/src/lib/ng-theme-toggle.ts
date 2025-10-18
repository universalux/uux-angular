import { ChangeDetectionStrategy, Component, ElementRef, inject, input, signal, WritableSignal } from '@angular/core';
import { ThemeToggleCustomAria, ThemeToggleLangs } from './ng-theme-toggle.types';
import { THEME_TOGGLE_LANG } from './accessibility/theme-toggle.lang';

@Component({
  standalone: true,
  selector: 'ng-theme-toggle',
  imports: [],
  templateUrl: 'ng-theme-toggle.html',
  styleUrl: 'ng-theme-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgThemeToggle {
  private el = inject(ElementRef);

  /** ISDARK FEATURES */

  isDarkSignal = input<WritableSignal<boolean>>();

  handleIsDark() {
    this.isDarkSignal()?.update(value => !value);
    this.setColor();
  }

  get isDark() {
    return this.isDarkSignal()?.();
  }

  /** STYLES */

  hover = input< 'scale' | 'shadow' | 'none' >('scale');

  animation = input< 'rotateX' | 'rotateY' | 'soft'>('soft');
  faster = input<boolean>(false);


  /** ACCESIBILITY */

  tabIndex = input<number>(0);

  lang = input<ThemeToggleLangs>('en');
  customAria = input<Partial<ThemeToggleCustomAria> | null>(null);

  uniqueId = signal<string>('');

  get ariaLabels(): ThemeToggleCustomAria {
    const langLabels = THEME_TOGGLE_LANG[this.lang()] ?? THEME_TOGGLE_LANG.en;
    const custom = this.customAria();

    return {
      ariaLabelDark: custom?.ariaLabelDark ?? langLabels.ariaLabelDark,
      ariaLabelLight: custom?.ariaLabelLight ?? langLabels.ariaLabelLight,
    };
  }

  /** LIFE CYCLE */

  ngOnInit() {
    this.setColor();
    this.uniqueId.set(Math.random().toString(36).substring(2, 9));
  }

  ngOnChanges() {
    this.setColor();
  }

  /** METHODS */

  private setColor() {
    const host = this.el.nativeElement as HTMLElement;
    host.classList.toggle('isDark', this.isDark);
  }

}
