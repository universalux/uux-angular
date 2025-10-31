import { DebugElement, provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TestHost, TestHostAttr } from "./testHosts";
import { By } from "@angular/platform-browser";
import { NgContentCarousel } from "../../ng-content-carousel";

export interface CarouselElements {

    // Test Host declarations
    hostComponent: TestHost | TestHostAttr;
    fixture: ComponentFixture<TestHost | TestHostAttr>;

    // Component Declarations
    carousel: DebugElement;
    carouselInstance: NgContentCarousel;

    // Usefull elements declarations
    carouselContainer: DebugElement;
    titlesReader: DebugElement;

    prevContainer: DebugElement;
    prevButton: DebugElement;

    nextContainer: DebugElement;
    nextButton: DebugElement;

    trackContainer: DebugElement;
    track: DebugElement;
    itemList: DebugElement[];

}

export async function beforeEachCarouselTest(hostType: 'attr' | 'noAttr' = 'noAttr'){

    const host = hostType === 'attr' ? TestHostAttr : TestHost;

    await TestBed.configureTestingModule({
        providers: [
            provideZonelessChangeDetection()
        ]
    }).compileComponents();

    const fixture = TestBed.createComponent(host);
    const hostComponent = fixture.componentInstance;

    const carousel = fixture.debugElement.query(By.directive(NgContentCarousel));
    const carouselInstance = carousel.componentInstance;

    fixture.detectChanges();

    const carouselContainer = fixture.debugElement.query(By.css('.contentCarousel__container'));
    const titlesReader = fixture.debugElement.query(By.css('.sr-only'));

    const prevContainer = fixture.debugElement.query(By.css('.contentCarousel__prevContainer'));
    const prevButton = fixture.debugElement.query(By.css('.contentCarousel__prevButton'));
    const nextContainer = fixture.debugElement.query(By.css('.contentCarousel__nextContainer'));
    const nextButton = fixture.debugElement.query(By.css('.contentCarousel__nextButton'));

    const trackContainer = fixture.debugElement.query(By.css('.contentCarousel__trackContainer'));
    const track = fixture.debugElement.query(By.css('.contentCarousel__track'));

    const itemList = fixture.debugElement.queryAll(By.css('.carousel-item'));

    return {
        fixture,
        hostComponent,
        carousel,
        carouselInstance,
        carouselContainer,
        titlesReader,
        prevContainer,
        prevButton,
        nextContainer,
        nextButton,
        trackContainer,
        track,
        itemList,
    }
}
