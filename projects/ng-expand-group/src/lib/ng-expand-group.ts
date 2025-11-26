import { ChangeDetectionStrategy, Component, ContentChildren, output, QueryList } from '@angular/core';
import { NgExpand } from 'ng-expand';

@Component({
  host: {
    role: 'group'
  },
  standalone: true,
  selector: 'ng-expand-group',
  imports: [],
  template: `<ng-content/>`,
  styleUrl: './ng-expand-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgExpandGroup {

  expandedItem = output<number | null>();

  @ContentChildren(NgExpand) accordionItems!: QueryList<NgExpand>

  ngAfterContentInit() {
    this.accordionItems.changes.subscribe(() => {
      this.attachListeners();
    });

    this.attachListeners();
  };

  private attachListeners() {
    this.accordionItems.forEach((item, index) => {
      item.isExpanded.subscribe(state => {
        if (state) {
          this.expandedItem.emit(index);
          this.closeExpandables(index);
        } else {
        const anyOpen = this.accordionItems.some(i => i.isExpanded());
          if (!anyOpen) {
            this.expandedItem.emit(null);
          }
        };
      });
    });
  };

  closeExpandables(openedExpandableIndex: number){
    this.accordionItems.forEach((item, index) => {
      if(index !== openedExpandableIndex){
        item.isExpanded.set(false);
      }
    })
  };

}
