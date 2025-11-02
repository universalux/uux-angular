import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgLinkButton } from 'ng-link-button';

@Component({
  selector: 'pg-buttons',
  imports: [ NgLinkButton ],
  templateUrl: './pg-buttons.html',
  styleUrl: './pg-buttons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgButtons {

}
