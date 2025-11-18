import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, input, model, OnInit, PLATFORM_ID, signal, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ng-expand',
  imports: [],
  templateUrl: './ng-expand.html',
  styleUrl: './ng-expand.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgExpand implements AfterViewInit, OnInit {

  // ---- INJECTIONS

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private el = inject(ElementRef);

  // ----- INPUTS

  label = input<string | null>(null);
  startExpanded = input<boolean>(false);
  iconType = input<'arrow'| 'plus'>('arrow');

  tabIndex = input<number>(0);

  // ----- SIGNALS

  isExpanded = model<boolean>(false);
  contentHeight = signal<number>(0);
  expandBtnId = signal<string>(this.generateUniqueId('expand-btn'));
  expandContentId = signal<string>(this.generateUniqueId('expand-content'));

  // ----- VIEW CHILDREN

  @ViewChild('content') content!: ElementRef;

  // ----- LIFE CYCLE

  ngAfterViewInit(): void {
    if(this.isBrowser){
      this.contentHeight.set(this.content.nativeElement.clientHeight);
      this.handleSeparation();
      requestAnimationFrame(() => {
        this.el.nativeElement.classList.add('ready');
      });
    }
  }

  ngOnInit(): void {
    if(this.startExpanded()){
      this.isExpanded.set(true);
    }
  }

  // ----- METHODS

  generateUniqueId(prefix = 'expand-btn'): string {
    const random = Math.random().toString(36).substring(2, 10);
    return `${prefix}-${random}`;
  }

  handleExpansion(){
    this.isExpanded.set(!this.isExpanded());
    this.handleSeparation();
  };

  handleSeparation(){
    this.isExpanded()
      ? this.el.nativeElement.classList.add('separation')
      : this.el.nativeElement.classList.remove('separation')
  };

}
