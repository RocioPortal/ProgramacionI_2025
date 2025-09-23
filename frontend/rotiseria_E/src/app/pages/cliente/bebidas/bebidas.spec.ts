import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bebidas } from './bebidas';

describe('Bebidas', () => {
  let component: Bebidas;
  let fixture: ComponentFixture<Bebidas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bebidas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bebidas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
