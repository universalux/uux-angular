import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PgMenuButton } from './pg-menu-button';

describe('PgMenuButton', () => {
  let component: PgMenuButton;
  let fixture: ComponentFixture<PgMenuButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgMenuButton],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgMenuButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
