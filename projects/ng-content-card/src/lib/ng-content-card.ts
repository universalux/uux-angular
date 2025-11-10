import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ng-content-card',
  imports: [],
  templateUrl: './ng-content-card.html',
  styleUrl: './ng-content-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgContentCard {
  animation = input<'translateY' | 'fadeIn' |'none'>('translateY');
  hover = input<'scale' | 'tone' | 'both' | 'none'>('scale');
  shadow = input<boolean>(true);

  @HostBinding('class.shadow')
  get applyShadow() {
    return this.shadow();
  }

  @HostBinding('class.scaleHover')
  get applyScaleHover() {
    return this.hover() === 'scale' || this.hover() === 'both';
  }

  @HostBinding('class.toneHover')
  get applyToneHover() {
    return this.hover() === 'tone' || this.hover() === 'both';
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
