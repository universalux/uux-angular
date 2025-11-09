import { Component, signal } from "@angular/core";
import { NgContentCarousel } from "../../ng-content-carousel";
import { ContentCarouselItemDirective } from "../../directives/carousel-item-directive";
import { ContentCarouselCustomAria, ContentCarouselLangs } from "../../ng-content-carousel.types";
import { carouselItemsMock, customAccesibilityOptions, externalItemSize } from "./mocks";
// import { accessibilityOptionsMock, carouselItemsMock } from "./mocks";
// import { SlideForDirective } from "../../directives/slide-for-directive";

@Component({
  imports: [NgContentCarousel, ContentCarouselItemDirective],
  template: `
    <ng-content-carousel>
      @for(item of carouselItems; track $index){
        <div contentCarouselItem [style.width]="itemSize + 'px'" [style.height]="itemSize + 'px'">
          {{item}}
        </div>
      }
    </ng-content-carousel>
  `
})
export class TestHost {
    carouselItems : string[] = carouselItemsMock;
    itemSize : number = externalItemSize;
}

@Component({
    imports: [NgContentCarousel, ContentCarouselItemDirective],
    template: `
      <ng-content-carousel
        [transition]="false"
        arrowStyle="solid"
        [hideArrowsOnEdges]="false"
        advanceMode="single"

        [lang]="langSelection()"
        [customAria]="accOptions()"
      >
        @for(item of carouselItems; track $index){
          <div contentCarouselItem [style.width]="itemSize + 'px'" [style.height]="itemSize + 'px'">
            {{item}}
          </div>
        }
      </ng-content-carousel>
    `
})
export class TestHostAttr {
    carouselItems : string[] = carouselItemsMock;
    itemSize : number = externalItemSize;

    langSelection = signal<ContentCarouselLangs>('es');
    accOptions = signal<ContentCarouselCustomAria | null>(null);
}

// @Component({
//     imports: [NgContentCarousel, SlideForDirective],
//     template: `
//     <ng-content-carousel
//         [slides]="items()"

//         [hasOverlay]="false"
//         [transitionTime]="0"
//         [arrowsPlacement]="arrows()"
//         [indicators]="ind()"
//         [hasCounter]="true"

//         [hasAutoplay]="autoplay()"
//         [autoplayTime]="10"
//         [autoplayResumeTime]="20"

//         [lang]="langSelection()"
//         [accessibilityOptions]="accOptions()"

//         (selected)="selectedItem.set($event)"
//     >

//         <ng-template [slideFor]="0">
//             <button id="testSlide0Btn">
//                 Enlace 0
//             </button>
//         </ng-template>

//         <ng-template #outerContent>
//             <button id="testOuterContent">
//                 OuterContent
//             </button>
//         </ng-template>

//     </ng-content-carousel>`
// })
// export class TestHostAutoplay {
//     items = signal<CarouselItem[]>(carouselItemsMock);
//     autoplay = signal<boolean>(true);

//     arrows = signal<'up' | 'down' | 'auto'>('up');
//     ind = signal<'bars' | 'circles' | 'none'>('circles');

//     langSelection = signal<'en' | 'es' | 'fr' | 'de' | 'it'>('es');

//     accOptions = signal<AccessibilityOptions | null>(null);

//     selectedItem = signal<number | null>(null);
// }


