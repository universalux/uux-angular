import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgHeroCarousel } from '../ng-hero-carousel';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NgHeroCarousel', () => {
  let component: NgHeroCarousel;
  let fixture: ComponentFixture<NgHeroCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgHeroCarousel],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgHeroCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
