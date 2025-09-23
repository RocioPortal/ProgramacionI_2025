import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonNuevoproducto } from './boton-nuevoproducto';

describe('BotonNuevoproducto', () => {
  let component: BotonNuevoproducto;
  let fixture: ComponentFixture<BotonNuevoproducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonNuevoproducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonNuevoproducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
