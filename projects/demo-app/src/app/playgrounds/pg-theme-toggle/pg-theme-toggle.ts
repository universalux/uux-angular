import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgThemeToggle } from 'ng-theme-toggle';

@Component({
  selector: 'pg-theme-toggle',
  imports: [NgThemeToggle],
  templateUrl: './pg-theme-toggle.html',
  styleUrl: './pg-theme-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgThemeToggle {

}
