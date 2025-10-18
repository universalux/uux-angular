import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgThemeToggle } from './pg-theme-toggle';

describe('PgThemeToggle', () => {
  let component: PgThemeToggle;
  let fixture: ComponentFixture<PgThemeToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgThemeToggle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgThemeToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
