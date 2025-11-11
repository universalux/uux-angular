import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgScrollNav } from 'ng-scroll-nav';

@Component({
  selector: 'pg-scroll-nav',
  imports: [NgScrollNav],
  templateUrl: './pg-scroll-nav.html',
  styleUrl: './pg-scroll-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgScrollNav {

}
