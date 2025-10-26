import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, HostBinding, input, signal, TemplateRef, ViewChild } from '@angular/core';
import { CardImage } from './ng-image-card.types';

@Component({
  standalone: true,
  selector: 'ng-image-card',
  imports: [CommonModule],
  templateUrl: './ng-image-card.html',
  styleUrl: './ng-image-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgImageCard implements AfterViewInit{

  @ContentChild('cardHeader') cardHeader!: TemplateRef<any>;
  @ContentChild('cardBody') cardBody!: TemplateRef<any>;
  @ContentChild('cardFooter') cardFooter!: TemplateRef<any>;
  @ViewChild('cardImg') cardImg!: ElementRef<HTMLImageElement>;

  cardImage = input<CardImage | null>(null);
  imageHover = input<boolean>(true);
  // bgHover = input<boolean>(false);
  // scaleHover = input<boolean>(false);
  initialAnimation = input<boolean>(true);

  // @HostBinding('class.scaleHover')
  // get applyScaleHover() {
  //   return this.scaleHover();
  // }

  @HostBinding('class.translateAnimation')
  get applyTranslateAnimation() {
    return this.initialAnimation();
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

  private _imageLoaded = signal<boolean>(false);

  @HostBinding('class.loaded') get loadedClass() {
    return this._imageLoaded();
  }

  ngAfterViewInit() {
    if(!this.cardImage()){
      this._imageLoaded.set(true);
      return;
    };
    if (this.cardImg?.nativeElement) {
      const img = this.cardImg.nativeElement;

      if (img.complete && img.naturalHeight !== 0) {
        // Imagen ya cacheada
        this._imageLoaded.set(true);
      } else {
        img.addEventListener('load', () => {
          this._imageLoaded.set(true);
        });
      }
    }
  }

}
