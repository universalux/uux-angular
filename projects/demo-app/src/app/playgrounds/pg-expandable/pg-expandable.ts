import { ChangeDetectionStrategy, Component, ContentChildren, effect, QueryList, ViewChildren } from '@angular/core';
import { NgExpandable } from 'ng-expandable';

type ExpansionChange = {
  state: boolean;
  id: string;
}

@Component({
  selector: 'pg-expandable',
  imports: [NgExpandable],
  templateUrl: './pg-expandable.html',
  styleUrl: './pg-expandable.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgExpandable {

  // handleExpansions({state, id}: ExpansionChange){
  //   console.log(state, id);
  // }

  @ViewChildren('accordionItem') accordionItems!: QueryList<NgExpandable>;

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
