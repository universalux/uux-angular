import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ng-simple-button',
  imports: [],
  templateUrl: './ng-simple-button.html',
  styleUrl: './ng-simple-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgSimpleButton {

  // ----- ACTION INPUT
  onClick = output<MouseEvent>();

  handleClick(event: MouseEvent) : void {
    this.onClick.emit(event);
  };

  // ----- ACCESSIBILITY INPUTS
  ariaLabel = input<string | null>(null);
  title = input<string | null>(null);
  tabIndex = input<number>(0);
  disabled = input<boolean>(false);

  // ----- STYLE AND BEHAVIOR INPUTS
  type = input<'solid' | 'minimal' | 'outline'>('solid');
  square = input<boolean>(false);
  hover = input<'tone' | 'scale' | 'stroke' | 'shadow' | 'none'>('tone');
  direction = input<'row' | 'column'>('row');

}
