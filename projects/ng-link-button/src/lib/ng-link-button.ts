import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, inject, input, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  standalone: true,
  selector: 'ng-link-button',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './ng-link-button.html',
  styleUrl: './ng-link-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgLinkButton implements AfterViewInit {

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // ----- HREF INPUTS
  href = input<string | null>(null);
  target = input<'_self' | '_blank' | '_parent' | '_top' | string>('_blank');
  rel = input<string>('noreferrer noopener');

  // ----- ROUTERLINK INPUTS
  routerLink = input<string | any[] | null>(null);
  queryParams = input<Record<string, any> | null>(null);
  fragment = input<string | undefined>(undefined);
  relativeTo = input<ActivatedRoute | null>(null);
  queryParamsHandling = input<'merge' | 'preserve' | null>(null);
  state = input<{ [k: string]: any; } | undefined>(undefined);

  // ----- ACCESSIBILITY INPUTS
  ariaLabel = input<string | null>(null);
  title = input<string | null>(null);
  tabIndex = input<number | null>(null);
  ariaCurrent = input<'page' | 'step' | 'true' | null>(null);
  download = input<string | boolean | null>(null);
  role = input<'link' | 'button' | null>(null);
  disabled = input<boolean>(false);

  // ----- STYLE INPUTS
  type = input<'solid' | 'minimal' | 'outline'>('solid');
  shape = input<'rounded' | 'square'>('rounded');
  hover = input<'color' | 'scale' | 'outline'>('color');
  direction = input<'row' | 'column'>('row');

  // ----- HOST BINDINGS

  @HostBinding('class.solid') get isSolid() {
    return this.type() === 'solid';
  };

  @HostBinding('class.outline') get isOutline() {
    return this.type() === 'outline';
  };

  @HostBinding('class.square') get isSquare() {
    return this.shape() === 'square';
  };

  @HostBinding('class.colorHover') get isColorHover() {
    return this.hover() === 'color';
  };

  @HostBinding('class.scaleHover') get isScaleHover() {
    return this.hover() === 'scale';
  };

  @HostBinding('class.outlineHover') get isOutlineHover() {
    return this.hover() === 'outline';
  };

  @HostBinding('class.disabled') get isDisabled() {
    return this.disabled();
  };


  // ----- HREF BINDINGS

  @ViewChild('anchor') anchor!: ElementRef<HTMLAnchorElement>;

  ngAfterViewInit(): void {
    if(this.isBrowser && this.href() && !this.routerLink()){
      setTimeout(() => {
        if (this.isBrowser) {
          this.anchor.nativeElement.setAttribute('href', this.href()!);
          this.anchor.nativeElement.setAttribute('target', this.target());
          this.anchor.nativeElement.setAttribute('rel', this.rel());
        }
      });
    };
  };
}
