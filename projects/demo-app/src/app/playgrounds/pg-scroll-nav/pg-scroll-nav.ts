import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgScrollNav } from 'ng-scroll-nav';
import { NgLinkButton } from 'ng-link-button';

@Component({
  selector: 'pg-scroll-nav',
  imports: [NgScrollNav, NgLinkButton],
  templateUrl: './pg-scroll-nav.html',
  styleUrl: './pg-scroll-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgScrollNav {

}
