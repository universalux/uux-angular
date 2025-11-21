import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgUux } from './ng-uux';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NgUux', () => {
  let component: NgUux;
  let fixture: ComponentFixture<NgUux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgUux],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgUux);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
