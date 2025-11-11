import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ng-scroll-nav',
  imports: [],
  templateUrl: './ng-scroll-nav.html',
  styleUrl: './ng-scroll-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgScrollNav {

}
