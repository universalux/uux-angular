import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgLinkButton } from './ng-link-button';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('NgLinkButton', () => {
  let component: NgLinkButton;
  let fixture: ComponentFixture<NgLinkButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgLinkButton],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgLinkButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
