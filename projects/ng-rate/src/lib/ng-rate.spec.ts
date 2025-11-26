import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRate } from './ng-rate';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NgRate', () => {
  let component: NgRate;
  let fixture: ComponentFixture<NgRate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgRate],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgRate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
