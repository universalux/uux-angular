import { ChangeDetectionStrategy, Component, ElementRef, inject, input, output, signal } from '@angular/core';

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

  isDark = input<boolean>(false);
  setIsDark = output<any>();

  toggle() {
    this.setIsDark.emit(!this.isDark());
    this.setColor();
  }

  /** STYLES */

  darkColor = input<string>('white');
  lightColor = input<string>('black');
  colorDuration = input<number>(0);
  colorTimingFunction = input<'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'>('ease');
  hover = input< 'scale' | 'shadow' >('scale');

  animation = input< 'rotateX' | 'rotateY' | 'soft'>('soft');
  faster = input<boolean>(false);


  /** ACCESIBILITY */

  tabIndex = input<number>(0);
  ariaLabelDark = input<string>('Change to light mode');
  ariaLabelLight = input<string>('Change to dark mode');

  uniqueId = signal<string>('');

  /** LIFE CYCLE */

  ngOnInit() {
    this.setColor();
    this.setColorTransition();
    this.uniqueId.set(Math.random().toString(36).substring(2, 9));
  }

  ngOnChanges() {
    this.setColor();
  }

  /** METHODS */

  private setColor(){
    if(this.isDark()){
      const host = this.el.nativeElement as HTMLElement;
      host.style.setProperty('--current-color', this.darkColor());
    }else{
      const host = this.el.nativeElement as HTMLElement;
      host.style.setProperty('--current-color', this.lightColor());
    }
  }

  private setColorTransition(){
    const host = this.el.nativeElement as HTMLElement;
    host.style.setProperty('--color-duration', `${this.colorDuration()}ms`);
    host.style.setProperty('--color-timing', this.colorTimingFunction());
  }
}
