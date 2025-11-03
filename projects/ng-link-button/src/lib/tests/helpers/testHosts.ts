import { Component, inject, signal } from "@angular/core";
import { NgLinkButton } from "../../ng-link-button";
import { ActivatedRoute } from "@angular/router";

@Component({
  imports: [NgLinkButton],
  template: `
    <ng-link-button>
      Link Button Content
    </ng-link-button>
  `
})
export class TestHost {}

@Component({
  imports: [NgLinkButton],
  template: `
    <ng-link-button
      ariaLabel="Aria label xample"
      title="Title Example"
      [tabIndex]="-1"
      [ariaCurrent]="ariaCurrent()"
      [download]="download()"
      [role]="role()"
      [disabled]="true"

      [type]="type()"
      shape="square"
      [hover]="hover()"
      direction="column"
    >
      Link Button Content
    </ng-link-button>
  `
})
export class TestHostWithAttr {
  ariaCurrent = signal<'page' | 'step' | 'true' | null>(null);
  download = signal<string | boolean | null>(null);
  role = signal<'link' | 'button' | null>(null);

  type = signal<'solid' | 'minimal' | 'outline'>('minimal');
  hover = signal<'color' | 'scale' | 'outline'>('scale');
}


@Component({
  imports: [NgLinkButton],
  providers: [ActivatedRoute],
  template: `
    <ng-link-button
      routerLink="/test"
      [queryParams]="{ category: 'books', sort: 'price' }"
      fragment="fragment"
      [relativeTo]="route"
      [queryParamsHandling]="queryParamsHandling()"
      [state]="{state: 'hola'}"
    >
      Link Button Content
    </ng-link-button>
  `
})
export class TestHostRouterLink {

  route = inject(ActivatedRoute);
  queryParamsHandling = signal<'merge' | 'preserve' | null>(null);

}

@Component({
  imports: [NgLinkButton],
  providers: [],
  template: `
    <ng-link-button
      href="https://alday.dev"
      [target]="target()"
      rel="noreferrer noopener"
    >
      Link Button Content
    </ng-link-button>
  `
})
export class TestHostHref{

  target = signal<'_self' | '_blank' | '_parent' | '_top' | string>('_blank');

}


