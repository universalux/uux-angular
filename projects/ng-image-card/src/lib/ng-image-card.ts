import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ng-image-card',
  imports: [],
  templateUrl: './ng-image-card.html',
  styleUrl: './ng-image-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgImageCard {
  animation = input<'translateY' | 'fadeIn'>('translateY');
  hover = input<'scale' | 'color' | 'both' | 'none'>('scale');
  shadow = input<boolean>(true);

  @HostBinding('class.shadow')
  get applyShadow() {
    return this.shadow();
  }

  @HostBinding('class.scaleHover')
  get applyScaleHover() {
    return this.hover() === 'scale' || this.hover() === 'both';
  }

  @HostBinding('class.colorHover')
  get applyColorHover() {
    return this.hover() === 'color' || this.hover() === 'both';
  }

  @HostBinding('class.translateAnimation')
  get applyTranslateAnimation() {
    return this.animation() === 'translateY';
  }

  @HostBinding('class.fadeInAnimation')
  get applyFadeInAnimation() {
    return this.animation() === 'fadeIn';
  }

}
