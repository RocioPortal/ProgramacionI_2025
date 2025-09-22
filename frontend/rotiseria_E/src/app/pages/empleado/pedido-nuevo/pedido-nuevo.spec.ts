import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoNuevo } from './pedido-nuevo';

describe('PedidoNuevo', () => {
  let component: PedidoNuevo;
  let fixture: ComponentFixture<PedidoNuevo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoNuevo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoNuevo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
