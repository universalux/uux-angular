import { AfterViewInit, ChangeDetectionStrategy, Component, effect, ElementRef, HostListener, input, OnInit, signal, ViewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { ScrollNavCustomAria, ScrollNavLangs } from './ng-scroll-nav.types';
import { SCROLL_NAV_LANG } from './accessibility/scroll-nav.lang';

@Component({
  standalone: true,
  selector: 'ng-scroll-nav',
  imports: [],
  templateUrl: './ng-scroll-nav.html',
  styleUrl: './ng-scroll-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgScrollNav implements AfterViewInit, OnInit {

  // Behavior inputs
  scrollStep = input<number>(150);
  scrollBehavior = input<'smooth' |'auto'>('smooth');

  //Accessibility inputs
  lang = input<ScrollNavLangs>('en');
  customAria = input<ScrollNavCustomAria | null>(null);

  acc = signal<ScrollNavCustomAria>(SCROLL_NAV_LANG['en']);
  hasOverflow = signal<boolean>(false);

  @HostListener('focusin', ['$event'])
  onFocusIn(event: FocusEvent) {
    const target = event.target as HTMLElement;
    if (this.contentContainer.nativeElement.contains(target)) {
      target.scrollIntoView({ behavior: this.scrollBehavior(), inline: 'center', block: 'nearest' });
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const active = document.activeElement as HTMLElement | null;
    if (!active || !this.contentContainer.nativeElement.contains(active)) return;
      const items = this.getFocusableItems();
      const idx = items.indexOf(active);
      if (idx === -1) return;

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        const next = items[idx + 1] ?? items[0];
        next.focus();
        next.scrollIntoView({ behavior: this.scrollBehavior(), inline: 'center' });
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const prev = items[idx - 1] ?? items[items.length - 1];
        prev.focus();
        prev.scrollIntoView({ behavior: this.scrollBehavior(), inline: 'center' });
      }

  }

  @ViewChild('contentContainer') contentContainer!:ElementRef;
  @ViewChild('content') content!:ElementRef;

  ngAfterViewInit(): void {
    this.calculateOverflow();

    fromEvent(window, 'resize')
    .pipe(debounceTime(100))
    .subscribe(() => {
      this.calculateOverflow();
    });
  }

  ngOnInit(): void {
    this.setAccOptions();
  };

  constructor() {
    effect(() => {
      this.setAccOptions();
    });
    // **IMPORTANT** For angular 18 add ", { allowSignalWrites: true }" to each effect
  };

  private calculateOverflow(){
    const containerWidth = this.contentContainer.nativeElement.clientWidth;
    const contentWidth = this.content.nativeElement.scrollWidth;
    this.hasOverflow.set(containerWidth < contentWidth);
  }

  scrollNext() {
    this.content.nativeElement.scrollBy({
      left: this.scrollStep(),
      behavior: this.scrollBehavior()
    });
    // this.ensureFocusedVisible();
  }

  scrollPrev() {
    this.content.nativeElement.scrollBy({
      left: -this.scrollStep(),
      behavior: this.scrollBehavior()
    });
    // this.ensureFocusedVisible();
  }

  private getFocusableItems(): HTMLElement[] {
    // Selecciona todos los elementos que por naturaleza o atributo pueden recibir foco
    const selector = `
      a[href],
      button:not([disabled]),
      input:not([disabled]),
      select:not([disabled]),
      textarea:not([disabled]),
      [tabindex]:not([tabindex="-1"])
    `;

    // Busca dentro del contenedor principal del contenido
    const items = Array.from(
      this.content.nativeElement.querySelectorAll(selector)
    ) as HTMLElement[];

    // Devuelve un array de elementos focusables válidos
    return items.filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
  }

  setAccOptions() {
    const currentLang = this.lang() ?? 'en';
    const langDefaults = SCROLL_NAV_LANG[currentLang];
    const userOptions = this.customAria() ?? {};

    this.acc.set({
      ...langDefaults,
      ...userOptions,
    });
  };
}
