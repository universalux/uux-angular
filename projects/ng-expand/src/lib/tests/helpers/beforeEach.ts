import { DebugElement, provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TestHost, TestHostAttr } from "./testHosts";
import { By } from "@angular/platform-browser";
import { NgExpand } from "../../ng-expand";

export interface ExpandElements {

    // Test Host declarations
    hostComponent: TestHost | TestHostAttr;
    fixture: ComponentFixture<TestHost | TestHostAttr>;

    // Component Declarations
    expand: DebugElement;
    expandInstance: NgExpand;

    // Usefull elements declarations
    expandButton: DebugElement;
    expandArrowIcon: DebugElement;
    expandPlusIcon: DebugElement;

    expandExpansor: DebugElement;
    expandContent: DebugElement;

}

export async function beforeExpandTest(hostType: 'attr' | 'noAttr' = 'noAttr'){

    const host = hostType === 'attr' ? TestHostAttr : TestHost;

    await TestBed.configureTestingModule({
        providers: [
            provideZonelessChangeDetection()
        ]
    }).compileComponents();

    const fixture = TestBed.createComponent(host);
    const hostComponent = fixture.componentInstance;

    const expand = fixture.debugElement.query(By.directive(NgExpand));
    const expandInstance = expand.componentInstance;

    fixture.detectChanges();

    const expandButton = fixture.debugElement.query(By.css('.expand__button'));
    const expandArrowIcon = fixture.debugElement.query(By.css('.expand__arrow'));
    const expandPlusIcon = fixture.debugElement.query(By.css('.expand__plus'));

    const expandExpansor = fixture.debugElement.query(By.css('.expand__expansor'));
    const expandContent = fixture.debugElement.query(By.css('.expand__content'));

    return {
      fixture,
      hostComponent,
      expand,
      expandInstance,
      expandButton,
      expandArrowIcon,
      expandPlusIcon,
      expandExpansor,
      expandContent
    }
}
