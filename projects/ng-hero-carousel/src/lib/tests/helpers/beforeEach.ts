import { DebugElement, provideZonelessChangeDetection } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TestHost, TestHostAttr, TestHostAutoplay } from "./testHosts";
import { By } from "@angular/platform-browser";
import { NgHeroCarousel } from "../../ng-hero-carousel";

export interface CarouselElements {
    hostComponent: TestHost | TestHostAttr | TestHostAutoplay;
    fixture: ComponentFixture<TestHost | TestHostAttr>;
    carousel: DebugElement;
    carouselInstance: NgHeroCarousel;
    autoplayBtn: DebugElement;
    autoplayBtnPaused: DebugElement;
    outerContent: DebugElement;
    titlesReader: DebugElement;
    prevBtnContainer: DebugElement;
    prevBtn: DebugElement;
    nextBtnContainer: DebugElement;
    nextBtn: DebugElement;
    slides: DebugElement;
    slideArticleList: DebugElement[];
    indicators: DebugElement;
    indicatorBtnList: DebugElement[];
    counter: DebugElement;
}

export async function beforeEachCarouselTest(hostType: 'attr' | 'noAttr' | 'ap' = 'attr'){

    const host = hostType === 'attr' ? TestHostAttr : (hostType === 'noAttr' ? TestHost : TestHostAutoplay);

    await TestBed.configureTestingModule({
        providers: [
            provideZonelessChangeDetection()
        ]
    }).compileComponents();

    const fixture = TestBed.createComponent(host);
    const hostComponent = fixture.componentInstance;

    const carousel = fixture.debugElement.query(By.directive(NgHeroCarousel));
    const carouselInstance = carousel.componentInstance;

    fixture.detectChanges();

    const autoplayBtn = fixture.debugElement.query(By.css('button.carousel__autoplayBtn'));
    const autoplayBtnPaused = fixture.debugElement.query(By.css('button.carousel__autoplayBtn--sr-only'));
    const outerContent = fixture.debugElement.query(By.css('.carousel__outerContent'));
    const titlesReader = fixture.debugElement.query(By.css('.sr-only'));

    const prevBtnContainer = fixture.debugElement.query(By.css('.carousel__prevBtnContainer'));
    const prevBtn = fixture.debugElement.query(By.css('.carousel__prevBtnContainer .carousel__prevBtn'));
    const nextBtnContainer = fixture.debugElement.query(By.css('.carousel__nextBtnContainer'));
    const nextBtn = fixture.debugElement.query(By.css('.carousel__nextBtnContainer .carousel__nextBtn'));

    const slides = fixture.debugElement.query(By.css('.carousel__slides'));
    const slideArticleList = fixture.debugElement.queryAll(By.css('.carousel__slide'));

    const indicators = fixture.debugElement.query(By.css('.carousel__indicators'));
    const indicatorBtnList = fixture.debugElement.queryAll(By.css('.carousel__indicatorBtn'));

    const counter = fixture.debugElement.query(By.css('.carousel__counter'));

    return {
        fixture,
        hostComponent,
        carousel,
        carouselInstance,
        autoplayBtn,
        autoplayBtnPaused,
        outerContent,
        titlesReader,
        prevBtnContainer,
        prevBtn,
        nextBtnContainer,
        nextBtn,
        slides,
        slideArticleList,
        indicators,
        indicatorBtnList,
        counter
    }
}
