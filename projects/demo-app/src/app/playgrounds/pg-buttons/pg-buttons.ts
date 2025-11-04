import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgLinkButton } from 'ng-link-button';
import {NgSimpleButton} from 'ng-simple-button'

@Component({
  selector: 'pg-buttons',
  imports: [ NgLinkButton, NgSimpleButton ],
  templateUrl: './pg-buttons.html',
  styleUrl: './pg-buttons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgButtons {

}
