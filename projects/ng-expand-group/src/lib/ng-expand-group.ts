import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { NgExpand } from 'ng-expand';

@Component({
  selector: 'ng-expand-group',
  imports: [],
  template: `<ng-content/>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgExpandGroup {

  // @ViewChildren(NgExpand) accordionItems!: QueryList<NgExpand>;
  @ContentChildren(NgExpand) accordionItems!: QueryList<NgExpand>

  ngAfterViewInit() {
    console.log('Items encontrados:', this.accordionItems.length);
    this.accordionItems.forEach((item, index) => {
      item.isExpanded.subscribe((state) => {
        if(state){
          this.closeExpandables(index);
        }
      })
    });
  }

  closeExpandables(openedExpandableIndex: number){
    this.accordionItems.forEach((item, index) => {
      if(index !== openedExpandableIndex){
        item.isExpanded.set(false);
      }
    })
  }
}
