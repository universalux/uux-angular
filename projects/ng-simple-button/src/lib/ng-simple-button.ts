import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ng-simple-button',
  imports: [],
  templateUrl: './ng-simple-button.html',
  styleUrl: './ng-simple-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgSimpleButton {

}
