import { ChangeDetectionStrategy, Component, input, WritableSignal } from '@angular/core';
import { MENU_TOGGLE_LANG } from './accessibility/menu-toggle.lang';
import { MenuToggleCustomAria, MenuToggleLangs } from './ng-menu-toggle.types';

@Component({
  standalone: true,
  selector: 'ng-menu-toggle',
  imports: [],
  templateUrl: './ng-menu-toggle.html',
  styleUrl: './ng-menu-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgMenuToggle {

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

  lang = input<MenuToggleLangs>('en');
  customAria = input<Partial<MenuToggleCustomAria> | null>(null);

  get ariaLabels(): MenuToggleCustomAria {
    const langLabels = MENU_TOGGLE_LANG[this.lang()] ?? MENU_TOGGLE_LANG.en;
    const custom = this.customAria();

    return {
      ariaLabelOpened: custom?.ariaLabelOpened ?? langLabels.ariaLabelOpened,
      ariaLabelClosed: custom?.ariaLabelClosed ?? langLabels.ariaLabelClosed,
    };
  }
}
