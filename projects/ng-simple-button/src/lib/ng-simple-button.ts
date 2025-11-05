import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';

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

  handleClick(event: MouseEvent) {
    this.onClick.emit(event);
  };

  // ----- ACCESSIBILITY INPUTS
  ariaLabel = input<string | null>(null);
  title = input<string | null>(null);
  tabIndex = input<number | null>(null);
  ariaCurrent = input<'page' | 'step' | 'true' | null>(null);
  download = input<string | boolean | null>(null);
  role = input<'link' | 'button' | null>(null);
  disabled = input<boolean>(false);

  // ----- STYLE INPUTS
  type = input<'solid' | 'minimal' | 'outline'>('solid');
  shape = input<'rounded' | 'square'>('rounded');
  hover = input<'color' | 'scale' | 'outline'>('color');
  direction = input<'row' | 'column'>('row');

  // ----- HOST BINDINGS

  // TYPE BINDINGS

  @HostBinding('class.solid') get isSolid() {
    return this.type() === 'solid';
  };

  @HostBinding('class.minimal') get isMinimal() {
    return this.type() === 'minimal';
  };

  @HostBinding('class.outline') get isOutline() {
    return this.type() === 'outline';
  };

  // SHAPE BINDINGS

  @HostBinding('class.square') get isSquare() {
    return this.shape() === 'square';
  };

  // HOVER BINDINGS

  @HostBinding('class.colorHover') get isColorHover() {
    return this.hover() === 'color';
  };

  @HostBinding('class.scaleHover') get isScaleHover() {
    return this.hover() === 'scale';
  };

  @HostBinding('class.outlineHover') get isOutlineHover() {
    return this.hover() === 'outline';
  };

  @HostBinding('class.disabled') get isDisabled() {
    return this.disabled();
  };
}
