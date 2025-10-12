import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMenuButton } from './ng-menu-button';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NgMenuButton', () => {
  let component: NgMenuButton;
  let fixture: ComponentFixture<NgMenuButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMenuButton],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgMenuButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
