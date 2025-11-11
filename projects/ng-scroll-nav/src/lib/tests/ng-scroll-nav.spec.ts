import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgScrollNav } from '../ng-scroll-nav';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NgScrollNav', () => {
  let component: NgScrollNav;
  let fixture: ComponentFixture<NgScrollNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgScrollNav],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgScrollNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
