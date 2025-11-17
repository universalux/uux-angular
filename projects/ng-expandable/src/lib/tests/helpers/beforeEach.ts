import { DebugElement, provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TestHost, TestHostAttr } from "./testHosts";
import { By } from "@angular/platform-browser";
import { NgExpandable } from "../../ng-expandable";

export interface ExpandableElements {

    // Test Host declarations
    hostComponent: TestHost | TestHostAttr;
    fixture: ComponentFixture<TestHost | TestHostAttr>;

    // Component Declarations
    expandable: DebugElement;
    expandableInstance: NgExpandable;

    // Usefull elements declarations
    expandableButton: DebugElement;
    expandableArrowIcon: DebugElement;
    expandablePlusIcon: DebugElement;

    expandableExpansor: DebugElement;
    expandableContent: DebugElement;

}

export async function beforeExpandableTest(hostType: 'attr' | 'noAttr' = 'noAttr'){

    const host = hostType === 'attr' ? TestHostAttr : TestHost;

    await TestBed.configureTestingModule({
        providers: [
            provideZonelessChangeDetection()
        ]
    }).compileComponents();

    const fixture = TestBed.createComponent(host);
    const hostComponent = fixture.componentInstance;

    const expandable = fixture.debugElement.query(By.directive(NgExpandable));
    const expandableInstance = expandable.componentInstance;

    fixture.detectChanges();

    const expandableButton = fixture.debugElement.query(By.css('.expandable__button'));
    const expandableArrowIcon = fixture.debugElement.query(By.css('.expandable__arrow'));
    const expandablePlusIcon = fixture.debugElement.query(By.css('.expandable__plus'));

    const expandableExpansor = fixture.debugElement.query(By.css('.expandable__expansor'));
    const expandableContent = fixture.debugElement.query(By.css('.expandable__content'));

    return {
      fixture,
      hostComponent,
      expandable,
      expandableInstance,
      expandableButton,
      expandableArrowIcon,
      expandablePlusIcon,
      expandableExpansor,
      expandableContent
    }
}
