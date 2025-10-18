import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgThemeToggle } from '../ng-theme-toggle';

describe('NgThemeToggle', () => {
  let component: NgThemeToggle;
  let fixture: ComponentFixture<NgThemeToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgThemeToggle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgThemeToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
