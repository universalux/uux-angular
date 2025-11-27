import { DebugElement, provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TestHostReadOnly, TestHostInteractive } from "./testHosts";
import { By } from "@angular/platform-browser";
import { NgRate } from "../../ng-rate";
import { RateStar } from "../../rate-star/rate-star";
import { RateHeart } from "../../rate-heart/rate-heart";

export interface RateElements {

    // Test Host declarations
    hostComponent: TestHostReadOnly | TestHostInteractive;
    fixture: ComponentFixture<TestHostReadOnly | TestHostInteractive>;

    // Component Declarations
    rate: DebugElement;
    rateInstance: NgRate;

    // Usefull elements declarations
    rateItemButtons: DebugElement[];
    rateStars: DebugElement[];
    rateHearts: DebugElement[];

}

export async function beforeEachRateTest(hostType: 'readOnly' | 'interactive' = 'readOnly'){

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



    const rate = fixture.debugElement.query(By.directive(NgRate));
    const rateInstance = rate.componentInstance;

    fixture.detectChanges();

    //List of buttons if is NOT readOnly
    const rateItemButtons = fixture.debugElement.queryAll(By.css('.rateItemButton'));

    //List of icons if is readOnly
    const rateStars = fixture.debugElement.queryAll(By.directive(RateStar));
    const rateHearts = fixture.debugElement.queryAll(By.directive(RateHeart));

    return {
      fixture,
      hostComponent,
      rate,
      rateInstance,
      rateItemButtons,
      rateStars,
      rateHearts
    }
}
