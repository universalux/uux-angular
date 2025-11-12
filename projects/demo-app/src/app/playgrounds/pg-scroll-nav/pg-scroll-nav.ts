import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgScrollNav, ScrollNavCustomAria } from 'ng-scroll-nav';
import { NgLinkButton } from 'ng-link-button';

@Component({
  selector: 'pg-scroll-nav',
  imports: [NgScrollNav, NgLinkButton],
  templateUrl: './pg-scroll-nav.html',
  styleUrl: './pg-scroll-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgScrollNav {
  accOpts = signal<ScrollNavCustomAria>({
    navAriaLabel: 'EDITED Navigationsleiste',
    prevBtnAriaLabel: 'EDITED Nach links scrollen',
    nextBtnAriaLabel: 'EDITED Nach rechts scrollen',
    linksGroupAriaLabel: 'EDITED Link-Gruppe',
  });
}
