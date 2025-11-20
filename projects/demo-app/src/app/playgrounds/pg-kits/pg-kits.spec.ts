import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgKits } from './pg-kits';

describe('PgKits', () => {
  let component: PgKits;
  let fixture: ComponentFixture<PgKits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PgKits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgKits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
