import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgContentCarousel } from '../ng-content-carousel';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NgContentCarousel', () => {
  let component: NgContentCarousel;
  let fixture: ComponentFixture<NgContentCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgContentCarousel],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgContentCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
