import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, HostBinding, input, TemplateRef } from '@angular/core';
import { CardImage } from './ng-image-card.types';

@Component({
  standalone: true,
  selector: 'ng-image-card',
  imports: [CommonModule],
  templateUrl: './ng-image-card.html',
  styleUrl: './ng-image-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgImageCard {

  @ContentChild('cardHeader') cardHeader!: TemplateRef<any>;
  @ContentChild('cardBody') cardBody!: TemplateRef<any>;
  @ContentChild('cardFooter') cardFooter!: TemplateRef<any>;

  cardImage = input<CardImage | null>(null);
  orientation = input<'vertical' | 'horizontal'>('vertical');
  imageHover = input<boolean>(true);
  bgHover = input<boolean>(true);
  scaleHover = input<boolean>(true);

  @HostBinding('class.scaleHover')
  get applyScaleHover() {
    return this.scaleHover();
  }

  @HostBinding('class.horizontal')
  get applyHorizontal() {
    return this.orientation() === 'horizontal';
  }

  @HostBinding('class.noHeader')
  get noHeader(): boolean {
    return !this.cardHeader;
  }

  @HostBinding('class.noImage')
  get noImage(): boolean {
    return !this.cardImage();
  }

  @HostBinding('class.noBody')
  get noBody(): boolean {
    return !this.cardBody;
  }

  @HostBinding('class.noFooter')
  get noFooter(): boolean {
    return !this.cardFooter;
  }

}
