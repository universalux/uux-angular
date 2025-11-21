import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgButtonKit } from './ng-button-kit';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NgButtonKit', () => {
  let component: NgButtonKit;
  let fixture: ComponentFixture<NgButtonKit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgButtonKit],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgButtonKit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
