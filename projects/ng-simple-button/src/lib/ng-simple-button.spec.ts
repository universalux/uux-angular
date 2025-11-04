import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSimpleButton } from './ng-simple-button';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NgSimpleButton', () => {
  let component: NgSimpleButton;
  let fixture: ComponentFixture<NgSimpleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgSimpleButton],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgSimpleButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
