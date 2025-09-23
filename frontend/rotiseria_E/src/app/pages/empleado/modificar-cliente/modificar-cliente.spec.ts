import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCliente } from './modificar-cliente';

describe('ModificarCliente', () => {
  let component: ModificarCliente;
  let fixture: ComponentFixture<ModificarCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarCliente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCliente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
