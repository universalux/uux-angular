import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ng-expandable',
  imports: [],
  templateUrl: './ng-expandable.html',
  styleUrl: './ng-expandable.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgExpandable {
  label = input<string | null>(null);
  expanded = input<boolean>(false);

}
