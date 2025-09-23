import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonCrearpromo } from './boton-crearpromo';

describe('BotonCrearpromo', () => {
  let component: BotonCrearpromo;
  let fixture: ComponentFixture<BotonCrearpromo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonCrearpromo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonCrearpromo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
