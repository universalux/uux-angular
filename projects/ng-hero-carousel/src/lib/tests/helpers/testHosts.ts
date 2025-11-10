import { Component, signal } from "@angular/core";
// import { AccessibilityOptions, CarouselItem, NgxFullCarousel } from "../../ngx-full-carousel";
import { NgHeroCarousel } from "../../ng-hero-carousel";
import { HeroCarouselCustomAria, HeroCarouselItem } from "../../ng-hero-carousel.types"
import { accessibilityOptionsMock, carouselItemsMock } from "./mocks";
import { SlideForDirective } from "../../directives/slide-for-directive";

@Component({
    imports: [NgHeroCarousel],
    template: `<ng-hero-carousel [slides]="items()" />`
})
export class TestHost {
    items = signal<HeroCarouselItem[]>(carouselItemsMock);
}

@Component({
    imports: [NgHeroCarousel, SlideForDirective],
    template: `
    <ng-hero-carousel
        [slides]="items()"

        [hasOverlay]="false"
        [transitionTime]="0"
        [arrowsPlacement]="arrows()"
        [indicators]="ind()"
        [hasCounter]="true"

        [hasAutoplay]="autoplay()"
        [autoplayTime]="3000"
        [autoplayResumeTime]="4000"

        [lang]="langSelection()"
        [customAria]="accOptions()"

        (selected)="selectedItem.set($event)"
    >

        <ng-template [slideFor]="0">
            <button id="testSlide0Btn">
                Enlace 0
            </button>
        </ng-template>

        <ng-template #outerContent>
            <button id="testOuterContent">
                OuterContent
            </button>
        </ng-template>

    </ng-hero-carousel>`
})
export class TestHostAttr {
    items = signal<HeroCarouselItem[]>(carouselItemsMock);
    autoplay = signal<boolean>(false);

    arrows = signal<'up' | 'down' | 'auto'>('up');
    ind = signal<'bars' | 'circles' | 'none'>('circles');

    langSelection = signal<'en' | 'es' | 'fr' | 'de' | 'it'>('es');

    accOptions = signal<HeroCarouselCustomAria | null>(accessibilityOptionsMock);

    selectedItem = signal<number | null>(null);
}

@Component({
    imports: [NgHeroCarousel, SlideForDirective],
    template: `
    <ng-hero-carousel
        [slides]="items()"

        [hasOverlay]="false"
        [transitionTime]="0"
        [arrowsPlacement]="arrows()"
        [indicators]="ind()"
        [hasCounter]="true"

        [hasAutoplay]="autoplay()"
        [autoplayTime]="10"
        [autoplayResumeTime]="20"

        [lang]="langSelection()"
        [customAria]="accOptions()"

        (selected)="selectedItem.set($event)"
    >

        <ng-template [slideFor]="0">
            <button id="testSlide0Btn">
                Enlace 0
            </button>
        </ng-template>

        <ng-template #outerContent>
            <button id="testOuterContent">
                OuterContent
            </button>
        </ng-template>

    </ng-hero-carousel>`
})
export class TestHostAutoplay {
    items = signal<HeroCarouselItem[]>(carouselItemsMock);
    autoplay = signal<boolean>(true);

    arrows = signal<'up' | 'down' | 'auto'>('up');
    ind = signal<'bars' | 'circles' | 'none'>('circles');

    langSelection = signal<'en' | 'es' | 'fr' | 'de' | 'it'>('es');

    accOptions = signal<HeroCarouselCustomAria | null>(null);

    selectedItem = signal<number | null>(null);
}


