import { ChangeDetectionStrategy, Component, input, output, WritableSignal } from '@angular/core';
import { MENU_BUTTON_LANG, MenuButtonLangs } from './i18n/menu-button.lang';

@Component({
  selector: 'ng-menu-button',
  imports: [],
  templateUrl: './ng-menu-button.html',
  styleUrl: './ng-menu-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgMenuButton {

  /** IS OPEN STATE FEATURES */

  isOpenSignal = input<WritableSignal<boolean>>();

  handleIsOpen() {
    this.isOpenSignal()?.update(value => !value);
  }

  get isOpen() {
    return this.isOpenSignal()?.();
  }

  /** STYLE INPUTS */

  type = input< 'dots' | 'bars' | 'uneven' >('bars');
  invert = input<boolean>(false);
  thin = input<boolean>(false);
  rounded = input<boolean>(false);
  animation = input< 'rotateX' | 'rotateY' | 'soft' >('soft');
  faster = input<boolean>(false);

  /** ACCESIBILITY */

  tabIndex = input<number>(0);
  ariaLabelOpened = input<string>('Close menu');
  ariaLabelClosed = input<string>('Open menu');

  lang = input<MenuButtonLangs>('en');

  get ariaLabels() {
    return MENU_BUTTON_LANG[this.lang()] ?? MENU_BUTTON_LANG.en;
  }
}
