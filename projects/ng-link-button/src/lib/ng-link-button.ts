import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

// export type LinkRel =
//   | 'noopener'
//   | 'noreferrer'
//   | 'nofollow'
//   | 'external'
//   | 'ugc'
//   | 'sponsored'
//   | 'prev'
//   | 'next'
//   | 'alternate'
//   | string;

@Component({
  standalone: true,
  selector: 'ng-link-button',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './ng-link-button.html',
  styleUrl: './ng-link-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgLinkButton {

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

  // ----- STYLE INPUTS
  type = input<'minimal' | 'buton'>('minimal');
  shape = input<'square' | 'rounded'>('rounded');
  hover = input<'scale' |'color'>('scale');

  @ViewChild('link') link!: ElementRef<HTMLAnchorElement>;

  ngAfterViewInit(): void {
    if(this.isBrowser && this.href() && !this.routerLink()){
      this.link.nativeElement.setAttribute('href', this.href()!);
      this.link.nativeElement.setAttribute('target', this.target());
      this.link.nativeElement.setAttribute('rel', this.rel());
    }
  };
}
