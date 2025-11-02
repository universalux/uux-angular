import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ng-link-button',
  imports: [],
  templateUrl: './ng-link-button.html',
  styleUrl: './ng-link-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgLinkButton {

}
