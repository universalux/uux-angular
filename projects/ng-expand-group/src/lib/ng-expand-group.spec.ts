import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgExpandGroup } from './ng-expand-group';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NgExpandGroup', () => {
  let component: NgExpandGroup;
  let fixture: ComponentFixture<NgExpandGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgExpandGroup],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgExpandGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
