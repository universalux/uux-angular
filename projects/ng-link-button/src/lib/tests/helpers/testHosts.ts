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
      ariaLabel="Aria label example"
      title="Title example"
      [tabIndex]="-1"
      [ariaCurrent]="ariaCurrent()"
      [download]="true"
      [role]="role()"
      [disabled]="true"

      [type]="type()"
      [square]="true"
      [hover]="hover()"
      direction="column"
    >
      Link Button Content
    </ng-link-button>
  `
})
export class TestHostWithAttr {
  ariaCurrent = signal<'page' | 'step' | 'true' | null>('page');
  role = signal<'link' | 'button' | null>('link');

  type = signal<'solid' | 'minimal' | 'outline'>('minimal');
  hover = signal<'tone' | 'scale' | 'stroke' | 'shadow' | 'none'>('scale');
}


@Component({
  imports: [NgLinkButton],
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
  queryParamsHandling = signal<'merge' | 'preserve' | null>('merge');

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


