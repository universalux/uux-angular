import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgExpandable } from 'ng-expandable';

@Component({
  selector: 'pg-expandable',
  imports: [NgExpandable],
  templateUrl: './pg-expandable.html',
  styleUrl: './pg-expandable.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgExpandable {

}
