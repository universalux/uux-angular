import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgImageCard } from '../ng-image-card';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NgImageCard', () => {
  let component: NgImageCard;
  let fixture: ComponentFixture<NgImageCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgImageCard],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgImageCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
