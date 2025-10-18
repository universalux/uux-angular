import { ChangeDetectionStrategy, Component, input, WritableSignal } from '@angular/core';
import { MENU_BUTTON_LANG } from './accessibility/menu-button.lang';
import { MenuButtonCustomAria, MenuButtonLangs } from './ng-menu-button.types';

@Component({
  standalone: true,
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

  lang = input<MenuButtonLangs>('en');
  customAria = input<Partial<MenuButtonCustomAria> | null>(null);

  get ariaLabels(): MenuButtonCustomAria {
    const langLabels = MENU_BUTTON_LANG[this.lang()] ?? MENU_BUTTON_LANG.en;
    const custom = this.customAria();

    return {
      ariaLabelOpened: custom?.ariaLabelOpened ?? langLabels.ariaLabelOpened,
      ariaLabelClosed: custom?.ariaLabelClosed ?? langLabels.ariaLabelClosed,
    };
  }
}
