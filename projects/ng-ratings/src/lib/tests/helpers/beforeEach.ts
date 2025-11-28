import { DebugElement, provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TestHostReadOnly, TestHostInteractive } from "./testHosts";
import { By } from "@angular/platform-browser";
import { NgRatings } from "../../ng-ratings";
import { RatingStar } from "../../rating-star/rating-star";
import { RatingHeart } from "../../rating-heart/rating-heart";

export interface RatingElements {

    // Test Host declarations
    hostComponent: TestHostReadOnly | TestHostInteractive;
    fixture: ComponentFixture<TestHostReadOnly | TestHostInteractive>;

    // Component Declarations
    ratings: DebugElement;
    ratingsInstance: NgRatings;

    // Usefull elements declarations
    ratingItemButtons: DebugElement[];
    ratingStars: DebugElement[];
    ratingHearts: DebugElement[];

}

export async function beforeEachRatingsTest(hostType: 'readOnly' | 'interactive' = 'readOnly'){

    await TestBed.configureTestingModule({
        providers: [
            provideZonelessChangeDetection()
        ]
    }).compileComponents();

    let fixture: ComponentFixture<any>;
    let hostComponent: any;

    if(hostType === 'readOnly') {
      fixture = TestBed.createComponent(TestHostReadOnly);
      hostComponent = fixture.componentInstance;
    } else {
      fixture = TestBed.createComponent(TestHostInteractive);
      hostComponent = fixture.componentInstance;
    }



    const ratings = fixture.debugElement.query(By.directive(NgRatings));
    const ratingsInstance = ratings.componentInstance;

    fixture.detectChanges();

    //List of buttons if is NOT readOnly
    const ratingItemButtons = fixture.debugElement.queryAll(By.css('.ratingItemButton'));

    //List of icons if is readOnly
    const ratingStars = fixture.debugElement.queryAll(By.directive(RatingStar));
    const ratingHearts = fixture.debugElement.queryAll(By.directive(RatingHeart));

    return {
      fixture,
      hostComponent,
      ratings,
      ratingsInstance,
      ratingItemButtons,
      ratingStars,
      ratingHearts
    }
}
