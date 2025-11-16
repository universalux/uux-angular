import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, output, PLATFORM_ID } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ng-simple-button',
  imports: [],
  templateUrl: './ng-simple-button.html',
  styleUrl: './ng-simple-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgSimpleButton implements AfterViewInit{

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

  private el = inject(ElementRef);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngAfterViewInit(): void {
    if(this.isBrowser){
      requestAnimationFrame(() => {
        const btn = this.el.nativeElement.querySelector('.simpleButton');
        btn.classList.add('ready');
      });
    }
  };

}
