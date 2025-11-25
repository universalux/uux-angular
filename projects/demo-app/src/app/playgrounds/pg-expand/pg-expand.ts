import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgExpand } from 'ng-expand';
import { NgExpandGroup } from 'ng-expand-group';

@Component({
  selector: 'pg-expand',
  imports: [NgExpand, NgExpandGroup],
  templateUrl: './pg-expand.html',
  styleUrl: './pg-expand.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgExpand {

  expandOpenedItem = signal<number | null>(null);

}
