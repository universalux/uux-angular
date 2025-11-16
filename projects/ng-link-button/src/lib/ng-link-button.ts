import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  standalone: true,
  selector: 'ng-link-button',
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  templateUrl: './ng-link-button.html',
  styleUrl: './ng-link-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgLinkButton {

  // ----- HREF INPUTS
  href = input<string | null>(null);
  target = input<'_self' | '_blank' | '_parent' | '_top' | string>('_blank');
  rel = input<string>('noreferrer noopener');

  // ----- ROUTERLINK INPUTS
  routerLink = input<string | any[] | undefined>(undefined);
  activatedRoute = input<boolean>(true);
  queryParams = input<Record<string, any> | null>(null);
  fragment = input<string | undefined>(undefined);
  relativeTo = input<ActivatedRoute | null>(null);
  queryParamsHandling = input<'merge' | 'preserve' | null>(null);
  state = input<{ [k: string]: any; } | undefined>(undefined);

  // ----- ACCESSIBILITY INPUTS
  ariaLabel = input<string | null>(null);
  title = input<string | null>(null);
  tabIndex = input<number | null>(0);
  ariaCurrent = input<'page' | 'step' | 'true' | null>(null);
  download = input<string | boolean | null>(null);
  role = input<'link' | 'button' | null>(null);
  disabled = input<boolean>(false);

  // ----- STYLE INPUTS
  type = input<'solid' | 'minimal' | 'outline'>('solid');
  square = input<boolean>(false);
  hover = input<'tone' | 'scale' | 'stroke' | 'shadow' | 'none'>('tone');
  direction = input<'row' | 'column'>('row');

  private el = inject(ElementRef);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngAfterViewInit(): void {
    if(this.isBrowser){
      requestAnimationFrame(() => {
        const btn = this.el.nativeElement.querySelector('.linkButton');
        btn.classList.add('ready');
      });
    }
  };

}
