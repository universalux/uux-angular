import { ChangeDetectionStrategy, Component, ContentChildren, effect, QueryList, ViewChildren } from '@angular/core';
import { NgExpand } from 'ng-expand';
import { NgExpandGroup } from 'ng-expand-group';

type ExpansionChange = {
  state: boolean;
  id: string;
}

@Component({
  selector: 'pg-expand',
  imports: [NgExpand, NgExpandGroup],
  templateUrl: './pg-expand.html',
  styleUrl: './pg-expand.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PgExpand {

  // handleExpansions({state, id}: ExpansionChange){
  //   console.log(state, id);
  // }

  // @ViewChildren('accordionItem') accordionItems!: QueryList<NgExpand>;

  // ngAfterViewInit() {
  //   console.log('Items encontrados:', this.accordionItems.length);
  //   this.accordionItems.forEach((item, index) => {
  //     item.isExpanded.subscribe((state) => {
  //       if(state){
  //         this.closeExpandables(index);
  //       }
  //     })
  //   });
  // }

  // closeExpandables(openedExpandableIndex: number){
  //   this.accordionItems.forEach((item, index) => {
  //     if(index !== openedExpandableIndex){
  //       item.isExpanded.set(false);
  //     }
  //   })
  // }

}
