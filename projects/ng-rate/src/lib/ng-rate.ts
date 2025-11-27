import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { RateStar } from './rate-star/rate-star';
import { RateHeart } from "./rate-heart/rate-heart";
import { RateCustomAria, RateLangs } from './ng-rate.types';
import { RATE_LANG } from './accessibility/rate.lang';

@Component({
  standalone: true,
  selector: 'ng-rate',
  imports: [RateStar, RateHeart],
  templateUrl: './ng-rate.html',
  styleUrl: './ng-rate.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgRate implements OnInit, OnChanges {

  el = inject(ElementRef);

  // Functionality inputs / outputs
  items = input< 3 | 4 | 5 | 7 | 10 >(5);
  average = input(0);
  readOnly = input<boolean>(false);
  vote = output<number>();

  // Style and behavior inputs
  icon = input<'star' | 'heart'>('star');
  hover = input<Array<'scale' | 'rotateX' | 'translateY'> |'none'>(['scale']);

  // Accessibility inputs
  lang = input<RateLangs>('en');
  customAria = input<Partial<RateCustomAria> | null>(null);

  // Internal signals
  itemsAverages = signal<number[]>([]);
  currentVote = signal<number | null>(0);
  clampedAverage = computed(() => {
    const avg = this.average();
    const max = this.items();
    const min = 0;

    if (typeof avg !== 'number' || isNaN(avg)) return 0;

    // clamp (0 → max)
    return Math.min(max, Math.max(min, avg));
  });
  acc = signal<RateCustomAria>(RATE_LANG['en']);

  // ---------- Life cycle ----------

  firstRender : boolean = true;
  ngOnInit(): void {
    this.updateItems(this.clampedAverage());
    this.setAccOptions();
    this.firstRender = false;
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['average'] || changes['items']  && !this.firstRender) {
      this.updateItems(this.clampedAverage());
    }

    if(changes['lang'] || changes['customAria']){
      this.setAccOptions();
    };

    if(changes['hover']){
      if(this.hover() !== 'none'){
        this.el.nativeElement.style.setProperty('--hover-transform', this.getHoverTransform());
      }
    };
  };

  ngAfterViewInit() {
    if(this.hover() !== 'none'){
      this.el.nativeElement.style.setProperty('--hover-transform', this.getHoverTransform());
    }
  };

  // ---------- Methods ----------

  setVote(index: number){
    const markedElements = (index + 1);
    this.updateItems(markedElements);
    this.currentVote.set(markedElements);
  };

  cancelVote(){
    this.currentVote.set(null);
    this.updateItems(this.average());
  };

  sendVote(){
    if(this.currentVote()){
      this.vote.emit(this.currentVote()!);
    }
  };

  focusItem(index: number) {
    const buttons = this.el.nativeElement.querySelectorAll('.rateItemButton');
    const btn = buttons[index] as HTMLButtonElement;
    btn.focus();
  };

  onKeydown(event: KeyboardEvent, index: number) {
    const max = this.items();
    if (event.key === 'ArrowRight') {
      const next = Math.min(index + 1, max - 1);
      this.focusItem(next);
      event.preventDefault();
    }

    if (event.key === 'ArrowLeft') {
      const prev = Math.max(index - 1, 0);
      this.focusItem(prev);
      event.preventDefault();
    }

    if (event.key === ' ' || event.key === 'Enter') {
      this.setVote(index);
      this.sendVote();
      event.preventDefault();
    }
  };

  private updateItems (average: number ) {

    let currentAverage = average;
    const items = this.items();
    let itemsArr = [];

    for (let i = 1; i <= items; i++) {
      if(currentAverage >= 1){
        itemsArr.push(100);
        currentAverage --;
      }else if(currentAverage < 1 && currentAverage > 0){
        itemsArr.push(Math.floor(currentAverage * 100));
        currentAverage = 0;
      }else {
        itemsArr.push(0);
      }
    }

    this.itemsAverages.set(itemsArr);
  };

  setAccOptions() {
    const currentLang = this.lang() ?? 'en';
    const langDefaults = RATE_LANG[currentLang];
    const userOptions = this.customAria() ?? {};

    this.acc.set({
      ...langDefaults,
      ...userOptions,
    });
  };

  getHoverTransform() {
    const transforms = [];
    if (this.hover().includes('scale')) transforms.push('scale(var(--rate-hover-scale, 1.1))');
    if (this.hover().includes('rotateX')) transforms.push('rotate(var(--rate-hover-rotateX, 15deg))');
    if (this.hover().includes('translateY')) transforms.push('translateY(var(--rate-hover-translateY,  -5px))');
    return transforms.join(' ');
  }

}
