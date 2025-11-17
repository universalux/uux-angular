import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgExpandable } from './ng-expandable';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NgExpandable', () => {
  let component: NgExpandable;
  let fixture: ComponentFixture<NgExpandable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgExpandable],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgExpandable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
