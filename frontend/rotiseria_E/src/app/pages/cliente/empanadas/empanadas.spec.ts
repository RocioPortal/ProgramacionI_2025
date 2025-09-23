import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Empanadas } from './empanadas';

describe('Empanadas', () => {
  let component: Empanadas;
  let fixture: ComponentFixture<Empanadas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Empanadas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Empanadas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
