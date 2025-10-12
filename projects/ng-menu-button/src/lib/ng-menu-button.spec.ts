import { ComponentFixture, TestBed } from '@angular/core/testing';
import 'zone.js';
import 'zone.js/testing';

import { NgMenuButton } from './ng-menu-button';

describe('NgMenuButton', () => {
  let component: NgMenuButton;
  let fixture: ComponentFixture<NgMenuButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMenuButton]
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
